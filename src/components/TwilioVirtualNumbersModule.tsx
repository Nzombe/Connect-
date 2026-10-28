import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Plus, 
  RefreshCw, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  Send, 
  Hash, 
  Key, 
  Server, 
  Zap, 
  Sliders 
} from 'lucide-react';
import { TwilioVirtualNumber, TwilioSmsRecord } from '../types';

export const TwilioVirtualNumbersModule: React.FC = () => {
  const [virtualNumbers, setVirtualNumbers] = useState<TwilioVirtualNumber[]>([
    {
      id: 'num-1',
      phoneNumber: '+1 (415) 882-9910',
      country: 'United States',
      countryCode: 'US',
      capabilities: { sms: true, voice: true, mms: true, whatsapp: true },
      monthlyCostUsd: 1.50,
      status: 'ACTIVE',
      assignedAgent: 'WhatsApp Business & Auto-Responder Bot',
    },
    {
      id: 'num-2',
      phoneNumber: '+44 20 7946 0912',
      country: 'United Kingdom',
      countryCode: 'UK',
      capabilities: { sms: true, voice: true, mms: false, whatsapp: true },
      monthlyCostUsd: 2.00,
      status: 'ACTIVE',
      assignedAgent: 'European B2B RFQ Voice Line',
    },
    {
      id: 'num-3',
      phoneNumber: '+254 700 892 104',
      country: 'Kenya',
      countryCode: 'KE',
      capabilities: { sms: true, voice: true, mms: false, whatsapp: true },
      monthlyCostUsd: 1.80,
      status: 'ACTIVE',
      assignedAgent: 'East Africa Trade & M-Pesa SMS Dispatch',
    },
  ]);

  const [smsLogs, setSmsLogs] = useState<TwilioSmsRecord[]>([
    {
      id: 'SM9018241',
      fromNumber: '+1 (415) 882-9910',
      toNumber: '+1 (312) 555-0192',
      messageBody: 'Your Connect AI B2B Trade Agreement DS-ENV-994012 is ready for DocuSign e-signature.',
      direction: 'OUTBOUND',
      status: 'DELIVERED',
      timestamp: 'Today, 04:30 AM',
    },
    {
      id: 'SM8810294',
      fromNumber: '+44 20 7946 0912',
      toNumber: '+49 151 2345678',
      messageBody: 'Inbound RFQ quote confirmed for 5-Axis CNC Milling shipment to Hamburg Port.',
      direction: 'INBOUND',
      status: 'DELIVERED',
      timestamp: 'Today, 03:15 AM',
    },
  ]);

  // Provisioning Form State
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [assignedAgentInput, setAssignedAgentInput] = useState('Auto-Pilot Trade Sentinel');
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionLog, setProvisionLog] = useState<string | null>(null);

  // SMS Dispatch Form State
  const [smsFromNumber, setSmsFromNumber] = useState('+1 (415) 882-9910');
  const [smsToNumber, setSmsToNumber] = useState('');
  const [smsBody, setSmsBody] = useState('');
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsLog, setSmsLog] = useState<string | null>(null);

  // Authy 2FA & Verify API State
  const [verifyPhone, setVerifyPhone] = useState('');
  const [verifyStatus, setVerifyStatus] = useState<string | null>(null);
  const [isSendingVerify, setIsSendingVerify] = useState(false);

  const countryOptions = [
    { code: 'US', name: 'United States (+1)' },
    { code: 'UK', name: 'United Kingdom (+44)' },
    { code: 'DE', name: 'Germany (+49)' },
    { code: 'KE', name: 'Kenya (+254)' },
    { code: 'ZA', name: 'South Africa (+27)' },
    { code: 'JP', name: 'Japan (+81)' },
    { code: 'SG', name: 'Singapore (+65)' },
  ];

  const handleProvisionNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProvisioning(true);
    setProvisionLog(null);

    try {
      const res = await fetch('/api/twilio/provision-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: selectedCountry,
          assignedAgent: assignedAgentInput,
        }),
      });
      const data = await res.json();
      if (data.virtualNumber) {
        setVirtualNumbers([data.virtualNumber, ...virtualNumbers]);
        setProvisionLog(`Provisioned Twilio Virtual Number ${data.virtualNumber.phoneNumber} (${data.virtualNumber.country}).`);
      }
    } catch (err: any) {
      setProvisionLog(`Provisioning failed: ${err.message}`);
    } finally {
      setIsProvisioning(false);
    }
  };

  const handleSendTwilioSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsToNumber || !smsBody) return;
    setIsSendingSms(true);
    setSmsLog(null);

    try {
      const res = await fetch('/api/twilio/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromNumber: smsFromNumber,
          toNumber: smsToNumber,
          messageBody: smsBody,
        }),
      });
      const data = await res.json();
      if (data.smsRecord) {
        setSmsLogs([data.smsRecord, ...smsLogs]);
        setSmsLog(`Twilio SMS SID ${data.smsRecord.id} dispatched to ${data.smsRecord.toNumber}.`);
        setSmsToNumber('');
        setSmsBody('');
      }
    } catch (err: any) {
      setSmsLog(`Twilio SMS dispatch failed: ${err.message}`);
    } finally {
      setIsSendingSms(false);
    }
  };

  const handleTestVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyPhone) return;
    setIsSendingVerify(true);
    setTimeout(() => {
      setVerifyStatus(`Twilio Verify 2FA OTP Code [${Math.floor(100000 + Math.random() * 900000)}] dispatched to ${verifyPhone} via Authy / SMS.`);
      setIsSendingVerify(false);
    }, 600);
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-red-500" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Twilio Full Suite & Global Virtual Phone Numbers Platform
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-red-950 text-red-400 border border-red-800 font-mono">
            TWILIO SMS, VOICE & VERIFY APIS
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Instantly provision global Virtual Phone Numbers across US, Europe, Asia, and Africa. Route incoming/outgoing SMS, trigger Twilio Voice SIP trunking, dispatch WhatsApp notifications, and verify users via Authy 2FA.
        </p>
      </div>

      {/* Twilio Controls Split Panel */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Virtual Number Provisioner */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-red-500" /> Provision Virtual Number
            </h2>
            <span className="text-[11px] font-mono text-red-400">$1.50/mo</span>
          </div>

          <form onSubmit={handleProvisionNumber} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Select Country Territory</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-red-500 focus:outline-none font-mono"
              >
                {countryOptions.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Assign Agent / Bot Workflow</label>
              <input
                type="text"
                placeholder="e.g. Inbound Voice Sentinel"
                value={assignedAgentInput}
                onChange={(e) => setAssignedAgentInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isProvisioning}
              className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProvisioning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Provision Twilio VoIP Line
            </button>

            {provisionLog && (
              <div className="p-2.5 bg-slate-950 border border-red-900/80 text-red-300 rounded-none font-mono text-xs">
                {provisionLog}
              </div>
            )}
          </form>
        </div>

        {/* SMS & Messaging Dispatcher */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-red-500" /> Twilio SMS Dispatcher
            </h2>
            <span className="text-[11px] font-mono text-red-400">Global Carrier Network</span>
          </div>

          <form onSubmit={handleSendTwilioSms} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">From Virtual Number</label>
              <select
                value={smsFromNumber}
                onChange={(e) => setSmsFromNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-red-500 focus:outline-none font-mono text-[11px]"
              >
                {virtualNumbers.map((n) => (
                  <option key={n.id} value={n.phoneNumber}>
                    {n.phoneNumber} ({n.country})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Recipient Phone Number</label>
              <input
                type="text"
                placeholder="+1 555 019 2831"
                value={smsToNumber}
                onChange={(e) => setSmsToNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-red-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">SMS Message Payload</label>
              <textarea
                rows={2}
                placeholder="Type SMS text or trade notification..."
                value={smsBody}
                onChange={(e) => setSmsBody(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingSms}
              className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSendingSms ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Transmit Twilio SMS
            </button>

            {smsLog && (
              <div className="p-2.5 bg-slate-950 border border-red-900/80 text-red-300 rounded-none font-mono text-xs">
                {smsLog}
              </div>
            )}
          </form>
        </div>

        {/* Authy 2FA & Verify API Suite */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Twilio Authy & Verify 2FA API
            </h2>
            <span className="text-[11px] font-mono text-emerald-400">Zero-Trust OTP</span>
          </div>

          <form onSubmit={handleTestVerify2FA} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">User Phone Number for 2FA</label>
              <input
                type="text"
                placeholder="+1 415 555 9912"
                value={verifyPhone}
                onChange={(e) => setVerifyPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isSendingVerify}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSendingVerify ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
              Dispatch 2FA Passcode OTP
            </button>

            {verifyStatus && (
              <div className="p-2.5 bg-slate-950 border border-emerald-900/80 text-emerald-300 rounded-none font-mono text-xs">
                {verifyStatus}
              </div>
            )}
          </form>

          <div className="p-3 bg-slate-950 border border-slate-800 space-y-2 text-slate-400 text-[11px]">
            <span className="text-slate-200 font-bold block">Twilio Full Suite Capabilities:</span>
            <ul className="list-disc pl-4 space-y-1 font-mono">
              <li>Programmable SMS & MMS Cargo Alert Dispatch</li>
              <li>SIP Voice Call Forwarding to Connect AI Assistant</li>
              <li>WhatsApp Business Sandbox & Multi-Device API</li>
              <li>Shortcode & Local Area Code Geo-Targeting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Provisioned Virtual Numbers Matrix Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-red-500" /> Active Twilio Provisioned Virtual Numbers Matrix
          </h2>
          <span className="text-xs font-mono text-slate-400">{virtualNumbers.length} Virtual Lines Active</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Phone Number</th>
                <th className="p-3">Country / Region</th>
                <th className="p-3">Capabilities</th>
                <th className="p-3">Monthly Cost</th>
                <th className="p-3">Assigned Bot Agent</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
              {virtualNumbers.map((n) => (
                <tr key={n.id} className="hover:bg-slate-850">
                  <td className="p-3 font-bold text-red-400 whitespace-nowrap">{n.phoneNumber}</td>
                  <td className="p-3 text-slate-200 whitespace-nowrap">{n.country} ({n.countryCode})</td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-[10px]">
                      {n.capabilities.sms && <span className="px-1.5 py-0.5 bg-slate-950 text-emerald-400 border border-slate-800">SMS</span>}
                      {n.capabilities.voice && <span className="px-1.5 py-0.5 bg-slate-950 text-blue-400 border border-slate-800">VOICE</span>}
                      {n.capabilities.whatsapp && <span className="px-1.5 py-0.5 bg-slate-950 text-green-400 border border-slate-800">WA</span>}
                    </div>
                  </td>
                  <td className="p-3 text-amber-400 whitespace-nowrap">${n.monthlyCostUsd.toFixed(2)}/mo</td>
                  <td className="p-3 text-slate-300 max-w-xs truncate">{n.assignedAgent}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                      {n.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Twilio SMS Outbound & Inbound Audit Matrix - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-red-500" /> Twilio SMS Carrier Transmission Log
          </h2>
          <span className="text-xs font-mono text-slate-400">{smsLogs.length} Carrier Dispatches</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">SID</th>
                <th className="p-3">From Line</th>
                <th className="p-3">To Recipient</th>
                <th className="p-3">Direction</th>
                <th className="p-3">Message Body</th>
                <th className="p-3">Carrier Status</th>
                <th className="p-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
              {smsLogs.map((s) => (
                <tr key={s.id} className="hover:bg-slate-850">
                  <td className="p-3 font-bold text-red-400 whitespace-nowrap">{s.id}</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{s.fromNumber}</td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{s.toNumber}</td>
                  <td className="p-3 text-blue-400 whitespace-nowrap">{s.direction}</td>
                  <td className="p-3 text-slate-200 max-w-xs truncate">{s.messageBody}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{s.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
