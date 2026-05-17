import { useGame } from "../useGame";
import { Trophy, RotateCw } from "lucide-react";

export function GameOver({ game }: { game: ReturnType<typeof useGame> }) {
  const { state, reset } = game;
  const crewWon = state.winner === "crew";
  const impostors = state.players.filter((p) => p.isImpostor);
  const mvp = crewWon
    ? state.players.filter((p) => !p.isImpostor).sort((a, b) => b.sus - a.sus)[0]
    : impostors.find((p) => p.alive) ?? impostors[0];

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      <div className="animate-flip-in">
        <Trophy className="mx-auto h-20 w-20 text-neon-saffron drop-shadow-[0_0_30px_oklch(0.82_0.19_60/0.6)]" />
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gradient-hero">
        {crewWon ? "CREWMATES JEET GAYE!" : "IMPOSTORS WIN!"}
      </h2>
      <p className="text-muted-foreground">
        Secret word: <span className="font-display text-2xl text-foreground">{state.word}</span>
      </p>

      <div className="w-full glass rounded-2xl p-5 space-y-3">
        <div className="text-xs uppercase tracking-widest text-neon-cyan">Impostors the</div>
        <div className="flex flex-wrap justify-center gap-2">
          {impostors.map((p) => (
            <span key={p.id} className="rounded-full bg-destructive/20 px-3 py-1 text-sm text-destructive">
              {p.name}
            </span>
          ))}
        </div>
        {mvp && (
          <>
            <div className="text-xs uppercase tracking-widest text-neon-saffron pt-2">Match MVP</div>
            <div className="font-display text-3xl text-gradient-hero">{mvp.name}</div>
          </>
        )}
      </div>

      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-hero px-8 py-4 font-display text-xl tracking-wider text-primary-foreground shadow-neon transition active:scale-95"
      >
        <RotateCw className="h-5 w-5" /> PLAY AGAIN
      </button>
    </div>
  );
}
