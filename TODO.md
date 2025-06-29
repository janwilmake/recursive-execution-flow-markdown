GOAL: make a fully functional recursive-workflow-execution-engine with agents with tools.

TODO

- ✅ Create a dataset of real tools and definition workflows
- ✅ Create a parser to turn the structured-workflow-definition into flat JSON
- Create a parser that turns the benchmark data into the datastructures needed to specify the cloudflare agents with tools
- Create a cloudflare worker that turns `benchmark/*` into (sub)agents with tools in Cloudflare
