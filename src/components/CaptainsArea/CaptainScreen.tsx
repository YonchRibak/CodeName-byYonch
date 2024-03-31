import useGameContext from "@/Hooks/useGameContext";
import { socketService } from "@/Services/SocketService";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function CaptainScreen(): JSX.Element {
  const { session } = useGameContext();

  const params = useParams();
  useEffect(() => {
    // Connect to the socket server
    socketService.connect((msg: string) => {
      console.log(msg);
    }); // Pass an empty function or null

    // Emit a connection message to the server indicating a captain is trying to connect
    socketService.joinRoom(params.gameId);
    // Cleanup function to disconnect from the server when the component unmounts
    return () => {
      socketService.disconnect();
    };
  }, []);
  return (
    <div className="h-full w-full flex col-span-2 items-center justify-center">
      <div className="border border-solid border-2">some content</div>
    </div>
  );
}

export default CaptainScreen;
