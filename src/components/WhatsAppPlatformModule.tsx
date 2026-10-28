import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Send, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  Plus, 
  ShoppingBag, 
  UserCheck, 
  Inbox, 
  Bot, 
  Tag, 
  Layers 
} from 'lucide-react';
import { WhatsAppNumber, WhatsAppTemplate, WhatsAppInboxMessage, WhatsAppCatalogItem } from '../types';

export const WhatsAppPlatformModule: React.FC = () => {
  const [numbers] = useState<WhatsAppNumber[]>([
    {
      id: 'wa-1',
      phone: '+14155552671',
      displayNumber: '+1 (415) 555-2671',
      verifiedName: 'Connect AI Global Logistics HQ',
      qualityRating: 'GREEN',
      webhookUrl: 'https://connect-ai.app/api/webhooks/whatsapp',
      status: 'CONNECTED',
      messagesSentToday: 1840,
    },
    {
      id: 'wa-2',
      phone: '+442079460912',
      displayNumber: '+44 20 7946 0912',
      verifiedName: 'Connect AI Europe Sales',
      qualityRating: 'GREEN',
      webhookUrl: 'https://connect-ai.app/api/webhooks/whatsapp-eu',
      status: 'CONNECTED',
      messagesSentToday: 920,
    },
  ]);

  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([
    {
      id: 'tpl-1',
      name: 'shipping_dispatch_update',
      category: 'UTILITY',
      language: 'en_US',
      status: 'APPROVED',
      bodyText: 'Your freight consignment {{1}} is loaded and dispatched. Tracking ID: {{2}}.',
    },
    {
      id: 'tpl-2',
      name: 'rfq_quote_ready',
      category: 'MARKETING',
      language: 'en_US',
      status: 'APPROVED',
      bodyText: 'Your trade quote for {{1}} is finalized. Review contract details at {{2}}.',
    },
    {
      id: 'tpl-3',
      name: 'account_verification_otp',
      category: 'AUTHENTICATION',
      language: 'en_US',
      status: 'APPROVED',
      bodyText: 'Your Connect AI security verification code is {{1}}. Valid for 10 minutes.',
    },
  ]);

  // Unified WhatsApp Inbox State
  const [inboxMessages, setInboxMessages] = useState<WhatsAppInboxMessage[]>([
    {
      id: 'inb-101',
      senderPhone: '+491512345678',
      senderName: 'Lukas Weber (Hamburg Logistics)',
      messageText: 'Hello, can you send the updated quotation for 5-Axis CNC Milling Machines to Germany?',
      timestamp: '10:42 AM',
      status: 'UNREAD',
      aiSuggestedReply: 'Hello Lukas, thank you for reaching out. The FOB quotation for 5-Axis CNC Milling Machine is $28,500/unit with 21 days lead time.',
    },
    {
      id: 'inb-102',
      senderPhone: '+13125550188',
      senderName: 'Sarah Jenkins (Chicago Energy Corp)',
      messageText: 'What is the minimum order quantity for LiFePO4 280Ah battery cells?',
      timestamp: '09:15 AM',
      status: 'READ',
      aiSuggestedReply: 'Hi Sarah, minimum order quantity for 3.2V 280Ah LiFePO4 cells is 100 units at $42.50/unit.',
    },
  ]);

  const [selectedMsgId, setSelectedMsgId] = useState<string>('inb-101');
  const [replyInputText, setReplyInputText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  // WhatsApp Product Catalog State
  const [catalogItems, setCatalogItems] = useState<WhatsAppCatalogItem[]>([
    {
      id: 'cat-1',
      sku: 'CNC-5AX-INDUSTRIAL',
      name: 'Automated 5-Axis CNC Machine',
      priceUsd: 28500.0,
      currency: 'USD',
      stockStatus: 'IN_STOCK',
      category: 'Heavy Machinery',
    },
    {
      id: 'cat-2',
      sku: 'LIFEPO4-280AH-CELL',
      name: 'LiFePO4 Battery Cells 3.2V 280Ah',
      priceUsd: 42.5,
      currency: 'USD',
      stockStatus: 'IN_STOCK',
      category: 'Energy & Batteries',
    },
    {
      id: 'cat-3',
      sku: 'SMT-ROBOT-PICK-PLACE',
      name: 'High-Speed SMT Pick & Place Machine',
      priceUsd: 19800.0,
      currency: 'USD',
      stockStatus: 'IN_STOCK',
      category: 'Electronics Manufacturing',
    },
  ]);

  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(150.0);
  const [newCategory, setNewCategory] = useState('General Merchandise');

  // Broadcast state
  const [selectedTemplateId, setSelectedTemplateId] = useState('tpl-1');
  const [recipientList, setRecipientList] = useState('+14155550192, +442079460011, +4930123456');
  const [param1, setParam1] = useState('CONTAINER-88392');
  const [param2, setParam2] = useState('TRK-99021-GLOBAL');
  const [broadcastLog, setBroadcastLog] = useState<string | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // New Template form
  const [newTplName, setNewTplName] = useState('');
  const [newTplCategory, setNewTplCategory] = useState<'MARKETING' | 'UTILITY' | 'AUTHENTICATION'>('UTILITY');
  const [newTplBody, setNewTplBody] = useState('');

  const activeMsg = inboxMessages.find((m) => m.id === selectedMsgId) || inboxMessages[0];

  const handleSendInboxReply = () => {
    if (!replyInputText.trim()) return;
    setIsSendingReply(true);
    setTimeout(() => {
      setInboxMessages((prev) =>
        prev.map((m) =>
          m.id === selectedMsgId ? { ...m, status: 'REPLIED' } : m
        )
      );
      setReplyInputText('');
      setIsSendingReply(false);
    }, 800);
  };

  const handleApplyAiSuggestion = () => {
    if (activeMsg?.aiSuggestedReply) {
      setReplyInputText(activeMsg.aiSuggestedReply);
    }
  };

  const handleAddCatalogItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newSku) return;
    const item: WhatsAppCatalogItem = {
      id: `cat-${Date.now()}`,
      sku: newSku.toUpperCase(),
      name: newName,
      priceUsd: newPrice,
      currency: 'USD',
      stockStatus: 'IN_STOCK',
      category: newCategory,
    };
    setCatalogItems([...catalogItems, item]);
    setNewSku('');
    setNewName('');
    setNewPrice(150.0);
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setBroadcastLog(null);
    setTimeout(() => {
      const recs = recipientList.split(',').filter((r) => r.trim());
      setBroadcastLog(`Successfully queued WhatsApp Broadcast for ${recs.length} recipient numbers using template ID ${selectedTemplateId}. Batch status: DELIVERED.`);
      setIsBroadcasting(false);
    }, 1200);
  };

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTplName || !newTplBody) return;
    const tpl: WhatsAppTemplate = {
      id: `tpl-${Date.now()}`,
      name: newTplName.toLowerCase().replace(/\s+/g, '_'),
      category: newTplCategory,
      language: 'en_US',
      status: 'APPROVED',
      bodyText: newTplBody,
    };
    setTemplates([...templates, tpl]);
    setNewTplName('');
    setNewTplBody('');
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              WhatsApp Business Suite (Unified Inbox, Catalog & Templates)
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
            META API CONNECTED
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Complete Meta WhatsApp Business platform suite: verified phone lines, unified multi-chat inbox, AI auto-replies, product catalog manager, and Meta approved campaign templates.
        </p>
      </div>

      {/* WhatsApp Numbers Status Table - Full Width 100% */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" /> Verified Business Phone Lines
          </h2>
          <span className="text-xs font-mono text-slate-400">{numbers.length} Active Lines</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Verified Business Name</th>
                <th className="p-3">Phone Number</th>
                <th className="p-3">Quality Rating</th>
                <th className="p-3">Webhook Route</th>
                <th className="p-3">Today's Traffic</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {numbers.map((num) => (
                <tr key={num.id} className="hover:bg-slate-850 transition-colors">
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">{num.verifiedName}</td>
                  <td className="p-3 font-mono text-emerald-400 whitespace-nowrap">{num.displayNumber}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                      HIGH ({num.qualityRating})
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">{num.webhookUrl}</td>
                  <td className="p-3 font-mono text-slate-200 whitespace-nowrap">{num.messagesSentToday} msgs</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-[10px] flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" /> CONNECTED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unified WhatsApp Inbox Module */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Inbox className="w-4 h-4 text-emerald-400" /> WhatsApp Unified Customer Inbox
          </h2>
          <span className="text-[11px] font-mono text-emerald-400">Multi-Channel Customer Service</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
          {/* Messages List Sidebar */}
          <div className="w-full bg-slate-950 border border-slate-800 p-2 space-y-2 overflow-y-auto max-h-[350px]">
            <span className="text-[11px] font-mono text-slate-400 block px-2 pb-1 uppercase border-b border-slate-800">
              Incoming WhatsApp Conversations
            </span>
            {inboxMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMsgId(msg.id)}
                className={`p-3 border cursor-pointer transition-colors space-y-1 ${
                  msg.id === selectedMsgId
                    ? 'bg-slate-850 border-emerald-500 text-slate-100'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-emerald-400">{msg.senderName}</span>
                  <span className="text-slate-400 text-[10px]">{msg.timestamp}</span>
                </div>
                <p className="text-slate-300 line-clamp-1">{msg.messageText}</p>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500">{msg.senderPhone}</span>
                  <span
                    className={`px-1.5 py-0.5 border ${
                      msg.status === 'REPLIED'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border-amber-800'
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Conversation & AI Reply Window */}
          <div className="lg:col-span-2 w-full bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">{activeMsg.senderName}</h3>
                  <span className="font-mono text-xs text-emerald-400">{activeMsg.senderPhone}</span>
                </div>
                <span className="text-xs font-mono text-slate-400">{activeMsg.timestamp}</span>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Customer Inquiry</span>
                <p className="text-slate-200 text-xs leading-relaxed">{activeMsg.messageText}</p>
              </div>

              {activeMsg.aiSuggestedReply && (
                <div className="p-3 bg-slate-900 border border-emerald-900/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5" /> AI Suggested WhatsApp Business Response
                    </span>
                    <button
                      onClick={handleApplyAiSuggestion}
                      className="text-[10px] px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono"
                    >
                      Insert Reply
                    </button>
                  </div>
                  <p className="text-slate-300 text-xs font-mono">{activeMsg.aiSuggestedReply}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <textarea
                rows={2}
                placeholder="Type response to WhatsApp customer..."
                value={replyInputText}
                onChange={(e) => setReplyInputText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-2 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={handleSendInboxReply}
                disabled={isSendingReply}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isSendingReply ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send Official WhatsApp Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Wholesale Product Catalog Manager */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" /> WhatsApp Product Catalog Manager
          </h2>
          <span className="text-[11px] font-mono text-cyan-400">{catalogItems.length} Products Registered</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Catalog Table */}
          <div className="lg:col-span-2 w-full min-w-full overflow-x-auto border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price (USD)</th>
                  <th className="p-3">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900">
                {catalogItems.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-850">
                    <td className="p-3 font-mono text-cyan-400 font-bold">{cat.sku}</td>
                    <td className="p-3 font-semibold text-slate-100">{cat.name}</td>
                    <td className="p-3 text-slate-400">{cat.category}</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">${cat.priceUsd.toFixed(2)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                        {cat.stockStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Catalog Item Form */}
          <form onSubmit={handleAddCatalogItem} className="w-full bg-slate-950 border border-slate-800 p-3 space-y-3 text-xs">
            <span className="text-xs font-bold text-slate-200 uppercase block pb-1 border-b border-slate-800">
              Add New Catalog Item
            </span>

            <div>
              <label className="block text-slate-400 mb-1">SKU Identifier</label>
              <input
                type="text"
                placeholder="e.g. SOLAR-INV-10KW"
                value={newSku}
                onChange={(e) => setNewSku(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-2 text-slate-100 focus:border-cyan-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Product Title</label>
              <input
                type="text"
                placeholder="Product title"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 p-2 text-slate-100 focus:border-cyan-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Item to WhatsApp Catalog
            </button>
          </form>
        </div>
      </div>

      {/* Broadcast Manager & Create Template Panel */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Broadcast Manager */}
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" /> WhatsApp Campaign Broadcast
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Bulk Distribution</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Select Approved Message Template</label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none font-mono"
              >
                {templates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name} [{tpl.category}]
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Recipient Numbers (Comma Separated)</label>
              <textarea
                rows={2}
                value={recipientList}
                onChange={(e) => setRecipientList(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Template Param 1</label>
                <input
                  type="text"
                  value={param1}
                  onChange={(e) => setParam1(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Template Param 2</label>
                <input
                  type="text"
                  value={param2}
                  onChange={(e) => setParam2(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleBroadcast}
              disabled={isBroadcasting}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isBroadcasting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Dispatching WhatsApp Campaign...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Dispatch Broadcast Campaign
                </>
              )}
            </button>

            {broadcastLog && (
              <div className="p-3 bg-slate-950 border border-emerald-900/80 text-emerald-300 rounded-none text-xs font-mono">
                {broadcastLog}
              </div>
            )}
          </div>
        </div>

        {/* Register New Approved Template */}
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" /> Create Message Template
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Meta Verification</span>
          </div>

          <form onSubmit={handleAddTemplate} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Template Identifier Name</label>
              <input
                type="text"
                placeholder="e.g. order_delivery_notice"
                value={newTplName}
                onChange={(e) => setNewTplName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Category</label>
              <select
                value={newTplCategory}
                onChange={(e) => setNewTplCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
              >
                <option value="UTILITY">Utility / Updates</option>
                <option value="MARKETING">Marketing / Sales</option>
                <option value="AUTHENTICATION">Authentication / OTP</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Body Text (Use {"{{1}}, {{2}}"} for dynamic variables)
              </label>
              <textarea
                rows={3}
                placeholder="Hello {{1}}, your trade shipment {{2}} is ready."
                value={newTplBody}
                onChange={(e) => setNewTplBody(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Submit Meta Approval Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
