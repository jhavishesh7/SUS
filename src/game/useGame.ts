import { useCallback, useEffect, useRef, useState } from "react";
import { CHAOS_EVENTS, getRandomWord, ROAST_LINES } from "./wordBank";

export type Phase =
  | "setup"
  | "dealing"
  | "reveal"
  | "discussion"
  | "voting"
  | "result"
  | "gameover";

export type Mode =
  | "Classic"
  | "Fast 60s"
  | "Hardcore (No Hints)"
  | "Desi Meme"
  | "Voice Chaos";

export interface Player {
  id: number;
  name: string;
  alive: boolean;
  isImpostor: boolean;
  votes: number;
  sus: number; // 0-100
}

// Default calculation no longer strictly used, but kept for legacy/initial setup if needed
export function defaultImpostorCount(n: number): number {
  if (n <= 5) return 1;
  if (n <= 10) return 2;
  return 3;
}

export function discussionSeconds(mode: Mode): number {
  switch (mode) {
    case "Fast 60s": return 60;
    case "Hardcore (No Hints)": return 90;
    case "Voice Chaos": return 180;
    default: return 120;
  }
}

export interface GameState {
  phase: Phase;
  players: Player[];
  mode: Mode;
  impostorCount: number;
  selectedCategory: string;
  word: string | null;
  category: string;
  revealIndex: number; // which player is currently looking at their card
  chaos: string | null;
  timer: number;
  round: number;
  lastEliminated: Player | null;
  winner: "crew" | "impostors" | null;
  loading: boolean;
}

const STORAGE_KEY = "sus-used-words-v1";

