import WikiObj from "@/Models/WikiObj";
import RandomWord from "@/Models/randomWord";
import { sessionService } from "@/Services/SessionService";
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
  numberOfUsersInRoom: number;
  gameStarted: boolean;
  cards: (RandomWord | WikiObj)[];
  spareCards: RandomWord[] | WikiObj[];
  teamAscription: string[];
  answerSubmitted: boolean;
  turnsPlayed: number;
  redScore: number;
  blueScore: number;
  victory: "blue" | "red" | null;
  indicesOfRevealedCards: number[];
  lastRoute: string;
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
    numberOfUsersInRoom: 1,
    gameStarted: false,
    cards: [],
    spareCards: [],
    turnsPlayed: 0,
    teamAscription: sessionService.generateRandomTeamAscription(),
    answerSubmitted: false,
    redScore: 0,
    blueScore: 0,
    victory: null,
    indicesOfRevealedCards: [],
    lastRoute: "",
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
