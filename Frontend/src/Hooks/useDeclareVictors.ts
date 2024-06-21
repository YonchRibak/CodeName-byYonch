import { Session } from "@/components/game-provider";
import { Dispatch, SetStateAction, useEffect } from "react";

function useDeclareVictors(
  session: Session,
  setVictors: Dispatch<SetStateAction<{ blueTeam: boolean; redTeam: boolean }>>
) {
  useEffect(() => {
    let team = "";
    if (session.blueScore === 8) team = "blueTeam";
    if (session.redScore === 9) team = "redTeam";

    if (session.blueScore === 8 || session.redScore === 9)
      setVictors((prev) => ({
        ...prev,
        [team]: true,
      }));
  }, [session.blueScore, session.redScore]);
}

export default useDeclareVictors;
