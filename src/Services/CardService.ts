import { Session } from "@/components/game-provider";
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

  public assignClassToTeam(team: string, isCaptain: boolean): string {
    switch (team) {
      case "red":
        return "bg-[#f04d54]";
      case "blue":
        return "bg-[#2cb7da]";
      case "bomb":
        if (isCaptain) return "captain-bomb";
        return "bomb";
      case "neutral":
        return "bg-white dark:bg-zinc-700";
    }
  }
}

export const cardService = new CardService();
