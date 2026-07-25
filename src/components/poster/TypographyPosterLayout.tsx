import React from "react";
import museumArchival from "../../assets/museum_archival.jpg";

interface TypographyPosterLayoutProps {
  isScreenshotMode: boolean;
}

export const TypographyPosterLayout: React.FC<TypographyPosterLayoutProps> = ({
  isScreenshotMode,
}) => {
  const chapters = [
    {
      roman: "CHAPTER I",
      title: "Introduction to Technology Domains",
      detail: "AI, Cloud Infra, Embedded Systems, IoT, Cybersecurity & Robotics",
    },
    {
      roman: "CHAPTER II",
      title: "Roadmap to Hackathons",
      detail: "Ideation, Rapid MVP Prototyping & High-Impact Pitching",
    },
    {
      roman: "CHAPTER III",
      title: "Interactive Technology Showcase",
      detail: "Spatial WebGL Shaders, Hardware Circuits & Real-time Demos",
    },
    {
      roman: "CHAPTER IV",
      title: "The AI Discourse: Claude vs ChatGPT vs Gemini",
      detail: "LLM Benchmarks, Agentic Architectures & the Future of Code",
    },
  ];

  return (
    <div
      className={`relative z-10 w-screen h-screen max-h-screen p-2 sm:p-4 md:p-6 flex flex-col justify-between select-none font-serif overflow-hidden transition-all duration-300 ${
        isScreenshotMode ? "contrast-105" : ""
      }`}
    >
      {/* Outer Museum Double Hairline Print Frame - Fixed Height 100vh Fit */}
      <div className="relative w-full h-full border-2 border-slate-900/90 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-[#F7F4EE]/95 shadow-2xl overflow-hidden">
        {/* Gallery Corner Registration Crop Marks */}
        <div className="absolute top-1.5 left-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 01</div>
        <div className="absolute top-1.5 right-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 02</div>
        <div className="absolute bottom-1.5 left-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 03</div>
        <div className="absolute bottom-1.5 right-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 04</div>

        {/* Exhibition Header Catalogue Bar */}
        <header className="w-full flex justify-between items-center pb-3 border-b-2 border-slate-900 gap-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-slate-950 font-black">
              EXHIBITION CATALOGUE NO. 01 / 2026
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-xs text-slate-800 tracking-wider font-semibold">
            SATURDAY, 25 JULY 2026 • 10:00 AM IST
          </div>
        </header>

        {/* Master Editorial Poster Title & Hero Illustration Grid */}
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

            {/* Gallery Description Note */}
            <div className="mt-4 pt-3 border-t border-slate-900/30 max-w-lg font-serif text-xs sm:text-sm text-slate-700 leading-relaxed italic hidden sm:block">
              "An illustrated exhibition into the frontiers of artificial intelligence, spatial computing, embedded systems, and rapid innovation."
            </div>
          </div>

          {/* Right Column: Framed Museum 3D Hero Artwork */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative border-2 border-slate-900 bg-white p-2 shadow-xl max-w-xs sm:max-w-md w-full">
              <div className="overflow-hidden border border-slate-800 max-h-[160px] sm:max-h-[220px] md:max-h-[280px]">
                <img
                  src={museumArchival}
                  alt="Museum Quality Miniature Tech Illustration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-2 flex justify-between items-center font-mono text-[9px] text-slate-600">
                <span>FIG. 1 — MINIATURE EXPLORERS IN TECH</span>
                <span>ARCHIVAL C4D EDITION</span>
              </div>
            </div>
          </div>
        </main>

        {/* 4 Chapter Movement Agenda Catalogue */}
        <section className="w-full pt-3 border-t-2 border-slate-900 flex-shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-950 mb-2 font-black">
            PROGRAMME MOVEMENTS & CHAPTERS
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {chapters.map((ch, idx) => (
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

        {/* Museum Poster Colophon Footer */}
        <footer className="w-full flex justify-between items-center pt-2 mt-2 border-t border-slate-900/20 font-mono text-[9px] text-slate-600 flex-shrink-0">
          <div>CURATED BY THE TECH UNIVERSE BOARD • FINE ART PRINT EDITION</div>
          <div>PRINTED IN ARCHIVAL MONOCHROME & OPAQUE PASTELS</div>
        </footer>
      </div>
    </div>
  );
};
