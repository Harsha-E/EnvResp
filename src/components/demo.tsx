import { Component as ShieldShader } from "@/components/ui/shield-shader";
import { SpecialText } from "@/components/ui/special-text";

export default function Demo() {
  return (
    <div className="relative w-full h-[100vh]">
      {/* Background Shader */}
      <div className="absolute inset-0 z-0">
        <ShieldShader />
      </div>

      {/* Foreground Text */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">
        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
          <SpecialText speed={40} delay={0.5}>
            Design Intelligence
          </SpecialText>
        </h1>
        <p className="text-white/80 text-xl max-w-lg text-center drop-shadow-md">
          <SpecialText speed={30} delay={1.5}>
            Build beautiful interfaces with AI-powered design recommendations.
          </SpecialText>
        </p>
      </div>
    </div>
  );
}
