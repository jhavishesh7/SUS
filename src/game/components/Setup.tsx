import { useGame, type Mode } from "../useGame";
import { CATEGORIES } from "../wordBank";
import { Minus, Plus, Play, Loader2 } from "lucide-react";

const MODES: Mode[] = ["Classic", "Fast 60s", "Hardcore (No Hints)", "Desi Meme", "Voice Chaos"];

export function Setup({ game }: { game: ReturnType<typeof useGame> }) {
  const { state, setPlayerCount, setPlayerName, setMode, startGame } = game;
  const n = state.players.length;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-10">
      <header className="text-center space-y-3 animate-rise">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-neon-cyan">
          <span className="h-2 w-2 rounded-full bg-neon-magenta animate-pulse" />
          Bhai kaun sus hai?
        </div>
        <h1 className="font-display text-7xl md:text-8xl text-gradient-hero leading-none">
          SUS<span className="text-neon-cyan">.</span>
        </h1>
        <p className="text-muted-foreground">
          Pass-and-play desi impostor party. Ek phone, full bakchodi.
        </p>
      </header>

      <section className="glass rounded-3xl p-6 space-y-6 shadow-elevated">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Players</label>
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={() => setPlayerCount(Math.max(3, n - 1))}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary hover:bg-secondary/70 transition active:scale-95"
              aria-label="Decrease players"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="font-display text-6xl text-gradient-hero">{n}</div>
              <div className="text-xs text-muted-foreground">
                Total Players
              </div>
            </div>
            <button
              onClick={() => setPlayerCount(Math.min(15, n + 1))}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero text-primary-foreground hover:opacity-90 transition active:scale-95 shadow-neon"
              aria-label="Increase players"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Impostors</label>
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={() => game.setImpostorCount(Math.max(1, state.impostorCount - 1))}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary hover:bg-secondary/70 transition active:scale-95"
              aria-label="Decrease impostors"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="font-display text-6xl text-gradient-hero">{state.impostorCount}</div>
              <div className="text-xs text-muted-foreground">
                Impostors
              </div>
            </div>
            <button
              onClick={() => game.setImpostorCount(Math.min(Math.floor(n / 2), state.impostorCount + 1))}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero text-primary-foreground hover:opacity-90 transition active:scale-95 shadow-neon"
              aria-label="Increase impostors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Player Names</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {state.players.map((p, i) => (
              <input
                key={p.id}
                value={p.name}
                onChange={(e) => setPlayerName(p.id, e.target.value.slice(0, 14))}
                className="rounded-xl bg-input/60 px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-2 focus:ring-primary transition"
                placeholder={`P${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Mode</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
                  state.mode === m
                    ? "bg-gradient-hero text-primary-foreground shadow-neon"
                    : "glass text-foreground hover:bg-secondary/60"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Category</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Random", ...CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => game.setSelectedCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
                  state.selectedCategory === c
                    ? "bg-gradient-hero text-primary-foreground shadow-neon"
                    : "glass text-foreground hover:bg-secondary/60"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startGame}
          disabled={state.loading}
          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-hero py-5 font-display text-2xl tracking-wider text-primary-foreground shadow-neon transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {state.loading ? (
            <span className="inline-flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Loading desi chaos…</span>
          ) : (
            <span className="inline-flex items-center gap-2"><Play className="h-6 w-6" /> START GAME</span>
          )}
        </button>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        Tip: Phone ek dusre ko pass karna padega. Apna word kisi ko mat dikhana.
      </p>
    </div>
  );
}
