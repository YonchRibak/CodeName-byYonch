import { Session } from "@/components/game-provider";

class CardStyleService {
  private assignClassToTeam(team: string, isCaptain: boolean): string {
    switch (team) {
      case "red":
        return "bg-[#f04d54] ";
      case "blue":
        return "bg-[#2cb7da] ";
      case "bomb":
        if (isCaptain) return "captain-bomb ";
        return "bomb ";
      case "neutral":
        return "bg-white dark:bg-zinc-700 ";
    }
  }
  public classListManager(
    cardStatus: string,
    isCaptain: boolean,
    session: Session,
    index: number,
    showCard: boolean,
    team: string
  ): string {
    // Initial tailwind classes to all cards:
    let classList = `${cardStatus} group relative h-full opacity-0 transform translate-x-5 translate-y-5 transition-all duration-300 ease-in-out `;

    // if showCard is true, show card (handles cards' gradual reveal):
    if (showCard) {
      classList += "opacity-100 transform translate-x-0 translate-y-0 ";
    }

    // if game has started AND card is NOT rendered on a captain's screen, add pointer and hover effect:
    if (session.gameStarted && !isCaptain) {
      classList += "hover:scale-105 cursor-pointer ";
    }

    // ======== CAPTAINS SCREEN STYLE CONFIGS: =======================================================

    // if card is rendered on a captain's screen OR is revealed, assign background according to team ascription:
    if (isCaptain || cardStatus === "revealed") {
      classList += this.assignClassToTeam(team, isCaptain);
    } else {
      classList += "bg-[#F9F7DC] dark:bg-zinc-700 ";
    }

    // if card is rendered on a captain's screen AND card has been revealed, add white border:
    if (isCaptain && session.indicesOfRevealedCards.includes(index)) {
      classList += "!border-4 sm:!border-2 !border-white ";
    }

    // if card's team affiliation is 'bomb' AND card is rendered on a captain's screen, add pink border:
    if (team === "bomb" && isCaptain) {
      classList +=
        "!border-4 sm:!border-2 border-pink-600 bg-white dark:bg-zinc-700 ";
    }

    return classList;
  }
}

export const cardStyleService = new CardStyleService();
