import { Session } from "@/components/game-provider";
import { Dispatch, SetStateAction } from "react";
import { socketService } from "./SocketService";
import { uid } from "uid";

class GameService {
  public handleAbortGame(
    session: Session,
    setSession: Dispatch<SetStateAction<Session>>
  ) {
    setSession((prevSession) => ({
      ...prevSession,
      sessionId: uid(6),
      numberOfUsersInRoom: 0,
      gameStarted: false,
      turnsPlayed: 0,
      blueScore: 0,
      redScore: 0,
      indicesOfRevealedCards: [],
    }));

    socketService.closeRoom(session.sessionId);
  }

  public handleSubmitAnswer(
    session: Session,
    setSession: Dispatch<SetStateAction<Session>>,
    setCurrIndicesArr: Dispatch<SetStateAction<number[]>>
  ) {
    setSession((prevSession) => ({
      ...prevSession,
      turnsPlayed: prevSession.turnsPlayed + 1,
    }));
    setCurrIndicesArr(session.indicesOfRevealedCards);
    socketService.updateSessionData(session);
  }
}

export const gameService = new GameService();
