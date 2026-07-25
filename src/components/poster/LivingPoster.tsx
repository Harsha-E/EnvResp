import React, { useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { VolumetricShaderBackground } from "./VolumetricShaderBackground";
import { TechUniverse } from "./TechUniverse";
import { TypographyPosterLayout } from "./TypographyPosterLayout";
import { ScreenshotController } from "./ScreenshotController";

export const LivingPoster: React.FC = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFrozen) return;
      const { clientWidth, clientHeight } = e.currentTarget;
      mousePos.current = {
        x: e.clientX / clientWidth,
        y: e.clientY / clientHeight,
      };
    },
    [isFrozen]
  );

  const toggleFreeze = useCallback(() => {
    setIsFrozen((prev) => !prev);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#030509] overflow-hidden select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          orthographic
          camera={{ position: [0, 0, 5], zoom: 1 }}
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          {/* Volumetric GLSL Light Field Shader Background */}
          <VolumetricShaderBackground isFrozen={isFrozen} mousePos={mousePos} />

          {/* 3D Tech Universe Artifacts */}
          <TechUniverse isFrozen={isFrozen} mousePos={mousePos} />
        </Canvas>
      </div>

      {/* Screenshot Mode Controller */}
      <ScreenshotController isFrozen={isFrozen} onToggleFreeze={toggleFreeze} />

      {/* Typography & Poster UI Layout Layer */}
      <TypographyPosterLayout isScreenshotMode={isFrozen} />
    </div>
  );
};