function loadUsed(): Set<string> {
  try {
    if (typeof window === "undefined") return new Set();
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}
function saveUsed(s: Set<string>) {
  try {
    const arr = Array.from(s).slice(-120);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {}
}

export function useGame() {
  const [state, setState] = useState<GameState>({
    phase: "setup",
    players: defaultPlayers(5),
    mode: "Classic",
    impostorCount: 1,
    selectedCategory: "Random",
    word: null,
    category: "",
    revealIndex: 0,
    chaos: null,
    timer: 0,
    round: 1,
    lastEliminated: null,
    winner: null,
    loading: false,
  });

  const usedRef = useRef<Set<string>>(new Set());
  const impostorHistoryRef = useRef<Record<number, number>>({});
  
  useEffect(() => { usedRef.current = loadUsed(); }, []);

  // Discussion timer
  useEffect(() => {
    if (state.phase !== "discussion") return;
    if (state.timer <= 0) {
      setState((s) => ({ ...s, phase: "voting" }));
      return;
    }
    const t = setTimeout(() => setState((s) => ({ ...s, timer: s.timer - 1 })), 1000);
    return () => clearTimeout(t);
  }, [state.phase, state.timer]);

  const setPlayerCount = (n: number) =>
    setState((s) => ({ ...s, players: resizePlayers(s.players, n) }));

  const setPlayerName = (id: number, name: string) =>
    setState((s) => ({
      ...s,
      players: s.players.map((p) => (p.id === id ? { ...p, name } : p)),
    }));

  const setMode = (mode: Mode) => setState((s) => ({ ...s, mode }));
  const setImpostorCount = (n: number) => setState((s) => ({ ...s, impostorCount: n }));
  const setSelectedCategory = (cat: string) => setState((s) => ({ ...s, selectedCategory: cat }));

  const startGame = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    const avoid = Array.from(usedRef.current);

    let word: string | null = null;
    let category = "";
    try {
      const res = await fetch("/api/generate-word", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ avoid, mode: state.mode, category: state.selectedCategory }),
      });
      if (res.ok) {
        const data = (await res.json()) as { word?: string | null; category?: string };
        if (data.word && !usedRef.current.has(data.word)) {
          word = data.word;
          category = data.category || "Desi";
        }
      }
    } catch { /* fallback below */ }

    if (!word) {
      const fb = getRandomWord(usedRef.current, state.selectedCategory);
      word = fb.word;
      category = fb.category;
    }

    usedRef.current.add(word);
    saveUsed(usedRef.current);

    setState((s) => {
      const n = s.players.length;
      const imps = s.impostorCount;
      const impSet = new Set<number>();
      
      // Calculate weights based on history for maximum "craZzy" randomness
      const weights = Array.from({ length: n }, (_, i) => {
        const historyCount = impostorHistoryRef.current[i] || 0;
        // Massive random base, drastically reduced by how many times they were impostor
        const baseRandom = Math.random() * 10000; 
        return Math.max(1, baseRandom / Math.pow(50, historyCount));
      });

      while (impSet.size < Math.min(imps, n)) {
        let totalWeight = 0;
        const currentWeights = weights.map((w, i) => impSet.has(i) ? 0 : w);
        for (const w of currentWeights) totalWeight += w;
        
        let r = Math.random() * totalWeight;
        for (let i = 0; i < n; i++) {
          if (impSet.has(i)) continue;
          r -= currentWeights[i];
          if (r <= 0) {
            impSet.add(i);
            break;
          }
        }
      }

      // Update history
      impSet.forEach(i => {
        impostorHistoryRef.current[i] = (impostorHistoryRef.current[i] || 0) + 1;
      });

      const players = s.players.map((p, i) => ({
        ...p,
        alive: true,
        isImpostor: impSet.has(i),
        votes: 0,
        sus: 0,
      }));
      const chaos = Math.random() < 0.4
        ? CHAOS_EVENTS[Math.floor(Math.random() * CHAOS_EVENTS.length)]
        : null;
      return {
        ...s,
        phase: "reveal",
        players,
        word,
        category,
        revealIndex: 0,
        chaos,
        round: 1,
        winner: null,
        lastEliminated: null,
        loading: false,
      };
    });
  }, [state.mode]);

  const nextReveal = () =>
    setState((s) => {
      const next = s.revealIndex + 1;
      if (next >= s.players.length) {
        return { ...s, phase: "discussion", timer: discussionSeconds(s.mode), revealIndex: 0 };
      }
      return { ...s, revealIndex: next };
    });

  const skipToVote = () =>
    setState((s) => ({ ...s, phase: "voting", timer: 0 }));

  const castVote = (targetId: number) =>
    setState((s) => {
      const players = s.players.map((p) =>
        p.id === targetId ? { ...p, votes: p.votes + 1, sus: Math.min(100, p.sus + 15) } : p,
      );
      return { ...s, players };
    });

  const resolveVote = () =>
    setState((s) => {
      const alive = s.players.filter((p) => p.alive);
      const maxV = Math.max(...alive.map((p) => p.votes));
      const tops = alive.filter((p) => p.votes === maxV);
      let eliminated: Player | null = null;
      let players = s.players;
      if (maxV > 0 && tops.length === 1) {
        eliminated = tops[0];
        players = s.players.map((p) =>
          p.id === eliminated!.id ? { ...p, alive: false } : p,
        );
      }

      const remainingImps = players.filter((p) => p.alive && p.isImpostor).length;
      const remainingCrew = players.filter((p) => p.alive && !p.isImpostor).length;

      let winner: GameState["winner"] = null;
      if (remainingImps === 0) winner = "crew";
      else if (remainingImps >= remainingCrew) winner = "impostors";

      return {
        ...s,
        phase: winner ? "gameover" : "result",
        players,
        lastEliminated: eliminated,
        winner,
      };
    });

  const nextRound = () =>
    setState((s) => {
      const players = s.players.map((p) => ({ ...p, votes: 0 }));
      const chaos = Math.random() < 0.5
        ? CHAOS_EVENTS[Math.floor(Math.random() * CHAOS_EVENTS.length)]
        : null;
      return {
        ...s,
        phase: "discussion",
        players,
        timer: discussionSeconds(s.mode),
        round: s.round + 1,
        chaos,
        lastEliminated: null,
      };
    });

  const reset = () =>
    setState((s) => ({
      ...s,
      phase: "setup",
      word: null,
      category: "",
      lastEliminated: null,
      winner: null,
      chaos: null,
      round: 1,
      players: s.players.map((p) => ({
        ...p, alive: true, isImpostor: false, votes: 0, sus: 0,
      })),
    }));

  return {
    state,
    setPlayerCount, setPlayerName, setMode, setImpostorCount, setSelectedCategory,
    startGame, nextReveal, skipToVote, castVote, resolveVote, nextRound, reset,
  };
}

function defaultPlayers(n: number): Player[] {
  const sampleNames = ["Rohit", "Priya", "Aarav", "Sneha", "Bilal", "Anish", "Tara", "Kabir", "Sita", "Yash", "Zara", "Ravi", "Nisha", "Ali", "Aanya"];
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    name: sampleNames[i] ?? `Player ${i + 1}`,
    alive: true,
    isImpostor: false,
    votes: 0,
    sus: 0,
  }));
}

function resizePlayers(curr: Player[], n: number): Player[] {
  if (n === curr.length) return curr;
  if (n < curr.length) return curr.slice(0, n).map((p, i) => ({ ...p, id: i }));
  const extra = defaultPlayers(n).slice(curr.length);
  return [...curr, ...extra].map((p, i) => ({ ...p, id: i }));
}

export { ROAST_LINES };
