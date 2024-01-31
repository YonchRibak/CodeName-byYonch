import { RevealCardsContext } from "@/components/reveal-cards-provider";
import { useContext } from "react";

function useRevealCardsContext() {
  const revealCardsMode = useContext(RevealCardsContext);

  if (revealCardsMode === undefined) {
    throw new Error(
      "reveal cards mode must be defined according to type RevealModeController"
    );
  }
  return revealCardsMode;
}
export default useRevealCardsContext;
