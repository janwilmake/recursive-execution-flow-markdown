`agents.json` contains

```ts
interface Tool {
  hostname: string;
  path: string;
  method: string;
  operationId?: string;
  summary?: string;
  parameters?: any[];
  requestBody?: any;
  responses?: any;
}
type Agent = {
  id: number;
  parent_id: number | null;
  level: number;
  content: string;
  tools: Tool[];
};
type Agents = {
  script_name: string;
  definition: string;
  agents: Agent[];
};
```

Create a Cloudflare typescript worker that imports `agents.json` and:

- takes `/{script_name}` to start a new run by looking up the
- `/{script_name}/run/{run_id}` shows execution through readable stream (singular live stream)
- `/{script_name}/agent/{id}` (access point for any agent)

Agents docs: https://developers.cloudflare.com/agents/llms-full.txt

# Answer and implement!!!! https://letmeprompt.com/agentsjson-contai-20zznj0
