import { useState } from "react";
import { useGame } from "../useGame";
import { Skull } from "lucide-react";

export function Voting({ game }: { game: ReturnType<typeof useGame> }) {
  const { state, castVote, resolveVote } = game;
  const [voted, setVoted] = useState<Set<number>>(new Set());
  const alive = state.players.filter((p) => p.alive);
  const voterIds = alive.map((p) => p.id);
  const currentVoter = voterIds.find((id) => !voted.has(id));

  if (currentVoter === undefined) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-6 px-4">
        <div className="font-display text-4xl text-gradient-hero">Votes counted</div>
        <button
          onClick={resolveVote}
          className="rounded-2xl bg-gradient-danger px-10 py-4 font-display text-2xl tracking-wider text-destructive-foreground shadow-[0_0_30px_oklch(0.65_0.27_25/0.5)] transition active:scale-95"
        >
          REVEAL RESULT
        </button>
      </div>
    );
  }

  const voter = state.players.find((p) => p.id === currentVoter)!;

  return (
    <div className="mx-auto w-full max-w-xl space-y-6 px-4 py-10">
      <div className="text-center animate-rise">
        <div className="text-xs uppercase tracking-widest text-neon-cyan">Voting</div>
        <div className="font-display text-3xl">
          <span className="text-gradient-hero">{voter.name}</span>, kisko vote karoge?
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          Phone {voter.name} ko do → vote dabao → next player
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {alive.filter((p) => p.id !== voter.id).map((p) => (
          <button
            key={p.id}
            onClick={() => { castVote(p.id); setVoted((s) => new Set(s).add(voter.id)); }}
            className="group flex flex-col items-center gap-2 rounded-2xl glass p-5 transition hover:scale-[1.03] hover:neon-border active:scale-95"
          >
            <Skull className="h-8 w-8 text-neon-magenta group-hover:animate-pulse" />
            <span className="font-display text-2xl">{p.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => setVoted((s) => new Set(s).add(voter.id))}
        className="w-full rounded-xl bg-muted py-3 text-sm text-muted-foreground transition hover:bg-secondary"
      >
        Skip / abstain
      </button>
    </div>
  );
}
