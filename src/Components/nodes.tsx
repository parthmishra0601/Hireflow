import { Handle, NodeProps, Position } from "reactflow";
import { WorkflowNodeData } from "./WorkflowBuilder";

function BaseNode({ data }: NodeProps<WorkflowNodeData>) {
  return (
    <div className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-xs text-slate-100 shadow">
      <div className="text-[10px] uppercase tracking-wide text-slate-400">
        {data.type.toUpperCase()}
      </div>
      <div className="font-semibold truncate">{data.config?.title ?? data.label}</div>
    </div>
  );
}

export function StartNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-emerald-400" />
      <BaseNode {...props} />
    </div>
  );
}

export function TaskNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-slate-400" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-slate-400" />
      <BaseNode {...props} />
    </div>
  );
}

export function ApprovalNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-amber-400" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-amber-400" />
      <BaseNode {...props} />
    </div>
  );
}

export function AutomatedNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-sky-400" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-sky-400" />
      <BaseNode {...props} />
    </div>
  );
}

export function EndNode(props: NodeProps<WorkflowNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-rose-400" />
      <BaseNode {...props} />
    </div>
  );
}

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};
