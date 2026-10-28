import React from 'react';
import { 
  Bot, 
  MessageSquare, 
  Share2, 
  ShoppingBag, 
  Layers, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Wifi,
  Briefcase,
  Key,
  ShieldCheck,
  Video,
  FileCheck,
  Zap,
  PhoneCall,
  Radio,
  Smartphone,
  QrCode,
  Globe,
  Cpu,
  Scale,
  CloudRain,
  PiggyBank,
  Activity,
  Archive,
  GitBranch,
  Kanban,
  Building2
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  canInstallPwa: boolean;
  onInstallPwa: () => void;
  isPwaInstalled: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  canInstallPwa,
  onInstallPwa,
  isPwaInstalled
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'auto_responder', label: 'Gmail & WA Auto-Responder', icon: <Bot className="w-4 h-4" /> },
    { id: 'whatsapp_platform', label: 'WhatsApp Business Suite', icon: <MessageSquare className="w-4 h-4 text-emerald-400" /> },
    { id: 'social_connectors', label: 'Social CPM / CRM / CMP', icon: <Share2 className="w-4 h-4" /> },
    { id: 'b2b_marketplace', label: 'Global B2B Marketplace', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'productivity_connectors', label: 'App Connectors (Canva, Slack, MS Word)', icon: <Briefcase className="w-4 h-4 text-indigo-400" /> },
    { id: 'zoom_docusign_suite', label: 'Zoom & DocuSign E-Sign', icon: <Video className="w-4 h-4 text-blue-400" /> },
    { id: 'autopilot_automation', label: 'Auto-Pilot Automation Engine', icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { id: 'ai_voice_chatbots', label: 'Voice Calls & AI Chatbots', icon: <PhoneCall className="w-4 h-4 text-emerald-400" /> },
    { id: 'twilio_virtual_numbers', label: 'Twilio Virtual Numbers Suite', icon: <Smartphone className="w-4 h-4 text-red-500" /> },
    { id: 'universal_qr_studio', label: 'Universal QR Code Studio', icon: <QrCode className="w-4 h-4 text-indigo-400" /> },
    { id: 'hyper_trade_alibaba', label: 'Alibaba-Surpassing Trade Hub', icon: <Globe className="w-4 h-4 text-amber-400" /> },
    { id: 'smart_appliances_iot', label: 'Smart House & Office Appliances IoT', icon: <Cpu className="w-4 h-4 text-teal-400" /> },
    { id: 'immutable_deal_log', label: 'Immutable Evidentiary Deal Log', icon: <Scale className="w-4 h-4 text-amber-400" /> },
    { id: 'parametric_weather_insurance', label: 'Parametric Weather Insurance', icon: <CloudRain className="w-4 h-4 text-amber-400" /> },
    { id: 'obd2_engine_diagnostics', label: 'OBD2 Engine & Fleet Telemetry', icon: <Cpu className="w-4 h-4 text-teal-400" /> },
    { id: 'cooperative_savings_pool', label: 'Cooperative Savings Group (Stokvel)', icon: <PiggyBank className="w-4 h-4 text-indigo-400" /> },
    { id: 'digital_twin_scenario', label: 'Digital Twin Scenario Simulator', icon: <Activity className="w-4 h-4 text-blue-400" /> },
    { id: 'bulk_document_exporter', label: 'Bulk Document Exporter & Archival', icon: <Archive className="w-4 h-4 text-indigo-400" /> },
    { id: 'node_workflow_builder', label: 'Visual Node Workflow Builder', icon: <GitBranch className="w-4 h-4 text-amber-400" /> },
    { id: 'network_diagnostics', label: 'API Network Diagnostics', icon: <Activity className="w-4 h-4 text-teal-400" /> },
    { id: 'global_task_kanban', label: 'Global Task Manager (Kanban)', icon: <Kanban className="w-4 h-4 text-indigo-400" /> },
    { id: 'business_erp_suite', label: 'Business ERP & Payslip Suite', icon: <Building2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'workspace_hub', label: 'Google Workspace Hub', icon: <Layers className="w-4 h-4" /> },
    { id: 'ai_keys_connectors', label: 'Custom AI Keys', icon: <Key className="w-4 h-4 text-amber-400" /> },
    { id: 'security_moderation', label: 'Security & Moderation Guard', icon: <ShieldCheck className="w-4 h-4 text-red-400" /> },
    { id: 'gemini_studio', label: 'Gemini AI Multimodal Studio', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <header className="w-full min-w-full bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50">
      {/* Top status bar */}
      <div className="w-full min-w-full px-4 py-2 border-b border-slate-800/80 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-wider text-cyan-400 text-sm flex items-center gap-1.5">
            CONNECT AI
          </span>
          <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-none font-mono text-[11px]">
            SYSTEM ONLINE
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
            <Wifi className="w-3 h-3" /> REST & Webhooks Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isPwaInstalled ? (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> PWA Installed
            </span>
          ) : canInstallPwa ? (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-none transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Install App (PWA)
            </button>
          ) : (
            <span className="text-slate-400 font-mono text-[11px]">
              PWA Ready
            </span>
          )}
        </div>
      </div>

      {/* Navigation Tabs - Horizontal Scrollable */}
      <div className="w-full min-w-full overflow-x-auto bg-slate-900">
        <nav className="flex items-center gap-1 p-2 min-w-[900px] border-t border-slate-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-300 border-transparent hover:bg-slate-850 hover:text-slate-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
