import { WorkflowNodeType } from "./WorkflowBuilder";

interface Props {
  onAddNode: (type: WorkflowNodeType) => void;
}

const nodeLabels: { type: WorkflowNodeType; label: string; desc: string }[] = [
  { type: "start", label: "Start", desc: "Workflow entry" },
  { type: "task", label: "Task", desc: "Human task" },
  { type: "approval", label: "Approval", desc: "Manager review" },
  { type: "automated", label: "Automated", desc: "System action" },
  { type: "end", label: "End", desc: "Workflow completion" },
];

export default function NodeSidebar({ onAddNode }: Props) {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/80 p-4 space-y-3">
      <div>
        <h2 className="text-sm font-semibold text-slate-100">Node types</h2>
        <p className="text-xs text-slate-400">
          Click to add nodes into the canvas.
        </p>
      </div>

      <div className="space-y-2">
        {nodeLabels.map((n) => (
          <button
            key={n.type}
            onClick={() => onAddNode(n.type)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-left text-xs hover:bg-slate-800 transition"
          >
            <div className="font-medium text-slate-50">{n.label} node</div>
            <div className="text-[11px] text-slate-400">{n.desc}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}
