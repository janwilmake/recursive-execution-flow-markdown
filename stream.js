/**
 *
 * This POC demonstrates that you can create nested streams that perfectly get indented in appropriate markdown syntax with max 80 characters per line.
 *
 * The toolcall does not know about this
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/raw") {
      return new Response(getToolStream(), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no", // Disable nginx buffering
          "Transfer-Encoding": "chunked", // Force chunked encoding
        },
      });
    }
    const levelMatch = url.pathname.match(/^\/level\/(\d+)$/);

    if (levelMatch) {
      const level = parseInt(levelMatch[1]);
      return handleLevelStream(level, request.url);
    }

    // Default to level 1
    return handleLevelStream(1, request.url);
  },
};

async function handleLevelStream(level, baseUrl) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  // Start streaming asynchronously
  streamLevelContent(writer, encoder, level, baseUrl);

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no", // Disable nginx buffering
      "Transfer-Encoding": "chunked", // Force chunked encoding
    },
  });
}

async function streamLevelContent(writer, encoder, level, baseUrl) {
  try {
    const indent = "> ".repeat(level);

    // Write header first
    const header = `# Worker ${level}`;
    await writer.write(encoder.encode(indent + header + "\n"));
    await writer.write(encoder.encode(indent + "\n"));

    // First lorem ipsum
    await streamToolWithFormatting(writer, encoder, indent);
    await writer.write(encoder.encode(indent + "\n"));

    // First nested call (if not at max level)
    if (level < 4) {
      const nestedUrl = new URL(`/level/${level + 1}`, baseUrl);
      await streamNestedContent(writer, encoder, nestedUrl, level);
      // Add indented empty line after nested content
      await writer.write(encoder.encode(indent + "\n"));
    }

    // Second lorem ipsum
    await streamToolWithFormatting(writer, encoder, indent);
    await writer.write(encoder.encode(indent + "\n"));

    // Second nested call (if not at max level)
    if (level < 4) {
      const nestedUrl = new URL(`/level/${level + 1}`, baseUrl);
      await streamNestedContent(writer, encoder, nestedUrl, level);
      // Add indented empty line after nested content
      await writer.write(encoder.encode(indent + "\n"));
    }

    // Third lorem ipsum
    await streamToolWithFormatting(writer, encoder, indent);
    await writer.write(encoder.encode(indent + "\n"));
  } catch (error) {
    const indent = "> ".repeat(level);
    await writer.write(
      encoder.encode(`${indent} Error at level ${level}: ${error.message}\n`),
    );
  } finally {
    await writer.close();
  }
}

async function streamToolWithFormatting(writer, encoder, indent) {
  // Get the raw tool stream
  const toolStream = getToolStream();
  const reader = toolStream.getReader();
  const decoder = new TextDecoder();

  let currentLineLength = 0;
  let isFirstWordOnLine = true;
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // Process complete words from buffer
      let spaceIndex;
      while ((spaceIndex = buffer.search(/[\s\n]/)) !== -1) {
        const word = buffer.substring(0, spaceIndex);
        const separator = buffer[spaceIndex];
        buffer = buffer.substring(spaceIndex + 1);

        if (word.length > 0) {
          // Check if we need a new line (80 char limit)
          if (
            currentLineLength + word.length + 1 > 80 &&
            currentLineLength > indent.length + 1
          ) {
            await writer.write(encoder.encode("\n"));
            currentLineLength = 0;
            isFirstWordOnLine = true;
          }

          // If this is the first word on a line, add indent
          if (isFirstWordOnLine) {
            await writer.write(encoder.encode(indent));
            currentLineLength = indent.length + 1;
            isFirstWordOnLine = false;
          }

          await writer.write(encoder.encode(word));
          currentLineLength += word.length;

          // Handle separator
          if (separator === "\n") {
            // Multiple newlines in source become paragraph breaks
            let newlineCount = 1;
            while (buffer.length > 0 && buffer[0] === "\n") {
              newlineCount++;
              buffer = buffer.substring(1);
            }

            // Write the newlines with proper indentation
            for (let i = 0; i < newlineCount; i++) {
              await writer.write(encoder.encode("\n"));
              // Add indent after each newline except the last one if there's no more content
              if (
                i < newlineCount - 1 ||
                buffer.length > 0 ||
                buffer.trim().length > 0
              ) {
                await writer.write(encoder.encode(indent));
                currentLineLength = indent.length + 1;
                isFirstWordOnLine = false;
              } else {
                currentLineLength = 0;
                isFirstWordOnLine = true;
              }
            }
          } else {
            // Regular space
            await writer.write(encoder.encode(" "));
            currentLineLength += 1;
          }
        } else if (separator === "\n") {
          // Handle standalone newlines
          let newlineCount = 1;
          while (buffer.length > 0 && buffer[0] === "\n") {
            newlineCount++;
            buffer = buffer.substring(1);
          }

          for (let i = 0; i < newlineCount; i++) {
            await writer.write(encoder.encode("\n"));
            // Add indent after each newline except the last one if there's no more content
            if (
              i < newlineCount - 1 ||
              buffer.length > 0 ||
              buffer.trim().length > 0
            ) {
              await writer.write(encoder.encode(indent));
              currentLineLength = indent.length + 1;
              isFirstWordOnLine = false;
            } else {
              currentLineLength = 0;
              isFirstWordOnLine = true;
            }
          }
        }
      }
    }

    // Process any remaining content in buffer
    if (buffer.length > 0) {
      const word = buffer.trim();
      if (word.length > 0) {
        // Check if we need a new line (80 char limit)
        if (
          currentLineLength + word.length > 80 &&
          currentLineLength > indent.length + 1
        ) {
          await writer.write(encoder.encode("\n"));
          currentLineLength = 0;
          isFirstWordOnLine = true;
        }

        // If this is the first word on a line, add indent
        if (isFirstWordOnLine) {
          await writer.write(encoder.encode(indent + " "));
          currentLineLength = indent.length + 1;
          isFirstWordOnLine = false;
        }

        await writer.write(encoder.encode(word));
        currentLineLength += word.length;
      }
    }

    // End with newline if we're not already at the start of a line
    if (!isFirstWordOnLine) {
      await writer.write(encoder.encode("\n"));
    }
  } finally {
    reader.releaseLock();
  }
}

function getToolStream() {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  // Start streaming the tool content asynchronously
  streamRawToolContent(writer, encoder);

  return readable;
}

async function streamRawToolContent(writer, encoder) {
  try {
    // Generate random lorem ipsum text with potential newlines
    const loremWords = [
      "lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
      "consectetur",
      "adipiscing",
      "elit",
      "sed",
      "do",
      "eiusmod",
      "tempor",
      "incididunt",
      "ut",
    ];

    // Generate 100-200 words with occasional paragraph breaks
    const wordCount = Math.floor(Math.random() * 100) + 100;

    for (let i = 0; i < wordCount; i++) {
      const word = loremWords[Math.floor(Math.random() * loremWords.length)];
      await writer.write(encoder.encode(word));

      if (i < wordCount - 1) {
        // Add paragraph break (double newline) randomly (5% chance)
        if (Math.random() < 0.03) {
          await writer.write(encoder.encode("\n\n"));
        } else {
          await writer.write(encoder.encode(" "));
        }
      }

      // Add delay for word-by-word effect
      await sleep(25);
    }
  } catch (error) {
    await writer.write(
      encoder.encode(`Error in tool stream: ${error.message}`),
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
