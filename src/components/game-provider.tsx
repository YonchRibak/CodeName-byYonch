import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type GameProviderProps = {
  children: ReactNode;
};

type GameModeController = {
  gameStarted: boolean;
  setGameStarted: Dispatch<SetStateAction<boolean>>;
};
export const GameContext = createContext<GameModeController | undefined>(
  undefined
);

export function GameProvider({ children }: GameProviderProps) {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <GameContext.Provider value={{ gameStarted, setGameStarted }}>
      {children}
    </GameContext.Provider>
  );
}
