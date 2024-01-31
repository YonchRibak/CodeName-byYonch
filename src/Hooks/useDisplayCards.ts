import { Dispatch, SetStateAction, useEffect } from "react";

function useDisplayCards<T>(
  wordsArr: T[],
  setWords: Dispatch<SetStateAction<T[]>>,
  setSpareWords: Dispatch<SetStateAction<T[]>>,
  setShowCards: Dispatch<SetStateAction<boolean[]>>
) {
  useEffect(() => {
    // set the words for display and set delay for "show" state.
    if (wordsArr?.length) {
      setWords(wordsArr.slice(0, 25)); // set 25 words for initial setting of the game.
      setSpareWords(wordsArr.slice(25)); // set other 25 words for spare, in case user opts to replace some of the words.

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
