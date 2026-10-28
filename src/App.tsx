import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { AutoResponderModule } from './components/AutoResponderModule';
import { WhatsAppPlatformModule } from './components/WhatsAppPlatformModule';
import { SocialConnectorsModule } from './components/SocialConnectorsModule';
import { GlobalMarketplaceModule } from './components/GlobalMarketplaceModule';
import { ProductivityConnectorsModule } from './components/ProductivityConnectorsModule';
import { ZoomDocuSignModule } from './components/ZoomDocuSignModule';
import { AutoPilotAutomationModule } from './components/AutoPilotAutomationModule';
import { AiVoiceChatbotsModule } from './components/AiVoiceChatbotsModule';
import { TwilioVirtualNumbersModule } from './components/TwilioVirtualNumbersModule';
import { UniversalQrStudioModule } from './components/UniversalQrStudioModule';
import { HyperTradeAlibabaModule } from './components/HyperTradeAlibabaModule';
import { SmartAppliancesIotModule } from './components/SmartAppliancesIotModule';
import { ImmutableDealLogModule } from './components/ImmutableDealLogModule';
import { ParametricWeatherInsuranceModule } from './components/ParametricWeatherInsuranceModule';
import { Obd2EngineDiagnosticsModule } from './components/Obd2EngineDiagnosticsModule';
import { CooperativeSavingsPoolModule } from './components/CooperativeSavingsPoolModule';
import { DigitalTwinScenarioModule } from './components/DigitalTwinScenarioModule';
import { BulkDocumentExporterModule } from './components/BulkDocumentExporterModule';
import { NodeWorkflowBuilderModule } from './components/NodeWorkflowBuilderModule';
import { NetworkDiagnosticsModule } from './components/NetworkDiagnosticsModule';
import { GlobalTaskKanbanModule } from './components/GlobalTaskKanbanModule';
import { BusinessErpSuiteModule } from './components/BusinessErpSuiteModule';
import { WorkspaceHubModule } from './components/WorkspaceHubModule';
import { AiKeysConnectorsModule } from './components/AiKeysConnectorsModule';
import { SecurityModerationModule } from './components/SecurityModerationModule';
import { GeminiStudioModule } from './components/GeminiStudioModule';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('auto_responder');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsPwaInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPwaInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsPwaInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="w-full min-w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-auto overflow-y-auto">
      {/* PWA Banner */}
      <PWAInstallBanner />

      {/* Header & Main Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        canInstallPwa={Boolean(deferredPrompt)}
        onInstallPwa={handleInstallPwa}
        isPwaInstalled={isPwaInstalled}
      />

      {/* Main Active Tab Workspace Container - Spans 100% full width */}
      <main className="flex-1 w-full min-w-full bg-slate-950 overflow-x-auto overflow-y-auto">
        {activeTab === 'auto_responder' && <AutoResponderModule />}
        {activeTab === 'whatsapp_platform' && <WhatsAppPlatformModule />}
        {activeTab === 'social_connectors' && <SocialConnectorsModule />}
        {activeTab === 'b2b_marketplace' && <GlobalMarketplaceModule />}
        {activeTab === 'productivity_connectors' && <ProductivityConnectorsModule />}
        {activeTab === 'zoom_docusign_suite' && <ZoomDocuSignModule />}
        {activeTab === 'autopilot_automation' && <AutoPilotAutomationModule />}
        {activeTab === 'ai_voice_chatbots' && <AiVoiceChatbotsModule />}
        {activeTab === 'twilio_virtual_numbers' && <TwilioVirtualNumbersModule />}
        {activeTab === 'universal_qr_studio' && <UniversalQrStudioModule />}
        {activeTab === 'hyper_trade_alibaba' && <HyperTradeAlibabaModule />}
        {activeTab === 'smart_appliances_iot' && <SmartAppliancesIotModule />}
        {activeTab === 'immutable_deal_log' && <ImmutableDealLogModule />}
        {activeTab === 'parametric_weather_insurance' && <ParametricWeatherInsuranceModule />}
        {activeTab === 'obd2_engine_diagnostics' && <Obd2EngineDiagnosticsModule />}
        {activeTab === 'cooperative_savings_pool' && <CooperativeSavingsPoolModule />}
        {activeTab === 'digital_twin_scenario' && <DigitalTwinScenarioModule />}
        {activeTab === 'bulk_document_exporter' && <BulkDocumentExporterModule />}
        {activeTab === 'node_workflow_builder' && <NodeWorkflowBuilderModule />}
        {activeTab === 'network_diagnostics' && <NetworkDiagnosticsModule />}
        {activeTab === 'global_task_kanban' && <GlobalTaskKanbanModule />}
        {activeTab === 'business_erp_suite' && <BusinessErpSuiteModule />}
        {activeTab === 'workspace_hub' && <WorkspaceHubModule />}
        {activeTab === 'ai_keys_connectors' && <AiKeysConnectorsModule />}
        {activeTab === 'security_moderation' && <SecurityModerationModule />}
        {activeTab === 'gemini_studio' && <GeminiStudioModule />}
      </main>

      {/* Footer - Full Width Edge to Edge */}
      <footer className="w-full min-w-full bg-slate-900 border-t border-slate-800 text-slate-400 px-4 py-3 text-xs font-mono flex flex-wrap items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-200 uppercase">CONNECT AI PLATFORM</span>
          <span>•</span>
          <span>REST & Webhooks Production API</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>Gmail Auto-Responder</span>
          <span>WhatsApp Suite</span>
          <span>App Connectors</span>
          <span>B2B Trade</span>
          <span>Google Workspace</span>
          <span>Custom AI Keys</span>
          <span>Security Guard</span>
        </div>
      </footer>
    </div>
  );
}
