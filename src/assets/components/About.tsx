import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";

/* ── Types ───────────────────────────────── */

interface Piece {
  id: number;
  label: string;
  color: string;
  maskId: string;
}

interface Position {
  x: number;
  y: number;
}

type GridState = (number | null)[];
type PositionMap = Record<number, Position>;

interface DragStart {
  mouseX: number;
  mouseY: number;
  startX: number;
  startY: number;
}

interface JigsawPieceProps {
  piece: Piece;
  position: Position;
  isSnapped: boolean;
  containerRef: React.RefObject<HTMLDivElement  | null>;
  onPickUp: (id: number) => void;
  onDragMove: (id: number, x: number, y: number) => void;
  onDragRelease: (id: number, x: number, y: number) => void;
}

/* ── Constants ───────────────────────────── */

const PIECE_SIZE = 240;
const SNAP_THRESHOLD = 200;
const INNER = PIECE_SIZE * 0.75;
const MASK_OFFSET = PIECE_SIZE * 0.125;
const BOARD_SIZE = INNER * 3;
const GAP = 90;
const PIECE_GAP = 21;

/* ── Slots ───────────────────────────────── */

const SLOTS = [
  { id: 0, label: "HTML", col: 0, row: 0, maskId: "mask-1" },
  { id: 1, label: "CSS", col: 1, row: 0, maskId: "mask-2" },
  { id: 2, label: "JavaScript", col: 2, row: 0, maskId: "mask-3" },
  { id: 3, label: "TypeScript", col: 0, row: 1, maskId: "mask-4" },
  { id: 4, label: "React", col: 1, row: 1, maskId: "mask-5" },
  { id: 5, label: "Tailwind", col: 2, row: 1, maskId: "mask-6" },
  { id: 6, label: "C#", col: 0, row: 2, maskId: "mask-7" },
  { id: 7, label: "Git", col: 1, row: 2, maskId: "mask-8" },
  { id: 8, label: "SQL", col: 2, row: 2, maskId: "mask-9" },
];

/* ── Pieces ──────────────────────────────── */

const PIECES: Piece[] = [
  { id: 1, label: "HTML", color: "#E34F26", maskId: "mask-1" },
  { id: 2, label: "CSS", color: "#1572B6", maskId: "mask-2" },
  { id: 3, label: "JavaScript", color: "#F7DF1E", maskId: "mask-3" },
  { id: 4, label: "TypeScript", color: "#3178C6", maskId: "mask-4" },
  { id: 5, label: "React", color: "#61DAFB", maskId: "mask-5" },
  { id: 6, label: "Tailwind", color: "#38BDF8", maskId: "mask-6" },
  { id: 7, label: "Node.js", color: "#339933", maskId: "mask-7" },
  { id: 8, label: "Git", color: "#F05032", maskId: "mask-8" },
  { id: 9, label: "SQL", color: "#336791", maskId: "mask-9" },
];

/* ── SVG Masks (ORIGINAL PUZZLE SHAPES) ───────────────── */

