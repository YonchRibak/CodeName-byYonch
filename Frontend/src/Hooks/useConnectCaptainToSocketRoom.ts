import { socketService } from "@/Services/SocketService";
import { Session } from "@/components/game-provider";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Params } from "react-router-dom";

function useConnectCaptainToSocketRoom(
  params: Readonly<Params<string>>,
  setSession: Dispatch<SetStateAction<Session>>
) {
  useEffect(() => {
    if (!socketService.isConnected()) {
      // Connect to the socket server
      socketService.connect();

      // Emit a connection message to the server indicating a captain is trying to connect
      socketService.joinRoom(params.gameId, setSession);
    }

    // Cleanup function to disconnect from the server when the component unmounts
    return () => {
      socketService.disconnect();
    };
  }, []);
}

export default useConnectCaptainToSocketRoom;
