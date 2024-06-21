import RandomWord from "@/Models/randomWord";
import { useEffect } from "react";
import useGameContext from "./useGameContext";

function useStoreCardsToSession(
  cardsType: string,
  isCaptain: boolean,
  wordsArr?: RandomWord[],
  isFamily: boolean = false
): void {
  const { setSession } = useGameContext();

  useEffect(() => {
    if (
      wordsArr?.length &&
      !isCaptain &&
      !sessionStorage.getItem(isFamily ? "family-cards" : "adults-cards")
    ) {
      setSession((prevSession) => ({
        ...prevSession,

        cards: wordsArr.slice(0, 25) as RandomWord[], // set 25 words for initial setting of the game.
        spareCards: wordsArr.slice(25) as RandomWord[], // set other words for spare, in case user opts to replace some of the words.
      }));
    } else if (
      sessionStorage.getItem(isFamily ? "family-cards" : "adults-cards") &&
      wordsArr?.length &&
      cardsType === "RandomWord"
    ) {
      setSession((prevSession) => ({
        ...prevSession,

        cards: JSON.parse(
          sessionStorage.getItem(isFamily ? "family-cards" : "adults-cards")
        ), // set 25 words for initial setting of the game.
        spareCards: JSON.parse(sessionStorage.getItem(isFamily ? "family-spares" : "adults-spares"))
      }));
    }
  }, [wordsArr]);
}

export default useStoreCardsToSession;
