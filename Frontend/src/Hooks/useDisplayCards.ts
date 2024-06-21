import i18n from "@/i18n";
import { Dispatch, SetStateAction, useEffect } from "react";

function useDisplayCards(
  setShowCards: Dispatch<SetStateAction<boolean[]>>,
  cardsType: string
) {
  useEffect(() => {
    if (
      cardsType === "RandomWord" ||
      (cardsType === "WikiObj" &&
        ((localStorage.getItem("en-initWikis") && i18n.language === "en-US") ||
          (localStorage.getItem("he-initWikis") && i18n.language === "he-IL")))
    ) {
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
  }, [cardsType, localStorage.length]);
}

export default useDisplayCards;
