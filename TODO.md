GOAL: make a fully functional recursive-workflow-execution-engine with agents with tools.

TODO

- ✅ Create a dataset of real tools and definition workflows (`benchmark`)
- ✅ Create a parser to turn the structured-workflow-definition into flat JSON (`parser.ts`)
- ✅ Create a bi-directional parser that turns the benchmark data into the datastructures needed to specify the cloudflare agents with tools (`agents.json.ts.md`)
- 🟠 Create a cloudflare worker that uses `agents.json` and serves it as (sub)agents with tools in Cloudflare (`runtime.ts.md`)
  - if this is too hard, at first maybe develop a single tool-call-agent without conversion step
- Create a cloudflare workflow execution parser that takes into account the status and LLM outputs (with tool-calls) and parses that into a "workflow execution markdown" (can update live using websockets)

GOAL: show that for the benchmark, hierarchical workflows can executed with toolcalls and everything.

Following up:

- Finish the stream api for a workflow with openai recursive tool calling
- Support structured IO tools that may not require LLM if all data is present, and so I can work on paralellisation
- Integrate with openapisearch and add oauth 2.1 authorization, making it super easy to create new workflows.
