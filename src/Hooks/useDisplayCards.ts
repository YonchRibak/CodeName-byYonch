import { Dispatch, SetStateAction, useEffect } from "react";
import useGameContext from "./useGameContext";
import RandomWord from "@/Models/randomWord";
import WikiObj from "@/Models/WikiObj";

function useDisplayCards<T>(
  wordsArr: T[],

  setShowCards: Dispatch<SetStateAction<boolean[]>>
) {
  const { setSession } = useGameContext();
  useEffect(() => {
    // set the words for display and set delay for "show" state.
    if (wordsArr?.length) {
      setSession((prevSession) => ({
        ...prevSession,
        cards: wordsArr.slice(0, 25) as RandomWord[] | WikiObj[], // set 25 words for initial setting of the game.
        spareCards: wordsArr.slice(25) as RandomWord[] | WikiObj[], // set other 25 words for spare, in case user opts to replace some of the words.
      }));

      const showDelay = 100;

      for (let i = 0; i < 25; i++) {
        //change state of each showCard props to 'true' on a delay.
        window.setTimeout(() => {
          setShowCards((prev) => {
            const newShowCards = [...prev];
            newShowCards[i] = true;
            return newShowCards;
          });
        }, i * showDelay);
      }
    }
  }, [wordsArr]);
}

export default useDisplayCards;
