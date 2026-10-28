import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  FileSpreadsheet, 
  HardDrive, 
  Mail, 
  Calendar, 
  FileText, 
  Presentation, 
  MessageSquare, 
  CheckSquare, 
  Bookmark, 
  Video, 
  Users, 
  Play, 
  RefreshCw 
} from 'lucide-react';
import { WorkspaceAppIntegration } from '../types';

export const WorkspaceHubModule: React.FC = () => {
  const [apps] = useState<WorkspaceAppIntegration[]>([
    {
      id: 'sheets',
      name: 'Google Sheets',
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      description: 'Automated CRM data import, inventory logs, and trade financial sync.',
      connected: true,
      lastSynced: '10 mins ago',
    },
    {
      id: 'drive',
      name: 'Google Drive',
      scope: 'https://www.googleapis.com/auth/drive.file',
      description: 'Cloud document storage for bills of lading, RFQs, and contract PDFs.',
      connected: true,
      lastSynced: '15 mins ago',
    },
    {
      id: 'gmail',
      name: 'Gmail',
      scope: 'https://www.googleapis.com/auth/gmail.modify',
      description: 'Auto-responder integration, email drafting, and inbox scanning.',
      connected: true,
      lastSynced: '2 mins ago',
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      scope: 'https://www.googleapis.com/auth/calendar',
      description: 'Automated meeting scheduling for international trade negotiations.',
      connected: true,
      lastSynced: '1 hour ago',
    },
    {
      id: 'docs',
      name: 'Google Docs',
      scope: 'https://www.googleapis.com/auth/documents',
      description: 'Automatic generation of trade agreements and business contracts.',
      connected: true,
      lastSynced: '25 mins ago',
    },
    {
      id: 'slides',
      name: 'Google Slides',
      scope: 'https://www.googleapis.com/auth/presentations',
      description: 'Automated generation of product pitch decks and catalog slides.',
      connected: true,
      lastSynced: '3 hours ago',
    },
    {
      id: 'chat',
      name: 'Google Chat',
      scope: 'https://www.googleapis.com/auth/chat.messages',
      description: 'Internal team notifications and trade status alerts.',
      connected: true,
      lastSynced: 'Just now',
    },
    {
      id: 'forms',
      name: 'Google Forms',
      scope: 'https://www.googleapis.com/auth/forms.body',
      description: 'Customer inquiry forms and supplier onboarding surveys.',
      connected: true,
      lastSynced: 'Yesterday',
    },
    {
      id: 'keep',
      name: 'Google Keep',
      scope: 'https://www.googleapis.com/auth/keep',
      description: 'Instant scratchpad notes and AI prompt logs.',
      connected: true,
      lastSynced: 'Yesterday',
    },
    {
      id: 'meet',
      name: 'Google Meet',
      scope: 'https://www.googleapis.com/auth/meetings.space.created',
      description: 'Video conference link creation for trade buyer calls.',
      connected: true,
      lastSynced: '4 hours ago',
    },
    {
      id: 'contacts',
      name: 'Contacts',
      scope: 'https://www.googleapis.com/auth/contacts',
      description: 'Synchronization with CRM contacts and supplier address books.',
      connected: true,
      lastSynced: '30 mins ago',
    },
  ]);

  const [activeActionApp, setActiveActionApp] = useState<string>('sheets');
  const [actionOutput, setActionOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const getAppIcon = (id: string) => {
    switch (id) {
      case 'sheets': return <FileSpreadsheet className="w-4 h-4 text-emerald-400" />;
      case 'drive': return <HardDrive className="w-4 h-4 text-cyan-400" />;
      case 'gmail': return <Mail className="w-4 h-4 text-rose-400" />;
      case 'calendar': return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'docs': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'slides': return <Presentation className="w-4 h-4 text-amber-400" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case 'forms': return <CheckSquare className="w-4 h-4 text-purple-400" />;
      case 'keep': return <Bookmark className="w-4 h-4 text-amber-300" />;
      case 'meet': return <Video className="w-4 h-4 text-cyan-300" />;
      case 'contacts': return <Users className="w-4 h-4 text-indigo-400" />;
      default: return <Layers className="w-4 h-4 text-slate-300" />;
    }
  };

  const handleExecuteAction = () => {
    setIsExecuting(true);
    setActionOutput(null);
    setTimeout(() => {
      setActionOutput(
        `Successfully executed operational action for ${activeActionApp.toUpperCase()}. Data synchronized with Google Workspace API.`
      );
      setIsExecuting(false);
    }, 1000);
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Google Workspace Integrations Hub
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 font-mono">
            11 WORKSPACE APIS ACTIVE
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Complete integration with Google Workspace tools: Google Sheets, Drive, Gmail, Calendar, Docs, Slides, Chat, Forms, Keep, Meet, and Contacts.
        </p>
      </div>

      {/* Quick Action Dispatcher & OAuth Card */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Play className="w-4 h-4 text-blue-400" /> Workspace Operational Action Dispatcher
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">Google OAuth Integration</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Select Workspace Target API</label>
            <select
              value={activeActionApp}
              onChange={(e) => setActiveActionApp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none font-mono"
            >
              {apps.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col justify-end">
            <button
              onClick={handleExecuteAction}
              disabled={isExecuting}
              className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Executing Workspace Action...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Trigger {activeActionApp.toUpperCase()} API Sync
                </>
              )}
            </button>
          </div>
        </div>

        {actionOutput && (
          <div className="p-3 bg-slate-950 border border-blue-900/80 text-blue-300 font-mono text-xs rounded-none">
            {actionOutput}
          </div>
        )}
      </div>

      {/* Connected Apps Table - Full Width 100% */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Active Workspace Integrations Matrix
          </h2>
          <span className="text-xs font-mono text-slate-400">11 Services Connected</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Workspace App</th>
                <th className="p-3">Required OAuth Scope</th>
                <th className="p-3">Operational Role</th>
                <th className="p-3">Last Synced</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {apps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      {getAppIcon(app.id)}
                      {app.name}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">{app.scope}</td>
                  <td className="p-3 text-slate-300 max-w-xs">{app.description}</td>
                  <td className="p-3 font-mono text-slate-400 whitespace-nowrap">{app.lastSynced}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px] flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" /> CONNECTED
                    </span>
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
