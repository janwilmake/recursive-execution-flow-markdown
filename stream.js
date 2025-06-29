export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
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
    let currentLineLength = 0;

    // Helper function to write words with line wrapping
    async function writeWords(words, isLorem = false) {
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordWithSpace = i === words.length - 1 ? word : word + " ";

        // Check if we need a new line (80 char limit)
        if (
          currentLineLength + wordWithSpace.length > 80 &&
          currentLineLength > indent.length
        ) {
          await writer.write(encoder.encode("\n" + indent + " "));
          currentLineLength = indent.length + 1;
        }

        // If this is the first word on a line and we're not at the start, add indent
        if (currentLineLength === 0) {
          await writer.write(encoder.encode(indent + " "));
          currentLineLength = indent.length + 1;
        }

        await writer.write(encoder.encode(wordWithSpace));
        currentLineLength += wordWithSpace.length;

        // Add delay for word-by-word effect
        await sleep(isLorem ? 50 : 100);
      }
    }

    // Start new line for this level
    // await writer.write(encoder.encode("\n"));
    currentLineLength = 0;

    // Write header first
    const header = `# Worker ${level}`;
    await writer.write(encoder.encode(indent + " " + header + "\n"));
    await writer.write(encoder.encode(indent + " " + "\n"));
    currentLineLength = 0;
    await sleep(200);

    // First lorem ipsum
    const lorem1 =
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(
        " ",
      );
    await writeWords(lorem1, true);

    await writer.write(encoder.encode("\n" + indent + " \n"));
    currentLineLength = 0;
    await sleep(200);

    // First nested call (if not at max level)
    if (level < 4) {
      const nestedUrl = new URL(`/level/${level + 1}`, baseUrl);
      await streamNestedContent(writer, encoder, nestedUrl, level);
      // Add indented empty line after nested content
      await writer.write(encoder.encode(indent + " \n"));
    }

    await sleep(200);

    // Second lorem ipsum
    const lorem2 =
      "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor".split(
        " ",
      );
    await writeWords(lorem2, true);

    await writer.write(encoder.encode("\n" + indent + " \n"));
    currentLineLength = 0;
    await sleep(200);

    // Second nested call (if not at max level)
    if (level < 4) {
      const nestedUrl = new URL(`/level/${level + 1}`, baseUrl);
      await streamNestedContent(writer, encoder, nestedUrl, level);
      // Add indented empty line after nested content
      await writer.write(encoder.encode(indent + " \n"));
    }

    await sleep(200);

    // Third lorem ipsum
    const lorem3 =
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde".split(
        " ",
      );
    await writeWords(lorem3, true);

    await writer.write(encoder.encode("\n" + indent + " \n"));
    currentLineLength = 0;
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
    const response = await fetch(nestedUrl.toString());

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
