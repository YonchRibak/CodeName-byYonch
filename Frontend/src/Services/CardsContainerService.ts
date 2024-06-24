import WikiObj from "@/Models/WikiObj";
import RandomWord from "@/Models/randomWord";

class CardsContainerService {
  public isCardsReadyToRender(
    cardType: string,
    card: WikiObj | RandomWord
  ): boolean {
    if (cardType === "RandomWord" && (card as RandomWord)?.id) return true;
    if (cardType === "WikiObj" && (card as WikiObj)?.pageid) return true;
  }
}

export const cardsContainerService = new CardsContainerService();
