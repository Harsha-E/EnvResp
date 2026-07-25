import React, { useEffect } from "react";
import { Camera, Pause } from "lucide-react";

interface ScreenshotControllerProps {
  isFrozen: boolean;
  onToggleFreeze: () => void;
}

export const ScreenshotController: React.FC<ScreenshotControllerProps> = ({
  isFrozen,
  onToggleFreeze,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        onToggleFreeze();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggleFreeze]);

  useEffect(() => {
    if (isFrozen) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "default";
    }
    return () => {
      document.body.style.cursor = "default";
    };
  }, [isFrozen]);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 select-none">
      <button
        onClick={onToggleFreeze}
        className={`flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-xs font-semibold backdrop-blur-2xl border transition-all duration-300 shadow-2xl ${
          isFrozen
            ? "bg-pink-600/30 border-pink-400 text-pink-200 shadow-[0_0_25px_rgba(255,94,151,0.5)]"
            : "bg-black/40 border-white/15 text-slate-300 hover:bg-black/60 hover:border-pink-400/50"
        }`}
      >
        {isFrozen ? (
          <>
            <Pause className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
            <span className="text-pink-300">SPATIAL POSTER PAUSED</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">(PRESS SPACE TO RESUME)</span>
          </>
        ) : (
          <>
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span>SCREENSHOT MODE</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-pink-300">SPACE</kbd>
          </>
        )}
      </button>
    </div>
  );
};
