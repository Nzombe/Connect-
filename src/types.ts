export type ActiveTab = 
  | 'auto_responder'
  | 'whatsapp_platform'
  | 'social_connectors'
  | 'b2b_marketplace'
  | 'productivity_connectors'
  | 'zoom_docusign_suite'
  | 'autopilot_automation'
  | 'ai_voice_chatbots'
  | 'twilio_virtual_numbers'
  | 'universal_qr_studio'
  | 'hyper_trade_alibaba'
  | 'smart_appliances_iot'
  | 'immutable_deal_log'
  | 'parametric_weather_insurance'
  | 'obd2_engine_diagnostics'
  | 'cooperative_savings_pool'
  | 'digital_twin_scenario'
  | 'bulk_document_exporter'
  | 'node_workflow_builder'
  | 'network_diagnostics'
  | 'global_task_kanban'
  | 'business_erp_suite'
  | 'workspace_hub'
  | 'ai_keys_connectors'
  | 'security_moderation'
  | 'gemini_studio';

export interface TwilioVirtualNumber {
  id: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
  capabilities: { sms: boolean; voice: boolean; mms: boolean; whatsapp: boolean };
  monthlyCostUsd: number;
  status: 'ACTIVE' | 'PROVISIONING';
  assignedAgent: string;
}

export interface TwilioSmsRecord {
  id: string;
  fromNumber: string;
  toNumber: string;
  messageBody: string;
  direction: 'INBOUND' | 'OUTBOUND';
  status: 'DELIVERED' | 'SENT' | 'FAILED';
  timestamp: string;
}

export interface UniversalQrPayload {
  id: string;
  title: string;
  qrType: 'URL' | 'VCARD' | 'WIFI' | 'PHONE' | 'EMAIL' | 'CRYPTO' | 'TEXT';
  payloadContent: string;
  qrDataUrl: string;
  createdDate: string;
  scanCount: number;
}

export interface GlobalTradeEscrowDeal {
  id: string;
  dealTitle: string;
  buyerCompany: string;
  sellerCompany: string;
  totalValueUsd: number;
  escrowStatus: 'ESCROW_FUNDED' | 'IN_TRANSIT' | 'QUALITY_VERIFIED' | 'RELEASED';
  customsStatus: 'CLEARED' | 'IN_INSPECTION' | 'PORT_ARRIVAL';
  factoryAuditRating: 'AAA+' | 'A+' | 'VERIFIED';
}

export interface ZoomMeeting {
  id: string;
  meetingTopic: string;
  startDateTime: string;
  durationMinutes: number;
  hostEmail: string;
  joinUrl: string;
  passcode: string;
  status: 'SCHEDULED' | 'LIVE' | 'ENDED';
}

export interface DocuSignEnvelope {
  id: string;
  documentTitle: string;
  recipientEmail: string;
  recipientName: string;
  status: 'SENT' | 'DELIVERED' | 'SIGNED' | 'COMPLETED';
  sentAt: string;
  docusignEnvelopeId: string;
}

export interface AutoPilotWorkflowRule {
  id: string;
  ruleName: string;
  triggerEvent: string;
  actionPipeline: string;
  status: 'ACTIVE' | 'PAUSED';
  executionsToday: number;
  lastExecuted?: string;
}

export interface AiVoiceCallSession {
  id: string;
  callerName: string;
  phoneNumber: string;
  callType: 'INBOUND' | 'OUTBOUND';
  durationSeconds: number;
  transcriptSnippet: string;
  aiSentiment: 'POSITIVE' | 'NEUTRAL' | 'HIGH_INTENT';
  status: 'COMPLETED' | 'IN_PROGRESS';
  timestamp: string;
}

export interface ProductivityConnector {
  id: string;
  name: string;
  category: 'Design' | 'Messaging' | 'Office' | 'Recruitment' | 'Accounting' | 'AI Research';
  description: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'SYNCING';
  lastAction?: string;
}

export interface WhatsAppInboxMessage {
  id: string;
  senderPhone: string;
  senderName: string;
  messageText: string;
  timestamp: string;
  status: 'READ' | 'UNREAD' | 'REPLIED';
  aiSuggestedReply?: string;
}

export interface WhatsAppCatalogItem {
  id: string;
  sku: string;
  name: string;
  priceUsd: number;
  currency: string;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK';
  category: string;
}

export interface UserApiKeyConfig {
  id: string;
  serviceName: string;
  keyPrefix: string;
  userValue: string;
  isConfigured: boolean;
  status: 'ACTIVE' | 'TESTING' | 'EMPTY';
}

export interface ModerationAuditLog {
  id: string;
  inputText: string;
  status: 'APPROVED' | 'BLOCKED';
  flagCategory: string;
  safetyScore: number;
  explanation: string;
  timestamp: string;
}

export interface AutoResponderRule {
  id: string;
  channel: 'gmail' | 'whatsapp' | 'telegram' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok';
  triggerKeyword: string;
  responseTemplate: string;
  aiEnhance: boolean;
  model: 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';
  isActive: boolean;
  matchedCount: number;
  lastTriggered?: string;
}

