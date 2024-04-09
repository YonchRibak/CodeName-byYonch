import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import useGameContext from "@/Hooks/useGameContext";
import CaptainsData from "./CaptainsData";
import { socketService } from "@/Services/SocketService";
import { uid } from "uid";

function ManageGame(): JSX.Element {
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
    }));

    socketService.closeRoom(session.sessionId);
  }
  return (
    <div className="h-full flex flex-col justify-around">
      {session.numberOfUsersInRoom < 3 ? ( //If less than 2 captains have connected, render Captains data
        <CaptainsData />
      ) : (
        // if 2 captains have connected, render score and submit button.
        <div>
          <div className="flex flex-col">
            <span>{t("manageGame.blueScore") + session.blueScore}</span>
            <span>{t("manageGame.redScore") + session.redScore}</span>
          </div>

          <Button
            className="text-4xl h-40 bg-primary w-full "
            onClick={() =>
              setSession((prevSession) => ({
                ...prevSession,
                turnsPlayed: prevSession.turnsPlayed + 1,
              }))
            }
          >
            {t("manageGame.submitBtn")}
          </Button>
        </div>
      )}

      <Button
        className="text-4xl h-40 bg-destructive w-full"
        onClick={handleAbortGame}
      >
        {t("manageGame.abortBtn")}
      </Button>
    </div>
  );
}

export default ManageGame;
