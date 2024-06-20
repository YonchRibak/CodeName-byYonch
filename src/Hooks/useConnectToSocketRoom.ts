import { socketService } from "@/Services/SocketService";
import { Session } from "@/components/game-provider";
import { Dispatch, SetStateAction, useEffect } from "react";

function useConnectToSocketRoom(
  session: Session,
  setSession: Dispatch<SetStateAction<Session>>
) {
  useEffect(() => {
    if (session.gameStarted) {
      socketService.connect();
      socketService.initRoom(session.sessionId, setSession, session);
    }
  }, [session.gameStarted]);
}

export default useConnectToSocketRoom;
