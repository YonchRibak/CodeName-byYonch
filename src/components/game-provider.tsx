import WikiObj from "@/Models/WikiObj";
import RandomWord from "@/Models/randomWord";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type GameProviderProps = {
  children: ReactNode;
};

export type Session = {
  sessionId: string;
  gameStarted: boolean;
  redScore: number;
  blueScore: number;
  turnsPlayed: number;
  cards: RandomWord[] | WikiObj[];
  spareCards: RandomWord[] | WikiObj[];
  currDeck: "Family" | "Adults" | "Wiki";
};

type GameModeController = {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
};
export const GameContext = createContext<GameModeController | undefined>(
  undefined
);

export function GameProvider({ children }: GameProviderProps) {
  const [session, setSession] = useState<Session>();

  return (
    <GameContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
