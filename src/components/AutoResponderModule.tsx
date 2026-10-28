import React, { useState } from 'react';
import { Bot, Plus, Play, RefreshCw, CheckCircle2, Shield, Mail, Phone, Zap } from 'lucide-react';
import { AutoResponderRule } from '../types';

export const AutoResponderModule: React.FC = () => {
  const [rules, setRules] = useState<AutoResponderRule[]>([
    {
      id: 'rule-1',
      channel: 'gmail',
      triggerKeyword: 'RFQ / Pricing Inquiry',
      responseTemplate: 'Thank you for your pricing inquiry. Our automated quote system is calculating wholesale freight rates.',
      aiEnhance: true,
      model: 'gemini-3.5-flash',
      isActive: true,
      matchedCount: 142,
      lastTriggered: '2 mins ago',
    },
    {
      id: 'rule-2',
      channel: 'whatsapp',
      triggerKeyword: 'Order Status Update',
      responseTemplate: 'Hello. Your shipment tracking code and bill of lading are verified in our trade portal.',
      aiEnhance: true,
      model: 'gemini-3.1-flash-lite',
      isActive: true,
      matchedCount: 389,
      lastTriggered: '5 mins ago',
    },
    {
      id: 'rule-3',
      channel: 'gmail',
      triggerKeyword: 'Technical Support',
      responseTemplate: 'Our technical team has cataloged your incident ticket. Expect detailed diagnostic feedback.',
      aiEnhance: true,
      model: 'gemini-3.1-pro-preview',
      isActive: true,
      matchedCount: 67,
      lastTriggered: '1 hour ago',
    },
  ]);

  const [testChannel, setTestChannel] = useState<'gmail' | 'whatsapp'>('gmail');
  const [testInput, setTestInput] = useState('Hello, what is the wholesale cost and shipping time for 500 units to Frankfurt?');
  const [testTemplate, setTestTemplate] = useState('Provide polite wholesale lead time and quote steps.');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // New rule form state
  const [newKeyword, setNewKeyword] = useState('');
  const [newTemplate, setNewTemplate] = useState('');
  const [newChannel, setNewChannel] = useState<'gmail' | 'whatsapp'>('gmail');
  const [newModel, setNewModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword || !newTemplate) return;
    const rule: AutoResponderRule = {
      id: `rule-${Date.now()}`,
      channel: newChannel,
      triggerKeyword: newKeyword,
      responseTemplate: newTemplate,
      aiEnhance: true,
      model: newModel,
      isActive: true,
      matchedCount: 0,
      lastTriggered: 'Just created',
    };
    setRules([rule, ...rules]);
    setNewKeyword('');
    setNewTemplate('');
  };

  const handleRunTest = async () => {
    setIsProcessing(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/auto-responder/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incomingMessage: testInput,
          channel: testChannel,
          sender: 'client@globaltrade.com',
          template: testTemplate,
        }),
      });
      const data = await res.json();
      setTestResult(data.generatedResponse || 'Response generated successfully.');
    } catch (err: any) {
      setTestResult(`Processing error: ${err.message || 'Server error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleRule = (id: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title & Overview Banner */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Automated Gmail Inbox & WhatsApp Auto-Responder
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
            ENGINE RUNNING
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Automates replies for incoming business emails and WhatsApp messages using server-side Gemini intelligence models.
        </p>
      </div>

      {/* Main Grid: Rule Generator & Live Test Runner */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Rule Panel */}
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" /> Create Auto-Response Rule
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Channel Automation</span>
          </div>

          <form onSubmit={handleAddRule} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Channel</label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
                >
                  <option value="gmail">Gmail Inbox</option>
                  <option value="whatsapp">WhatsApp Business</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">AI Intelligence Model</label>
                <select
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
                >
                  <option value="gemini-3.5-flash">Gemini 3.5 Flash (General)</option>
                  <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Complex Reasoning)</option>
                  <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite (Low Latency)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Trigger Keyword / Condition</label>
              <input
                type="text"
                placeholder="e.g. Wholesale Inquiry, Shipping Status, Support"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Response Policy & Guidance Template</label>
              <textarea
                rows={3}
                placeholder="State policy guidelines for the AI auto reply..."
                value={newTemplate}
                onChange={(e) => setNewTemplate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Save Automation Rule
            </button>
          </form>
        </div>

        {/* Live Test Simulator */}
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-400" /> Live Response Simulator
            </h2>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <Zap className="w-3 h-3" /> Live Backend API
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Test Channel</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTestChannel('gmail')}
                  className={`flex-1 p-2 border font-medium flex items-center justify-center gap-2 rounded-none ${
                    testChannel === 'gmail' ? 'bg-slate-800 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Gmail Test
                </button>
                <button
                  type="button"
                  onClick={() => setTestChannel('whatsapp')}
                  className={`flex-1 p-2 border font-medium flex items-center justify-center gap-2 rounded-none ${
                    testChannel === 'whatsapp' ? 'bg-slate-800 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> WhatsApp Test
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Simulated Incoming Message</label>
              <textarea
                rows={2}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Template Guidance</label>
              <input
                type="text"
                value={testTemplate}
                onChange={(e) => setTestTemplate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleRunTest}
              disabled={isProcessing}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Processing AI Auto-Response...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Trigger Auto-Response Execution
                </>
              )}
            </button>

            {testResult && (
              <div className="p-3 bg-slate-950 border border-emerald-900/60 rounded-none space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 block font-semibold">
                  GENERATED AI REPLY ({testChannel.toUpperCase()})
                </span>
                <p className="text-slate-200 font-sans leading-relaxed text-xs">{testResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rules Table - Full Width 100%, Horizontally & Vertically Scrollable */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Active Auto-Response Rules Database
          </h2>
          <span className="text-xs font-mono text-slate-400">{rules.length} Active Rules</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[800px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Status</th>
                <th className="p-3">Channel</th>
                <th className="p-3">Trigger Condition</th>
                <th className="p-3">Response Guidance Template</th>
                <th className="p-3">AI Engine</th>
                <th className="p-3">Matches</th>
                <th className="p-3">Last Triggered</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 font-mono text-[10px] rounded-none ${
                        rule.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rule.isActive ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-200 uppercase whitespace-nowrap">
                    {rule.channel === 'gmail' ? (
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <Mail className="w-3.5 h-3.5" /> Gmail
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Phone className="w-3.5 h-3.5" /> WhatsApp
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-medium text-slate-100 whitespace-nowrap">{rule.triggerKeyword}</td>
                  <td className="p-3 text-slate-300 max-w-xs truncate">{rule.responseTemplate}</td>
                  <td className="p-3 font-mono text-[11px] text-cyan-300 whitespace-nowrap">{rule.model}</td>
                  <td className="p-3 font-mono text-slate-200 whitespace-nowrap">{rule.matchedCount}</td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{rule.lastTriggered || 'N/A'}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium rounded-none text-[11px]"
                    >
                      {rule.isActive ? 'Pause' : 'Activate'}
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
