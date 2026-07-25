import React, { useState, useEffect } from "react";
import clayVideo from "../../assets/Clay_developer_rises_from_brain_202607250656.mp4";
import posterStory4 from "../../assets/poster_story_4.jpg";

interface TypographyPosterLayoutProps {
  isScreenshotMode: boolean;
}

export const TypographyPosterLayout: React.FC<TypographyPosterLayoutProps> = ({
  isScreenshotMode,
}) => {
  const [activeStory, setActiveStory] = useState<number>(0); // 0 = Option 1 (Print Poster), 1 = Option 2 (Full-Screen Cinematic Video)
  const [animTime, setAnimTime] = useState<number>(0);

  // Timer loop for Option 2 timed staggered animations (resets on activeStory switch to 1)
  useEffect(() => {
    if (activeStory === 1) {
      setAnimTime(0);
      const interval = setInterval(() => {
        setAnimTime((prev) => (prev < 10 ? prev + 0.1 : 10));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [activeStory]);

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

  const option1Chapters = [
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

  const option2Agenda = [
    {
      num: "①",
      title: "ETC Introduction",
      desc: "Covering all technology domains.",
      delaySec: 4.5,
    },
    {
      num: "②",
      title: "Hackathon Roadmap",
      desc: "How to participate in hackathons, build teams, prepare and grow.",
      delaySec: 5.0,
    },
    {
      num: "③",
      title: "Interactive Tech Presentation",
      desc: "Modern technologies, live demonstrations and engaging technical sessions.",
      delaySec: 5.5,
    },
    {
      num: "④",
      title: "AI Debate",
      desc: "Claude vs GPT vs Gemini — Comparing strengths, use cases and practical applications.",
      delaySec: 6.0,
    },
  ];

  return (
    <div
      className={`relative z-10 w-screen h-screen max-h-screen overflow-hidden select-none font-sans transition-all duration-300 ${
        isScreenshotMode ? "contrast-105" : ""
      }`}
    >
      {activeStory === 0 ? (
        /* OPTION 1: ARCHIVAL MUSEUM EDITORIAL PRINT POSTER */
        <div className="relative w-full h-full p-2 sm:p-4 md:p-6 flex flex-col justify-between font-serif">
          <div className="relative w-full h-full border-2 border-slate-900/90 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-[#FAF8F5]/95 shadow-2xl overflow-hidden">
            {/* Gallery Corner Registration Crop Marks */}
            <div className="absolute top-1.5 left-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 01</div>
            <div className="absolute top-1.5 right-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 02</div>
            <div className="absolute bottom-1.5 left-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 03</div>
            <div className="absolute bottom-1.5 right-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 04</div>

            {/* Exhibition Header */}
            <header className="w-full flex justify-between items-center pb-3 border-b-2 border-slate-900 gap-2 flex-shrink-0">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-slate-950 font-black">
                EXHIBITION PRINT NO. 01 / 2026
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-slate-900 tracking-wider font-bold">
                SATURDAY • 25 JULY 2026 • 10:00 AM IST
              </span>
            </header>

            {/* Poster Title & Framed Museum Illustration */}
            <main className="my-auto py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center overflow-hidden">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-600 mb-1.5 font-bold">
                  ANNUAL INTERNATIONAL CONCLAVE
                </div>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-serif tracking-tight text-slate-950 leading-[0.88] uppercase">
                  HELLO<br />TECH
                </h1>
                <p className="mt-3 text-lg sm:text-2xl md:text-3xl font-serif italic text-slate-800 tracking-wide leading-snug">
                  Where Curiosity Meets Creation
                </p>
                <div className="mt-4 pt-3 border-t border-slate-900/30 max-w-lg font-serif text-xs sm:text-sm text-slate-700 leading-relaxed italic hidden sm:block">
                  "An illustrated exhibition into the frontiers of artificial intelligence, spatial computing, embedded systems, and rapid innovation."
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="relative border-2 border-slate-900 bg-white p-2 shadow-xl max-w-xs sm:max-w-md w-full">
                  <div className="overflow-hidden border border-slate-800 max-h-[160px] sm:max-h-[220px] md:max-h-[280px]">
                    <img
                      src={posterStory4}
                      alt="Monument Valley 3D Clay World"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-2 flex justify-between items-center font-mono text-[9px] text-slate-600 font-bold">
                    <span>OPTION 1 — MONUMENT VALLEY CLAY WORLD</span>
                    <span>ARCHIVAL PRINT EDITION</span>
                  </div>
                </div>
              </div>
            </main>

            {/* Agenda Catalogue */}
            <section className="w-full pt-3 border-t-2 border-slate-900 flex-shrink-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-950 mb-2 font-black">
                PHYSICAL EXHIBITION AGENDA
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {option1Chapters.map((ch, idx) => (
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

            {/* Poster Colophon */}
            <footer className="w-full flex justify-between items-center pt-2 mt-2 border-t border-slate-900/20 font-mono text-[9px] text-slate-600 flex-shrink-0 font-bold">
              <div>CURATED BY THE TECH UNIVERSE BOARD • FINE ART PRINT EDITION</div>
              <div className="flex items-center gap-2">
                <span>PRESS KEYS TO SWITCH:</span>
                <button
                  onClick={() => setActiveStory(0)}
                  className="px-2 py-0.5 rounded bg-slate-950 text-white border border-slate-950"
                >
                  OPTION 1 (PRINT POSTER)
                </button>
                <button
                  onClick={() => setActiveStory(1)}
                  className="px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 hover:border-slate-800"
                >
                  OPTION 2 (FULL-SCREEN CINEMATIC)
                </button>
              </div>
            </footer>
          </div>
        </div>
      ) : (
        /* OPTION 2: 100% FULL-SCREEN APPLE CINEMATIC CLAY VIDEO PRESENTATION */
        <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
          {/* 100% Full-Screen Video Background Canvas (No inner boxed picture frames!) */}
          <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={clayVideo} type="video/mp4" />
            </video>
            {/* Cinematic Gradient Vignette Overlay for Crisp Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30 backdrop-blur-[1px]" />
          </div>

          {/* Full-Screen Floating Apple-Style Presentation Layout */}
          <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between items-center text-center overflow-hidden">
            {/* Header Catalogue Tag */}
            <header className="w-full flex justify-between items-center font-mono text-xs text-slate-300 tracking-wider">
              <span>OPTION 02 • FULL-SCREEN CINEMATIC ANIMATION</span>
              <span>PRESS <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/20">1</kbd> FOR PRINT POSTER</span>
            </header>

            {/* Timed Staggered Apple-Style Overlays */}
            <main className="my-auto w-full max-w-3xl flex flex-col items-center">
              {/* 2.0s Title Reveal: HELLO TECH! */}
              <div
                className={`transition-all duration-700 transform ${
                  animTime >= 2.0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl font-serif">
                  HELLO TECH!
                </h1>
              </div>

              {/* 3.0s Subtitle Reveal: Explore • Build • Innovate */}
              <div
                className={`mt-2 transition-all duration-700 transform ${
                  animTime >= 3.0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <p className="text-lg sm:text-2xl font-semibold text-cyan-300 tracking-wider">
                  Explore • Build • Innovate
                </p>
              </div>

              {/* 3.5s Date & Thin Glowing Divider Line */}
              <div
                className={`w-full max-w-md my-3 flex flex-col items-center transition-all duration-700 transform ${
                  animTime >= 3.5
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <span className="text-xs sm:text-sm font-mono text-slate-200 tracking-widest font-bold">
                  Saturday • 25 July 2026
                </span>
                <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2 shadow-[0_0_10px_#00F0FF]" />
              </div>

              {/* 4.0s Heading Reveal: WHAT YOU'LL EXPERIENCE */}
              <div
                className={`mt-2 transition-all duration-700 transform ${
                  animTime >= 4.0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.3em] text-pink-300">
                  WHAT YOU'LL EXPERIENCE
                </h2>
              </div>

              {/* 4.5s - 6.0s Staggered Agenda Items Grid */}
              <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {option2Agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/20 transition-all duration-700 transform shadow-xl ${
                      animTime >= item.delaySec
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold text-sm font-mono">{item.num}</span>
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-[11px] sm:text-xs text-slate-300 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* 6.5s Footer Reveal: Hosted by ETC */}
              <div
                className={`mt-4 transition-all duration-700 transform ${
                  animTime >= 6.5
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-xl font-mono text-xs text-slate-200 tracking-wider font-bold shadow-lg">
                  Hosted by ETC
                </span>
              </div>
            </main>

            {/* Option Switcher Footer */}
            <footer className="w-full flex justify-between items-center font-mono text-xs text-slate-300">
              <div>CLAYMorphic ANIMATION EXPERIENCE</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStory(0)}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 transition-all"
                >
                  OPTION 1 (PRINT POSTER)
                </button>
                <button
                  onClick={() => setActiveStory(1)}
                  className="px-2.5 py-1 rounded bg-cyan-500 text-slate-950 font-bold border border-cyan-400 shadow-[0_0_12px_#00F0FF]"
                >
                  OPTION 2 (FULL-SCREEN CINEMATIC)
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
