import { GameContext } from "@/components/game-provider";
import { useContext } from "react";

function useGameContext() {
  const gameMode = useContext(GameContext);
  if (gameMode === undefined) {
    throw new Error(
      "Game mode must be defined according to type GameModeController"
    );
  }

  return gameMode;
}

export default useGameContext;
