import React, { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (installed)
    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // Check localStorage if they dismissed it recently
    const dismissedTime = localStorage.getItem("sus-pwa-dismissed");
    if (dismissedTime) {
      const now = Date.now();
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      if (now - parseInt(dismissedTime) < oneWeek) {
        return; // Don't show if dismissed within a week
      }
    }

    // Handle Android/Chrome beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // For iOS, show the prompt manually on a slight delay
    if (ios) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 5000); // Wait 5 seconds after load
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("sus-pwa-dismissed", Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-md animate-rise">
      <div className="glass neon-border rounded-3xl p-5 shadow-neon relative overflow-hidden scanlines">
        {/* Decorative background blur */}
        <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-neon-magenta/20 blur-xl" />
        <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-neon-cyan/20 blur-xl" />

        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex gap-4 items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero shadow-cyan">
            <span className="font-display text-xl text-white font-bold tracking-wider">SUS</span>
          </div>

          <div className="flex-1">
            <h3 className="font-display text-xl text-gradient-hero font-bold tracking-wide">
              Mobiles pe Download karo! 📱
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Desi Impostor game directly app ki tarah chalao. High performance, zero lag, full screen fun!
            </p>

            {isIOS ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/20 px-3 py-2 text-[11px] text-accent">
                <Share className="h-4 w-4 shrink-0" />
                <span>
                  Tap <strong>Share</strong> tab then select <strong>'Add to Home Screen'</strong> to install!
                </span>
              </div>
            ) : (
              <button
                onClick={handleInstallClick}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-hero py-2.5 px-4 font-semibold text-white text-xs tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all shadow-[0_0_20px_oklch(0.78_0.27_340/0.4)]"
              >
                <Download className="h-4 w-4" />
                INSTALL SUS GAME
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
