import React, { useState } from 'react';
import { Share2, RefreshCw, CheckCircle2, ShieldCheck, DollarSign, Users, Activity, Sliders, Zap } from 'lucide-react';
import { ConnectorChannel } from '../types';

export const SocialConnectorsModule: React.FC = () => {
  const [connectors, setConnectors] = useState<ConnectorChannel[]>([
    {
      id: 'conn-tiktok',
      platform: 'TikTok',
      accountName: '@ConnectAIGlobal',
      cpmRate: 4.80,
      impressions: 485000,
      crmContactsCount: 3200,
      cmpCompliant: true,
      status: 'Active',
      autoReplyEnabled: true,
    },
    {
      id: 'conn-twitter',
      platform: 'Twitter/X',
      accountName: '@ConnectAI_Trade',
      cpmRate: 6.20,
      impressions: 620000,
      crmContactsCount: 5100,
      cmpCompliant: true,
      status: 'Active',
      autoReplyEnabled: true,
    },
    {
      id: 'conn-linkedin',
      platform: 'LinkedIn',
      accountName: 'Connect AI Business Enterprise',
      cpmRate: 18.50,
      impressions: 190000,
      crmContactsCount: 8400,
      cmpCompliant: true,
      status: 'Active',
      autoReplyEnabled: true,
    },
    {
      id: 'conn-telegram',
      platform: 'Telegram',
      accountName: 't.me/ConnectAIOfficial',
      cpmRate: 3.50,
      impressions: 890000,
      crmContactsCount: 12400,
      cmpCompliant: true,
      status: 'Active',
      autoReplyEnabled: true,
    },
    {
      id: 'conn-instagram',
      platform: 'Instagram',
      accountName: '@connectai_official',
      cpmRate: 7.90,
      impressions: 740000,
      crmContactsCount: 6800,
      cmpCompliant: true,
      status: 'Active',
      autoReplyEnabled: true,
    },
  ]);

  // Campaign Calculator state
  const [calcImpressions, setCalcImpressions] = useState(500000);
  const [calcPlatform, setCalcPlatform] = useState<string>('LinkedIn');
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleAutoReply = (id: string) => {
    setConnectors(
      connectors.map((c) => (c.id === id ? { ...c, autoReplyEnabled: !c.autoReplyEnabled } : c))
    );
  };

  const handleSyncCrm = () => {
    setIsSyncing(true);
    setSyncStatus(null);
    setTimeout(() => {
      setSyncStatus('CRM Customer Contacts and CMP Consent Logs synchronized across all 5 active social channels.');
      setIsSyncing(false);
    }, 1000);
  };

  const selectedConn = connectors.find((c) => c.platform === calcPlatform) || connectors[0];
  const calculatedCostUsd = ((calcImpressions / 1000) * selectedConn.cpmRate).toFixed(2);

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Social Connectors (TikTok, Twitter/X, LinkedIn, Telegram, Instagram)
            </h1>
          </div>
          <button
            onClick={handleSyncCrm}
            disabled={isSyncing}
            className="text-xs px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-none flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync CRM & CMP Data
          </button>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Unified CPM cost tracking, CRM customer list connectors, CMP compliance auditing, and automated DM auto-responders across global social channels.
        </p>

        {syncStatus && (
          <div className="mt-2 p-2 bg-slate-950 border border-cyan-800 text-cyan-300 font-mono text-xs">
            {syncStatus}
          </div>
        )}
      </div>

      {/* Connectors Table - Full Width 100% Edge to Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Connected Social Media Connectors
          </h2>
          <span className="text-xs font-mono text-slate-400">5 Active Connectors</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[900px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Platform</th>
                <th className="p-3">Account Handle</th>
                <th className="p-3">CPM Rate (USD)</th>
                <th className="p-3">Total Impressions</th>
                <th className="p-3">CRM Contacts</th>
                <th className="p-3">CMP Compliance</th>
                <th className="p-3">DM Auto-Reply</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {connectors.map((c) => (
                <tr key={c.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-3 font-bold text-cyan-400 whitespace-nowrap">{c.platform}</td>
                  <td className="p-3 font-mono text-slate-200 whitespace-nowrap">{c.accountName}</td>
                  <td className="p-3 font-mono text-slate-100 whitespace-nowrap">${c.cpmRate.toFixed(2)} / 1k</td>
                  <td className="p-3 font-mono text-slate-200 whitespace-nowrap">{c.impressions.toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-400 whitespace-nowrap">{c.crmContactsCount.toLocaleString()}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px] flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED COMPLIANT
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => toggleAutoReply(c.id)}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-none border ${
                        c.autoReplyEnabled
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {c.autoReplyEnabled ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-[10px]">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CPM Ad Spend & Impression Estimator */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Multi-Channel CPM Budget & Impression Estimator
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">Real-Time CPM Rates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Select Social Channel</label>
            <select
              value={calcPlatform}
              onChange={(e) => setCalcPlatform(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none font-mono"
            >
              {connectors.map((c) => (
                <option key={c.id} value={c.platform}>
                  {c.platform} (${c.cpmRate.toFixed(2)} CPM)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Target Impressions</label>
            <input
              type="number"
              step="10000"
              value={calcImpressions}
              onChange={(e) => setCalcImpressions(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-none flex flex-col justify-center">
            <span className="text-slate-400 text-[11px] font-mono uppercase">ESTIMATED AD SPEND</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">${calculatedCostUsd} USD</span>
            <span className="text-[10px] text-slate-500 font-mono">
              Based on ${selectedConn.cpmRate.toFixed(2)} CPM rate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
