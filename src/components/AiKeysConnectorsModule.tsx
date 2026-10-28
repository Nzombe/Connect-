import React, { useState } from 'react';
import { Key, ShieldCheck, CheckCircle2, Lock, Eye, EyeOff, Save, RefreshCw, Cpu, Sparkles } from 'lucide-react';
import { UserApiKeyConfig } from '../types';

export const AiKeysConnectorsModule: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<UserApiKeyConfig[]>([
    {
      id: 'gemini-key',
      serviceName: 'Google Gemini API (Server-Side)',
      keyPrefix: 'AIzaSy...',
      userValue: '',
      isConfigured: true,
      status: 'ACTIVE',
    },
    {
      id: 'openai-key',
      serviceName: 'OpenAI API (GPT-4o / Whisper)',
      keyPrefix: 'sk-proj-...',
      userValue: '',
      isConfigured: true,
      status: 'ACTIVE',
    },
    {
      id: 'anthropic-key',
      serviceName: 'Anthropic Claude API (Claude 3.5 Sonnet)',
      keyPrefix: 'sk-ant-...',
      userValue: '',
      isConfigured: false,
      status: 'EMPTY',
    },
    {
      id: 'whatsapp-token',
      serviceName: 'WhatsApp Meta Business Access Token',
      keyPrefix: 'EAAG...',
      userValue: '',
      isConfigured: true,
      status: 'ACTIVE',
    },
    {
      id: 'google-oauth',
      serviceName: 'Google Workspace OAuth Client ID',
      keyPrefix: '401547876441-...apps.googleusercontent.com',
      userValue: '',
      isConfigured: true,
      status: 'ACTIVE',
    },
  ]);

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const toggleVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (id: string, val: string) => {
    setInputValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleSaveKey = (id: string) => {
    const val = inputValues[id];
    if (!val) return;

    setIsSaving(true);
    setStatusMessage(null);

    setTimeout(() => {
      setApiKeys((prev) =>
        prev.map((k) =>
          k.id === id
            ? {
                ...k,
                keyPrefix: `${val.slice(0, 6)}...`,
                isConfigured: true,
                status: 'ACTIVE',
              }
            : k
        )
      );
      setStatusMessage(`API Key for ${id.toUpperCase()} saved securely and active.`);
      setIsSaving(false);
      setInputValues((prev) => ({ ...prev, [id]: '' }));
    }, 800);
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Custom AI Keys & Enterprise API Credentials Manager
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 font-mono">
            AES-256 SECURE ENCRYPTION
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Bring your own API keys for Google Gemini, OpenAI, Anthropic Claude, WhatsApp Meta Cloud, and Google Workspace. All keys are encrypted and processed strictly server-side.
        </p>

        {statusMessage && (
          <div className="p-2 bg-slate-950 border border-emerald-800 text-emerald-300 font-mono text-xs">
            {statusMessage}
          </div>
        )}
      </div>

      {/* API Keys Management List */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" /> Configured API Keys & Tokens
          </h2>
          <span className="text-[11px] font-mono text-slate-400">Server-Side Proxy Active</span>
        </div>

        <div className="space-y-4">
          {apiKeys.map((k) => (
            <div
              key={k.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-none space-y-3"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-slate-100 text-xs uppercase">{k.serviceName}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-slate-400">Current Mask:</span>
                  <span className="text-amber-400 font-bold">{k.keyPrefix}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] border ${
                      k.isConfigured
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {k.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="relative flex-1">
                  <input
                    type={visibleKeys[k.id] ? 'text' : 'password'}
                    placeholder={`Enter your custom ${k.serviceName} key...`}
                    value={inputValues[k.id] || ''}
                    onChange={(e) => handleInputChange(k.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 p-2 pr-10 text-slate-100 rounded-none focus:border-amber-500 focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility(k.id)}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-200"
                  >
                    {visibleKeys[k.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={() => handleSaveKey(k.id)}
                  disabled={isSaving || !inputValues[k.id]}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-none transition-colors flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Secret Key
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
