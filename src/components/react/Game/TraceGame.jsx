import { useState, useRef, useEffect, useCallback } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const CW = 360;
const CH = 120;
const TOLERANCE = 22;
const COMPLETE_THRESHOLD = 0.75;

const LEVELS = [
  { id: "zigzag",  name: "Zigzag",  emoji: "⚡", guideColor: "#FCD34D", traceColor: "#D97706", bg: "#FFFBEB" },
  { id: "waves",   name: "Waves",   emoji: "🌊", guideColor: "#93C5FD", traceColor: "#2563EB", bg: "#EFF6FF" },
  { id: "bumps",   name: "Bumps",   emoji: "⛰️", guideColor: "#FCA5A5", traceColor: "#DC2626", bg: "#FEF2F2" },
  { id: "squares", name: "Squares", emoji: "⬜", guideColor: "#86EFAC", traceColor: "#16A34A", bg: "#F0FDF4" },
];

function getRaw(type) {
  switch (type) {
    case "zigzag": {
      const pts = [];
      for (let i = 0; i <= 8; i++) pts.push([20 + i * 40, i % 2 === 0 ? 96 : 18]);
      return pts;
    }
    case "waves": {
      const pts = [];
      for (let i = 0; i <= 80; i++) {
        const t = i / 80;
        pts.push([15 + t * 330, 60 + 42 * Math.sin(t * Math.PI * 4)]);
      }
      return pts;
    }
    case "bumps": {
      const pts = [[15, 96]];
      for (let c = 0; c < 4; c++) {
        const x0 = 15 + c * 90, x1 = x0 + 60;
        pts.push([x0, 22], [x1, 22], [x1, 96]);
        if (c < 3) pts.push([x1 + 30, 96]);
      }
      return pts;
    }
    case "squares": {
      const pts = [[10, 100]];
      for (let c = 0; c < 4; c++) {
        const x0 = 10 + c * 85, x1 = x0 + 65;
        pts.push([x0, 12], [x1, 12], [x1, 100]);
        if (c < 3) pts.push([x1 + 20, 100]);
      }
      return pts;
    }
    default: return [];
  }
}

