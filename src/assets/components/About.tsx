

// --- Types ---
type TetrisColor = 
  | "bg-cyan-500" 
  | "bg-orange-500" 
  | "bg-red-500" 
  | "bg-green-500" 
  | "bg-yellow-400" 
  | "bg-blue-500";

interface BlockProps {
  color: TetrisColor;
  skill?: string;
}

interface LegendItemProps {
  color: TetrisColor;
  label: string;
}

const CELL = 32;
const ROWS = 10;
const COLS = 10;

export default function TetrisBoard() {
  return (
    <section className="bg-zinc-950 px-12 py-16 text-center min-h-screen flex flex-col items-center">
      <h2 className="text-white text-4xl font-black mb-10 italic uppercase tracking-tighter">
        My Skills
      </h2>

      <div className="flex justify-center mb-12">
        <div
          className="relative bg-zinc-900 border-4 border-zinc-800 shadow-2xl box-content"
          style={{ width: COLS * CELL, height: ROWS * CELL }}
        >
          {/* Background Grid Layer */}
          <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
            {Array.from({ length: ROWS * COLS }).map((_, i) => (
              <div 
                key={i} 
                className="w-8 h-8 border-[0.5px] border-zinc-800/30 box-border" 
              />
            ))}
          </div>

          {/* 1. Cyan I-Piece (React) */}
          <div className="absolute flex" style={{ top: 9 * CELL, left: 0 * CELL }}>
            <Block color="bg-cyan-500" skill="React" />
            <Block color="bg-cyan-500" skill="React" />
            <Block color="bg-cyan-500" skill="React" />
            <Block color="bg-cyan-500" skill="React" />
          </div>

          {/* 2. Orange L-Piece (JavaScript) */}
          <div className="absolute flex" style={{ top: 8 * CELL, left: 0 * CELL }}>
            <Block color="bg-orange-500" skill="JavaScript" />
            <Block color="bg-orange-500" skill="JavaScript" />
            <Block color="bg-orange-500" skill="JavaScript" />
          </div>
          <div className="absolute" style={{ top: 7 * CELL, left: 0 * CELL }}>
            <Block color="bg-orange-500" skill="JavaScript" />
          </div>

          {/* 3. Red Z-Piece (Node.js) */}
          <div className="absolute flex" style={{ top: 8 * CELL, left: 3 * CELL }}>
            <Block color="bg-red-500" skill="Node.js" />
            <Block color="bg-red-500" skill="Node.js" />
          </div>
          <div className="absolute flex" style={{ top: 9 * CELL, left: 4 * CELL }}>
            <Block color="bg-red-500" skill="Node.js" />
            <Block color="bg-red-500" skill="Node.js" />
          </div>

          {/* 4. Vertical Green S-Piece (Tailwind) */}
          <div className="absolute" style={{ top: 9 * CELL, left: 6 * CELL }}>
            <Block color="bg-green-500" skill="Tailwind" />
          </div>
          <div className="absolute flex" style={{ top: 8 * CELL, left: 5 * CELL }}>
            <Block color="bg-green-500" skill="Tailwind" />
            <Block color="bg-green-500" skill="Tailwind" />
          </div>
          <div className="absolute" style={{ top: 7 * CELL, left: 5 * CELL }}>
            <Block color="bg-green-500" skill="Tailwind" />
          </div>

          {/* 5. Yellow Box (SQL) */}
          <div className="absolute grid grid-cols-2" style={{ top: 8 * CELL, left: 7 * CELL }}>
            <Block color="bg-yellow-400" skill="SQL" />
            <Block color="bg-yellow-400" skill="SQL" />
            <Block color="bg-yellow-400" skill="SQL" />
            <Block color="bg-yellow-400" skill="SQL" />
          </div>

          {/* 6. Blue J-Piece (TypeScript) */}
          <div className="absolute flex flex-col" style={{ top: 5 * CELL, left: 9 * CELL }}>
            <Block color="bg-blue-500" skill="TypeScript" />
            <Block color="bg-blue-500" skill="TypeScript" />
            <Block color="bg-blue-500" skill="TypeScript" />
          </div>
          <div className="absolute" style={{ top: 5 * CELL, left: 8 * CELL }}>
            <Block color="bg-blue-500" skill="TypeScript" />
          </div>

        </div>
      </div>

      {/* THE LEGEND */}
      <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
        <LegendItem color="bg-cyan-500" label="React" />
        <LegendItem color="bg-orange-500" label="JavaScript" />
        <LegendItem color="bg-red-500" label="Node.js" />
        <LegendItem color="bg-green-500" label="Tailwind" />
        <LegendItem color="bg-yellow-400" label="SQL" />
        <LegendItem color="bg-blue-500" label="TypeScript" />
      </div>
    </section>
  );
}

/* ========= Sub-Components with TS Types ========= */

function Block({ color, skill }: BlockProps) {
  return (
    <div className={`group relative w-8 h-8 ${color} border border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] box-border cursor-help`}>
      {skill && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-white text-black text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-50">
          {skill}
        </span>
      )}
    </div>
  );
}

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className={`w-3 h-3 ${color} border border-white/20 rounded-sm`} />
      <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{label}</span>
    </div>
  );
}