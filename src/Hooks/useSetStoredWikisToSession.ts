import { Session } from "@/components/game-provider";
import { Dispatch, SetStateAction, useEffect } from "react";

function useSetStoredWikisToSession(
  lang: "en" | "he",
  session: Session,
  setSession: Dispatch<SetStateAction<Session>>
) {
  useEffect(() => {
    if (
      //  if there are already target items on local storage, set wikis' and spareWikis' states to them.
      (localStorage.getItem(`${lang}-initWikis`) ||
        localStorage.getItem(`${lang}-spareWikis`)) &&
      !session.gameStarted
    ) {
      setSession((prevSession) => ({
        ...prevSession,

        cards: JSON.parse(localStorage.getItem(`${lang}-initWikis`)),
      }));
      setSession((prevSession) => ({
        ...prevSession,

        spareCards: JSON.parse(localStorage.getItem(`${lang}-spareWikis`)),
      }));
    }
  }, [lang]);
}

export default useSetStoredWikisToSession;
