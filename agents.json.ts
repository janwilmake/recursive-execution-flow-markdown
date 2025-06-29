//@ts-check
/// <reference types="@types/node" />

import fs from "fs";
import path from "path";
import { parseHMREF, HMREFStep } from "./parser";

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

interface AgentStep {
  id: number;
  parent_id: number | null;
  level: number;
  content: string;
  tools: Tool[];
}

interface Agent {
  script_name: string;
  definition: string;
  agents: AgentStep[];
}

interface OpenAPISpec {
  paths: {
    [path: string]: {
      [method: string]: {
        operationId?: string;
        summary?: string;
        parameters?: any[];
        requestBody?: any;
        responses?: any;
      };
    };
  };
}

function loadBenchmarkFiles(): {
  workflows: Map<string, string>;
  openapis: Map<string, OpenAPISpec>;
} {
  const benchmarkDir = path.join(process.cwd(), "benchmark");
  const workflows = new Map<string, string>();
  const openapis = new Map<string, OpenAPISpec>();

  if (!fs.existsSync(benchmarkDir)) {
    throw new Error("Benchmark directory does not exist");
  }

  const files = fs.readdirSync(benchmarkDir);

  for (const file of files) {
    const filePath = path.join(benchmarkDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    if (file.endsWith(".md")) {
      const scriptName = path.basename(file, ".md");
      workflows.set(scriptName, content);
    } else if (file.endsWith(".openapi.json")) {
      const hostname = path.basename(file, ".openapi.json");
      try {
        const spec = JSON.parse(content) as OpenAPISpec;
        openapis.set(hostname, spec);
      } catch (error) {
        console.warn(`Failed to parse OpenAPI spec for ${hostname}:`, error);
      }
    }
  }

  return { workflows, openapis };
}

function extractUrlsFromContent(content: string): string[] {
  // Match URLs in the content - looking for http/https URLs
  const urlRegex = /https?:\/\/[^\s\)]+/g;
  const urls = content.match(urlRegex) || [];
  return urls;
}

function parseUrlToTool(
  url: string,
  openapis: Map<string, OpenAPISpec>,
): Tool | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const pathname = decodeURIComponent(urlObj.pathname);

    // Check if it's an agent URL
    if (hostname === "agent") {
      // Agent URLs have format: http://agent/{script_name}/agent/{id}
      const pathParts = pathname.split("/").filter((p) => p);
      if (pathParts.length >= 3 && pathParts[1] === "agent") {
        return {
          hostname: "agent",
          path: pathname,
          method: "POST", // Default method for agents
          operationId: `agent_${pathParts[0]}_${pathParts[2]}`,
          summary: `Agent ${pathParts[2]} from ${pathParts[0]}`,
        };
      }
    }

    // Look up the OpenAPI spec for this hostname
    const spec = openapis.get(hostname);
    if (!spec) {
      console.warn(`No OpenAPI spec found for hostname: ${hostname}`);
      return null;
    }

    // Find matching path in OpenAPI spec
    let matchingPath = pathname;
    let pathSpec = spec.paths[pathname];
    // If exact match not found, try to find a parameterized path
    if (!pathSpec) {
      for (const specPath of Object.keys(spec.paths)) {
        if (pathMatches(pathname, specPath)) {
          matchingPath = specPath;
          pathSpec = spec.paths[specPath];
          break;
        }
      }
    }

    if (!pathSpec) {
      console.warn(`No path found in OpenAPI spec for ${hostname}${pathname}`);
      return null;
    }

    // Default to GET method, or use the first available method
    const availableMethods = Object.keys(pathSpec);
    const method = availableMethods.includes("get")
      ? "get"
      : availableMethods[0];
    const operation = pathSpec[method];

    return {
      hostname,
      path: matchingPath,
      method: method.toUpperCase(),
      operationId: operation.operationId,
      summary: operation.summary,
      parameters: operation.parameters,
      requestBody: operation.requestBody,
      responses: operation.responses,
    };
  } catch (error) {
    console.warn(`Failed to parse URL: ${url}`, error);
    return null;
  }
}

function pathMatches(actualPath: string, specPath: string): boolean {
  // Simple path matching - convert OpenAPI path parameters to regex
  const regexPath = specPath.replace(/\{[^}]+\}/g, "[^/]+");
  const regex = new RegExp(`^${regexPath}$`);
  return regex.test(actualPath);
}

function findChildSteps(stepId: number, allSteps: HMREFStep[]): HMREFStep[] {
  return allSteps.filter((step) => step.parent_id === stepId);
}

function extractToolsFromSteps(
  steps: HMREFStep[],
  openapis: Map<string, OpenAPISpec>,
): Tool[] {
  const tools: Tool[] = [];

  for (const step of steps) {
    // Extract URLs from step content
    const urls = extractUrlsFromContent(step.content);

    for (const url of urls) {
      const tool = parseUrlToTool(url, openapis);
      if (tool) {
        tools.push(tool);
      }
    }
  }

  return tools;
}

function processWorkflow(
  scriptName: string,
  workflowContent: string,
  openapis: Map<string, OpenAPISpec>,
): Agent {
  const parsed = parseHMREF(workflowContent);
  const agents: AgentStep[] = [];

  for (const step of parsed.steps) {
    // Get all child steps recursively
    const childSteps = getAllChildSteps(step.id, parsed.steps);

    // Extract tools from the step content and all its children
    const allSteps = [step, ...childSteps];
    const tools = extractToolsFromSteps(allSteps, openapis);

    const agentStep: AgentStep = {
      id: step.id,
      parent_id: step.parent_id,
      level: step.level,
      content: step.content,
      tools,
    };

    agents.push(agentStep);
  }

  return {
    script_name: scriptName,
    definition: workflowContent,
    agents,
  };
}

function getAllChildSteps(
  parentId: number,
  allSteps: HMREFStep[],
): HMREFStep[] {
  const children: HMREFStep[] = [];
  const directChildren = allSteps.filter((step) => step.parent_id === parentId);

  for (const child of directChildren) {
    children.push(child);
    children.push(...getAllChildSteps(child.id, allSteps));
  }

  return children;
}

async function main() {
  try {
    console.log("Loading benchmark files...");
    const { workflows, openapis } = loadBenchmarkFiles();

    console.log(
      `Loaded ${workflows.size} workflows and ${openapis.size} OpenAPI specs`,
    );

    const agents: Agent[] = [];

    for (const [scriptName, workflowContent] of workflows) {
      console.log(`Processing workflow: ${scriptName}`);
      const agent = processWorkflow(scriptName, workflowContent, openapis);
      agents.push(agent);
    }

    // Save to agents.json
    const outputPath = path.join(process.cwd(), "agents.json");
    fs.writeFileSync(outputPath, JSON.stringify(agents, null, 2));

    console.log(`Successfully processed ${agents.length} agents`);
    console.log(`Results saved to: ${outputPath}`);

    // Print summary
    agents.forEach((agent) => {
      console.log(`\n${agent.script_name}:`);
      console.log(`  - ${agent.agents.length} steps`);
      const totalTools = agent.agents.reduce(
        (sum, step) => sum + step.tools.length,
        0,
      );
      console.log(`  - ${totalTools} tools total`);
    });
  } catch (error) {
    console.error("Error processing benchmark files:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
