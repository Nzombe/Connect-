import React, { useState } from 'react';
import { 
  GitBranch, 
  Play, 
  Plus, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Database, 
  MessageSquare, 
  Mail, 
  FileText, 
  Bell, 
  Settings, 
  RefreshCw 
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'TRIGGER' | 'ACTION' | 'CONDITION';
  moduleName: string;
  label: string;
  configSummary: string;
}

export const NodeWorkflowBuilderModule: React.FC = () => {
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([
    { id: 'NODE-1', type: 'TRIGGER', moduleName: 'ERP Invoicing', label: 'Trigger: New Invoice Created', configSummary: 'Fires when ERP Invoice status changes to SENT' },
    { id: 'NODE-2', type: 'CONDITION', moduleName: 'Rule Evaluator', label: 'Condition: Invoice Value > $1,000 USD', configSummary: 'Check if total_amount >= 1000' },
    { id: 'NODE-3', type: 'ACTION', moduleName: 'WhatsApp Business API', label: 'Action: Send Customer WhatsApp Receipt', configSummary: 'Post receipt template via Meta Cloud API' },
    { id: 'NODE-4', type: 'ACTION', moduleName: 'Slack Workspace', label: 'Action: Notify #finance-deals Slack Channel', configSummary: 'Post webhook payload to Slack' },
  ]);

  const [workflowName, setWorkflowName] = useState('High-Value Invoice Automation Pipeline');
  const [selectedModule, setSelectedModule] = useState('WhatsApp Business API');
  const [nodeType, setNodeType] = useState<'ACTION' | 'CONDITION'>('ACTION');
  const [customLabel, setCustomLabel] = useState('Action: Dispatch SMS Alert via Twilio');
  const [customConfig, setCustomConfig] = useState('Send SMS to owner +263772578565');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState<string | null>(null);

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    const newNode: WorkflowNode = {
      id: `NODE-${workflowNodes.length + 1}`,
      type: nodeType,
      moduleName: selectedModule,
      label: customLabel,
      configSummary: customConfig,
    };
    setWorkflowNodes([...workflowNodes, newNode]);
    setCustomLabel('');
    setCustomConfig('');
  };

  const handleRemoveNode = (id: string) => {
    setWorkflowNodes(workflowNodes.filter((n) => n.id !== id));
  };

  const handleExecuteWorkflow = async () => {
    setIsExecuting(true);
    setExecutionLog(null);

    try {
      const res = await fetch('/api/workflows/nodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: workflowName,
          trigger: workflowNodes[0],
          actions: workflowNodes.slice(1),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setExecutionLog(`Workflow ${data.workflowId} executed successfully across ${data.actionsCount} node actions.`);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Visual Node-Based Business Process & Cross-Module Workflow Builder
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 font-mono">
            REAL-TIME EVENT ORCHESTRATION ENGINE
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Construct visual node pipelines connecting triggers, conditional logic gates, and cross-module actions (ERP Invoices, WhatsApp Cloud, Slack Webhooks, Google Workspace, Twilio SMS).
        </p>
      </div>

      {/* Visual Canvas Node Flow Pipeline - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-200 uppercase font-mono">Workflow Name:</span>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="bg-slate-950 border border-slate-800 p-1.5 text-xs text-slate-100 font-bold focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleExecuteWorkflow}
            disabled={isExecuting}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-2"
          >
            {isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Execute Node Pipeline Now
          </button>
        </div>

        {/* Visual Horizontal Node Flow Pipeline */}
        <div className="w-full min-w-full overflow-x-auto p-4 bg-slate-950 border border-slate-800 flex items-center gap-4 min-h-[160px]">
          {workflowNodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <div className={`shrink-0 w-72 p-3 border rounded-none space-y-2 font-mono text-xs ${
                node.type === 'TRIGGER'
                  ? 'bg-amber-950/40 border-amber-800 text-amber-200'
                  : node.type === 'CONDITION'
                  ? 'bg-blue-950/40 border-blue-800 text-blue-200'
                  : 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-1">
                  <span className="font-bold uppercase text-[10px] tracking-wider">{node.type}: {node.moduleName}</span>
                  <button
                    onClick={() => handleRemoveNode(node.id)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="font-bold text-slate-100 text-xs">{node.label}</p>
                <p className="text-[11px] text-slate-400 leading-tight">{node.configSummary}</p>
              </div>

              {index < workflowNodes.length - 1 && (
                <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {executionLog && (
          <div className="p-3 bg-slate-950 border border-emerald-900 text-emerald-300 font-mono text-xs">
            {executionLog}
          </div>
        )}
      </div>

      {/* Node Builder Form */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="border-b border-slate-800 pb-2">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" /> Append New Step Node to Pipeline
          </h2>
        </div>

        <form onSubmit={handleAddNode} className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Node Type</label>
            <select
              value={nodeType}
              onChange={(e) => setNodeType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
            >
              <option value="ACTION">Action Node</option>
              <option value="CONDITION">Condition Gate</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Target Module</label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
            >
              <option value="WhatsApp Business API">WhatsApp Business API</option>
              <option value="Slack Workspace">Slack Workspace</option>
              <option value="Google Workspace">Google Workspace</option>
              <option value="Twilio Virtual Numbers">Twilio Virtual Numbers</option>
              <option value="ERP Invoicing">ERP Invoicing</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Node Title / Action Label</label>
            <input
              type="text"
              placeholder="e.g. Send SMS Notification to Owner"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-none transition-colors"
            >
              Append Node
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
