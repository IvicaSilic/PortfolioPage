import myPhoto from "../images/Ivica.jpg";

const skills = [
  { name: "HTML / CSS / JS",   color: "hover:text-[#ff5e3a] hover:border-[#ff5e3a] hover:bg-[#ff5e3a]/10", dot: "bg-[#ff5e3a]" },
  { name: "React",             color: "hover:text-[#3a8fff] hover:border-[#3a8fff] hover:bg-[#3a8fff]/10", dot: "bg-[#3a8fff]" },
  { name: "Node.js / Express", color: "hover:text-[#2ecc8a] hover:border-[#2ecc8a] hover:bg-[#2ecc8a]/10", dot: "bg-[#2ecc8a]" },
  { name: "SQL / Databases",   color: "hover:text-[#ffcc00] hover:border-[#ffcc00] hover:bg-[#ffcc00]/10", dot: "bg-[#ffcc00]" },
  { name: "Git / GitHub",      color: "hover:text-[#c084fc] hover:border-[#c084fc] hover:bg-[#c084fc]/10", dot: "bg-[#c084fc]" },
];

export default function AboutSection() {
  return (
    <section className="bg-white py-24 px-6 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24 items-start">

        {/* ── LEFT ── */}
        <div className="flex flex-col items-start gap-3">
          <img
            src={myPhoto}
            alt="Ivica"
            className="w-48 h-48 rounded-2xl object-cover shadow-sm"
          />
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 mt-2">
            Ivica Silić
          </h2>
          <p className="text-sm text-zinc-400">
            Student majorin in Information technologies
          </p>
          <div className="flex gap-4 mt-1">
            <a href="https://github.com/IvicaSilic" target="_blank" rel="noreferrer" className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-wider">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ivica-%C5%A1ili%C4%87-a1ab0420b/" target="_blank" rel="noreferrer" className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-wider">LinkedIn ↗</a>
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