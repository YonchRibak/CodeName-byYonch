import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import useGameContext from "@/Hooks/useGameContext";
import CaptainsData from "./CaptainsData";
import { socketService } from "@/Services/SocketService";
import { uid } from "uid";
import Score from "./Score";
import { useState } from "react";

function ManageGame(): JSX.Element {
  const [currIndicesArr, setCurrIndicesArr] = useState<number[]>([]);
  const { t } = useTranslation();
  const { session, setSession } = useGameContext();

  function handleAbortGame() {
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

  function handleSubmitAnswer() {
    setSession((prevSession) => ({
      ...prevSession,
      turnsPlayed: prevSession.turnsPlayed + 1,
    }));
    setCurrIndicesArr(session.indicesOfRevealedCards);
    socketService.updateSessionData(session);
  }
  return (
    <div className="h-full flex flex-col justify-around">
      {session.numberOfUsersInRoom < 3 ? ( //If less than 2 captains have connected, render Captains data
        <CaptainsData />
      ) : (
        // if 2 captains have connected, render score and submit button.
        <div className="space-y-7">
          <Score />
          <Button
            className={`transition ease-in-out duration-500 text-4xl h-40 ${
              session.indicesOfRevealedCards?.length > currIndicesArr.length
                ? "bg-primary dark:bg-[#5686F4]"
                : "bg-[#FFA857] dark:bg-[#EA891B]"
            } w-full`}
            onClick={handleSubmitAnswer}
          >
            {session.indicesOfRevealedCards?.length > currIndicesArr.length
              ? t("manageGame.submitBtn")
              : t("manageGame.forfeitTurn")}
          </Button>
        </div>
      )}

      <Button
        className="text-4xl h-40 bg-destructive  w-full"
        onClick={handleAbortGame}
      >
        {t("manageGame.abortBtn")}
      </Button>
    </div>
  );
}

export default ManageGame;
