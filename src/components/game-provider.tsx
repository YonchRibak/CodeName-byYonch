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
  numberOfUsersInRoom: number;
  gameStarted: boolean;
  cards: (RandomWord | WikiObj)[];
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

function generateRandomTeamAscription(): string[] {
  const reds = Array(9).fill("red");
  const blues = Array(8).fill("blue");
  const neutrals = Array(7).fill("neutral");
  const bomb = "bomb";

  let fullArray: string[] = [];
  const randomizedArray = fullArray
    .concat(reds, blues, neutrals, bomb)
    .sort(() => Math.random() - 0.5);

  return randomizedArray;
}

export function GameProvider({ children }: GameProviderProps) {
  const [session, setSession] = useState<Session>({
    sessionId: uid(6),
    numberOfUsersInRoom: 1,
    gameStarted: false,
    cards: [],
    spareCards: [],
    turnsPlayed: 0,
    teamAscription: generateRandomTeamAscription(),
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
