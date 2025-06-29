// if this works, it's very interesting it seems.
//
// COULD BE BREAKTHROUGH

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const levelMatch = url.pathname.match(/^\/level\/(\d+)$/);

    if (levelMatch) {
      const level = parseInt(levelMatch[1]);
      return handleLevelStream(level, request.url, env);
    }

    // Default to level 1
    return handleLevelStream(1, request.url, env);
  },
};

async function handleLevelStream(level, baseUrl, env) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  // Start streaming asynchronously
  streamLevelContent(writer, encoder, level, baseUrl, env);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
      "Transfer-Encoding": "chunked",
    },
  });
}

async function streamLevelContent(writer, encoder, level, baseUrl, env) {
  try {
    const indent = "> ".repeat(level);

    // Write header
    await writer.write(
      encoder.encode(`${indent} # AI Worker Level ${level}\n${indent} \n`),
    );

    // Make OpenAI chat completion with tool calling
    const messages = [
      {
        role: "system",
        content: `You are an AI assistant at recursive level ${level}. Generate thoughtful content about this level of processing. If you need to delegate work or explore deeper topics, use the dive_deeper tool to call the next level.`,
      },
      {
        role: "user",
        content: `Generate some interesting content for level ${level}. Feel free to dive deeper into topics using tool calls when appropriate.`,
      },
    ];

    const tools =
      level < 4
        ? [
            {
              type: "function",
              function: {
                name: "dive_deeper",
                description:
                  "Dive deeper into a topic by calling the next recursive level",
                parameters: {
                  type: "object",
                  properties: {
                    topic: {
                      type: "string",
                      description: "The topic to explore more deeply",
                    },
                  },
                  required: ["topic"],
                },
              },
            },
          ]
        : [];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: messages,
        tools: tools,
        stream: true,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let currentMessage = "";
    let toolCalls = [];
    let currentToolCall = null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta;

            if (delta?.content) {
              // Stream the content word by word with proper indentation
              const words = delta.content.split(/(\s+)/);
              for (const word of words) {
                if (word.trim()) {
                  await writer.write(encoder.encode(`${indent} ${word}`));
                  await sleep(50);
                } else {
                  await writer.write(encoder.encode(word));
                }
              }
              currentMessage += delta.content;
            }

            if (delta?.tool_calls) {
              for (const toolCall of delta.tool_calls) {
                if (toolCall.index !== undefined) {
                  if (!toolCalls[toolCall.index]) {
                    toolCalls[toolCall.index] = {
                      id: toolCall.id || "",
                      type: toolCall.type || "function",
                      function: { name: "", arguments: "" },
                    };
                  }

                  const tc = toolCalls[toolCall.index];
                  if (toolCall.function?.name) {
                    tc.function.name += toolCall.function.name;
                  }
                  if (toolCall.function?.arguments) {
                    tc.function.arguments += toolCall.function.arguments;
                  }
                }
              }
            }
          } catch (e) {
            // Skip malformed JSON
          }
        }
      }
    }

    // Process any tool calls
    if (toolCalls.length > 0) {
      await writer.write(encoder.encode(`\n${indent} \n`));

      for (const toolCall of toolCalls) {
        if (toolCall.function.name === "dive_deeper") {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            await writer.write(
              encoder.encode(
                `${indent} 🔍 Diving deeper into: ${args.topic}\n${indent} \n`,
              ),
            );

            // Make recursive call to next level
            const nestedUrl = new URL(`/level/${level + 1}`, baseUrl);
            await streamNestedContent(writer, encoder, nestedUrl, level);
          } catch (e) {
            await writer.write(
              encoder.encode(
                `${indent} Error parsing tool arguments: ${e.message}\n`,
              ),
            );
          }
        }
      }
    }

    await writer.write(encoder.encode(`\n${indent} \n`));
  } catch (error) {
    const indent = "> ".repeat(level);
    await writer.write(
      encoder.encode(`${indent} Error at level ${level}: ${error.message}\n`),
    );
  } finally {
    await writer.close();
  }
}

async function streamNestedContent(writer, encoder, nestedUrl, parentLevel) {
  try {
    const response = await handleLevelStream(parentLevel + 1, nestedUrl);

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        await writer.write(encoder.encode(chunk));
      }
    }
  } catch (error) {
    const indent = "> ".repeat(parentLevel + 1);
    await writer.write(
      encoder.encode(
        `${indent} Error calling nested level: ${error.message}\n`,
      ),
    );
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
