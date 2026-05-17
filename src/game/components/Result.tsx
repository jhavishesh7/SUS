import { useGame, ROAST_LINES } from "../useGame";
import { Skull, ArrowRight } from "lucide-react";

export function Result({ game }: { game: ReturnType<typeof useGame> }) {
  const { state, nextRound } = game;
  const e = state.lastEliminated;
  const roast = ROAST_LINES[Math.floor(Math.random() * ROAST_LINES.length)];

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      {e ? (
        <div className="flex flex-col items-center gap-4 animate-flip-in">
          <div className="grid h-32 w-32 place-items-center rounded-full bg-gradient-danger shadow-[0_0_50px_oklch(0.65_0.27_25/0.6)] animate-pulse-neon">
            <Skull className="h-16 w-16 text-destructive-foreground" />
          </div>
          <div className="font-display text-4xl sm:text-5xl text-destructive">{e.name}</div>
          <div className="text-xl">
            {e.isImpostor ? (
              <span className="text-neon-lime">tha ek IMPOSTOR! 🎯</span>
            ) : (
              <span className="text-neon-cyan">CREWMATE tha 💀 galat vote</span>
            )}
          </div>
          <div className="glass rounded-2xl px-5 py-3 text-sm italic">"{roast}"</div>
        </div>
      ) : (
        <div className="font-display text-3xl sm:text-4xl text-gradient-hero animate-rise">
          TIE! Koi nahi gaya 🤝
        </div>
      )}

      <button
        onClick={nextRound}
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-8 py-4 font-display text-xl tracking-wider text-primary-foreground shadow-neon transition active:scale-95"
      >
        NEXT ROUND <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
