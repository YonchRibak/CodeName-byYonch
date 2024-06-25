import { Session } from "@/components/game-provider";
import { Dispatch, SetStateAction, useEffect } from "react";

function useDeclareVictors(
  session: Session,
  setSession: Dispatch<SetStateAction<Session>>
) {
  useEffect(() => {
    let team: "red" | "blue" | null;
    if (session.blueScore === 9) team = "blue";
    if (session.redScore === 8) team = "red";

    if (session.blueScore === 9 || session.redScore === 8)
      setSession((prev) => ({
        ...prev,
        victory: team,
      }));
  }, [session.blueScore, session.redScore]);
}

export default useDeclareVictors;
