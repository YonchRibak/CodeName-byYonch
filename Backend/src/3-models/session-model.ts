import { RandomWord, WikiObj } from "./cards-model";

export class SessionModel {
  sessionId: string;
  gameStarted: boolean;
  cards: (RandomWord | WikiObj)[];
  spareCards: RandomWord[] | WikiObj[];
  teamAscription: string[];
  answerSubmitted: boolean;
  finishedReveal: boolean;
  turnsPlayed: number;
  redScore: number;
  blueScore: number;
  victory: "blue" | "red" | null;
  indicesOfRevealedCards: number[];
  lastRoute: string;
}
