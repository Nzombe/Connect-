import React, { useState } from 'react';
import { 
  QrCode, 
  Download, 
  Plus, 
  Copy, 
  Check, 
  ExternalLink, 
  Wifi, 
  Phone, 
  Mail, 
  UserCheck, 
  Coins, 
  FileText, 
  Scan, 
  Sparkles 
} from 'lucide-react';
import { UniversalQrPayload } from '../types';

export const UniversalQrStudioModule: React.FC = () => {
  const [qrList, setQrList] = useState<UniversalQrPayload[]>([
    {
      id: 'qr-1',
      title: 'Connect AI Global Marketplace Gateway',
      qrType: 'URL',
      payloadContent: 'https://connectai.trade/marketplace',
      qrDataUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fconnectai.trade%2Fmarketplace&color=0f172a&bgcolor=f8fafc',
      createdDate: '2026-07-29',
      scanCount: 1420,
    },
    {
      id: 'qr-2',
      title: 'Rotterdam Port Guest WiFi Hotspot',
      qrType: 'WIFI',
      payloadContent: 'WIFI:S:RotterdamPort_5G;T:WPA;P:trade_secure_2026;;',
      qrDataUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WIFI%3AS%3ARotterdamPort_5G%3BT%3AWPA%3BP%3Atrade_secure_2026%3B%3B&color=0f172a&bgcolor=f8fafc',
      createdDate: '2026-07-28',
      scanCount: 890,
    },
    {
      id: 'qr-3',
      title: 'Digital Executive vCard - Lukas Weber',
      qrType: 'VCARD',
      payloadContent: 'BEGIN:VCARD\nVERSION:3.0\nN:Weber;Lukas;;;\nFN:Lukas Weber\nORG:Hamburg Logistics GMBH\nTEL;TYPE=CELL:+491512345678\nEMAIL:l.weber@hamburg-logistics.de\nEND:VCARD',
      qrDataUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3AWeber%3BLukas%0AFN%3ALukas+Weber%0AEND%3AVCARD&color=0f172a&bgcolor=f8fafc',
      createdDate: '2026-07-27',
      scanCount: 520,
    },
  ]);

  // Form state for generating QR code for ANYTHING
  const [qrType, setQrType] = useState<'URL' | 'VCARD' | 'WIFI' | 'PHONE' | 'EMAIL' | 'CRYPTO' | 'TEXT'>('URL');
  const [qrTitle, setQrTitle] = useState('');
  
  // Specific field inputs
  const [urlInput, setUrlInput] = useState('https://connectai.trade');
  const [phoneInput, setPhoneInput] = useState('+14158829910');
  const [emailInput, setEmailInput] = useState('contact@connectai.trade');
  const [wifiSsid, setWifiSsid] = useState('TradeNetwork_5G');
  const [wifiPass, setWifiPass] = useState('ConnectAI2026!');
  const [vName, setVName] = useState('Nzombet Enterprise');
  const [vEmail, setVEmail] = useState('nzombet43@gmail.com');
  const [vPhone, setVPhone] = useState('+14158829910');
  const [cryptoAddress, setCryptoAddress] = useState('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
  const [cryptoCurrency, setCryptoCurrency] = useState('USDT / Ethereum');
  const [customTextInput, setCustomTextInput] = useState('Connect AI Universal Payload Data');

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentActiveQr, setCurrentActiveQr] = useState<UniversalQrPayload | null>(qrList[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getComputedPayload = () => {
    switch (qrType) {
      case 'URL':
        return urlInput;
      case 'PHONE':
        return `tel:${phoneInput}`;
      case 'EMAIL':
        return `mailto:${emailInput}?subject=Connect%20AI%20Trade%20Inquiry`;
      case 'WIFI':
        return `WIFI:S:${wifiSsid};T:WPA;P:${wifiPass};;`;
      case 'VCARD':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vName}\nEMAIL:${vEmail}\nTEL:${vPhone}\nEND:VCARD`;
      case 'CRYPTO':
        return `ethereum:${cryptoAddress}`;
      case 'TEXT':
        return customTextInput;
      default:
        return urlInput;
    }
  };

  const handleGenerateQr = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const rawPayload = getComputedPayload();
    const title = qrTitle || `${qrType} QR Payload`;

    try {
      const res = await fetch('/api/qr/generate-universal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          qrType,
          payloadContent: rawPayload,
        }),
      });
      const data = await res.json();
      if (data.qrPayload) {
        setQrList([data.qrPayload, ...qrList]);
        setCurrentActiveQr(data.qrPayload);
        setQrTitle('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPayload = (payloadStr: string, id: string) => {
    navigator.clipboard.writeText(payloadStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Universal Dynamic QR Code Generator & Scanner Studio
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
            ANYTHING & EVERYTHING QR ENCODER
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Create high-resolution vector QR codes for any website URL, phone number, email address, WiFi network credentials, digital vCards, crypto wallets, or custom text. High-density scanning & instant PNG export.
        </p>
      </div>

      {/* Generator & Live QR Card Preview Split Grid */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Controls */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Encode Payload for QR Code
            </h2>
            <span className="text-[11px] font-mono text-indigo-400">Universal Type Switcher</span>
          </div>

          {/* QR Type Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            {[
              { type: 'URL', label: 'Website URL', icon: <ExternalLink className="w-3.5 h-3.5" /> },
              { type: 'VCARD', label: 'vCard Contact', icon: <UserCheck className="w-3.5 h-3.5" /> },
              { type: 'WIFI', label: 'WiFi Hotspot', icon: <Wifi className="w-3.5 h-3.5" /> },
              { type: 'PHONE', label: 'Phone Number', icon: <Phone className="w-3.5 h-3.5" /> },
              { type: 'EMAIL', label: 'Email Address', icon: <Mail className="w-3.5 h-3.5" /> },
              { type: 'CRYPTO', label: 'Crypto Wallet', icon: <Coins className="w-3.5 h-3.5" /> },
              { type: 'TEXT', label: 'Custom Text', icon: <FileText className="w-3.5 h-3.5" /> },
            ].map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => setQrType(item.type as any)}
                className={`p-2 border flex items-center gap-1.5 transition-colors text-[11px] ${
                  qrType === item.type
                    ? 'bg-indigo-950 border-indigo-600 text-indigo-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleGenerateQr} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">QR Code Title / Reference</label>
              <input
                type="text"
                placeholder="e.g. My Website / WhatsApp Direct Line"
                value={qrTitle}
                onChange={(e) => setQrTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Dynamic Input Fields Based on Selection */}
            {qrType === 'URL' && (
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Website Target URL</label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>
            )}

            {qrType === 'PHONE' && (
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>
            )}

            {qrType === 'EMAIL' && (
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Recipient Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>
            )}

            {qrType === 'WIFI' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">WiFi SSID (Network Name)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">WiFi WPA/WPA2 Password</label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {qrType === 'VCARD' && (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={vName}
                    onChange={(e) => setVName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={vEmail}
                    onChange={(e) => setVEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Phone</label>
                  <input
                    type="text"
                    value={vPhone}
                    onChange={(e) => setVPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {qrType === 'CRYPTO' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Crypto Currency</label>
                  <input
                    type="text"
                    value={cryptoCurrency}
                    onChange={(e) => setCryptoCurrency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Wallet Address</label>
                  <input
                    type="text"
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {qrType === 'TEXT' && (
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Custom Payload String / Text</label>
                <textarea
                  rows={2}
                  value={customTextInput}
                  onChange={(e) => setCustomTextInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Render Universal High-Res QR Code
            </button>
          </form>
        </div>

        {/* Live Active QR Image Display Box */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-none flex flex-col items-center justify-between space-y-4">
          <div className="w-full border-b border-slate-800 pb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 uppercase font-mono">
              Live QR Render Output
            </span>
            <span className="text-[11px] font-mono text-indigo-400">300x300 Vector PNG</span>
          </div>

          {currentActiveQr ? (
            <div className="flex flex-col items-center space-y-3 p-4 bg-white border-2 border-slate-700">
              <img
                src={currentActiveQr.qrDataUrl}
                alt={currentActiveQr.title}
                className="w-44 h-44 object-contain"
              />
              <span className="text-xs font-bold text-slate-900 font-mono text-center max-w-xs truncate">
                {currentActiveQr.title}
              </span>
            </div>
          ) : (
            <div className="w-44 h-44 bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 font-mono text-xs">
              No QR Selected
            </div>
          )}

          {currentActiveQr && (
            <div className="w-full space-y-2 text-xs">
              <a
                href={currentActiveQr.qrDataUrl}
                target="_blank"
                download="connectai-qr.png"
                rel="noopener noreferrer"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download High-Res PNG QR
              </a>
              <button
                onClick={() => handleCopyPayload(currentActiveQr.payloadContent, currentActiveQr.id)}
                className="w-full py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-[11px] flex items-center justify-center gap-1.5"
              >
                {copiedId === currentActiveQr.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Raw Payload
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Generated Universal QR Code Matrix Table - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <QrCode className="w-4 h-4 text-indigo-400" /> Encoded QR Code Repository Matrix
          </h2>
          <span className="text-xs font-mono text-slate-400">{qrList.length} Active QR Payloads</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Reference Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Payload String</th>
                <th className="p-3">Scans</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
              {qrList.map((qr) => (
                <tr key={qr.id} className="hover:bg-slate-850">
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">{qr.title}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-800 text-[10px]">
                      {qr.qrType}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 max-w-xs truncate">{qr.payloadContent}</td>
                  <td className="p-3 text-emerald-400 font-bold whitespace-nowrap">{qr.scanCount} scans</td>
                  <td className="p-3 text-slate-400 whitespace-nowrap">{qr.createdDate}</td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => setCurrentActiveQr(qr)}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-mono flex items-center gap-1"
                    >
                      <Scan className="w-3 h-3" /> View & Print
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
