import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Volume2, 
  Image as ImageIcon, 
  Video, 
  Search, 
  MapPin, 
  Brain, 
  RefreshCw, 
  Sliders, 
  Play, 
  FileText 
} from 'lucide-react';
import { GeminiChatMessage, GenerateImageOptions, GenerateVideoOptions } from '../types';

export const GeminiStudioModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'tts' | 'image' | 'video'>('chat');

  // Chat State
  const [messages, setMessages] = useState<GeminiChatMessage[]>([
    {
      id: 'msg-1',
      role: 'model',
      text: 'Connect AI Multimodal Engine active. How can I assist your business communications, logistics, or content workflow today?',
      timestamp: 'Just now',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [systemRole, setSystemRole] = useState('You are an expert global business trade, auto-responder, and multi-channel marketing AI assistant.');
  const [selectedModel, setSelectedModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite'>('gemini-3.5-flash');
  const [enableThinking, setEnableThinking] = useState(false);
  const [enableSearch, setEnableSearch] = useState(true);
  const [enableMaps, setEnableMaps] = useState(false);
  const [isGeneratingChat, setIsGeneratingChat] = useState(false);

  // TTS State
  const [ttsText, setTtsText] = useState('Your wholesale consignment has been verified and cleared for international export.');
  const [ttsVoice, setTtsVoice] = useState('Zephyr');
  const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
  const [isGeneratingTts, setIsGeneratingTts] = useState(false);

  // Image Gen State
  const [imgOptions, setImgOptions] = useState<GenerateImageOptions>({
    prompt: 'Sleek high-tech cargo container freight terminal with automated electric trucks',
    aspectRatio: '16:9',
    imageSize: '1K',
    quality: 'pro',
  });
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  // Video Gen State
  const [videoOptions, setVideoOptions] = useState<GenerateVideoOptions>({
    prompt: 'Autonomous logistics drone transporting a package over a modern container port',
    aspectRatio: '16:9',
    resolution: '720p',
  });
  const [videoOperationName, setVideoOperationName] = useState<string | null>(null);
  const [videoStatusText, setVideoStatusText] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  // Handlers
  const handleSendChat = async () => {
    if (!inputPrompt.trim()) return;

    const userMsg: GeminiChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: inputPrompt,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsGeneratingChat(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg.text,
          model: selectedModel,
          systemInstruction: systemRole,
          enableThinking,
          enableSearch,
          enableMaps,
        }),
      });

      const data = await res.json();
      const modelMsg: GeminiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        text: data.text || 'Response received.',
        timestamp: new Date().toLocaleTimeString(),
        groundingSources: data.groundingSources,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      const errorMsg: GeminiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        text: `Error: ${err.message || 'Failed to communicate with AI model.'}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsGeneratingChat(false);
    }
  };

  const handleGenerateTts = async () => {
    setIsGeneratingTts(true);
    setTtsAudioUrl(null);
    try {
      const res = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ttsText, voiceName: ttsVoice }),
      });
      const data = await res.json();
      if (data.audioBase64) {
        // Convert base64 PCM raw bytes to a playable data URI audio or Blob
        setTtsAudioUrl(`data:audio/wav;base64,${data.audioBase64}`);
      }
    } catch (err: any) {
      console.error('TTS Error:', err);
    } finally {
      setIsGeneratingTts(false);
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImg(true);
    setGeneratedImageUrl(null);
    try {
      const res = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imgOptions),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
      }
    } catch (err: any) {
      console.error('Image Error:', err);
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const handleGenerateVideo = async () => {
    setIsGeneratingVideo(true);
    setVideoOperationName(null);
    setVideoStatusText('Initializing Veo 3.1 video generation request...');

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoOptions),
      });
      const data = await res.json();
      if (data.operationName) {
        setVideoOperationName(data.operationName);
        setVideoStatusText(`Operation ID: ${data.operationName}. Video rendering in progress...`);
      }
    } catch (err: any) {
      setVideoStatusText(`Video Error: ${err.message || 'Operation failed'}`);
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="w-full min-w-full overflow-y-auto overflow-x-auto p-4 space-y-6 bg-slate-950 text-slate-100">
      {/* Title */}
      <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h1 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Gemini AI Multimodal Studio
            </h1>
          </div>
          <span className="text-xs px-2.5 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
            GEMINI 3.5 & 3.1 PRO ACTIVE
          </span>
        </div>
        <p className="text-xs text-slate-400 max-w-4xl">
          Multi-turn AI Chatbot, Thinking Mode, Search & Maps Grounding, Text-To-Speech (TTS), High-Quality Image Studio, and Veo Video Generation.
        </p>

        {/* Studio Sub-Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 rounded-none border ${
              activeSubTab === 'chat' ? 'bg-slate-800 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Chatbot
          </button>
          <button
            onClick={() => setActiveSubTab('tts')}
            className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 rounded-none border ${
              activeSubTab === 'tts' ? 'bg-slate-800 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" /> Text to Speech (TTS)
          </button>
          <button
            onClick={() => setActiveSubTab('image')}
            className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 rounded-none border ${
              activeSubTab === 'image' ? 'bg-slate-800 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Image Studio
          </button>
          <button
            onClick={() => setActiveSubTab('video')}
            className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 rounded-none border ${
              activeSubTab === 'video' ? 'bg-slate-800 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Veo 3.1 Video
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CHATBOT */}
      {activeSubTab === 'chat' && (
        <div className="w-full min-w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-800">
              AI Chatbot Parameters
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Model Selection</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none font-mono"
                >
                  <option value="gemini-3.5-flash">gemini-3.5-flash (General)</option>
                  <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex Reasoning)</option>
                  <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Low Latency)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">System Role & Instruction</label>
                <textarea
                  rows={3}
                  value={systemRole}
                  onChange={(e) => setSystemRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableThinking}
                    onChange={(e) => setEnableThinking(e.target.checked)}
                    disabled={selectedModel !== 'gemini-3.1-pro-preview'}
                    className="accent-cyan-500 rounded-none"
                  />
                  <span className="text-slate-300 font-medium flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5 text-purple-400" /> High Thinking Mode (Pro model only)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSearch}
                    onChange={(e) => setEnableSearch(e.target.checked)}
                    className="accent-cyan-500 rounded-none"
                  />
                  <span className="text-slate-300 font-medium flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-blue-400" /> Google Search Grounding
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableMaps}
                    onChange={(e) => setEnableMaps(e.target.checked)}
                    className="accent-cyan-500 rounded-none"
                  />
                  <span className="text-slate-300 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Google Maps Grounding
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Chat Conversation Thread */}
          <div className="lg:col-span-2 w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none flex flex-col h-[520px]">
            <div className="pb-2 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Conversation Thread ({messages.length} messages)
              </h2>
              <span className="text-[11px] font-mono text-cyan-400">{selectedModel}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-950 border border-slate-800/80 my-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-3 text-xs rounded-none border ${
                    m.role === 'user'
                      ? 'bg-slate-850 border-cyan-800/80 text-slate-100 ml-8'
                      : 'bg-slate-900 border-slate-800 text-slate-200 mr-8'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 font-mono text-[10px] text-slate-400">
                    <span className="font-bold uppercase text-cyan-400">{m.role}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>

                  {m.groundingSources && m.groundingSources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-800 space-y-1 text-[11px] font-mono">
                      <span className="text-slate-400 font-semibold block">Grounding Sources:</span>
                      {m.groundingSources.map((s, idx) => (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-cyan-400 hover:underline truncate"
                        >
                          • {s.title} ({s.url})
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Gemini AI anything..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                className="flex-1 bg-slate-950 border border-slate-800 p-2.5 text-xs text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
              />
              <button
                onClick={handleSendChat}
                disabled={isGeneratingChat}
                className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-none transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isGeneratingChat ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TEXT TO SPEECH (TTS) */}
      {activeSubTab === 'tts' && (
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400" /> Gemini TTS Audio Generator
            </h2>
            <span className="text-[11px] font-mono text-cyan-400">gemini-3.1-flash-tts-preview</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Text Input</label>
                <textarea
                  rows={4}
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Voice Profile</label>
                <select
                  value={ttsVoice}
                  onChange={(e) => setTtsVoice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none font-mono"
                >
                  <option value="Zephyr">Zephyr (Balanced Male)</option>
                  <option value="Kore">Kore (Clear Female)</option>
                  <option value="Puck">Puck (Energetic)</option>
                  <option value="Charon">Charon (Deep Voice)</option>
                  <option value="Fenrir">Fenrir (Authoritative)</option>
                </select>
              </div>

              <button
                onClick={handleGenerateTts}
                disabled={isGeneratingTts}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingTts ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Speech...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" /> Synthesize Voice Speech
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-none flex flex-col items-center justify-center space-y-3">
              <span className="text-xs font-mono text-slate-400">AUDIO OUTPUT PLAYER</span>
              {ttsAudioUrl ? (
                <div className="w-full space-y-2 text-center">
                  <audio controls src={ttsAudioUrl} className="w-full" />
                  <span className="text-[10px] font-mono text-emerald-400 block">
                    24kHz Audio Stream Generated
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-500 font-mono">
                  No audio generated yet. Click synthesize above.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: IMAGE STUDIO */}
      {activeSubTab === 'image' && (
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-cyan-400" /> High-Quality Gemini Image Generator & Editor
            </h2>
            <span className="text-[11px] font-mono text-cyan-400">gemini-3.1-flash-image</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Image Prompt Description</label>
                <textarea
                  rows={3}
                  value={imgOptions.prompt}
                  onChange={(e) => setImgOptions({ ...imgOptions, prompt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Aspect Ratio</label>
                  <select
                    value={imgOptions.aspectRatio}
                    onChange={(e) => setImgOptions({ ...imgOptions, aspectRatio: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none font-mono"
                  >
                    <option value="1:1">1:1 Square</option>
                    <option value="16:9">16:9 Widescreen</option>
                    <option value="9:16">9:16 Mobile Vertical</option>
                    <option value="4:3">4:3 Standard</option>
                    <option value="21:9">21:9 UltraWide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Resolution Size</label>
                  <select
                    value={imgOptions.imageSize}
                    onChange={(e) => setImgOptions({ ...imgOptions, imageSize: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none font-mono"
                  >
                    <option value="1K">1K Standard</option>
                    <option value="2K">2K High Res</option>
                    <option value="4K">4K Ultra High Res</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImg}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingImg ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Rendering Image...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4" /> Generate High-Res Image
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-none flex items-center justify-center min-h-[260px]">
              {generatedImageUrl ? (
                <img
                  src={generatedImageUrl}
                  alt="Generated asset"
                  className="max-h-64 object-contain border border-slate-800 rounded-none"
                />
              ) : (
                <span className="text-xs text-slate-500 font-mono">Image preview will render here.</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: VEO VIDEO */}
      {activeSubTab === 'video' && (
        <div className="w-full min-w-full bg-slate-900 border border-slate-800 p-4 rounded-none space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" /> Veo 3.1 Video Generation Engine
            </h2>
            <span className="text-[11px] font-mono text-cyan-400">veo-3.1-lite-generate-preview</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Video Scene Prompt</label>
                <textarea
                  rows={3}
                  value={videoOptions.prompt}
                  onChange={(e) => setVideoOptions({ ...videoOptions, prompt: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Aspect Ratio</label>
                  <select
                    value={videoOptions.aspectRatio}
                    onChange={(e) => setVideoOptions({ ...videoOptions, aspectRatio: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none font-mono"
                  >
                    <option value="16:9">16:9 Landscape</option>
                    <option value="9:16">9:16 Portrait</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Resolution</label>
                  <select
                    value={videoOptions.resolution}
                    onChange={(e) => setVideoOptions({ ...videoOptions, resolution: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 p-2 text-slate-100 rounded-none font-mono"
                  >
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateVideo}
                disabled={isGeneratingVideo}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-none transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingVideo ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Submitting Veo Video Task...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4" /> Start Veo Video Generation
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-none space-y-2 font-mono text-xs">
              <span className="text-slate-400 block uppercase font-bold text-[11px]">VEO 3.1 RENDERING STATUS</span>
              {videoStatusText ? (
                <div className="p-3 bg-slate-900 border border-cyan-800/80 text-cyan-300">
                  {videoStatusText}
                </div>
              ) : (
                <span className="text-slate-500">Video operation state will be tracked here.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
