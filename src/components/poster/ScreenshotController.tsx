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
      // Spacebar key listener (ignore if user is typing in an input)
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

  // Hide mouse cursor when in screenshot mode
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
      {/* Floating HUD Badge */}
      <button
        onClick={onToggleFreeze}
        className={`flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-xs font-semibold backdrop-blur-xl border transition-all duration-300 shadow-2xl ${
          isFrozen
            ? "bg-purple-600/30 border-purple-400 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            : "bg-black/40 border-white/15 text-slate-300 hover:bg-black/60 hover:border-cyan-400/50"
        }`}
      >
        {isFrozen ? (
          <>
            <Pause className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span className="text-cyan-300">POSTER MODE PAUSED</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">(PRESS SPACE TO RESUME)</span>
          </>
        ) : (
          <>
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>SCREENSHOT MODE</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-cyan-400">SPACE</kbd>
          </>
        )}
      </button>
    </div>
  );
};
