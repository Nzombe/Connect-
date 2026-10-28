import React, { useState } from 'react';
import { 
  Zap, 
  Play, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  Layers, 
  Sparkles, 
  Sliders, 
  ArrowRight, 
  Bot, 
  Settings, 
  Activity 
} from 'lucide-react';
import { AutoPilotWorkflowRule } from '../types';

export const AutoPilotAutomationModule: React.FC = () => {
  const [workflows, setWorkflows] = useState<AutoPilotWorkflowRule[]>([
    {
      id: 'ap-1',
      ruleName: 'Marketplace Lead to WhatsApp & DocuSign Auto-Pilot',
      triggerEvent: 'NEW_RFQ_RECEIVED_MARKETPLACE',
      actionPipeline: 'Send WhatsApp Template -> Create DocuSign Contract -> Post Slack Alert -> Schedule Zoom Call',
      status: 'ACTIVE',
      executionsToday: 42,
      lastExecuted: '6m ago',
    },
    {
      id: 'ap-2',
      ruleName: 'Canva Social Ad & Campaign Multi-Publish Dispatch',
      triggerEvent: 'CANVA_BANNER_EXPORTED',
      actionPipeline: 'Generate Ad Copy via Gemini -> Post TikTok / LinkedIn -> Log to Pastel Accounting',
      status: 'ACTIVE',
      executionsToday: 18,
      lastExecuted: '24m ago',
    },
    {
      id: 'ap-3',
      ruleName: 'Auto-Moderation Content Policy Guard',
      triggerEvent: 'INCOMING_CUSTOMER_MESSAGE',
      actionPipeline: 'Neural Security Scan -> Flag Immoral/Dirty Terms -> Auto Block & Notify Compliance',
      status: 'ACTIVE',
      executionsToday: 154,
      lastExecuted: '1m ago',
    },
  ]);

  // Workflow Creator Form State
  const [newRuleName, setNewRuleName] = useState('');
  const [newTrigger, setNewTrigger] = useState('NEW_RFQ_RECEIVED_MARKETPLACE');
  const [selectedActions, setSelectedActions] = useState<string[]>([
    'Send WhatsApp Business Template',
    'Post Slack Alert Channel',
  ]);

  const availableTriggers = [
    { value: 'NEW_RFQ_RECEIVED_MARKETPLACE', label: 'New RFQ Received on B2B Marketplace' },
    { value: 'CANVA_BANNER_EXPORTED', label: 'Canva Banner Asset Exported' },
    { value: 'INCOMING_CUSTOMER_MESSAGE', label: 'Incoming Customer Message Received' },
    { value: 'DOCUSIGN_CONTRACT_SIGNED', label: 'DocuSign Legal Agreement Signed' },
    { value: 'INDEED_RESUME_PARSED', label: 'Candidate Resume Parsed via Indeed' },
  ];

  const actionOptions = [
    'Send WhatsApp Business Template',
    'Generate DocuSign Envelope',
    'Schedule Zoom Video Conference',
    'Post Alert to Slack Channel',
    'Log Transaction in Pastel Accounting',
    'Sync PDF with WPS Office & NotebookLM',
    'Trigger Gemini AI Auto-Reply',
  ];

  const [testExecutionResult, setTestExecutionResult] = useState<any>(null);
  const [isExecutingTest, setIsExecutingTest] = useState(false);

  const toggleAction = (act: string) => {
    if (selectedActions.includes(act)) {
      setSelectedActions(selectedActions.filter((a) => a !== act));
    } else {
      setSelectedActions([...selectedActions, act]);
    }
  };

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName || selectedActions.length === 0) return;
    const wf: AutoPilotWorkflowRule = {
      id: `ap-${Date.now()}`,
      ruleName: newRuleName,
      triggerEvent: newTrigger,
      actionPipeline: selectedActions.join(' -> '),
      status: 'ACTIVE',
      executionsToday: 0,
      lastExecuted: 'Just created',
    };
    setWorkflows([...workflows, wf]);
    setNewRuleName('');
  };

  const handleTestAutoPilotRun = async (wf: AutoPilotWorkflowRule) => {
    setIsExecutingTest(true);
    setTestExecutionResult(null);

    try {
      const res = await fetch('/api/autopilot/execute-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ruleName: wf.ruleName,
          triggerEvent: wf.triggerEvent,
        }),
      });
      const data = await res.json();
      setTestExecutionResult({
        ruleName: wf.ruleName,
        summary: data.summary,
        status: 'SUCCESS',
        executedAt: new Date().toLocaleTimeString(),
      });

      setWorkflows((prev) =>
        prev.map((item) =>
          item.id === wf.id
            ? { ...item, executionsToday: item.executionsToday + 1, lastExecuted: 'Just now' }
            : item
        )
      );
    } catch (err: any) {
      setTestExecutionResult({
        ruleName: wf.ruleName,
        summary: `Execution error: ${err.message}`,
        status: 'FAILED',
      });
    } finally {
      setIsExecutingTest(false);
    }
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Connect AI Auto-Pilot & Autonomous Workflow Engine
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 font-mono">
            AUTONOMOUS BOT DISPATCHER ACTIVE
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Build multi-app autonomous pipeline triggers. Connect marketplace leads, WhatsApp messaging, Zoom scheduling, DocuSign contracts, Slack alerts, and accounting ledgers into hands-free automated workflows.
        </p>
      </div>

      {/* AutoPilot Creator Studio */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Build New Autonomous Auto-Pilot Rule
          </h2>
          <span className="text-[11px] font-mono text-amber-400">Zero-Code Workflow Creator</span>
        </div>

        <form onSubmit={handleCreateWorkflow} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Auto-Pilot Workflow Name</label>
              <input
                type="text"
                placeholder="e.g. Instant RFQ Quote & Contract Dispatch"
                value={newRuleName}
                onChange={(e) => setNewRuleName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Trigger Event Signal</label>
              <select
                value={newTrigger}
                onChange={(e) => setNewTrigger(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
              >
                {availableTriggers.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-2 font-medium">
              Action Pipeline Steps (Select Actions to Chain)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {actionOptions.map((act) => {
                const isSelected = selectedActions.includes(act);
                return (
                  <div
                    key={act}
                    onClick={() => toggleAction(act)}
                    className={`p-2.5 border cursor-pointer font-mono text-[11px] transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-950/80 border-amber-600 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{act}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Save & Activate Auto-Pilot Automation
          </button>
        </form>
      </div>

      {/* Execution Test Result Window */}
      {testExecutionResult && (
        <div className="w-full bg-slate-900 border border-amber-800 p-4 rounded-none space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-2">
            <span>AUTOPILOT EXECUTION TRACE - {testExecutionResult.ruleName}</span>
            <span>{testExecutionResult.executedAt}</span>
          </div>
          <p className="text-slate-200">{testExecutionResult.summary}</p>
        </div>
      )}

      {/* Active Workflows Matrix Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" /> Active Auto-Pilot Automation Pipelines
          </h2>
          <span className="text-xs font-mono text-slate-400">{workflows.length} Rules Active</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Workflow Name</th>
                <th className="p-3">Trigger Signal</th>
                <th className="p-3">Chained Action Pipeline</th>
                <th className="p-3">Executions Today</th>
                <th className="p-3">Last Active</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {workflows.map((wf) => (
                <tr key={wf.id} className="hover:bg-slate-850">
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">{wf.ruleName}</td>
                  <td className="p-3 font-mono text-amber-400 text-[11px] whitespace-nowrap">{wf.triggerEvent}</td>
                  <td className="p-3 font-mono text-slate-300 text-[11px] max-w-xs">{wf.actionPipeline}</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold whitespace-nowrap">{wf.executionsToday} runs</td>
                  <td className="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">{wf.lastExecuted || 'Never'}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                      {wf.status}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => handleTestAutoPilotRun(wf)}
                      disabled={isExecutingTest}
                      className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white font-mono text-[10px] flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      {isExecutingTest ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                      Test Run
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
