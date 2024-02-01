import WikiObj from "@/Models/WikiObj";
import RandomWord from "@/Models/randomWord";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { uid } from "uid";

type GameProviderProps = {
  children: ReactNode;
};

export type Session = {
  sessionId: string;
  gameStarted: boolean;
  currDeck: "Family" | "Adults" | "Wiki" | undefined;
  cards: RandomWord[] | WikiObj[];
  spareCards: RandomWord[] | WikiObj[];
  teamAscription: string[];
  turnsPlayed: number;
  redScore: number;
  blueScore: number;
};

type GameModeController = {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
};
export const GameContext = createContext<GameModeController | undefined>(
  undefined
);

export function GameProvider({ children }: GameProviderProps) {
  const [session, setSession] = useState<Session>({
    sessionId: uid(6),
    gameStarted: false,
    currDeck: undefined,
    cards: [],
    spareCards: [],
    turnsPlayed: 0,
    teamAscription: [],
    redScore: 0,
    blueScore: 0,
  });

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
