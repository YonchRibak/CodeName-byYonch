import useGameContext from "@/Hooks/useGameContext";

export function setNewItemInArrAtIndex(newItem: any, index: number): void {
  const { setSession } = useGameContext();
  setSession((prevSession) => ({
    ...prevSession,
    cards: [...prevSession.cards, (prevSession.cards[index] = newItem)],
  }));
}
