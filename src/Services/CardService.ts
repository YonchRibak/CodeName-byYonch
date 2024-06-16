import WikiObj from "@/Models/WikiObj";
import RandomWord from "@/Models/randomWord";
import { Session } from "@/components/game-provider";
import i18n from "@/i18n";
import { Dispatch, SetStateAction } from "react";

class CardService {
  public pushOrRemoveIndexFromCardsRevealedArr(
    cardStatus: string,
    index: number,
    setSession: Dispatch<SetStateAction<Session>>
  ): void {
    if (cardStatus === "selected") {
      // card is being unselected, remove from array:
      setSession((prev) => ({
        ...prev,
        indicesOfRevealedCards: prev.indicesOfRevealedCards.filter(
          (i) => i !== index
        ),
      }));
    } else {
      // otherwise, card is being selected, add index to array:
      setSession((prev) => ({
        ...prev,
        indicesOfRevealedCards: [...prev.indicesOfRevealedCards, index],
      }));
    }
  }

  public handleCardStatus(
    cardStatus: string,
    index: number,
    setCardStatus: Dispatch<SetStateAction<string[]>>
  ) {
    if (cardStatus !== "selected" && cardStatus !== "revealed") {
      // card was first selected

      setCardStatus((prev) => {
        const updatedStatus = [...prev]; // Creating a copy of the previous state
        updatedStatus[index] = "selected"; // Updating the status at the specified index
        return updatedStatus; // Returning the updated array
      });
    }
    if (cardStatus === "selected") {
      // card was clicked again after selection
      setCardStatus((prev) => {
        const updatedStatus = [...prev]; // Creating a copy of the previous state
        updatedStatus[index] = ""; // Updating the status at the specified index
        return updatedStatus; // Returning the updated array
      });
    }
  }

  private findIndexForReplacement(
    wordType: string,
    isFamily?: boolean
  ): number {
    let currIndexForReplacement: number | null;
    if (wordType === "WikiObj") {
      currIndexForReplacement = parseInt(
        localStorage.getItem("indexForReplacement-wiki")
      );
    } else {
      currIndexForReplacement = parseInt(
        sessionStorage.getItem(
          isFamily ? "indexForReplacement-family" : "indexForReplacement-adults"
        )
      );
    }

    return currIndexForReplacement ? currIndexForReplacement : 0;
  }

  private increaseIndexForReplacement(wordType: string, isFamily?: boolean) {
    const deck = isFamily ? "family" : "adults";

    // Increase the index for the next replacement based on card type
    if (wordType === "RandomWord") {
      // Increase the index for RandomWord cards
      const prevIndex = parseInt(
        sessionStorage.getItem(`indexForReplacement-${deck}`)
      );
      sessionStorage.setItem(
        `indexForReplacement-${deck}`,
        prevIndex ? JSON.stringify(prevIndex + 1) : "1" // if PrevIndex is null, this means 0 was used and there for the next index is 1.
      );
    } else {
      // Increase the index for Wiki cards type:
      const prevIndex = parseInt(
        localStorage.getItem("indexForReplacement-wiki")
      );
      localStorage.setItem(
        "indexForReplacement-wiki",
        prevIndex ? JSON.stringify(prevIndex + 1) : "1" // if PrevIndex is null, this means 0 was used and there for the next index is 1.
      );
    }
  }

  private handleWikiReplacement(
    index: number,
    wordType: string,
    setSession: Dispatch<SetStateAction<Session>>
  ) {
    // Update session state with the replaced card
    setSession((prevSession) => {
      return {
        ...prevSession,
        cards: [
          ...prevSession.cards.slice(0, index), // Keep cards before the replaced card
          prevSession.spareCards[
            this.findIndexForReplacement(wordType)
          ] as WikiObj, // Replace selected card
          ...prevSession.cards.slice(index + 1), // Keep cards after the replaced card
        ],
      };
    });
  }

  private handleRandomWordReplacement(
    isFamily: boolean,
    index: number,
    wordType: string,
    setSession: Dispatch<SetStateAction<Session>>
  ) {
    // Update session state with the replaced card
    setSession((prevSession) => {
      return {
        ...prevSession,
        cards: [
          ...prevSession.cards.slice(0, index), // Keep cards before the replaced card
          prevSession.spareCards[
            this.findIndexForReplacement(wordType, isFamily) // Replace selected card
          ] as RandomWord,
          ...prevSession.cards.slice(index + 1), // Keep cards after the replaced card
        ],
      };
    });
  }

  private handleWikiUpdatedStorage(
    index: number,
    wordType: string,
    session: Session
  ) {
    // Store the updated cards in localStorage after replacement
    localStorage.setItem(
      `${i18n.language}-initWikis`,
      JSON.stringify([
        ...session.cards.slice(0, index), // Keep cards before the replaced card
        session.spareCards[this.findIndexForReplacement(wordType)], // Replace selected card
        ...session.cards.slice(index + 1), // Keep cards after the replaced card
      ])
    );
  }

  private handleRandomWordUpdatedStorage(
    isFamily: boolean,
    index: number,
    wordType: string,
    session: Session
  ) {
    // Store the updated cards in sessionStorage after replacement

    const selectedDeckCards = isFamily ? "family-cards" : "adults-cards"; // sessionStorage item's name
    const selectedDeckSpareCards = isFamily ? "family-spares" : "adults-spares"; // sessionStorage item's name

    sessionStorage.setItem(
      selectedDeckCards,
      JSON.stringify([
        ...session.cards.slice(0, index), // Keep cards before the replaced card
        session.spareCards[this.findIndexForReplacement(wordType, isFamily)], // Replace selected card
        ...session.cards.slice(index + 1), // Keep cards after the replaced card
      ])
    );
    sessionStorage.setItem(
      selectedDeckSpareCards,
      JSON.stringify(session.spareCards)
    );
  }

  public handleCardReplacement(
    wordType: string,
    index: number,
    setSession: Dispatch<SetStateAction<Session>>,
    session: Session,
    isFamily?: boolean
  ) {
    if (wordType === "RandomWord") {
      this.handleRandomWordReplacement(isFamily, index, wordType, setSession);
      this.handleRandomWordUpdatedStorage(isFamily, index, wordType, session);
    } else {
      this.handleWikiReplacement(index, wordType, setSession);
      this.handleWikiUpdatedStorage(index, wordType, session);
    }

    this.increaseIndexForReplacement(wordType, isFamily);
  }

  public selectWordValue(wordType: string, word: RandomWord | WikiObj): string {
    if (wordType === "WikiObj") return (word as WikiObj)?.title;
    if (i18n.language === "en-US") return (word as RandomWord)?.English;
    return (word as RandomWord)?.Hebrew;
  }
}

export const cardService = new CardService();
