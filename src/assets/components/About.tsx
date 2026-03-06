import myPhoto from "../images/Ivica.jpg";

const skills = [
  { name: "HTML / CSS / JS",   color: "hover:text-[#ff5e3a] hover:border-[#ff5e3a] hover:bg-[#ff5e3a]/10", dot: "bg-[#ff5e3a]" },
  { name: "React",             color: "hover:text-[#3a8fff] hover:border-[#3a8fff] hover:bg-[#3a8fff]/10", dot: "bg-[#3a8fff]" },
  { name: "Node.js / Express", color: "hover:text-[#2ecc8a] hover:border-[#2ecc8a] hover:bg-[#2ecc8a]/10", dot: "bg-[#2ecc8a]" },
  { name: "SQL / Databases",   color: "hover:text-[#ffcc00] hover:border-[#ffcc00] hover:bg-[#ffcc00]/10", dot: "bg-[#ffcc00]" },
  { name: "Git / GitHub",      color: "hover:text-[#c084fc] hover:border-[#c084fc] hover:bg-[#c084fc]/10", dot: "bg-[#c084fc]" },
];

type PuzzlePieceProps = {
  className: string;
  variant: "top" | "right" | "bottom" | "left";
};

function PuzzlePiece({ className, variant }: PuzzlePieceProps) {
  const variantTransform = {
    right: "",
    left: "-scale-x-100",
    top: "-rotate-90",
    bottom: "rotate-90",
  } as const;

  return (
    <svg
      viewBox="0 0 96 96"
      fill="currentColor"
      aria-hidden="true"
      className={`${className} origin-center transform-gpu ${variantTransform[variant]}`}
    >
      <path d="M16 14a8 8 0 0 1 8-8h12v10a8 8 0 1 0 16 0V6h12a8 8 0 0 1 8 8v12h10a8 8 0 1 1 0 16H72v12a8 8 0 0 1-8 8H52V52a8 8 0 1 0-16 0v10H24a8 8 0 0 1-8-8V42h10a8 8 0 1 0 0-16H16V14Z" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 px-6 font-sans">
      <div
        className="absolute inset-0 bg-zinc-100 hidden md:block"
        style={{ clipPath: "polygon(0 0, 44% 0, 31% 100%, 0 100%)" }}
      />
      <div
        className="absolute inset-0 bg-zinc-100 block md:hidden"
        style={{ clipPath: "polygon(0 0, 70% 0, 18% 100%, 0 100%)" }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <PuzzlePiece variant="top" className="absolute top-16 right-[10%] hidden md:block w-36 h-36 text-zinc-400/20 blur-[1.5px] rotate-6" />
        <PuzzlePiece variant="right" className="absolute top-[42%] right-[2%] hidden md:block w-44 h-44 text-zinc-400/15 blur-[2px] -rotate-12" />
        <PuzzlePiece variant="bottom" className="absolute bottom-10 right-[22%] hidden md:block w-32 h-32 text-zinc-400/20 blur-[1px] rotate-[18deg]" />
        <PuzzlePiece variant="left" className="absolute bottom-8 left-[48%] hidden md:block w-[120px] h-[120px] text-zinc-400/15 blur-[1.5px] -rotate-[10deg]" />
        <PuzzlePiece variant="left" className="absolute top-6 right-4 md:hidden w-28 h-28 text-zinc-400/20 blur-[1.5px] rotate-12" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_1.55fr] gap-12 md:gap-20 items-start">

        {/* ── LEFT ── */}
        <div className="flex flex-col items-start gap-4">
          <img
            src={myPhoto}
            alt="Ivica"
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-full md:max-w-[340px] aspect-square rounded-3xl object-cover shadow-md"
          />
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 mt-2">
            Ivica Silic
          </h2>
          <p className="text-base text-zinc-500">
            Student majoring in Information technologies
          </p>
          <div className="flex gap-4 mt-1">
            <a href="https://github.com/IvicaSilic" target="_blank" rel="noreferrer" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-[0.08em]">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ivica-%C5%A1ili%C4%87-a1ab0420b/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-[0.08em]">LinkedIn ↗</a>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col gap-10">

          {/* Bio */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">About me</span>
            <p className="text-base leading-relaxed text-zinc-600 max-w-lg">
              A third-year Programming student currently looking for an opportunity to gain real-world experience. Constantly learning and improving skills, 
              with the goal of growing as a developer while working alongside an experienced team. 
              A quick learner who enjoys new challenges and is motivated to keep improving.
            </p>
          </div>

          {/* What I'm after */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">What I'm looking for</span>
            <p className="text-base leading-relaxed text-zinc-600 max-w-lg">
              A junior role where I can work on real problems, learn from people 
              more experienced than me, and ship actual product. Not looking for 
              perfect conditions — just a place where I can grow fast and do 
              meaningful work.
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Technologies</span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center gap-2 text-xs font-semibold py-2 px-3.5 rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all cursor-default group ${skill.color}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${skill.dot}`} />
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
