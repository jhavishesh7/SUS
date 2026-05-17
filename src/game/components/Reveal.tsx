import { useState } from "react";
import { useGame } from "../useGame";
import { Eye, EyeOff } from "lucide-react";

export function Reveal({ game }: { game: ReturnType<typeof useGame> }) {
  const { state, nextReveal } = game;
  const [shown, setShown] = useState(false);
  const player = state.players[state.revealIndex];

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-10">
      <div className="text-center animate-rise">
        <div className="text-xs uppercase tracking-widest text-neon-cyan">
          Phone do → {player.name}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {state.revealIndex + 1} / {state.players.length}
        </div>
      </div>

      <div
        key={player.id + (shown ? "-on" : "-off")}
        className="relative w-full aspect-[3/4] rounded-3xl p-8 flex flex-col items-center justify-center glass neon-border animate-flip-in"
      >
        {!shown ? (
          <button
            onClick={() => setShown(true)}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-hero shadow-neon">
              <EyeOff className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="font-display text-3xl">{player.name}</div>
            <div className="text-sm text-muted-foreground">
              Tap karke apna role dekho.<br />Akele dekhna, dusre ko mat dikhana!
            </div>
          </button>
        ) : player.isImpostor ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-danger shadow-[0_0_40px_oklch(0.65_0.27_25_/_0.6)] animate-pulse-neon">
              <Eye className="h-10 w-10 text-destructive-foreground" />
            </div>
            <div className="font-display text-4xl sm:text-5xl text-destructive">IMPOSTOR</div>
            <div className="text-sm text-muted-foreground max-w-xs">
              Word nahi pata. Bhai blend in kar, kuch generic bol. Mat fatne dena.
            </div>
            <div className="mt-3 rounded-xl bg-destructive/20 px-4 py-2 text-xs uppercase tracking-wider text-destructive">
              Category hint: {state.category}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="text-xs uppercase tracking-widest text-neon-cyan">Your secret word</div>
            <div className="font-display text-4xl sm:text-5xl text-gradient-hero break-words leading-tight">
              {state.word}
            </div>
            <div className="rounded-xl bg-accent/20 px-4 py-2 text-xs uppercase tracking-wider text-accent">
              {state.category}
            </div>
            <div className="mt-2 text-sm text-muted-foreground max-w-xs">
              Clue dena hai — direct word mat bolna warna game khatam.
            </div>
          </div>
        )}
      </div>

      {shown && (
        <button
          onClick={() => { setShown(false); nextReveal(); }}
          className="w-full rounded-2xl bg-gradient-hero py-4 font-display text-xl tracking-wider text-primary-foreground shadow-neon transition active:scale-95"
        >
          {state.revealIndex + 1 === state.players.length ? "START DISCUSSION →" : "NEXT PLAYER →"}
        </button>
      )}
    </div>
  );
}
