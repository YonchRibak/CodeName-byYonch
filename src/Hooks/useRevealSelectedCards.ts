import { Dispatch, SetStateAction, useEffect } from "react";
import useGameContext from "./useGameContext";

function useRevealSelectedCards(
  cardStatus: string[],
  setCardStatus: Dispatch<SetStateAction<string[]>>
) {
  const { session } = useGameContext();

  useEffect(() => {
    const selectedIndexes = cardStatus.reduce((acc, status, index) => {
      if (status === "selected") {
        acc.push(index); // Collect indexes of selected cards
      }
      return acc;
    }, []);

    // Sort selectedIndexes such that cards with team "bomb" are pushed to the end
    selectedIndexes.sort((a, b) => {
      const cardTeamA = session.teamAscription[a];
      const cardTeamB = session.teamAscription[b];
      // Cards with team "bomb" are moved to the end
      if (cardTeamA === "bomb" && cardTeamB !== "bomb") return 1;
      if (cardTeamA !== "bomb" && cardTeamB === "bomb") return -1;
      return 0;
    });

    let currentIndex = 0; // Initialize index tracker

    const interval = setInterval(() => {
      // Check if all selected cards have been revealed, stop the interval if so
      if (currentIndex >= selectedIndexes.length) {
        clearInterval(interval);
        return;
      }

      // Update the status of the current selected card to revealed
      const selectedIndex = selectedIndexes[currentIndex];
      setCardStatus((prev) => {
        const updatedStatus = [...prev]; // Creating a copy of the previous state
        updatedStatus[selectedIndex] = "revealed"; // Updating the status of the selected card to revealed
        return updatedStatus; // Returning the updated array
      });

      currentIndex++; // Move to the next selected card
    }, 750);

    // Clean up function to clear the interval on component unmount or when the session changes
    return () => clearInterval(interval);
  }, [session.turnsPlayed]); // Include session.teamAscription in the dependencies array
}

export default useRevealSelectedCards;
