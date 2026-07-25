import React from "react";
import museumHero from "../../assets/museum_hero.jpg";

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
      className={`relative z-10 w-full min-h-screen p-4 sm:p-8 md:p-12 flex flex-col justify-between select-none font-serif transition-all duration-300 ${
        isScreenshotMode ? "contrast-105" : ""
      }`}
    >
      {/* Outer Museum Double Hairline Print Frame */}
      <div className="relative w-full h-full min-h-[calc(100vh-4rem)] border-2 border-slate-900/90 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-[#F7F4EE]/90 shadow-2xl">
        {/* Gallery Corner Registration Crop Marks */}
        <div className="absolute top-2 left-2 font-mono text-[9px] text-slate-500 font-bold">+ REG. 01</div>
        <div className="absolute top-2 right-2 font-mono text-[9px] text-slate-500 font-bold">+ REG. 02</div>
        <div className="absolute bottom-2 left-2 font-mono text-[9px] text-slate-500 font-bold">+ REG. 03</div>
        <div className="absolute bottom-2 right-2 font-mono text-[9px] text-slate-500 font-bold">+ REG. 04</div>

        {/* Exhibition Header Catalogue Bar */}
        <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-slate-900 gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.35em] uppercase text-slate-950 font-black">
              EXHIBITION CATALOGUE NO. 01 / 2026
            </span>
          </div>
          <div className="font-mono text-xs text-slate-800 tracking-wider font-semibold">
            SATURDAY, 25 JULY 2026 • 10:00 AM IST
          </div>
        </header>

        {/* Master Editorial Poster Title & Hero Illustration Grid */}
        <main className="my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Title & Subtitle */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-slate-600 mb-3 font-bold">
              ANNUAL INTERNATIONAL CONCLAVE
            </div>

            {/* Master Title: HELLO TECH */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tight text-slate-950 leading-[0.9] uppercase">
              HELLO<br />TECH
            </h1>

            {/* Italic Editorial Subtitle */}
            <p className="mt-6 text-2xl sm:text-3xl font-serif italic text-slate-800 tracking-wide leading-snug">
              Where Curiosity Meets Creation
            </p>

            {/* Gallery Description Note */}
            <div className="mt-8 pt-6 border-t border-slate-900/30 max-w-lg font-serif text-sm text-slate-700 leading-relaxed italic">
              "An illustrated journey into the frontiers of artificial intelligence, spatial computing, embedded systems, and rapid innovation."
            </div>
          </div>

          {/* Right Column: Framed Museum 3D Hero Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative border-2 border-slate-900 bg-white p-3 shadow-xl max-w-md">
              <div className="overflow-hidden border border-slate-800">
                <img
                  src={museumHero}
                  alt="Museum Quality Miniature Tech Illustration"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 flex justify-between items-center font-mono text-[10px] text-slate-600">
                <span>FIG. 1 — MINIATURE EXPLORERS IN TECH</span>
                <span>PIXAR / C4D ARCHIVE</span>
              </div>
            </div>
          </div>
        </main>

        {/* 4 Chapter Movement Agenda Catalogue */}
        <section className="w-full pt-6 border-t-2 border-slate-900">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-slate-950 mb-4 font-black">
            PROGRAMME MOVEMENTS & CHAPTERS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chapters.map((ch, idx) => (
              <div key={idx} className="flex flex-col border-l-2 border-slate-900 pl-4 py-1">
                <span className="font-mono text-xs font-bold text-slate-500 mb-1">
                  {ch.roman}
                </span>
                <h3 className="font-serif text-base font-bold text-slate-950 leading-snug">
                  {ch.title}
                </h3>
                <p className="mt-1 font-serif text-xs italic text-slate-700 leading-relaxed">
                  {ch.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Museum Poster Colophon Footer */}
        <footer className="w-full flex justify-between items-center pt-6 mt-6 border-t border-slate-900/20 font-mono text-[10px] text-slate-600">
          <div>CURATED BY THE TECH UNIVERSE BOARD • FINE ART PRINT EDITION</div>
          <div>PRINTED IN ARCHIVAL MONOCHROME & OPAQUE PASTELS</div>
        </footer>
      </div>
    </div>
  );
};
