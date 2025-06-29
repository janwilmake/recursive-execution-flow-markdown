`parser.ts`: https://pastebin.contextarea.com/yia14yT.md

In the folder `benchmark`, all `*.md` files are workflow definitions, and all `{hostname}.openapi.json` files define tools on a hostname. Every step in the workflow may or may not include URLs that refer to a path on a defined openapi.

- load all files in benchmark into memory first
- parse each workflow in folder `benchmark` into steps json using the parser
- parse each url in step into a tool footprint using the belonging openapi file by first parsing the hostname to get the filename.
- parse all child steps of a step into a tool footprint (agents are special tools accessible at `http://agent/{script_name}/agent/{id}`)
- result: Agent[] (`Agent = { script_name, definition, agents: { id, parent_id, level, content, tools: Tool[] }[] }`)
- Save `agents.json` at root
