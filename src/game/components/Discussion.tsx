import { useGame } from "../useGame";
import { Timer, Mic } from "lucide-react";

export function Discussion({ game }: { game: ReturnType<typeof useGame> }) {
  const { state, skipToVote } = game;
  const mm = String(Math.floor(state.timer / 60)).padStart(2, "0");
  const ss = String(state.timer % 60).padStart(2, "0");
  const alive = state.players.filter((p) => p.alive);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-10">
      <div className="text-center space-y-2 animate-rise">
        <div className="text-xs uppercase tracking-widest text-neon-cyan">Round {state.round} · Discussion</div>
        <div className="font-display text-7xl text-gradient-hero">{mm}:{ss}</div>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Mic className="h-4 w-4" /> Ek ek karke clue do. Direct word mat bolna.
        </div>
      </div>

      {state.chaos && (
        <div className="glass neon-border rounded-2xl p-4 text-center animate-rise">
          <div className="text-xs uppercase tracking-widest text-neon-saffron">Chaos Event</div>
          <div className="mt-1 text-lg">{state.chaos}</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {alive.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-4 text-center">
            <div className="font-display text-2xl">{p.name}</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-gradient-danger transition-all" style={{ width: `${p.sus}%` }} />
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Sus {p.sus}%</div>
          </div>
        ))}
      </div>

      <button
        onClick={skipToVote}
        className="w-full rounded-2xl glass neon-border py-4 font-display text-xl tracking-wider transition hover:bg-secondary/30 active:scale-95"
      >
        <Timer className="mr-2 inline h-5 w-5" /> SKIP → VOTE NOW
      </button>
    </div>
  );
}
