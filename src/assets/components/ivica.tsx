

const skills = [
  { name: "HTML / CSS / JS",   color: "hover:text-[#ff5e3a] hover:border-[#ff5e3a] hover:bg-[#ff5e3a]/10", dot: "bg-[#ff5e3a]" },
  { name: "React",             color: "hover:text-[#3a8fff] hover:border-[#3a8fff] hover:bg-[#3a8fff]/10", dot: "bg-[#3a8fff]" },
  { name: "Node.js / Express", color: "hover:text-[#2ecc8a] hover:border-[#2ecc8a] hover:bg-[#2ecc8a]/10", dot: "bg-[#2ecc8a]" },
  { name: "SQL / Databases",   color: "hover:text-[#ffcc00] hover:border-[#ffcc00] hover:bg-[#ffcc00]/10", dot: "bg-[#ffcc00]" },
  { name: "Git / GitHub",      color: "hover:text-[#c084fc] hover:border-[#c084fc] hover:bg-[#c084fc]/10", dot: "bg-[#c084fc]" },
];

const goals = [
  { emoji: "🚀", text: "Land my first junior developer position" },
  { emoji: "🧩", text: "Build full stack projects end-to-end" },
  { emoji: "📚", text: "Level up my React & backend skills daily" },
  { emoji: "🤝", text: "Collaborate with a team and ship real products" },
];

const PuzzlePiece = ({ size = 120, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <path
      d="M20 20 H45 C45 20 43 10 50 10 C57 10 55 20 55 20 H80 V45
         C80 45 90 43 90 50 C90 57 80 55 80 55 V80 H55
         C55 80 57 90 50 90 C43 90 45 80 45 80 H20 V55
         C20 55 10 57 10 50 C10 43 20 45 20 45 Z"
      fill="currentColor"
    />
  </svg>
);

export default function Aboutt() {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] py-24 px-6 font-sans">
      
      {/* Decorative puzzle pieces */}
      <PuzzlePiece 
        size={220} 
        className="absolute -top-8 -right-5 rotate-[25deg] text-stone-900 opacity-5 pointer-events-none" 
      />
      <PuzzlePiece 
        size={180} 
        className="absolute -bottom-10 -left-8 -rotate-[15deg] text-stone-900 opacity-5 pointer-events-none" 
      />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24 items-start">
        
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col items-start gap-3">
          <div className="relative mb-3">
            {/* Photo Glow */}
            <div className="absolute top-2.5 left-2.5 w-48 h-48 rounded-2xl bg-gradient-to-br from-[#ff5e3a] to-[#3a8fff] opacity-30" />
            <img
              src="https://placehold.co/200x200/ececea/5a5a58?text=Ivica"
              alt="Ivica"
              className="relative z-10 w-48 h-48 rounded-2xl object-cover shadow-sm"
            />
          </div>

          <h2 className="text-4xl font-extrabold tracking-tighter text-stone-900 font-serif">
            Ivica
          </h2>
          <p className="text-sm font-medium text-stone-400">
            Full Stack Developer
            <span className="mx-2 text-stone-300">·</span>
            Student
          </p>

          <div className="flex gap-4 mt-2">
            <a href="#" className="text-xs font-semibold text-stone-400 hover:text-purple-500 transition-colors uppercase tracking-wider">GitHub ↗</a>
            <a href="#" className="text-xs font-semibold text-stone-400 hover:text-blue-500 transition-colors uppercase tracking-wider">LinkedIn ↗</a>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-10">
          
          {/* Bio */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400 font-serif">Who I am</span>
            <p className="text-base leading-relaxed text-stone-600 font-light max-w-lg">
              Hey! I'm Ivica, a full stack developer in training with a passion for
              building things that live on the internet. I love turning ideas into
              clean, functional products — from the database all the way to the UI.
              I'm actively looking for my first junior role.
            </p>
          </div>

          {/* Goals */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400 font-serif">What I'm working towards</span>
            <div className="flex flex-col gap-2">
              {goals.map((goal) => (
                <div key={goal.text} className="flex items-center gap-4 bg-white border border-stone-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-lg">{goal.emoji}</span>
                  <span className="text-sm text-stone-600">{goal.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400 font-serif">Technologies I use</span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center gap-2 text-xs font-semibold py-2 px-3.5 rounded-lg border border-stone-200 bg-white text-stone-600 transition-all cursor-default group ${skill.color}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${skill.dot} group-hover:shadow-[0_0_8px_currentColor]`} />
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}