import React from "react";
import { Sparkles, Calendar, Cpu, Layers, Flame, Bot, Shield, Globe, Terminal, Code2 } from "lucide-react";

interface TypographyPosterLayoutProps {
  isScreenshotMode: boolean;
}

export const TypographyPosterLayout: React.FC<TypographyPosterLayoutProps> = ({
  isScreenshotMode,
}) => {
  const agendaItems = [
    {
      num: "01",
      title: "Introduction to Technology Domains",
      subtitle: "AI, Cloud, Embedded Systems, IoT, Cybersecurity & Robotics",
      icon: Cpu,
      accent: "from-pink-500/15 via-purple-600/10 to-transparent border-pink-500/30 group-hover:border-pink-400/60",
    },
    {
      num: "02",
      title: "Roadmap to Hackathons",
      subtitle: "Ideation strategies, MVP rapid prototyping & winning pitches",
      icon: Flame,
      accent: "from-purple-500/15 via-indigo-600/10 to-transparent border-purple-500/30 group-hover:border-purple-400/60",
    },
    {
      num: "03",
      title: "Interactive Technology Showcase",
      subtitle: "Hands-on WebGL, spatial shaders & live hardware demos",
      icon: Layers,
      accent: "from-cyan-500/15 via-blue-600/10 to-transparent border-cyan-500/30 group-hover:border-cyan-400/60",
    },
    {
      num: "04",
      title: "AI Discussion: Claude vs ChatGPT vs Gemini",
      subtitle: "Benchmark analysis, LLM agentic patterns & future of coding",
      icon: Bot,
      accent: "from-pink-400/15 via-cyan-500/10 to-transparent border-pink-400/30 group-hover:border-cyan-300/60",
    },
  ];

  const techDomains = [
    { label: "AI & ML", icon: Bot },
    { label: "Cloud Infra", icon: Globe },
    { label: "Embedded / IoT", icon: Cpu },
    { label: "Cybersecurity", icon: Shield },
    { label: "Web3 & GLSL", icon: Code2 },
    { label: "Robotics", icon: Terminal },
  ];

  return (
    <div
      className={`relative z-10 w-full h-full min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none transition-all duration-300 ${
        isScreenshotMode ? "contrast-110" : ""
      }`}
    >
      {/* Spatial Header / Branding Bar */}
      <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Spatial Logo Badge */}
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_15px_#FF5E97]" />
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-pink-300 font-semibold">
            SPATIAL TECH 2026
          </span>
        </div>

        {/* Date Pill Badge with Opal Iridescence */}
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl text-slate-200 text-sm font-medium shadow-[0_0_20px_rgba(255,94,151,0.15)]">
          <Calendar className="w-4 h-4 text-pink-400" />
          <span className="font-mono text-xs md:text-sm">Saturday, 25 July 2026</span>
        </div>
      </header>

      {/* Hero Spatial Title & Subtitle */}
      <main className="my-auto py-8 md:py-12 max-w-6xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs font-mono mb-4 tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>ANNUAL TECHNOLOGY CONCLAVE</span>
        </div>

        {/* Main Title: HELLO TECH with Opal Chromatic Gradient */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white leading-[0.95] font-sans drop-shadow-2xl">
          HELLO{" "}
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
            TECH
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 md:mt-6 text-xl sm:text-2xl md:text-3xl font-light text-slate-300/90 max-w-3xl tracking-wide leading-relaxed">
          Where Curiosity Meets Creation
        </p>

        {/* Tech Domain Chips */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {techDomains.map((domain, idx) => {
            const IconComp = domain.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-slate-300 text-xs font-mono hover:bg-white/[0.09] hover:border-pink-400/50 transition-all duration-300"
              >
                <IconComp className="w-3.5 h-3.5 text-pink-400" />
                <span>{domain.label}</span>
              </div>
            );
          })}
        </div>
      </main>

      {/* Agenda Chapters Section (4 Spatial Cards Grid) */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-auto pt-6 border-t border-white/10">
        {agendaItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-b ${item.accent} backdrop-blur-xl border transition-all duration-300 group hover:translate-y-[-3px] shadow-lg`}
            >
              {/* Chapter Number Badge */}
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono text-2xl font-bold text-pink-400/80 group-hover:text-pink-300">
                  {item.num}
                </span>
                <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
              </div>

              {/* Chapter Title & Subtitle */}
              <h3 className="text-base md:text-lg font-semibold text-white tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </section>

      {/* Poster Footer HUD Metadata */}
      <footer className="w-full flex justify-between items-center text-[10px] md:text-xs font-mono text-slate-500 mt-6 pt-4 border-t border-white/5">
        <div>SPATIAL QUARTZ POSTER • LAT: 12.9716° N / LON: 77.5946° E</div>
        <div className="hidden sm:block">PRESS <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-pink-300 border border-white/20">SPACE</kbd> FOR SCREENSHOT MODE</div>
      </footer>
    </div>
  );
};