function SvgMasks() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>

        <mask id="mask-1" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.875" cy="0.5" r="0.125" fill="white" />
          <circle cx="0.5" cy="0.875" r="0.125" fill="black" />
        </mask>

        <mask id="mask-2" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.875" cy="0.5" r="0.125" fill="white" />
          <circle cx="0.5" cy="0.875" r="0.125" fill="white" />
          <circle cx="0.125" cy="0.5" r="0.125" fill="black" />
        </mask>

        <mask id="mask-3" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.5" cy="0.875" r="0.125" fill="white" />
          <circle cx="0.125" cy="0.5" r="0.125" fill="black" />
        </mask>

        <mask id="mask-4" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.5" cy="0.125" r="0.125" fill="white" />
          <circle cx="0.875" cy="0.5" r="0.125" fill="black" />
          <circle cx="0.5" cy="0.875" r="0.125" fill="white" />
        </mask>

        <mask id="mask-5" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.5" cy="0.125" r="0.125" fill="black" />
          <circle cx="0.875" cy="0.5" r="0.125" fill="white" />
          <circle cx="0.5" cy="0.875" r="0.125" fill="black" />
          <circle cx="0.125" cy="0.5" r="0.125" fill="white" />
        </mask>

        <mask id="mask-6" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.5" cy="0.125" r="0.125" fill="black" />
          <circle cx="0.5" cy="0.875" r="0.125" fill="black" />
          <circle cx="0.125" cy="0.5" r="0.125" fill="black" />
        </mask>

        <mask id="mask-7" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.5" cy="0.125" r="0.125" fill="black" />
          <circle cx="0.875" cy="0.5" r="0.125" fill="black" />
        </mask>

        <mask id="mask-8" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.5" cy="0.125" r="0.125" fill="white" />
          <circle cx="0.875" cy="0.5" r="0.125" fill="black" />
          <circle cx="0.125" cy="0.5" r="0.125" fill="white" />
        </mask>

        <mask id="mask-9" maskContentUnits="objectBoundingBox">
          <rect x="0.125" y="0.125" width="0.75" height="0.75" fill="white" />
          <circle cx="0.5" cy="0.125" r="0.125" fill="white" />
          <circle cx="0.125" cy="0.5" r="0.125" fill="white" />
        </mask>

      </defs>
    </svg>
  );
}


function JigsawPiece({
  piece,
  position,
  isSnapped,
  containerRef,
  onPickUp,
  onDragMove,
  onDragRelease,
}: JigsawPieceProps) {

  const dragStart = useRef<DragStart | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onPickUp(piece.id);

    const rect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };

    dragStart.current = {
      mouseX: e.clientX - rect.left,
      mouseY: e.clientY - rect.top,
      startX: position.x,
      startY: position.y,
    };

    const onMouseMove = (mv: MouseEvent) => {
      if (!dragStart.current) return;
      onDragMove(
        piece.id,
        dragStart.current.startX + (mv.clientX - rect.left) - dragStart.current.mouseX,
        dragStart.current.startY + (mv.clientY - rect.top) - dragStart.current.mouseY
      );
    };

    const onMouseUp = (mu: MouseEvent) => {
      if (!dragStart.current) return;
      onDragRelease(
        piece.id,
        dragStart.current.startX + (mu.clientX - rect.left) - dragStart.current.mouseX,
        dragStart.current.startY + (mu.clientY - rect.top) - dragStart.current.mouseY
      );
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dragStart.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: PIECE_SIZE,
        height: PIECE_SIZE,
        backgroundColor: piece.color,
        maskImage: `url(#${piece.maskId})`,
        WebkitMaskImage: `url(#${piece.maskId})`,
        cursor: "grab",
        userSelect: "none",
        filter: isSnapped
          ? `brightness(1.15)
             drop-shadow(0 0 12px ${piece.color})
             drop-shadow(0 0 25px ${piece.color})`
          : "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
        transition: "filter 0.25s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: isSnapped ? 2 : 10,
      }}
    >
      <span
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.75rem",
          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}
      >
        {piece.label}
      </span>
    </div>
  );
}

