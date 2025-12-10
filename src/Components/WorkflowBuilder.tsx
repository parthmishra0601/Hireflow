"use client";

import React, { useCallback, useMemo, useState } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  OnConnect,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import NodeSidebar from "./NodeSidebar";
import NodeFormPanel from "./NodeFormPanel";
import { nodeTypes } from "./nodes";
import { simulateWorkflow } from "@/Lib/mockApi";

export type WorkflowNodeType =
  | "start"
  | "task"
  | "approval"
  | "automated"
  | "end";

export interface WorkflowNodeData {
  type: WorkflowNodeType;
  label: string;
  config: any;
}

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

function WorkflowBuilderInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<WorkflowEdge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: WorkflowNode) => {
      setSelectedNodeId(node.id);
    },
    []
  );

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId]
  );

  const handleAddNode = (type: WorkflowNodeType) => {
    const id = `${type}-${Date.now()}`;
    const position = {
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 50,
    };

    const defaultConfigs: Record<WorkflowNodeType, any> = {
      start: { title: "Start", metadata: [] },
      task: {
        title: "Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: [],
      },
      approval: {
        title: "Approval",
        approverRole: "Manager",
        autoApproveThreshold: 0,
      },
      automated: {
        title: "Automated Step",
        actionId: "",
        params: {},
      },
      end: { message: "Completed", summary: true },
    };

    const newNode: WorkflowNode = {
      id,
      type,
      position,
      data: {
        type,
        label: `${type.toUpperCase()} node`,
        config: defaultConfigs[type],
      },
    };

    setNodes((nds) => nds.concat(newNode));
    setSelectedNodeId(id);
  };

  const handleDeleteSelected = () => {
    if (!selectedNodeId) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
      )
    );
    setSelectedNodeId(null);
  };

  const handleUpdateNodeConfig = (nodeId: string, newConfig: any) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, config: newConfig } } : n
      )
    );
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    setLog(["Starting simulation..."]);

    try {
      const result = await simulateWorkflow({
        nodes,
        edges,
      });

      setLog(result.log);
    } catch (err: any) {
      // ✅ fix operator precedence
      const message = "Simulation failed: " + (err?.message ?? "Unknown error");
      setLog((prev) => [...prev, message]);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <NodeSidebar onAddNode={handleAddNode} />

      <div className="flex-1 flex flex-col border-x border-slate-800">
        <header className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/70">
          <div>
            <h1 className="text-sm font-semibold">Hireflow</h1>
            <p className="text-xs text-slate-400">
              Drag nodes, connect them, then configure each step.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDeleteSelected}
              disabled={!selectedNode}
              className="text-xs rounded-md border border-slate-700 px-3 py-1.5 disabled:opacity-40 hover:bg-slate-800"
            >
              Delete selected
            </button>
            <button
              onClick={handleSimulate}
              disabled={isSimulating || nodes.length === 0}
              className="text-xs rounded-md bg-blue-500 px-3 py-1.5 font-medium hover:bg-blue-600 disabled:opacity-40"
            >
              {isSimulating ? "Running..." : "Run Simulation"}
            </button>
          </div>
        </header>

        <div className="flex flex-1">
          <div className="flex-1 h-[calc(100vh-56px)]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background gap={16} />
              <Controls />
            </ReactFlow>
          </div>

          <NodeFormPanel
            node={selectedNode}
            onChangeConfig={handleUpdateNodeConfig}
          />
        </div>

        <section className="border-t border-slate-800 bg-slate-900/80 px-4 py-2 text-xs h-32 overflow-auto">
          <p className="font-semibold mb-1 text-slate-300">
            Workflow Execution Log
          </p>
          {log.length === 0 ? (
            <p className="text-slate-500">No simulation run yet.</p>
          ) : (
            <ul className="space-y-1">
              {log.map((line, idx) => (
                <li key={idx} className="text-slate-300">
                  {line}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default function WorkflowBuilder() {
  return (
    <ReactFlowProvider>
      <WorkflowBuilderInner />
    </ReactFlowProvider>
  );
}
