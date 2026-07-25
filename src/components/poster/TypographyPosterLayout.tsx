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
  const [activeStory, setActiveStory] = useState<number>(1); // Default to Option 2 as requested!
  const [animTime, setAnimTime] = useState<number>(0);

  // Timer loop for Option 2 timed staggered animations
  useEffect(() => {
    setAnimTime(0);
    const interval = setInterval(() => {
      setAnimTime((prev) => (prev < 10 ? prev + 0.1 : 10));
    }, 100);

    return () => clearInterval(interval);
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

  const stories = [
    {
      id: 1,
      title: "MONUMENT VALLEY CLAY WORLD",
      subtitle: "Miniature Clay Developers Coding & Rising in 3D Motion",
      video: videoStory1,
      poster: posterStory4,
      tag: "PIXAR / CLAYMorphism ANIMATION",
    },
    {
      id: 2,
      title: "IDLE DEVELOPER & GLOWING BRAIN",
      subtitle: "Timed Staggered Apple-Style Presentation",
      video: videoStory2,
      poster: posterStory4,
      tag: "APPLE-STYLE PRESENTATION ANIMATION",
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

  const currentStory = stories[activeStory];

  return (
    <div
      className={`relative z-10 w-screen h-screen max-h-screen p-2 sm:p-4 md:p-6 flex flex-col justify-between select-none font-sans overflow-hidden transition-all duration-300 ${
        isScreenshotMode ? "contrast-105" : ""
      }`}
    >
      {/* Outer Print Frame */}
      <div className="relative w-full h-full border-2 border-slate-900/90 p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-[#FAF8F5]/95 shadow-2xl overflow-hidden">
        {/* Corner Crop Marks */}
        <div className="absolute top-1.5 left-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 01</div>
        <div className="absolute top-1.5 right-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 02</div>
        <div className="absolute bottom-1.5 left-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 03</div>
        <div className="absolute bottom-1.5 right-1.5 font-mono text-[8px] text-slate-500 font-bold">+ REG. 04</div>

        {/* Exhibition Header */}
        <header className="w-full flex justify-between items-center pb-2 border-b-2 border-slate-900 gap-2 flex-shrink-0 font-serif">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-slate-950 font-black">
            EXHIBITION PRINT NO. 0{currentStory.id} / 2026
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-slate-900 tracking-wider font-bold">
            SATURDAY • 25 JULY 2026
          </span>
        </header>

        {/* Story Render Area */}
        {activeStory === 0 ? (
          /* Option 1: Original Layout */
          <main className="my-auto py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center overflow-hidden font-serif">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-600 mb-1.5 font-bold">
                ANNUAL INTERNATIONAL CONCLAVE
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-950 leading-[0.88] uppercase">
                HELLO<br />TECH
              </h1>
              <p className="mt-3 text-lg sm:text-2xl md:text-3xl font-serif italic text-slate-800 tracking-wide leading-snug">
                Where Curiosity Meets Creation
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative border-2 border-slate-900 bg-white p-2 shadow-xl max-w-xs sm:max-w-md w-full">
                <div className="overflow-hidden border border-slate-800 max-h-[160px] sm:max-h-[220px] md:max-h-[280px] bg-slate-900">
                  <video autoPlay loop muted playsInline poster={currentStory.poster} className="w-full h-full object-cover">
                    <source src={currentStory.video} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </main>
        ) : (
          /* Option 2: Timed Staggered Apple-Style Presentation Layout */
          <main className="relative my-auto w-full h-full flex flex-col justify-center items-center overflow-hidden py-2">
            {/* Background 3D Clay Developer Video Layer */}
            <div className="absolute inset-0 z-0 flex justify-center items-center opacity-85">
              <div className="relative w-full max-w-4xl h-full max-h-[380px] sm:max-h-[440px] rounded-2xl overflow-hidden border-2 border-slate-900 shadow-2xl bg-slate-950">
                <video autoPlay loop muted playsInline poster={currentStory.poster} className="w-full h-full object-cover">
                  <source src={currentStory.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              </div>
            </div>

            {/* Floating Apple-Style Staggered Overlays */}
            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center px-4">
              {/* 2.0s Title Reveal: HELLO TECH! */}
              <div
                className={`transition-all duration-700 transform ${
                  animTime >= 2.0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-lg font-serif">
                  HELLO TECH!
                </h1>
              </div>

              {/* 3.0s Subtitle Reveal: Explore • Build • Innovate */}
              <div
                className={`mt-1.5 transition-all duration-700 transform ${
                  animTime >= 3.0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <p className="text-base sm:text-xl font-medium text-cyan-300 tracking-wider">
                  Explore • Build • Innovate
                </p>
              </div>

              {/* 3.5s Date & Thin Glowing Divider Line */}
              <div
                className={`w-full max-w-md my-2 flex flex-col items-center transition-all duration-700 transform ${
                  animTime >= 3.5
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <span className="text-xs sm:text-sm font-mono text-slate-200 tracking-widest font-semibold">
                  Saturday • 25 July 2026
                </span>
                <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-1.5 shadow-[0_0_8px_#00F0FF]" />
              </div>

              {/* 4.0s Heading Reveal: WHAT YOU'LL EXPERIENCE */}
              <div
                className={`mt-2 transition-all duration-700 transform ${
                  animTime >= 4.0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em] text-pink-300">
                  WHAT YOU'LL EXPERIENCE
                </h2>
              </div>

              {/* 4.5s - 6.0s Staggered Agenda Items Grid */}
              <div className="mt-3 w-full grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {option2Agenda.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/15 transition-all duration-700 transform shadow-md ${
                      animTime >= item.delaySec
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold text-xs font-mono">{item.num}</span>
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-0.5 text-[10px] sm:text-xs text-slate-300 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* 6.5s Footer Reveal: Hosted by ETC */}
              <div
                className={`mt-3 transition-all duration-700 transform ${
                  animTime >= 6.5
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md font-mono text-[10px] text-slate-200 tracking-wider font-semibold">
                  Hosted by ETC
                </span>
              </div>
            </div>
          </main>
        )}

        {/* Footer & Story Switcher Selector */}
        <footer className="w-full flex flex-col sm:flex-row justify-between items-center pt-2 mt-1 border-t border-slate-900/20 font-mono text-[9px] text-slate-900 gap-1 flex-shrink-0 font-bold">
          <div>CURATED BY THE TECH UNIVERSE BOARD • A0 FINE ART PRINT EDITION</div>
          <div className="flex items-center gap-2">
            <span>SELECT ANIMATED STORY:</span>
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