export default function JigsawSkills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const getBoardLeft = () => document.documentElement.clientWidth / 2 - BOARD_SIZE / 2;
  const getBoardTop = () => document.documentElement.clientHeight / 2 - BOARD_SIZE / 2 - 60;

  const slotPos = (slot: typeof SLOTS[0]): Position => ({
    x: getBoardLeft() + slot.col * INNER - MASK_OFFSET,
    y: getBoardTop() + slot.row * INNER - MASK_OFFSET,
  });

  const getInitialPositions = (): PositionMap => {
    const bl = getBoardLeft();
    const bt = getBoardTop();
    return {
      1: { x: bl - INNER - GAP - MASK_OFFSET, y: bt },
      2: { x: bl - INNER - GAP - MASK_OFFSET, y: bt + INNER + PIECE_GAP },
      3: { x: bl - INNER - GAP - MASK_OFFSET, y: bt + 2 * (INNER + PIECE_GAP) },
      4: { x: bl + BOARD_SIZE + GAP - MASK_OFFSET, y: bt },
      5: { x: bl + BOARD_SIZE + GAP - MASK_OFFSET, y: bt + INNER + PIECE_GAP },
      6: { x: bl + BOARD_SIZE + GAP - MASK_OFFSET, y: bt + 2 * (INNER + PIECE_GAP) },
      7: { x: bl, y: bt + BOARD_SIZE + GAP - MASK_OFFSET },
      8: { x: bl + INNER + PIECE_GAP, y: bt + BOARD_SIZE + GAP - MASK_OFFSET },
      9: { x: bl + 2 * (INNER + PIECE_GAP), y: bt + BOARD_SIZE + GAP - MASK_OFFSET },
    };
  };

  const [positions, setPositions] = useState<PositionMap>(getInitialPositions);
  const [grid, setGrid] = useState<GridState>(Array(9).fill(null));
  const filledCount = grid.filter(Boolean).length;

const confettiFiredRef = useRef(false);

useEffect(() => {
  if (filledCount === 9 && !confettiFiredRef.current) {
    confettiFiredRef.current = true;

    const colors = PIECES.map((p) => p.color);
    const duration = 1800;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        spread: 120,
        origin: { x: 0.5, y: 0.45 }, // oko boarda
        colors,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  }

  if (filledCount < 9) {
    confettiFiredRef.current = false;
  }
}, [filledCount]);

  const handlePickUp = (id: number) => {
    setGrid(prev => prev.map(s => s === id ? null : s));
  };

  const handleDragMove = (id: number, x: number, y: number) => {
    setPositions(prev => ({ ...prev, [id]: { x, y } }));
  };

  const handleDragRelease = (id: number, x: number, y: number) => {
    for (const slot of SLOTS) {
      const correctSlot = slot.id === id - 1;
      const sp = slotPos(slot);
      const dist = Math.hypot(
        (x + PIECE_SIZE / 2) - (sp.x + PIECE_SIZE / 2),
        (y + PIECE_SIZE / 2) - (sp.y + PIECE_SIZE / 2)
      );

      if (dist < SNAP_THRESHOLD && correctSlot && grid[slot.id] === null) {
        setPositions(prev => ({ ...prev, [id]: { x: sp.x, y: sp.y } }));
        setGrid(prev => { const n = [...prev]; n[slot.id] = id; return n; });
        return;
      }
    }

    setPositions(prev => ({ ...prev, [id]: { x, y } }));
  };

  const isSnapped = (id: number) => grid.includes(id);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: "#0f0f1a",
        minHeight: "110vh",
        overflow: "visible",
        paddingBottom: 200,
        
        position: "relative",
      }}
    >
      <SvgMasks />

        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Skills
          </h2>

          <p
            style={{
              color: "#666",
              fontSize: "0.85rem",
              marginTop: 6,
            }}
          >
            Drag each piece into its slot — {grid.filter(Boolean).length} / 9 placed
          </p>
        </div>
      {SLOTS.map(slot => {
        const filled = grid[slot.id] !== null;
        const sp = slotPos(slot);
        return (
          <div
            key={slot.id}
            style={{
              position: "absolute",
              left: sp.x,
              top: sp.y,
              width: PIECE_SIZE,
              height: PIECE_SIZE,
            }}
          >
            {!filled && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#161626",
                  maskImage: `url(#${slot.maskId})`,
                  WebkitMaskImage: `url(#${slot.maskId})`,
                }}
              />
            )}
          </div>
        );
      })}

      {PIECES.map(piece => (
        <JigsawPiece
          key={piece.id}
          piece={piece}
          position={positions[piece.id]}
          isSnapped={isSnapped(piece.id)}
          containerRef={containerRef}
          onPickUp={handlePickUp}
          onDragMove={handleDragMove}
          onDragRelease={handleDragRelease}
        />
      ))}
    </div>
  );
}