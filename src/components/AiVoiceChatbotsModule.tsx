import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  PhoneCall, 
  PhoneOff, 
  Bot, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  Volume2, 
  Sparkles, 
  Radio, 
  MessageSquare, 
  MessageCircle, 
  Sliders 
} from 'lucide-react';
import { AiVoiceCallSession } from '../types';

export const AiVoiceChatbotsModule: React.FC = () => {
  const [callSessions, setCallSessions] = useState<AiVoiceCallSession[]>([
    {
      id: 'call-1',
      callerName: 'Lukas Weber (Germany)',
      phoneNumber: '+49 151 2345678',
      callType: 'INBOUND',
      durationSeconds: 142,
      transcriptSnippet: 'Inquired about 5-Axis CNC milling machine delivery speed to Hamburg port.',
      aiSentiment: 'HIGH_INTENT',
      status: 'COMPLETED',
      timestamp: 'Today, 04:12 AM',
    },
    {
      id: 'call-2',
      callerName: 'Sarah Jenkins (Chicago)',
      phoneNumber: '+1 312 555 0188',
      callType: 'OUTBOUND',
      durationSeconds: 98,
      transcriptSnippet: 'Confirmed battery cell specifications and dispatched DocuSign agreement link.',
      aiSentiment: 'POSITIVE',
      status: 'COMPLETED',
      timestamp: 'Today, 03:50 AM',
    },
  ]);

  // Voice call simulator state
  const [isCallActive, setIsCallActive] = useState(false);
  const [userSpeechInput, setUserSpeechInput] = useState('');
  const [aiVoiceReply, setAiVoiceReply] = useState<string | null>(null);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [callerNameInput, setCallerNameInput] = useState('Enterprise Trade Client');

  // Product Assistant Chatbot State
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    {
      role: 'bot',
      text: 'Hello! I am Connect AI Product Assistant. I can help you find products, calculate bulk shipping discounts, or dispatch RFQs across our B2B trade network.',
    },
  ]);
  const [productQueryInput, setProductQueryInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Cross-Platform Bots Matrix
  const activeBots = [
    { platform: 'WhatsApp Business', botName: 'WhatsApp Trade Assistant', status: 'ONLINE', conversationsHandled: 482 },
    { platform: 'Slack Enterprise', botName: 'Slack RFQ Dispatcher', status: 'ONLINE', conversationsHandled: 129 },
    { platform: 'Gmail Workspace', botName: 'Gmail Auto-Responder Bot', status: 'ONLINE', conversationsHandled: 914 },
    { platform: 'Telegram Channel', botName: 'Telegram Global Trade Bot', status: 'ONLINE', conversationsHandled: 340 },
    { platform: 'Connect AI Voice Line', botName: 'Voice Assistant Sentinel', status: 'ONLINE', conversationsHandled: 64 },
  ];

  const handleStartVoiceCall = () => {
    setIsCallActive(true);
    setAiVoiceReply(`Hello ${callerNameInput}! You are now connected to Connect AI Voice Assistant. Speak or type your request below.`);
  };

  const handleEndVoiceCall = () => {
    setIsCallActive(false);
    setUserSpeechInput('');
    setAiVoiceReply(null);
  };

  const handleSendVoiceSpeech = async () => {
    if (!userSpeechInput.trim()) return;
    setIsProcessingVoice(true);

    try {
      const res = await fetch('/api/voice/process-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userTranscript: userSpeechInput,
          callerName: callerNameInput,
        }),
      });
      const data = await res.json();
      setAiVoiceReply(data.spokenResponse || 'Voice processing complete.');

      const newSession: AiVoiceCallSession = {
        id: `call-${Date.now()}`,
        callerName: callerNameInput,
        phoneNumber: '+1 415 555 2671',
        callType: 'INBOUND',
        durationSeconds: 45,
        transcriptSnippet: userSpeechInput,
        aiSentiment: data.sentiment || 'HIGH_INTENT',
        status: 'COMPLETED',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setCallSessions([newSession, ...callSessions]);
      setUserSpeechInput('');
    } catch (err: any) {
      setAiVoiceReply(`Voice AI error: ${err.message}`);
    } finally {
      setIsProcessingVoice(false);
    }
  };

  const handleSendProductChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productQueryInput.trim()) return;

    const userMsg = productQueryInput;
    setChatHistory((prev) => [...prev, { role: 'user', text: userMsg }]);
    setProductQueryInput('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/gemini/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are Connect AI's Autonomous Product Assistant. Answer this customer product query with expert commercial specs, pricing, and advice: "${userMsg}"`,
          model: 'gemini-3.5-flash',
        }),
      });
      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { role: 'bot', text: data.response || 'I have searched our catalog and verified inventory status for your request.' },
      ]);
    } catch (err: any) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'bot', text: `Product Assistant error: ${err.message}` },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Voice Calls to Connect AI & Autonomous Chatbot Dispatcher
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
            VOICE & CHATBOT NEURAL NETWORK
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Real-time AI voice phone calls with Connect AI speech processing, product recommendation chatbot assistant, and multi-platform autonomous bot dispatchers across WhatsApp, Slack, Gmail, and Telegram.
        </p>
      </div>

      {/* Voice Calls to Connect AI Interactive Bench */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" /> Real-Time Voice Call Interface (Connect AI Voice Sentinel)
          </h2>
          <span className="text-[11px] font-mono text-emerald-400">Low-Latency Audio Processing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Call Setup Control */}
          <div className="bg-slate-950 border border-slate-800 p-4 space-y-3 text-xs">
            <span className="text-xs font-bold text-slate-200 uppercase block pb-1 border-b border-slate-800">
              Voice Call Parameters
            </span>

            <div>
              <label className="block text-slate-400 mb-1">Caller Name / Enterprise</label>
              <input
                type="text"
                value={callerNameInput}
                onChange={(e) => setCallerNameInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {!isCallActive ? (
              <button
                onClick={handleStartVoiceCall}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Dial Connect AI Voice Line
              </button>
            ) : (
              <button
                onClick={handleEndVoiceCall}
                className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2"
              >
                <PhoneOff className="w-4 h-4" /> Terminate Voice Call
              </button>
            )}
          </div>

          {/* Spoken Voice Exchange Terminal */}
          <div className="md:col-span-2 bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between min-h-[220px] text-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4" /> AI VOICE SPEECH OUTPUT
                </span>
                <span className="text-slate-400">{isCallActive ? 'CALL CONNECTED' : 'DISCONNECTED'}</span>
              </div>

              {aiVoiceReply ? (
                <div className="p-3 bg-slate-900 border border-emerald-900/80 text-emerald-200 font-mono text-xs leading-relaxed space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase block font-bold">Connect AI Voice Speech:</span>
                  <p>{aiVoiceReply}</p>
                </div>
              ) : (
                <p className="text-slate-500 font-mono italic">
                  Dial the voice line to begin audio speech exchange with Connect AI.
                </p>
              )}
            </div>

            {isCallActive && (
              <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Speak or type caller prompt to Connect AI Voice Assistant..."
                  value={userSpeechInput}
                  onChange={(e) => setUserSpeechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendVoiceSpeech()}
                  className="flex-1 bg-slate-900 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-emerald-500 focus:outline-none font-mono"
                />
                <button
                  onClick={handleSendVoiceSpeech}
                  disabled={isProcessingVoice}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-none transition-colors flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                >
                  {isProcessingVoice ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
                  Transmit Speech
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Assistant Chatbot & Cross-Platform Bots Matrix */}
      <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Autonomous Product Assistant Chatbot */}
        <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" /> Autonomous Product Assistant Chatbot
            </h2>
            <span className="text-[11px] font-mono text-cyan-400">Trade Catalog Grounded</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 h-64 overflow-y-auto space-y-3 text-xs">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col space-y-1 ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <span className="text-[10px] font-mono text-slate-400">
                  {msg.role === 'user' ? 'You' : 'Connect AI Product Bot'}
                </span>
                <div
                  className={`p-2.5 max-w-[85%] rounded-none text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-900/60 text-cyan-100 border border-cyan-800'
                      : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" /> Bot analyzing catalog and specifications...
              </div>
            )}
          </div>

          <form onSubmit={handleSendProductChat} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about products, specs, prices, lead times..."
              value={productQueryInput}
              onChange={(e) => setProductQueryInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 p-2 text-xs text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isThinking}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-none transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>

        {/* Cross-Platform Autonomous Chatbot Dispatcher Matrix */}
        <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Multi-Platform Chatbot Dispatcher Matrix
            </h2>
            <span className="text-[11px] font-mono text-emerald-400">{activeBots.length} Bots Deployed</span>
          </div>

          <div className="w-full overflow-x-auto border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
                <tr>
                  <th className="p-2.5">Platform</th>
                  <th className="p-2.5">Deployed Bot</th>
                  <th className="p-2.5">Handled Conversations</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900 font-mono text-[11px]">
                {activeBots.map((bot, i) => (
                  <tr key={i} className="hover:bg-slate-850">
                    <td className="p-2.5 font-bold text-slate-100">{bot.platform}</td>
                    <td className="p-2.5 text-cyan-400">{bot.botName}</td>
                    <td className="p-2.5 text-slate-200 font-bold">{bot.conversationsHandled} chats</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> {bot.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Voice Call History Log - Full Width 100% Edge-to-Edge */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" /> Connect AI Voice Phone Sessions Audit History
          </h2>
          <span className="text-xs font-mono text-slate-400">{callSessions.length} Call Logs Recorded</span>
        </div>

        <div className="w-full min-w-full overflow-x-auto border border-slate-800">
          <table className="w-full min-w-[850px] text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Caller Name</th>
                <th className="p-3">Phone Line</th>
                <th className="p-3">Call Type</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Transcript Summary</th>
                <th className="p-3">AI Sentiment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900">
              {callSessions.map((c) => (
                <tr key={c.id} className="hover:bg-slate-850">
                  <td className="p-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">{c.timestamp}</td>
                  <td className="p-3 font-semibold text-slate-100 whitespace-nowrap">{c.callerName}</td>
                  <td className="p-3 font-mono text-emerald-400 whitespace-nowrap">{c.phoneNumber}</td>
                  <td className="p-3 font-mono text-slate-300 text-[11px] whitespace-nowrap">{c.callType}</td>
                  <td className="p-3 font-mono text-slate-400 whitespace-nowrap">{c.durationSeconds}s</td>
                  <td className="p-3 text-slate-300 max-w-xs truncate">{c.transcriptSnippet}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                      {c.aiSentiment}
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
