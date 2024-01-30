import { ReactNode, createContext, useContext, useState } from "react";

const GameContext = createContext(null);

type GameProviderProps = {
  children: ReactNode;
};

export function GameProvider({ children }: GameProviderProps) {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <GameContext.Provider value={{ gameStarted, setGameStarted }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
