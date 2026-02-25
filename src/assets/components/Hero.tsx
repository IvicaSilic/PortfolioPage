import { useState } from "react";
import myPhoto from "../images/Ivica.jpg";
import batmanMask from "../images/Ivica.jpg";

interface HeroProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  transitioning: boolean;
  setTransitioning: (value: boolean) => void;
}

export default function Hero({ darkMode, setDarkMode, transitioning, setTransitioning }: HeroProps) {
  const [showLightning, setShowLightning] = useState<boolean>(false);
  const [fadeToBlack, setFadeToBlack] = useState<boolean>(false);

  const handleToggle = (): void => {
    if (transitioning) return;
    
    setTransitioning(true);
    setFadeToBlack(true); // 1. Start closing the curtain

    // Step A: Wait for total darkness (1.1s)
    setTimeout(() => {
      setDarkMode(!darkMode); // Theme swap happens here
      setShowLightning(true);  // Lightning starts
    }, 1100);

    // Step B: Lightning flickers for 1s. Then turn it off.
    setTimeout(() => {
      setShowLightning(false);
      // We do NOT set fadeToBlack to false yet. 
      // This creates the "0.2s total darkness" gap.
    }, 2100);

    // Step C: After the 0.2s pause (2100ms + 200ms = 2300ms), start the fade out
    setTimeout(() => {
      setFadeToBlack(false); 
    }, 2300);

    // Step D: Unlock UI after the 2.2s fade out is done (2300 + 2200 = 4500)
    setTimeout(() => {
      setTransitioning(false);
    }, 4500);
  };

  return (
    <section
      className={`relative min-h-screen overflow-hidden flex items-center transition-colors duration-300 ${
        darkMode ? "bg-zinc-950" : "bg-white"
      }`}
    >
      {/* BLACK OVERLAY */}
      <div
        className={`fixed inset-0 z-[50] pointer-events-none bg-black transition-opacity ease-in-out ${
          fadeToBlack 
            ? "opacity-100 duration-[1100ms]" 
            : "opacity-0 duration-[2200ms]" 
        }`}
      />

      {/* LIGHTNING */}
      {showLightning && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
             <polyline points="12,0 15,15 10,15 14,32 9,32 13,55 8,55 14,78 10,78 16,100" fill="none" stroke="white" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 4px white) drop-shadow(0 0 10px #c084fc)", animation: "flicker1 1s ease-in-out" }} />
             <polyline points="35,10 31,28 37,28 32,48 39,48 34,68" fill="none" stroke="#fde68a" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 5px #fde68a) drop-shadow(0 0 12px #f59e0b)", animation: "flicker2 1s ease-in-out" }} />
             <polyline points="52,0 57,12 50,12 56,28 48,28 55,42 49,42 58,60 51,60 57,75 50,75 56,100" fill="none" stroke="white" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 4px white) drop-shadow(0 0 12px #93c5fd)", animation: "flicker3 1s ease-in-out" }} />
             <polyline points="80,0 77,22 83,22 79,44 85,44 81,66 87,66 82,100" fill="none" stroke="#fef08a" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 4px #fef08a) drop-shadow(0 0 10px #eab308)", animation: "flicker4 1s ease-in-out" }} />
          </svg>
        </div>
      )}

      <style>{`
        @keyframes flicker1 { 0%, 100% { opacity: 0; } 10%, 30%, 50%, 70%, 90% { opacity: 1; } 20%, 40%, 60%, 80% { opacity: 0.2; } }
        @keyframes flicker2 { 0%, 100% { opacity: 0; } 5%, 25%, 45%, 65%, 85% { opacity: 1; } 15%, 35%, 55%, 75% { opacity: 0.1; } }
        @keyframes flicker3 { 0%, 100% { opacity: 0; } 12%, 32%, 52%, 72%, 92% { opacity: 1; } 22%, 42%, 62%, 82% { opacity: 0; } }
        @keyframes flicker4 { 0%, 100% { opacity: 0; } 15%, 40%, 60%, 85% { opacity: 1; } 5%, 25%, 50%, 75% { opacity: 0.1; } }
      `}</style>

      {/* BACKGROUNDS */}
      <div className={`absolute inset-0 h-screen transition-colors duration-300 hidden md:block ${darkMode ? "bg-zinc-900" : "bg-zinc-100"}`} style={{ clipPath: "polygon(0 0, 52% 0, 38% 100%, 0 100%)" }} />
      <div className={`absolute inset-0 h-screen transition-colors duration-300 block md:hidden ${darkMode ? "bg-zinc-900" : "bg-zinc-100"}`} style={{ clipPath: "polygon(0 0, 75% 0, 12% 100%, 0 100%)" }} />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 md:px-12 pt-16 md:pt-0 gap-6">
          <div className="relative w-48 h-48 md:w-96 md:h-96">
            <img src={darkMode ? batmanMask : myPhoto} alt="Hero" className="w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-300" />
          </div>
          <button onClick={handleToggle} disabled={transitioning} className={`px-5 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-300 ${darkMode ? "border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white" : "border-zinc-400 text-zinc-600 hover:border-orange-500 hover:text-orange-500"}`}>
            {darkMode ? "☀️ Back to light" : "🦇 Into the night"}
          </button>
        </div>

        <div className="w-full md:flex-1 px-8 md:px-12 py-12 md:py-16 text-center md:text-left">
          <p className={`text-sm font-semibold tracking-[0.3em] uppercase mb-4 transition-colors duration-300 ${darkMode ? "text-indigo-400" : "text-orange-500"}`}>👋 Hello, I'm</p>
          <h1 className={`text-5xl md:text-7xl font-black leading-none mb-2 transition-colors duration-300 ${darkMode ? "text-white" : "text-zinc-900"}`}>
            {darkMode ? "Batman" : "Ivica"}<br />
            <span className={`transition-colors duration-300 ${darkMode ? "text-indigo-400" : "text-orange-500"}`}>{darkMode ? "" : "Silic"}</span>
          </h1>
          <p className={`text-lg md:text-xl mt-6 max-w-md mx-auto md:mx-0 leading-relaxed transition-colors duration-300 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            {darkMode ? "Absolute badass crime fighting legend" : "Fullstack developer & UI/UX designer helping you"}
            <span className={`font-semibold ${darkMode ? "text-white" : "text-zinc-900"}`}>{darkMode ? " punishing with the fist of justice" : " elevate your digital presence."}</span>
          </p>
        </div>
      </div>
    </section>
  );
}