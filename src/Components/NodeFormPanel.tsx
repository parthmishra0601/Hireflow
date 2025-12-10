import { WorkflowNode } from "./WorkflowBuilder";
import { useEffect, useState } from "react";
import { useAutomations } from "@/Lib/useAutomations";

interface Props {
  node: WorkflowNode | null;
  onChangeConfig: (nodeId: string, newConfig: any) => void;
}

export default function NodeFormPanel({ node, onChangeConfig }: Props) {
  const [localConfig, setLocalConfig] = useState<any | null>(null);
  const { automations } = useAutomations();

  useEffect(() => {
    setLocalConfig(node?.data.config ?? null);
  }, [node]);

  if (!node || !localConfig) {
    return (
      <aside className="w-80 border-l border-slate-800 bg-slate-900/80 p-4 text-xs text-slate-400">
        <p>Select a node on the canvas to edit its configuration.</p>
      </aside>
    );
  }

  const handleChange = (field: string, value: any) => {
    const updated = { ...localConfig, [field]: value };
    setLocalConfig(updated);
    onChangeConfig(node.id, updated);
  };

  const renderForm = () => {
    switch (node.data.type) {
      case "start":
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] mb-1">Start title</label>
              <input
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
          </div>
        );
      case "task":
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] mb-1">Title *</label>
              <input
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] mb-1">Description</label>
              <textarea
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                rows={2}
                value={localConfig.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] mb-1">Assignee</label>
              <input
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.assignee}
                onChange={(e) => handleChange("assignee", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] mb-1">Due date</label>
              <input
                type="date"
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </div>
          </div>
        );
      case "approval":
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] mb-1">Title</label>
              <input
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] mb-1">Approver role</label>
              <input
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.approverRole}
                onChange={(e) => handleChange("approverRole", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] mb-1">Auto-approve threshold</label>
              <input
                type="number"
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.autoApproveThreshold}
                onChange={(e) => handleChange("autoApproveThreshold", Number(e.target.value))}
              />
            </div>
          </div>
        );
      case "automated":
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] mb-1">Title</label>
              <input
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[11px] mb-1">Action</label>
              <select
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.actionId}
                onChange={(e) => handleChange("actionId", e.target.value)}
              >
                <option value="">Select action</option>
                {automations.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      case "end":
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] mb-1">End message</label>
              <input
                className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                value={localConfig.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>
            <label className="inline-flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={localConfig.summary}
                onChange={(e) => handleChange("summary", e.target.checked)}
              />
              <span>Include workflow summary</span>
            </label>
          </div>
        );
      default:
        return <p>No form defined for this node type.</p>;
    }
  };

  return (
    <aside className="w-80 border-l border-slate-800 bg-slate-900/80 p-4 text-xs">
      <p className="font-semibold text-slate-100 mb-3">
        Configure “{node.data.type}” node
      </p>
      {renderForm()}
    </aside>
  );
}
