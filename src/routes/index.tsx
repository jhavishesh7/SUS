import { createFileRoute } from "@tanstack/react-router";
import { useGame } from "@/game/useGame";
import { NeonBackground } from "@/game/components/Background";
import { Setup } from "@/game/components/Setup";
import { Reveal } from "@/game/components/Reveal";
import { Discussion } from "@/game/components/Discussion";
import { Voting } from "@/game/components/Voting";
import { Result } from "@/game/components/Result";
import { GameOver } from "@/game/components/GameOver";
import { PWAInstallPrompt } from "@/game/components/PWAInstallPrompt";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const game = useGame();
  const { phase } = game.state;

  return (
    <main className="relative min-h-screen">
      <NeonBackground />
      {phase === "setup" && <Setup game={game} />}
      {phase === "reveal" && <Reveal game={game} />}
      {phase === "discussion" && <Discussion game={game} />}
      {phase === "voting" && <Voting game={game} />}
      {phase === "result" && <Result game={game} />}
      {phase === "gameover" && <GameOver game={game} />}
      <PWAInstallPrompt />
    </main>
  );
}
