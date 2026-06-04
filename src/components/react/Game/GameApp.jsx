const GAMES = [
  { href: "/game/find-the-animal", emoji: "🔍", name: "Find the Animal", desc: "Find the matching animal!", color: "#0EA5E9", bg: "#E0F2FE" },
  { href: "/game/trace-the-lines", emoji: "✏️", name: "Trace the Lines", desc: "Draw along the dotted lines!", color: "#D97706", bg: "#FEF3C7" },
  { href: "/game/matching", emoji: "🔗", name: "Matching Games", desc: "Animals, plants, furniture & more!", color: "#7C3AED", bg: "#F3E8FF" },
];

export function GameApp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gradient-to-b from-sky-200 to-sky-500 p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">🎮 Games</h1>
      <div className="flex flex-col gap-5 w-full max-w-sm">
        {GAMES.map((g) => (
          <a
            key={g.href}
            href={g.href}
            className="flex items-center gap-5 p-5 rounded-3xl shadow-xl transition hover:scale-105 active:scale-95"
            style={{ background: g.bg, border: `3px solid ${g.color}` }}
          >
            <span className="text-5xl">{g.emoji}</span>
            <div>
              <div className="text-xl font-extrabold" style={{ color: g.color }}>{g.name}</div>
              <div className="text-sm text-gray-500">{g.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
