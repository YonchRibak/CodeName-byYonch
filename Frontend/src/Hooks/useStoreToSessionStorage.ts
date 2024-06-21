import RandomWord from "@/Models/randomWord";
import { useEffect } from "react";

function useStoreToSessionStorage(
  cards: RandomWord[],
  isFamily: boolean = false
): void {
  useEffect(() => {
    sessionStorage.setItem(
      isFamily ? "family-cards" : "adults-cards",
      JSON.stringify(cards)
    );
  }, []);
}

export default useStoreToSessionStorage;
