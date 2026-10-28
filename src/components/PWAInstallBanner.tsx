import React, { useEffect, useState } from 'react';
import { Download, CheckCircle2, Info } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) return null;

  return (
    <div className="w-full min-w-full bg-cyan-950/80 border-b border-cyan-800 text-cyan-100 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-cyan-400" />
        <span>Install <strong>Connect AI</strong> as a Progressive Web App (PWA) for desktop & mobile access.</span>
      </div>

      {deferredPrompt && (
        <button
          onClick={handleInstallClick}
          className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-none flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Install App Now
        </button>
      )}
    </div>
  );
};
