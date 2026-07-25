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
        className={`flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-xs font-bold backdrop-blur-xl border transition-all duration-300 shadow-md ${
          isFrozen
            ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-200"
            : "bg-white/90 border-slate-200/90 text-slate-700 hover:bg-white hover:border-indigo-300"
        }`}
      >
        {isFrozen ? (
          <>
            <Pause className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>POSTER MODE PAUSED</span>
            <span className="text-[10px] text-indigo-100 hidden sm:inline">(PRESS SPACE TO RESUME)</span>
          </>
        ) : (
          <>
            <Camera className="w-3.5 h-3.5 text-indigo-600" />
            <span>SCREENSHOT MODE</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 font-bold border border-slate-200">SPACE</kbd>
          </>
        )}
      </button>
    </div>
  );
};
