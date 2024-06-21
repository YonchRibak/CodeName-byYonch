import useGameContext from "@/Hooks/useGameContext";
import { socketService } from "@/Services/SocketService";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardsContainer from "../GameArea/CardsContainer";
import RandomWord from "@/Models/randomWord";
import WikiObj from "@/Models/WikiObj";
import useConnectCaptainToSocketRoom from "@/Hooks/useConnectCaptainToSocketRoom";
// import "../GameArea/GameArea.css";
function CaptainScreen(): JSX.Element {
  const { session, setSession } = useGameContext();

  const params = useParams();

  //   useEffect(() => {
  //     if (!socketService.isConnected()) {
  //       // Connect to the socket server
  //       socketService.connect();

  //       // Emit a connection message to the server indicating a captain is trying to connect
  //       socketService.joinRoom(params.gameId, setSession);
  //     }

  //     // Cleanup function to disconnect from the server when the component unmounts
  //     return () => {
  //       socketService.disconnect();
  //     };
  //   }, []);

  useConnectCaptainToSocketRoom(params, setSession);

  
  return (
    <CardsContainer
      randomWords={
        (session.cards[0] as WikiObj)?.pageid
          ? null
          : (session.cards as RandomWord[])
      }
      isCaptain
      cardsType={
        (session.cards[0] as WikiObj)?.pageid ? "WikiObj" : "RandomWord"
      }
    />
  );
}

export default CaptainScreen;
