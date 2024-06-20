import WikiObj from "@/Models/WikiObj";
import RandomWord from "@/Models/randomWord";
import { Session } from "@/components/game-provider";
import i18n from "@/i18n";
import { Dispatch, SetStateAction } from "react";

function handleReplaceCardLogic(
  lang: "en" | "he",
  cardsType: string,
  index: number,
  session: Session,
  setSession: Dispatch<SetStateAction<Session>>,
  isFamily?: boolean
): void {
  if (cardsType === "RandomWord") {
    setSession((prevSession) => {
      return {
        ...prevSession,
        cards: [
          ...prevSession.cards.slice(0, index),
          prevSession.spareCards[
            sessionStorage.getItem(
              isFamily
                ? "indexForReplacement-family"
                : "indexForReplacement-adults"
            )
              ? parseInt(
                  sessionStorage.getItem(
                    isFamily
                      ? "indexForReplacement-family"
                      : "indexForReplacement-adults"
                  )
                )
              : 0
          ] as RandomWord,
          ...prevSession.cards.slice(index + 1),
        ],
      };
    });

    sessionStorage.setItem(
      isFamily ? "family-cards" : "adults-cards",
      JSON.stringify([
        ...session.cards.slice(0, index),
        session.spareCards[
          sessionStorage.getItem(
            isFamily
              ? "indexForReplacement-family"
              : "indexForReplacement-adults"
          )
            ? parseInt(
                sessionStorage.getItem(
                  isFamily
                    ? "indexForReplacement-family"
                    : "indexForReplacement-adults"
                )
              )
            : 0
        ],
        ...session.cards.slice(index + 1),
      ])
    ); // store cards to sessionStorage after any replacement has been made.
  } else {
    setSession((prevSession) => {
      return {
        ...prevSession,
        cards: [
          ...prevSession.cards.slice(0, index),
          prevSession.spareCards[
            sessionStorage.getItem("indexForReplacement-wiki")
              ? parseInt(sessionStorage.getItem("indexForReplacement-wiki"))
              : 0
          ] as WikiObj,
          ...prevSession.cards.slice(index + 1),
        ],
      };
    });

    localStorage.setItem(
      `${i18n.language}-initWikis`,
      JSON.stringify([
        ...session.cards.slice(0, index),
        session.spareCards[
          sessionStorage.getItem("indexForReplacement-wiki")
            ? parseInt(sessionStorage.getItem("indexForReplacement-wiki"))
            : 0
        ],
        ...session.cards.slice(index + 1),
      ])
    ); // store cards to sessionStorage after any replacement has been made.
  }

  if (cardsType === "RandomWord") {
    const prevIndex = parseInt(
      sessionStorage.getItem(
        isFamily ? "indexForReplacement-family" : "indexForReplacement-adults"
      )
    );
    sessionStorage.setItem(
      isFamily ? "indexForReplacement-family" : "indexForReplacement-adults",
      prevIndex ? JSON.stringify(prevIndex + 1) : "1"
    );
  } else {
    const prevIndex = parseInt(
      sessionStorage.getItem("indexForReplacement-wiki")
    );
    sessionStorage.setItem(
      "indexForReplacement-wiki",
      prevIndex ? JSON.stringify(prevIndex + 1) : "1"
    );
  }
  // increase currIndexForReplacement so that the next card change will bring a different word from spare words array.
}

export default handleReplaceCardLogic;
