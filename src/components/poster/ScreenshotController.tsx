import React, { useEffect } from "react";

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

  // Silent controller - no UI buttons or badges rendered
  return null;
};
