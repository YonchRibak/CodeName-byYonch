import { Session } from "@/components/game-provider";
import { Dispatch, SetStateAction, useEffect } from "react";

function useDefeatByBombSelection(
  team: string,
  cardStatus: string,
  isCaptain: boolean,
  session: Session,
  setSession: Dispatch<SetStateAction<Session>>
) {
  useEffect(() => {
    if (team === "bomb" && cardStatus === "revealed" && !isCaptain) {
      let teamWon: "blue" | "red" | null;
      if (session.turnsPlayed % 2 === 0) {
        teamWon = "red";
      } else {
        teamWon = "blue";
      }
      setTimeout(() => {
        setSession((prev) => ({
          ...prev,
          victory: teamWon,
        }));
      }, 500);
    }
  }, [cardStatus]);
}

export default useDefeatByBombSelection;
