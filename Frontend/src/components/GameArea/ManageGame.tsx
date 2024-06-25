import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import useGameContext from "@/Hooks/useGameContext";
import CaptainsData from "./CaptainsData";
import Score from "./Score";
import { useState } from "react";
import { gameService } from "@/Services/GameService";

function ManageGame(): JSX.Element {
  const [currIndicesArr, setCurrIndicesArr] = useState<number[]>([]);
  const { t } = useTranslation();
  const { session, setSession } = useGameContext();

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
              session.indicesOfRevealedCards?.length > currIndicesArr.length ||
              !session.finishedReveal // assign background depending on whether new cards have been selected for submission.
                ? "bg-primary dark:bg-[#5686F4]"
                : "bg-[#FFA857] dark:bg-[#EA891B]"
            } w-full`}
            onClick={() =>
              gameService.handleSubmitAnswer(
                session,
                setSession,
                setCurrIndicesArr
              )
            }
            disabled={!session.finishedReveal}
          >
            {session.indicesOfRevealedCards?.length > currIndicesArr.length ||
            !session.finishedReveal // assign text depending on whether new cards have been selected for submission.
              ? t("manageGame.submitBtn")
              : t("manageGame.forfeitTurn")}
          </Button>
        </div>
      )}

      <Button
        className="text-4xl h-40 bg-destructive  w-full"
        onClick={() => gameService.handleAbortGame(session, setSession)}
      >
        {t("manageGame.abortBtn")}
      </Button>
    </div>
  );
}

export default ManageGame;
