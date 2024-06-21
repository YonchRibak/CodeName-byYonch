import { RandomWord, WikiObj } from "./cards-model";

export class SessionModel {
  sessionId: string;
  gameStarted: boolean;
  cards: (RandomWord | WikiObj)[];
  spareCards: RandomWord[] | WikiObj[];
  teamAscription: string[];
  turnsPlayed: number;
  redScore: number;
  blueScore: number;
  indicesOfRevealedCards: number[];
  lastRoute: string;
}
