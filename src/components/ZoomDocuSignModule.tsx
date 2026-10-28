import React, { useState } from 'react';
import { 
  Video, 
  FileCheck, 
  Plus, 
  CheckCircle2, 
  RefreshCw, 
  Calendar, 
  Clock, 
  Mail, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  FileText,
  UserCheck
} from 'lucide-react';
import { ZoomMeeting, DocuSignEnvelope } from '../types';

export const ZoomDocuSignModule: React.FC = () => {
  const [zoomMeetings, setZoomMeetings] = useState<ZoomMeeting[]>([
    {
      id: 'zm-101',
      meetingTopic: 'Global Trade Contract Negotiation (5-Axis CNC Supply)',
      startDateTime: 'Today, 03:00 PM EST',
      durationMinutes: 45,
      hostEmail: 'nzombet43@gmail.com',
      joinUrl: 'https://zoom.us/j/9910283741?pwd=connectai_trade',
      passcode: '881920',
      status: 'SCHEDULED',
    },
    {
      id: 'zm-102',
      meetingTopic: 'Rotterdam Port Logistics & Customs Clearance Sync',
      startDateTime: 'Tomorrow, 10:00 AM CET',
      durationMinutes: 30,
      hostEmail: 'nzombet43@gmail.com',
      joinUrl: 'https://zoom.us/j/8839201948?pwd=logistics_eu',
      passcode: '441029',
      status: 'SCHEDULED',
    },
  ]);

  const [docusignEnvelopes, setDocusignEnvelopes] = useState<DocuSignEnvelope[]>([
    {
      id: 'ds-1',
      documentTitle: 'B2B International Trade Master Procurement Agreement.pdf',
      recipientEmail: 'l.weber@hamburg-logistics.de',
      recipientName: 'Lukas Weber',
      status: 'SIGNED',
      sentAt: 'Yesterday, 04:15 PM',
      docusignEnvelopeId: 'DS-ENV-994012',
    },
    {
      id: 'ds-2',
      documentTitle: 'Non-Disclosure & Trade Exclusivity Covenant.pdf',
      recipientEmail: 's.jenkins@chicagoenergy.com',
      recipientName: 'Sarah Jenkins',
      status: 'SENT',
      sentAt: 'Today, 09:30 AM',
      docusignEnvelopeId: 'DS-ENV-882019',
    },
  ]);

  // Zoom Form State
  const [zoomTopic, setZoomTopic] = useState('');
  const [zoomDuration, setZoomDuration] = useState(30);
  const [zoomHost, setZoomHost] = useState('nzombet43@gmail.com');
  const [isCreatingZoom, setIsCreatingZoom] = useState(false);
  const [zoomLog, setZoomLog] = useState<string | null>(null);

  // DocuSign Form State
  const [dsTitle, setDsTitle] = useState('');
  const [dsEmail, setDsEmail] = useState('');
  const [dsName, setDsName] = useState('');
  const [isSendingDs, setIsSendingDs] = useState(false);
  const [dsLog, setDsLog] = useState<string | null>(null);

  const handleCreateZoomMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoomTopic) return;
    setIsCreatingZoom(true);
    setZoomLog(null);

    try {
      const res = await fetch('/api/zoom/create-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: zoomTopic,
          durationMinutes: zoomDuration,
          hostEmail: zoomHost,
        }),
      });
      const data = await res.json();
      if (data.meeting) {
        setZoomMeetings([data.meeting, ...zoomMeetings]);
        setZoomLog(`Zoom Meeting "${data.meeting.meetingTopic}" created! Join URL: ${data.meeting.joinUrl}`);
        setZoomTopic('');
      }
    } catch (err: any) {
      setZoomLog(`Error creating Zoom meeting: ${err.message}`);
    } finally {
      setIsCreatingZoom(false);
    }
  };

  const handleSendDocuSignEnvelope = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dsTitle || !dsEmail) return;
    setIsSendingDs(true);
    setDsLog(null);

    try {
      const res = await fetch('/api/docusign/send-envelope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentTitle: dsTitle,
          recipientEmail: dsEmail,
          recipientName: dsName || dsEmail,
        }),
      });
      const data = await res.json();
      if (data.envelope) {
        setDocusignEnvelopes([data.envelope, ...docusignEnvelopes]);
        setDsLog(`DocuSign Envelope ${data.envelope.docusignEnvelopeId} dispatched to ${data.envelope.recipientEmail}.`);
        setDsTitle('');
        setDsEmail('');
        setDsName('');
      }
    } catch (err: any) {
      setDsLog(`DocuSign error: ${err.message}`);
    } finally {
      setIsSendingDs(false);
    }
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Zoom Enterprise Video Conferencing & DocuSign Legal E-Sign Suite
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800 font-mono">
            ZOOM & DOCUSIGN LIVE APIS
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Schedule instant global video negotiations, generate legal Zoom meeting passcodes, and dispatch legally binding DocuSign envelopes with real-time electronic signature audit trails.
        </p>
      </div>

      {/* Zoom Meetings & DocuSign Interactive Split Panels */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zoom Meetings Form & Scheduler */}
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-400" /> Schedule Zoom Enterprise Video Conference
            </h2>
            <span className="text-[11px] font-mono text-blue-400">HD Video & Audio</span>
          </div>

          <form onSubmit={handleCreateZoomMeeting} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Meeting Topic / Trade Subject</label>
              <input
                type="text"
                placeholder="e.g. Contract Negotiation with Rotterdam Port Authority"
                value={zoomTopic}
                onChange={(e) => setZoomTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Duration (Minutes)</label>
                <input
                  type="number"
                  value={zoomDuration}
                  onChange={(e) => setZoomDuration(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Host Account Email</label>
                <input
                  type="email"
                  value={zoomHost}
                  onChange={(e) => setZoomHost(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreatingZoom}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCreatingZoom ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Generate Zoom Meeting & Link
            </button>

            {zoomLog && (
              <div className="p-3 bg-slate-950 border border-blue-900/80 text-blue-300 rounded-none font-mono text-xs">
                {zoomLog}
              </div>
            )}
          </form>
        </div>

        {/* DocuSign Legal Contract Dispatch Form */}
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" /> Dispatch DocuSign Legal E-Signature Envelope
            </h2>
            <span className="text-[11px] font-mono text-emerald-400">eIDAS & ESIGN Compliant</span>
          </div>

          <form onSubmit={handleSendDocuSignEnvelope} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Document Title / Contract Name</label>
              <input
                type="text"
                placeholder="e.g. Master Supply Agreement 2026.pdf"
                value={dsTitle}
                onChange={(e) => setDsTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Signer Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lukas Weber"
                  value={dsName}
                  onChange={(e) => setDsName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Signer Email Address</label>
                <input
                  type="email"
                  placeholder="signer@company.com"
                  value={dsEmail}
                  onChange={(e) => setDsEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSendingDs}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSendingDs ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileCheck className="w-4 h-4" />}
              Dispatch DocuSign Envelope
            </button>

            {dsLog && (
              <div className="p-3 bg-slate-950 border border-emerald-900/80 text-emerald-300 rounded-none font-mono text-xs">
                {dsLog}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Zoom Meetings Active Schedule Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-400" /> Zoom Enterprise Video Schedule Matrix
          </h2>
          <span className="text-xs font-mono text-slate-400">{zoomMeetings.length} Scheduled Sessions</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Meeting Topic</th>
                <th className="p-3">Schedule Time</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Host Account</th>
                <th className="p-3">Passcode</th>
                <th className="p-3">Join Link</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {zoomMeetings.map((m) => (
                <tr key={m.id} className="hover:bg-slate-850">
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">{m.meetingTopic}</td>
                  <td className="p-3 font-mono text-slate-300 text-[11px] whitespace-nowrap">{m.startDateTime}</td>
                  <td className="p-3 font-mono text-slate-400 whitespace-nowrap">{m.durationMinutes} mins</td>
                  <td className="p-3 font-mono text-blue-400 text-[11px] whitespace-nowrap">{m.hostEmail}</td>
                  <td className="p-3 font-mono text-amber-400 whitespace-nowrap">{m.passcode}</td>
                  <td className="p-3 font-mono text-blue-400 text-[11px] max-w-xs truncate">
                    <a href={m.joinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      {m.joinUrl} <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-blue-950 text-blue-400 border border-blue-800 font-mono text-[10px]">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DocuSign E-Signature Audit Log Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" /> DocuSign Electronic Signature Audit Matrix
          </h2>
          <span className="text-xs font-mono text-slate-400">{docusignEnvelopes.length} Active Envelopes</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Envelope ID</th>
                <th className="p-3">Contract Title</th>
                <th className="p-3">Recipient Name</th>
                <th className="p-3">Recipient Email</th>
                <th className="p-3">Dispatched At</th>
                <th className="p-3">Signature Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {docusignEnvelopes.map((e) => (
                <tr key={e.id} className="hover:bg-slate-850">
                  <td className="p-3 font-mono text-emerald-400 font-bold whitespace-nowrap">{e.docusignEnvelopeId}</td>
                  <td className="p-3 font-semibold text-slate-100 max-w-xs truncate">{e.documentTitle}</td>
                  <td className="p-3 text-slate-200 whitespace-nowrap">{e.recipientName}</td>
                  <td className="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">{e.recipientEmail}</td>
                  <td className="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">{e.sentAt}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono border ${
                        e.status === 'SIGNED'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border-amber-800'
                      }`}
                    >
                      {e.status}
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
