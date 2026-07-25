import React, { useState, useEffect } from "react";
import videoStory1 from "../../assets/Clay_developer_rises_from_brain_202607250656.mp4";
import videoStory2 from "../../assets/Glowing_brain_with_coding_symbols_202607250644.mp4";
import posterStory4 from "../../assets/poster_story_4.jpg";

interface TypographyPosterLayoutProps {
  isScreenshotMode: boolean;
}

export const TypographyPosterLayout: React.FC<TypographyPosterLayoutProps> = ({
  isScreenshotMode,
}) => {
  const [activeStory, setActiveStory] = useState<number>(0);

  const stories = [
    {
      id: 1,
      title: "ANIMATED MONUMENT VALLEY CLAY WORLD",
      subtitle: "Miniature Clay Developers Coding & Rising in 3D Motion",
      video: videoStory1,
      poster: posterStory4,
      tag: "PIXAR / CLAYMorphism ANIMATION",
    },
    {
      id: 2,
      title: "NEURAL CODE MATRIX & GLOWING BRAIN",
      subtitle: "Animated 3D Clay Brain with Code Symbols & Circuit Flow",
      video: videoStory2,
      poster: posterStory4,
      tag: "CINEMA4D NEURAL MATRIX ANIMATION",
    },
  ];

  const agendaChapters = [
    {
      roman: "I. EXHIBITION PAVILION",
      title: "Introduction to Tech Domains",
      detail: "AI, Cloud, Embedded, IoT, Cybersecurity & Robotics",
    },
    {
      roman: "II. ROCKET LAUNCHPAD",
      title: "Roadmap to Hackathons",
      detail: "Ideation, Rapid MVP Prototyping & Pitching",
    },
    {
      roman: "III. SPATIAL WORKSHOP",
      title: "Interactive Technology Experience",
      detail: "Spatial WebGL Shaders, Circuits & Hardware Demos",
    },
    {
      roman: "IV. THE AI DISCOURSE",
      title: "Claude vs ChatGPT vs Gemini",
      detail: "LLM Benchmarks, Agentic Patterns & Future Code",
    },
  ];

  // Hotkey listener for 1 & 2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "1") setActiveStory(0);
      else if (e.key === "2") setActiveStory(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentStory = stories[activeStory];

  return (
    <div
      className={`relative z-10 w-screen h-screen max-h-screen p-2 sm:p-4 md:p-6 flex flex-col justify-between select-none font-serif overflow-hidden transition-all duration-300 ${
        isScreenshotMode ? "contrast-105" : ""
      }`}
    >
      {/* Outer Museum Double Hairline Print Frame - Fixed Height 100vh Fit */}
      <div className="relative w-full h-full border-2 border-slate-900/90 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-[#FAF8F5]/95 shadow-2xl overflow-hidden">
        {/* Gallery Corner Registration Crop Marks */}
        <div className="absolute top-1.5 left-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 01</div>
        <div className="absolute top-1.5 right-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 02</div>
        <div className="absolute bottom-1.5 left-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 03</div>
        <div className="absolute bottom-1.5 right-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 04</div>

        {/* Exhibition Header Catalogue Bar */}
        <header className="w-full flex justify-between items-center pb-3 border-b-2 border-slate-900 gap-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-slate-950 font-black">
              EXHIBITION PRINT NO. 0{currentStory.id} / 2026
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-slate-900 tracking-wider font-bold">
            SATURDAY • 25 JULY 2026 • 10:00 AM IST
          </div>
        </header>

        {/* Master Editorial Poster Title & Hero Video Artwork Grid */}
        <main className="my-auto py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center overflow-hidden">
          {/* Left Column: Editorial Title & Subtitle */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-600 mb-1.5 font-bold">
              ANNUAL INTERNATIONAL CONCLAVE
            </div>

            {/* Master Title: HELLO TECH */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tight text-slate-950 leading-[0.88] uppercase">
              HELLO<br />TECH
            </h1>

            {/* Italic Editorial Subtitle */}
            <p className="mt-3 text-lg sm:text-2xl md:text-3xl font-serif italic text-slate-800 tracking-wide leading-snug">
              Where Curiosity Meets Creation
            </p>

            {/* Active Story Description */}
            <div className="mt-4 pt-3 border-t border-slate-900/30 max-w-lg font-serif text-xs sm:text-sm text-slate-800 leading-relaxed italic">
              "{currentStory.subtitle}"
            </div>
          </div>

          {/* Right Column: Framed Museum 3D Animated Video Artwork */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative border-2 border-slate-900 bg-white p-2 shadow-xl max-w-xs sm:max-w-md w-full">
              <div className="overflow-hidden border border-slate-800 max-h-[160px] sm:max-h-[220px] md:max-h-[280px] bg-slate-900">
                <video
                  key={currentStory.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={currentStory.poster}
                  className="w-full h-full object-cover"
                >
                  <source src={currentStory.video} type="video/mp4" />
                </video>
              </div>
              <div className="mt-2 flex justify-between items-center font-mono text-[9px] text-slate-700 font-bold">
                <span>OPTION 0{currentStory.id}: {currentStory.title}</span>
                <span>{currentStory.tag}</span>
              </div>
            </div>
          </div>
        </main>

        {/* Physical Agenda Catalogue */}
        <section className="w-full pt-3 border-t-2 border-slate-900 flex-shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-950 mb-2 font-black">
            PHYSICAL EXHIBITION AGENDA
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {agendaChapters.map((ch, idx) => (
              <div key={idx} className="flex flex-col border-l-2 border-slate-900 pl-2.5 py-0.5">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-500 mb-0.5">
                  {ch.roman}
                </span>
                <h3 className="font-serif text-xs sm:text-sm font-bold text-slate-950 leading-snug truncate">
                  {ch.title}
                </h3>
                <p className="mt-0.5 font-serif text-[10px] sm:text-xs italic text-slate-700 leading-tight line-clamp-2">
                  {ch.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Poster Colophon & Video Option Selector Hotkey Bar */}
        <footer className="w-full flex flex-col sm:flex-row justify-between items-center pt-2 mt-2 border-t border-slate-900/20 font-mono text-[9px] text-slate-700 gap-1 flex-shrink-0 font-bold">
          <div>CURATED BY THE TECH UNIVERSE BOARD • A0 FINE ART PRINT EDITION</div>
          <div className="flex items-center gap-2">
            <span>PRESS KEYS TO SWITCH ANIMATIONS:</span>
            {stories.map((st, i) => (
              <button
                key={st.id}
                onClick={() => setActiveStory(i)}
                className={`px-2 py-0.5 rounded border transition-all ${
                  activeStory === i
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-white text-slate-800 border-slate-300 hover:border-slate-800"
                }`}
              >
                OPTION {st.id}
              </button>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};