function densify(pts, step = 4) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    const d = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.max(2, Math.ceil(d / step));
    for (let s = 0; s < n; s++) {
      const t = s / n;
      out.push([x0 + t * (x1 - x0), y0 + t * (y1 - y0)]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

function paintCanvas(ctx, raw, guideColor, traceColor, strokes, current) {
  ctx.clearRect(0, 0, CW, CH);

  ctx.save();
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = guideColor;
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  raw.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.stroke();
  ctx.restore();

  const drawStroke = (pts) => {
    if (pts.length < 2) return;
    ctx.save();
    ctx.strokeStyle = traceColor;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.stroke();
    ctx.restore();
  };

  strokes.forEach(drawStroke);
  drawStroke(current);
}

export function TraceGame() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [levelDone, setLevelDone] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const strokesRef = useRef([]);
  const currentRef = useRef([]);
  const coveredRef = useRef(new Set());
  const pathRef = useRef([]);
  const levelDoneRef = useRef(false);
  const levelDataRef = useRef(LEVELS[0]);

  const repaint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const lv = levelDataRef.current;
    paintCanvas(canvas.getContext("2d"), getRaw(lv.id), lv.guideColor, lv.traceColor, strokesRef.current, currentRef.current);
  }, []);

  const checkCoverage = useCallback((x, y) => {
    pathRef.current.forEach(([px, py], i) => {
      if (!coveredRef.current.has(i) && Math.hypot(px - x, py - y) < TOLERANCE) {
        coveredRef.current.add(i);
      }
    });
    const total = pathRef.current.length;
    const p = total > 0 ? coveredRef.current.size / total : 0;
    setProgress(p);
    if (p >= COMPLETE_THRESHOLD && !levelDoneRef.current) {
      levelDoneRef.current = true;
      setLevelDone(true);
      setShowConfetti(true);
    }
  }, []);

  const getXY = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const sx = CW / rect.width, sy = CH / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return [(src.clientX - rect.left) * sx, (src.clientY - rect.top) * sy];
  }, []);

  const onMouseDown = useCallback((e) => {
    drawing.current = true;
    const [x, y] = getXY(e);
    currentRef.current = [[x, y]];
    checkCoverage(x, y);
  }, [getXY, checkCoverage]);

  const onMouseMove = useCallback((e) => {
    if (!drawing.current) return;
    const [x, y] = getXY(e);
    currentRef.current.push([x, y]);
    checkCoverage(x, y);
    repaint();
  }, [getXY, checkCoverage, repaint]);

  const onMouseUp = useCallback(() => {
    if (currentRef.current.length > 0) {
      strokesRef.current.push([...currentRef.current]);
      currentRef.current = [];
    }
    drawing.current = false;
  }, []);

  const onTouchStart = useCallback((e) => {
    e.preventDefault();
    drawing.current = true;
    const [x, y] = getXY(e);
    currentRef.current = [[x, y]];
    checkCoverage(x, y);
  }, [getXY, checkCoverage]);

  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    if (!drawing.current) return;
    const [x, y] = getXY(e);
    currentRef.current.push([x, y]);
    checkCoverage(x, y);
    repaint();
  }, [getXY, checkCoverage, repaint]);

  const onTouchEnd = useCallback(() => {
    if (currentRef.current.length > 0) {
      strokesRef.current.push([...currentRef.current]);
      currentRef.current = [];
    }
    drawing.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [onTouchStart, onTouchMove, onTouchEnd]);

  useEffect(() => {
    const lv = LEVELS[levelIdx];
    levelDataRef.current = lv;
    const raw = getRaw(lv.id);
    pathRef.current = densify(raw);
    strokesRef.current = [];
    currentRef.current = [];
    coveredRef.current = new Set();
    levelDoneRef.current = false;
    setProgress(0);
    setLevelDone(false);
    setShowConfetti(false);
    const canvas = canvasRef.current;
    if (canvas) paintCanvas(canvas.getContext("2d"), raw, lv.guideColor, lv.traceColor, [], []);
  }, [levelIdx]);

  const level = LEVELS[Math.min(levelIdx, LEVELS.length - 1)];

  const nextLevel = () => {
    if (levelIdx + 1 < LEVELS.length) {
      setLevelIdx(levelIdx + 1);
    } else {
      setAllDone(true);
    }
  };

  const clearLevel = () => {
    const lv = levelDataRef.current;
    const raw = getRaw(lv.id);
    strokesRef.current = [];
    currentRef.current = [];
    coveredRef.current = new Set();
    levelDoneRef.current = false;
    setProgress(0);
    setLevelDone(false);
    setShowConfetti(false);
    const canvas = canvasRef.current;
    if (canvas) paintCanvas(canvas.getContext("2d"), raw, lv.guideColor, lv.traceColor, [], []);
  };

  if (allDone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gradient-to-b from-yellow-100 to-orange-200">
        <ConfettiExplosion />
        <div className="text-7xl">🎉</div>
        <h2 className="text-3xl font-bold text-orange-800 text-center">You traced all the lines!</h2>
        <button
          onClick={() => { setLevelIdx(0); setAllDone(false); }}
          className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold text-xl shadow-lg hover:bg-orange-400 transition"
        >
          Play Again
        </button>
        <a href="/game" className="text-orange-600 underline text-sm">
          ← Back to Games
        </a>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-5 p-4 select-none"
      style={{ background: `linear-gradient(to bottom, ${level.bg}, #ffffff)` }}
    >
      {showConfetti && <ConfettiExplosion />}

      <h1 className="text-2xl md:text-3xl font-extrabold text-center" style={{ color: level.traceColor }}>
        Follow the dots! {level.emoji}
      </h1>
      <p className="text-sm text-gray-500 -mt-3">Draw along the dotted line</p>

      <div className="flex gap-3">
        {LEVELS.map((l, i) => (
          <div
            key={l.id}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-base font-bold transition-all ${
              i < levelIdx ? "bg-green-400 text-white shadow" :
              i === levelIdx ? "bg-white shadow-md" : "bg-gray-200 text-gray-400"
            }`}
            style={i === levelIdx ? { border: `3px solid ${level.traceColor}`, color: level.traceColor } : {}}
          >
            {i < levelIdx ? "✓" : l.emoji}
          </div>
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={CW}
        height={CH}
        className="w-full max-w-md rounded-2xl shadow-xl"
        style={{ border: `4px solid ${level.guideColor}`, background: "#fff", touchAction: "none", cursor: "crosshair" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      />

      <div className="w-full max-w-md px-1">
        <div className="flex justify-between text-xs font-semibold mb-1" style={{ color: level.traceColor }}>
          <span>✏️ Progress</span>
          <span>{Math.min(100, Math.round(progress * 100))}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full transition-all duration-150"
            style={{ width: `${Math.min(100, Math.round(progress * 100))}%`, background: level.traceColor }}
          />
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={clearLevel}
          className="bg-gray-200 text-gray-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          Clear 🧹
        </button>
        {levelDone && (
          <button
            onClick={nextLevel}
            className="text-white px-6 py-2 rounded-xl font-bold shadow-lg animate-bounce text-lg"
            style={{ background: level.traceColor }}
          >
            {levelIdx < LEVELS.length - 1 ? "Next →" : "Finish 🎉"}
          </button>
        )}
      </div>

      <a href="/game" className="text-gray-400 text-xs underline">
        ← Back to Games
      </a>
    </div>
  );
}
