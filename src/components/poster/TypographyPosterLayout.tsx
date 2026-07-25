import React from "react";
import { Sparkles, Calendar, Cpu, Layers, Flame, Bot, Shield, Globe, Terminal, Code2, Heart } from "lucide-react";
import toddlerCoder from "../../assets/toddler_coder.jpg";
import toddlerVr from "../../assets/toddler_vr.jpg";
import toddlerAi from "../../assets/toddler_ai.jpg";

interface TypographyPosterLayoutProps {
  isScreenshotMode: boolean;
}

export const TypographyPosterLayout: React.FC<TypographyPosterLayoutProps> = ({
  isScreenshotMode,
}) => {
  const miniatureExplorers = [
    {
      name: "Mini Coder Hero",
      desc: "Building Hackathon MVPs",
      img: toddlerCoder,
      badge: "HACKATHONS",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      name: "Mini VR Explorer",
      desc: "Exploring Hardware & WebGL",
      img: toddlerVr,
      badge: "SHOWCASE",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    {
      name: "Mini AI Buddy",
      desc: "Claude vs ChatGPT vs Gemini",
      img: toddlerAi,
      badge: "AI DISCUSSIONS",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
  ];

  const agendaItems = [
    {
      num: "01",
      title: "Introduction to Technology Domains",
      subtitle: "AI, Cloud, Embedded Systems, IoT, Cybersecurity & Robotics",
      icon: Cpu,
      accent: "hover:border-indigo-400/50 hover:bg-indigo-50/30",
      numColor: "text-indigo-600",
    },
    {
      num: "02",
      title: "Roadmap to Hackathons",
      subtitle: "Ideation strategies, MVP rapid prototyping & winning pitches",
      icon: Flame,
      accent: "hover:border-amber-400/50 hover:bg-amber-50/30",
      numColor: "text-amber-600",
    },
    {
      num: "03",
      title: "Interactive Technology Showcase",
      subtitle: "Hands-on WebGL, spatial shaders & live hardware demos",
      icon: Layers,
      accent: "hover:border-cyan-400/50 hover:bg-cyan-50/30",
      numColor: "text-cyan-600",
    },
    {
      num: "04",
      title: "AI Discussion: Claude vs ChatGPT vs Gemini",
      subtitle: "Benchmark analysis, LLM agentic patterns & future of coding",
      icon: Bot,
      accent: "hover:border-rose-400/50 hover:bg-rose-50/30",
      numColor: "text-rose-600",
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
      className={`relative z-10 w-full h-full min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-14 select-none transition-all duration-300 ${
        isScreenshotMode ? "contrast-105" : ""
      }`}
    >
      {/* Header Bar */}
      <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Brand Badge */}
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 animate-pulse shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-slate-800 font-bold">
            MINIATURE TECH CONCLAVE
          </span>
        </div>

        {/* Date Pill Badge */}
        <div className="flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-800 text-sm font-semibold shadow-sm backdrop-blur-md">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span className="font-mono text-xs md:text-sm">Saturday, 25 July 2026</span>
        </div>
      </header>

      {/* Main Title Section */}
      <main className="my-auto py-6 md:py-8 max-w-6xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-mono mb-3 tracking-wider font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>ANNUAL TECHNOLOGY CONCLAVE</span>
        </div>

        {/* Title: HELLO TECH */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 leading-[0.95] font-sans">
          HELLO{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 bg-clip-text text-transparent">
            TECH
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-3 md:mt-4 text-xl sm:text-2xl md:text-3xl font-medium text-slate-600 max-w-3xl tracking-wide leading-relaxed">
          Where Curiosity Meets Creation
        </p>

        {/* 3D Miniature Toddler Explorers Showcase */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
          {miniatureExplorers.map((explorer, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Miniature Toddler Image Avatar */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
                <img
                  src={explorer.img}
                  alt={explorer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Explorer Details */}
              <div className="flex flex-col min-w-0">
                <span className={`inline-block w-fit px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${explorer.badgeColor} mb-0.5`}>
                  {explorer.badge}
                </span>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {explorer.name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {explorer.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Domain Chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {techDomains.map((domain, idx) => {
            const IconComp = domain.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-mono font-medium shadow-2xs hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
              >
                <IconComp className="w-3.5 h-3.5 text-indigo-500" />
                <span>{domain.label}</span>
              </div>
            );
          })}
        </div>
      </main>

      {/* Agenda Chapters Section (4 Cards Grid) */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-auto pt-6 border-t border-slate-200">
        {agendaItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl p-5 bg-white border border-slate-200/90 shadow-sm transition-all duration-300 group hover:translate-y-[-2px] ${item.accent}`}
            >
              {/* Chapter Number Badge */}
              <div className="flex justify-between items-start mb-3">
                <span className={`font-mono text-2xl font-black ${item.numColor}`}>
                  {item.num}
                </span>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
                  <IconComponent className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                </div>
              </div>

              {/* Chapter Title & Subtitle */}
              <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-medium">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </section>

      {/* Poster Footer HUD */}
      <footer className="w-full flex justify-between items-center text-[10px] md:text-xs font-mono text-slate-400 mt-6 pt-4 border-t border-slate-200/60">
        <div className="flex items-center gap-1.5">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>MINIATURE TECH CONCLAVE • SATURDAY 25 JULY 2026</span>
        </div>
        <div className="hidden sm:block">PRESS <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 font-bold">SPACE</kbd> FOR SCREENSHOT MODE</div>
      </footer>
    </div>
  );
};
