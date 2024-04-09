import RandomWord from "@/Models/randomWord";
import { useEffect } from "react";
import useGameContext from "./useGameContext";
import { useParams } from "react-router-dom";

function useStoreCardsToSession(
  isCaptain: boolean,
  wordsArr?: RandomWord[]
): void {
  const { setSession } = useGameContext();
  const params = useParams();

  useEffect(() => {
    if (wordsArr?.length && !isCaptain) {
      setSession((prevSession) => ({
        ...prevSession,
      
        cards: wordsArr.slice(0, 25) as RandomWord[], // set 25 words for initial setting of the game.
        spareCards: wordsArr.slice(25) as RandomWord[], // set other words for spare, in case user opts to replace some of the words.
      }));
    }
  }, [wordsArr]);
}

export default useStoreCardsToSession;
