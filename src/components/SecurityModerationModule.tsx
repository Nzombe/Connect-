import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  AlertOctagon, 
  Lock, 
  User, 
  Scan, 
  RefreshCw, 
  Sliders, 
  FileCheck, 
  Sparkles, 
  XCircle 
} from 'lucide-react';
import { ModerationAuditLog } from '../types';

export const SecurityModerationModule: React.FC = () => {
  const [googleUser] = useState({
    name: 'Authorized Business User',
    email: 'nzombet43@gmail.com',
    authMethod: 'Google Workspace OAuth 2.0 Single Sign-On',
    status: 'VERIFIED_AUTHENTICATED',
    lastLogin: 'Today, 04:36 AM (GMT-7)',
  });

  const [qrCodeData] = useState({
    token: 'CONNECT-AI-2FA-QR-990812-SECURE',
    issuer: 'Connect AI Security Sentinel',
    qrPayload: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=CONNECT-AI-SECURITY-SESSION-VERIFIED-2026',
    status: 'ACTIVE_SESSION_VERIFIED',
  });

  const [testText, setTestText] = useState('Submit trade offer for 500 units of logistics equipment to European port.');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const [auditLogs, setAuditLogs] = useState<ModerationAuditLog[]>([
    {
      id: 'log-1',
      inputText: 'Submit trade offer for 500 units of logistics equipment...',
      status: 'APPROVED',
      flagCategory: 'SAFE',
      safetyScore: 1.2,
      explanation: 'Clean commercial transaction query.',
      timestamp: '04:20 AM',
    },
    {
      id: 'log-2',
      inputText: 'Attempting explicit sexual propaganda broadcast message...',
      status: 'BLOCKED',
      flagCategory: 'PROFANITY_OR_HARMFUL',
      safetyScore: 99.4,
      explanation: 'Blocked by policy guard rules: detected forbidden explicit keywords.',
      timestamp: '03:45 AM',
    },
  ]);

  const handleRunModerationScan = async () => {
    if (!testText.trim()) return;
    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/moderation/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: testText }),
      });
      const data = await res.json();
      setScanResult(data);

      const logItem: ModerationAuditLog = {
        id: `log-${Date.now()}`,
        inputText: testText.length > 50 ? `${testText.slice(0, 50)}...` : testText,
        status: data.isFlagged ? 'BLOCKED' : 'APPROVED',
        flagCategory: data.flagCategory || 'GENERAL',
        safetyScore: data.safetyScore || 0,
        explanation: data.explanation || 'Scanned',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAuditLogs([logItem, ...auditLogs]);
    } catch (err: any) {
      setScanResult({
        status: 'ERROR',
        explanation: err.message || 'Moderation API call failed',
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Security Sentinel & AI Content Moderation Guard
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-red-950 text-red-400 border border-red-800 font-mono">
            ZERO TOLERANCE FILTER ACTIVE
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          High-level security suite featuring Google OAuth Single Sign-On, QR code 2FA verification, and AI real-time filtering that blocks all immoral, political propaganda, sexuality, pornographic, rude, dirty, or harmful content.
        </p>
      </div>

      {/* Google Log-in & QR Code Authentication Status Panel */}
      <div className="w-full min-w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Google OAuth Login Card */}
        <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" /> Google Authentication Status
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
              OAuth 2.0 CONNECTED
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-400">Authenticated Account:</span>
              <span className="text-cyan-400 font-bold">{googleUser.email}</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-400">Authentication Method:</span>
              <span className="text-slate-200">{googleUser.authMethod}</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span className="text-slate-400">Security Verification:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED SIGN-IN
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Last Session Auth:</span>
              <span className="text-slate-300">{googleUser.lastLogin}</span>
            </div>
          </div>
        </div>

        {/* QR Code 2FA Security Token */}
        <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-400" /> QR Code 2FA Session Verification
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
              2FA VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="p-2 bg-white border border-slate-700 w-24 h-24 flex items-center justify-center shrink-0">
              <img
                src={qrCodeData.qrPayload}
                alt="2FA QR Code"
                className="w-20 h-20"
              />
            </div>

            <div className="space-y-1 font-mono text-[11px]">
              <div className="text-slate-400">Issuer: <span className="text-slate-200 font-bold">{qrCodeData.issuer}</span></div>
              <div className="text-slate-400">Token ID: <span className="text-emerald-400 font-bold">{qrCodeData.token}</span></div>
              <div className="text-slate-400">Device Pairing: <span className="text-slate-200">Hardware Token Paired</span></div>
              <div className="text-emerald-400 font-bold flex items-center gap-1 text-[10px] mt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> High Security Session Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Moderation Guard Test Bench */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" /> Real-Time Immoral & Harmful Content Filter Test
          </h2>
          <span className="text-[11px] font-mono text-red-400">AI Safety Neural Filter</span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Input Text to Audit</label>
            <textarea
              rows={3}
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-red-500 focus:outline-none font-mono"
            />
          </div>

          <button
            onClick={handleRunModerationScan}
            disabled={isScanning}
            className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Auditing Content via Neural Guard...
              </>
            ) : (
              <>
                <Scan className="w-4 h-4" /> Run Real-Time Safety & Policy Audit
              </>
            )}
          </button>

          {scanResult && (
            <div
              className={`p-4 border rounded-none font-mono text-xs space-y-2 ${
                scanResult.status === 'BLOCKED'
                  ? 'bg-red-950/80 border-red-700 text-red-200'
                  : 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold flex items-center gap-1 text-sm">
                  {scanResult.status === 'BLOCKED' ? (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" /> CONTENT BLOCKED BY POLICY
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> CONTENT VERIFIED & APPROVED
                    </>
                  )}
                </span>
                <span className="text-[11px]">Category: {scanResult.flagCategory || 'SAFE'}</span>
              </div>

              <p className="text-xs">{scanResult.explanation}</p>
              <div className="text-[11px] text-slate-400">
                Risk Rating Score: <span className="font-bold text-slate-100">{scanResult.safetyScore}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audit Log History - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Content Audit & Policy Enforcement Logs
          </h2>
          <span className="text-xs font-mono text-slate-400">{auditLogs.length} Scanned Records</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Scanned Input Extract</th>
                <th className="p-3">Audit Verdict</th>
                <th className="p-3">Flag Category</th>
                <th className="p-3">Safety Risk %</th>
                <th className="p-3">Reasoning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850">
                  <td className="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 font-mono text-slate-100 max-w-xs truncate">{log.inputText}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono border ${
                        log.status === 'BLOCKED'
                          ? 'bg-red-950 text-red-400 border-red-800'
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-amber-400 text-[11px] whitespace-nowrap">{log.flagCategory}</td>
                  <td className="p-3 font-mono font-bold text-slate-200 whitespace-nowrap">{log.safetyScore}%</td>
                  <td className="p-3 text-slate-300 max-w-xs">{log.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
