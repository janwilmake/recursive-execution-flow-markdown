# recursive markdown stream-in-stream with super simple syntax

Based on the code and examples, the underlying structure is a **hierarchical markdown format using blockquote nesting to represent recursive execution flows**. Each level of recursion is indicated by increasing the blockquote depth ("> ", "> > ", "> > > ", etc.), creating a visual tree structure where:

1. **Each level represents an execution context** (worker, agent, or process) with its own header (e.g., "# Worker 1")
2. **Content flows linearly within each level**, with text automatically wrapped at 80 characters while preserving the indentation
3. **Nested calls spawn deeper levels** that inherit the parent's indentation plus one additional blockquote marker
4. **The structure maintains proper markdown semantics** where each ">" creates a valid blockquote block, making it readable in any markdown renderer

This creates a **stream-in-stream architecture** where each recursive call appears as nested quoted content, allowing for real-time visualization of hierarchical AI agent workflows or multi-level processing pipelines in a single markdown document.

To try:

```
curl -N --no-buffer http://localhost:8787/level/1
```

Check the draft [RFC](RFC.md)
