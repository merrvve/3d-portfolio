import { useState, useRef, useEffect } from "react";

// ── Palette & config ──────────────────────────────────────────
const COLORS = [
  "#EF4444", "#F97316", "#FBBF24", "#EAB308",
  "#22C55E", "#10B981", "#06B6D4", "#3B82F6",
  "#6366F1", "#8B5CF6", "#EC4899", "#F43F5E",
  "#92400E", "#78716C", "#1A1A1A", "#FFFFFF",
];

const BRUSHES = [5, 10, 18, 30];

const PAGES = [
  { id: "daisy",           label: "Daisy",          src: "/coloring/daisy.jpg"                             },
  { id: "minnie",          label: "Minnie",          src: "/coloring/minnie.jfif"                           },
  { id: "elsa",            label: "Elsa",            src: "/coloring/elsa.jpg"                              },
  { id: "tweety",          label: "Tweety",          src: "/coloring/tweety.jpg"                            },
  { id: "mermaid",         label: "Mermaid",         src: "/coloring/mermaid.jpg"                           },
  { id: "mermaid2",        label: "Mermaid 2",       src: "/coloring/mermaid2.jpg"                          },
  { id: "unicorn",         label: "Unicorn",         src: "/coloring/unicorn.jpg"                           },
  { id: "rainbow-unicorn", label: "Rainbow Unicorn", src: "/coloring/rainbow-unicorn.png"                   },
  { id: "cats",            label: "Cats",            src: "/coloring/cats.jpg"                              },
  { id: "kitty",           label: "Kitty",           src: "/coloring/kitty.jpg"                             },
  { id: "cat-butterfly",   label: "Cat & Butterfly", src: "/coloring/cat-and-butterfly.jpg"                 },
  { id: "dog",             label: "Dog",             src: "/coloring/dog.jpg"                               },
  { id: "rabbit",          label: "Rabbit",          src: "/coloring/rabbit.jpg"                            },
  { id: "giraffe",         label: "Giraffe",         src: "/coloring/giraffe.jpg"                           },
  { id: "cartoon",         label: "Cartoon",         src: "/coloring/a780c8f27a0b9475430167b804c31d04.jpg"  },
];

const CW = 600, CH = 800;

