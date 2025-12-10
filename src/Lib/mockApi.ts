import { WorkflowEdge,WorkflowNode } from "@/Components/WorkflowBuilder";

export interface AutomationDef {
  id: string;
  label: string;
  params: string[];
}

const AUTOMATIONS: AutomationDef[] = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
];

export async function fetchAutomations(): Promise<AutomationDef[]> {
  await new Promise((r) => setTimeout(r, 200)); // simulate latency
  return AUTOMATIONS;
}

export async function simulateWorkflow(input: {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}): Promise<{ log: string[] }> {
  await new Promise((r) => setTimeout(r, 400));

  const log: string[] = [];

  if (input.nodes.length === 0) {
    log.push("No nodes found in workflow.");
    return { log };
  }

  log.push(`Workflow has ${input.nodes.length} nodes and ${input.edges.length} connections.`);
  log.push("This is a mock simulation – replace with real logic if needed.");

  input.nodes.forEach((n, idx) => {
    log.push(
      `${idx + 1}. Step [${n.data.type.toUpperCase()}] - ${
        n.data.config?.title ?? n.data.label
      }`
    );
  });

  log.push("Simulation completed successfully ✅");

  return { log };
}
