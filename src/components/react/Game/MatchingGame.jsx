import { useState, useRef, useLayoutEffect, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { THEMES } from "./matchingThemes";

const PAIR_COLORS = ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#8B5CF6"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MatchingGame({ theme = "furniture" }) {
  const themeData = THEMES[theme] || THEMES.furniture;
  const PAIRS = themeData.pairs;

  const [rightOrder, setRightOrder] = useState(() => shuffle(PAIRS.map((_, i) => i)));
  const [matches, setMatches] = useState({});
  const [dragState, setDragState] = useState(null);
  const [wrongLine, setWrongLine] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [linePositions, setLinePositions] = useState([]);
  const [tick, setTick] = useState(0);

  const containerRef = useRef(null);
  const leftItemRefs = useRef([]);
  const rightItemRefs = useRef([]);

  const rightRowOf = {};
  rightOrder.forEach((pairIdx, row) => { rightRowOf[pairIdx] = row; });

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const lines = Object.keys(matches).map(key => {
      const pi = parseInt(key);
      const leftEl = leftItemRefs.current[pi];
      const rightEl = rightItemRefs.current[rightRowOf[pi]];
      if (!leftEl || !rightEl) return null;
      const l = leftEl.getBoundingClientRect();
      const r = rightEl.getBoundingClientRect();
      return {
        pairIdx: pi,
        x1: (l.left + l.right) / 2 - cr.left,
        y1: (l.top + l.bottom) / 2 - cr.top,
        x2: (r.left + r.right) / 2 - cr.left,
        y2: (r.top + r.bottom) / 2 - cr.top,
      };
    }).filter(Boolean);
    setLinePositions(lines);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, tick]);

  useEffect(() => {
    const onResize = () => setTick(t => t + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function toContainerCoords(clientX, clientY) {
    const cr = containerRef.current.getBoundingClientRect();
    return { x: clientX - cr.left, y: clientY - cr.top };
  }

  function hitTestLeft(clientX, clientY) {
    for (let i = 0; i < PAIRS.length; i++) {
      if (matches[i]) continue;
      const el = leftItemRefs.current[i];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) return i;
    }
    return null;
  }

  function hitTestRight(clientX, clientY) {
    for (let row = 0; row < PAIRS.length; row++) {
      const pairIdx = rightOrder[row];
      if (matches[pairIdx]) continue;
      const el = rightItemRefs.current[row];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) return pairIdx;
    }
    return null;
  }

  function handlePointerDown(e) {
    const leftIdx = hitTestLeft(e.clientX, e.clientY);
    if (leftIdx === null) return;
    e.preventDefault();
    containerRef.current?.setPointerCapture(e.pointerId);
    const pos = toContainerCoords(e.clientX, e.clientY);
    setDragState({ pairIdx: leftIdx, x: pos.x, y: pos.y });
  }

  function handlePointerMove(e) {
    if (!dragState) return;
    const pos = toContainerCoords(e.clientX, e.clientY);
    setDragState(prev => prev ? { ...prev, x: pos.x, y: pos.y } : null);
  }

  function handlePointerUp(e) {
    if (!dragState) return;
    const rightPairIdx = hitTestRight(e.clientX, e.clientY);
    const endPos = toContainerCoords(e.clientX, e.clientY);

    if (rightPairIdx !== null) {
      if (dragState.pairIdx === rightPairIdx) {
        const newMatches = { ...matches, [dragState.pairIdx]: true };
        setMatches(newMatches);
        if (Object.keys(newMatches).length === PAIRS.length) setShowConfetti(true);
      } else {
        const leftEl = leftItemRefs.current[dragState.pairIdx];
        if (leftEl && containerRef.current) {
          const cr = containerRef.current.getBoundingClientRect();
          const rect = leftEl.getBoundingClientRect();
          setWrongLine({
            x1: (rect.left + rect.right) / 2 - cr.left,
            y1: (rect.top + rect.bottom) / 2 - cr.top,
            x2: endPos.x,
            y2: endPos.y,
          });
          setTimeout(() => setWrongLine(null), 600);
        }
      }
    }
    setDragState(null);
  }

  let inProgressLine = null;
  if (dragState && containerRef.current) {
    const leftEl = leftItemRefs.current[dragState.pairIdx];
    if (leftEl) {
      const cr = containerRef.current.getBoundingClientRect();
      const rect = leftEl.getBoundingClientRect();
      inProgressLine = {
        x1: (rect.left + rect.right) / 2 - cr.left,
        y1: (rect.top + rect.bottom) / 2 - cr.top,
        x2: dragState.x,
        y2: dragState.y,
      };
    }
  }

  function resetGame() {
    setRightOrder(shuffle(PAIRS.map((_, i) => i)));
    setMatches({});
    setDragState(null);
    setWrongLine(null);
    setShowConfetti(false);
    setLinePositions([]);
  }

  const allMatched = Object.keys(matches).length === PAIRS.length;

  return (
    <div
      className="flex flex-col items-center min-h-screen p-4 gap-4"
      style={{ background: `linear-gradient(to bottom, ${themeData.bgFrom}, #ffffff)` }}
    >
      {showConfetti && <ConfettiExplosion />}

      <h1 className="text-2xl md:text-3xl font-extrabold text-center mt-4" style={{ color: themeData.accent }}>
        {themeData.title} {themeData.emoji}
      </h1>
      <p className="text-sm text-gray-400 text-center -mt-2">Draw a line from one to its match</p>

      {allMatched ? (
        <div className="flex flex-col items-center gap-5 mt-10">
          <div className="text-7xl">🎉</div>
          <h2 className="text-3xl font-bold text-center" style={{ color: themeData.accent }}>All matched!</h2>
          <button
            onClick={resetGame}
            className="text-white px-8 py-3 rounded-2xl font-bold text-xl shadow-lg transition"
            style={{ background: themeData.accent }}
          >
            Play Again
          </button>
          <a href="/game/matching" className="text-sm underline" style={{ color: themeData.accent + "99" }}>
            ← More Matching Games
          </a>
        </div>
      ) : (
        <>
          <div
            ref={containerRef}
            className="relative w-full max-w-xs select-none"
            style={{ touchAction: "none", cursor: dragState ? "grabbing" : "default" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => setDragState(null)}
          >
            <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%", zIndex: 10 }}>
              {linePositions.map(({ pairIdx, x1, y1, x2, y2 }) => (
                <line key={pairIdx} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={PAIR_COLORS[pairIdx]} strokeWidth="5" strokeLinecap="round"/>
              ))}
              {wrongLine && (
                <line x1={wrongLine.x1} y1={wrongLine.y1} x2={wrongLine.x2} y2={wrongLine.y2}
                  stroke="#EF4444" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>
              )}
              {inProgressLine && (
                <line x1={inProgressLine.x1} y1={inProgressLine.y1}
                  x2={inProgressLine.x2} y2={inProgressLine.y2}
                  stroke="#94A3B8" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray="8 6" opacity="0.75"/>
              )}
            </svg>

            <div className="flex gap-2">
              <div className="flex flex-col gap-3 flex-1">
                {PAIRS.map((pair, i) => {
                  const isMatched = !!matches[i];
                  const isDragging = dragState?.pairIdx === i;
                  return (
                    <div key={pair.id} ref={el => { leftItemRefs.current[i] = el; }}
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow p-2 transition-all ${
                        isMatched ? "opacity-40 bg-white" :
                        isDragging ? "bg-blue-50 ring-4 ring-blue-300 scale-105 shadow-lg" :
                        "bg-white cursor-grab hover:shadow-md"
                      }`}
                    >
                      <pair.LeftSvg />
                    </div>
                  );
                })}
              </div>

              <div className="w-14 flex-shrink-0" />

              <div className="flex flex-col gap-3 flex-1 items-end">
                {rightOrder.map((pairIdx, row) => {
                  const pair = PAIRS[pairIdx];
                  const isMatched = !!matches[pairIdx];
                  return (
                    <div key={row} ref={el => { rightItemRefs.current[row] = el; }}
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow p-2 transition-all ${
                        isMatched ? "opacity-40 bg-white" : "bg-white hover:shadow-md"
                      }`}
                    >
                      <pair.RightSvg />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <a href="/game/matching" className="text-gray-400 text-xs underline mt-2">← More Matching Games</a>
        </>
      )}
    </div>
  );
}