// ── Component ─────────────────────────────────────────────────
export function PaintingGame() {
  const [color, setColor] = useState("#3B82F6");
  const [brush, setBrush] = useState(12);
  const [pageIdx, setPageIdx] = useState(0);
  const [missing, setMissing] = useState({});

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const stripRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef(null);

  // White-fill canvas whenever page changes
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, CW, CH);
  }, [pageIdx]);

  // ── Drawing helpers ─────────────────────────────────────────
  function toCanvas(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const sx = CW / rect.width, sy = CH / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * sx,
      y: (src.clientY - rect.top) * sy,
    };
  }

  function paint(x, y, fx, fy) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = brush;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (fx != null) {
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, brush / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // ── Draw handlers (used for both mouse and touch) ────────────
  function onDown(e) {
    e.preventDefault();
    drawing.current = true;
    const pos = toCanvas(e);
    paint(pos.x, pos.y);
    lastPos.current = pos;
  }

  function onMove(e) {
    if (!drawing.current) return;
    const pos = toCanvas(e);
    const lp = lastPos.current;
    paint(pos.x, pos.y, lp?.x, lp?.y);
    lastPos.current = pos;
  }

  function onUp() {
    drawing.current = false;
    lastPos.current = null;
  }

  // Ref always points to the latest handlers — lets us attach touch
  // listeners once without stale-closure issues.
  const handlersRef = useRef(null);
  handlersRef.current = { onDown, onMove, onUp };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ts = (e) => { e.preventDefault(); handlersRef.current.onDown(e); };
    const tm = (e) => { e.preventDefault(); handlersRef.current.onMove(e); };
    const te = () => handlersRef.current.onUp();
    el.addEventListener("touchstart",  ts, { passive: false });
    el.addEventListener("touchmove",   tm, { passive: false });
    el.addEventListener("touchend",    te);
    el.addEventListener("touchcancel", te);
    return () => {
      el.removeEventListener("touchstart",  ts);
      el.removeEventListener("touchmove",   tm);
      el.removeEventListener("touchend",    te);
      el.removeEventListener("touchcancel", te);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function clear() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, CW, CH);
  }

  const page = PAGES[pageIdx];
  const isEraser = color === "#FFFFFF";

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-pink-50 to-white pb-8 gap-3">

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-sm px-4 pt-4">
        <a href="/game" className="text-gray-400 text-xs underline">← Games</a>
        <h1 className="text-xl font-extrabold text-pink-500">🎨 Coloring Book</h1>
        <button
          onClick={clear}
          className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-200 transition font-semibold"
        >
          Clear 🗑️
        </button>
      </div>

      {/* Page selector — scrollable thumbnail strip with arrow buttons */}
      <div className="flex items-center gap-1 w-full max-w-sm px-2">
        <button
          onClick={() => stripRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-500 hover:text-pink-500 font-bold transition flex items-center justify-center text-sm"
        >
          ‹
        </button>

        <div
          ref={stripRef}
          className="flex gap-2 overflow-x-auto pb-1 flex-1"
          style={{ scrollbarWidth: "none" }}
        >
          {PAGES.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setPageIdx(i)}
              className="flex-shrink-0 flex flex-col items-center gap-1 rounded-xl overflow-hidden transition-all"
              style={{
                border: i === pageIdx ? "3px solid #EC4899" : "3px solid transparent",
                boxShadow: i === pageIdx ? "0 0 0 2px #FBCFE8" : "none",
                background: "#f3f4f6",
                width: 64,
              }}
            >
              <img
                src={p.src}
                alt={p.label}
                className="w-full"
                style={{ height: 64, objectFit: "cover" }}
                onError={e => { e.currentTarget.style.display = "none"; }}
              />
              <span
                className="text-[10px] font-bold pb-1 px-1 text-center leading-tight"
                style={{ color: i === pageIdx ? "#EC4899" : "#6b7280" }}
              >
                {p.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => stripRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-500 hover:text-pink-500 font-bold transition flex items-center justify-center text-sm"
        >
          ›
        </button>
      </div>

      {/* ── Drawing area ── */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-pink-200 select-none"
        style={{
          width: "min(100vw - 24px, 360px)",
          aspectRatio: "3 / 4",
          touchAction: "none",
          cursor: isEraser ? "cell" : "crosshair",
        }}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
      >
        {/* Layer 1 — paint canvas (white bg + strokes) */}
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          className="absolute inset-0 w-full h-full"
        />

        {/* Layer 2 — outline image */}
        {/* mix-blend-mode:multiply makes white → transparent, black stays black */}
        {!missing[page.id] ? (
          <img
            key={page.id}
            src={page.src}
            alt={page.label}
            draggable={false}
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            style={{ objectFit: "fill", mixBlendMode: "multiply" }}
            onError={() => setMissing(prev => ({ ...prev, [page.id]: true }))}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-center p-6 pointer-events-none">
            <div className="text-5xl mb-3">🖼️</div>
            <p className="text-sm font-semibold text-gray-600 mb-1">Image not found</p>
            <p className="text-xs text-gray-400">
              Save the image as
            </p>
            <code className="text-xs bg-gray-100 rounded px-2 py-0.5 mt-1 text-gray-600">
              public{page.src}
            </code>
          </div>
        )}
      </div>

      {/* ── Color palette ── */}
      <div className="flex flex-wrap gap-[10px] justify-center w-full max-w-xs px-2">
        {COLORS.map(c => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="rounded-full transition-all"
            style={{
              width: 36, height: 36,
              background: c,
              border: c === color
                ? "3px solid #1a1a1a"
                : c === "#FFFFFF"
                ? "2px solid #d1d5db"
                : "2px solid transparent",
              transform: c === color ? "scale(1.3)" : "scale(1)",
              boxShadow: c === color ? "0 2px 10px rgba(0,0,0,0.3)" : "none",
            }}
          />
        ))}
      </div>

      {/* ── Brush size row ── */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold text-gray-400">Size</span>
        {BRUSHES.map(s => (
          <button
            key={s}
            onClick={() => setBrush(s)}
            className="rounded-full transition-all"
            style={{
              width: s + 14, height: s + 14,
              background: brush === s ? (isEraser ? "#9ca3af" : color) : "#e5e7eb",
              border: brush === s
                ? `3px solid ${isEraser ? "#6b7280" : color}`
                : "2px solid transparent",
              boxShadow: brush === s ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
            }}
          />
        ))}
        <button
          onClick={() => setColor("#FFFFFF")}
          className="ml-1 px-3 py-1 rounded-xl text-xs font-bold transition-all"
          style={{
            background: isEraser ? "#1a1a1a" : "#f3f4f6",
            color: isEraser ? "white" : "#6b7280",
          }}
        >
          Eraser
        </button>
      </div>

    </div>
  );
}