export interface WhatsAppNumber {
  id: string;
  phone: string;
  displayNumber: string;
  verifiedName: string;
  qualityRating: 'GREEN' | 'YELLOW' | 'RED';
  webhookUrl: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'PENDING';
  messagesSentToday: number;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  bodyText: string;
}

export interface ConnectorChannel {
  id: string;
  platform: 'TikTok' | 'Twitter/X' | 'LinkedIn' | 'Telegram' | 'Instagram';
  accountName: string;
  cpmRate: number; // Cost Per Mille in USD
  impressions: number;
  crmContactsCount: number;
  cmpCompliant: boolean;
  status: 'Active' | 'Auth_Required' | 'Syncing';
  autoReplyEnabled: boolean;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  category: string;
  supplier: string;
  country: string;
  moq: number; // Minimum Order Quantity
  unitPriceUsd: number;
  tradeAssurance: boolean;
  rating: number;
  leadTimeDays: number;
  specifications: Record<string, string>;
  imageUrl?: string;
}

export interface RequestForQuotation {
  id: string;
  productName: string;
  quantity: number;
  targetPriceUsd: number;
  destinationCountry: string;
  status: 'Open' | 'Quoted' | 'Contracted' | 'Closed';
  createdAt: string;
  quotesCount: number;
}

export interface WorkspaceAppIntegration {
  id: string;
  name: string;
  scope: string;
  description: string;
  connected: boolean;
  lastSynced?: string;
}

export interface GeminiChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: string;
  thinkingText?: string;
  groundingSources?: { title: string; url: string }[];
  audioUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface GenerateImageOptions {
  prompt: string;
  aspectRatio: '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
  imageSize: '1K' | '2K' | '4K';
  quality: 'flash' | 'pro';
}

export interface GenerateVideoOptions {
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
}

export interface SmartApplianceIoT {
  id: string;
  name: string;
  location: string; // e.g., 'HQ Executive Suite', 'Warehouse Alpha', 'Residential Smart Home'
  category: 'HVAC Climate' | 'Security & Smart Access' | 'Energy & Lighting' | 'Office Server & Power' | 'Industrial Appliance';
  status: 'ONLINE' | 'OFFLINE' | 'ALERT';
  powerState: boolean;
  powerConsumptionWatts: number;
  temperatureCelsius?: number;
  humidityPercent?: number;
  doorLocked?: boolean;
  fanSpeedPercent?: number;
  ipAddress: string;
  lastUpdated: string;
}

export interface ImmutableDealLogRecord {
  id: string;
  hashSha256: string;
  dealTitle: string;
  buyerEntity: string;
  sellerEntity: string;
  transactionAmountUsd: number;
  timestampIso: string;
  jurisdiction: string;
  legalComplianceStandard: string;
  signatureProof: string;
  status: 'PERMANENTLY_SEALED' | 'EVIDENTIARY_VERIFIED';
  blockNumber: number;
}

export interface ParametricInsurancePolicy {
  id: string;
  policyType: 'DROUGHT' | 'EXCESS_RAINFALL' | 'CYCLONE' | 'FROST_SURGE';
  location: string;
  triggerMetric: string;
  thresholdMm: number;
  coverageAmountUsd: number;
  premiumAmountUsd: number;
  resilienceScoreSnapshot: number;
  underwritingPartner: string;
  status: 'ACTIVE' | 'TRIGGERED_PAYOUT' | 'PENDING_QUOTE' | 'EXPIRED';
  startDate: string;
  endDate: string;
  rolling30dRainfallMm: number;
}

export interface Obd2TelemetryReading {
  id: string;
  deviceId: string;
  vehicleLabel: string;
  vin: string;
  rpm: number;
  coolantTempC: number;
  speedKph: number;
  batteryVoltage: number;
  oilPressureKpa: number;
  misfireCount: number;
  dtcCodes: string[];
  healthScore: number;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL_ALERT';
  recordedAt: string;
}

export interface StokvelSavingsGroup {
  id: string;
  name: string;
  cycle: 'WEEKLY' | 'MONTHLY';
  currency: string;
  contributionAmount: number;
  totalPoolBalance: number;
  memberCount: number;
  nextPayoutRecipient: string;
  rotationPosition: number;
  integritySignature: string;
  status: 'ACTIVE' | 'PAYOUT_DUE' | 'LOCKED';
}

export interface DigitalTwinScenario {
  id: string;
  scenarioType: 'HIRE_STAFF' | 'LOSE_CUSTOMER' | 'PRICE_CHANGE' | 'CURRENCY_SHOCK' | 'CUSTOM_DELTA';
  label: string;
  baselineMonthlyRevenue: number;
  baselineMonthlyExpenses: number;
  projectedMonthlyRevenue: number;
  projectedMonthlyExpenses: number;
  projectedCashflowDelta: number;
  runwayImpactDays: number;
  verdict: 'IMPROVES_POSITION' | 'CREATES_CASH_CRUNCH' | 'TIGHTER_MARGINS' | 'SAFE';
  createdDate: string;
}

