import { Dispatch, SetStateAction, useEffect } from "react";
import useGameContext from "./useGameContext";

function useResetCardStatus(
  team: string,
  cardStatus: string,
  setCardStatus: Dispatch<SetStateAction<string[]>>,
  index: number
): void {
  const { session } = useGameContext();

  useEffect(() => {
    //resetting neutral cards after being revealed so they can be reselected
    if (team === "neutral" && cardStatus === "revealed") {
      setCardStatus((prev) => {
        const updatedStatus = [...prev]; // Creating a copy of the previous state
        updatedStatus[index] = ""; // Updating the status at the specified index
        return updatedStatus; // Returning the updated array
      });
    }
    if (!session.gameStarted) {
      // resetting cards to initial cardStatus if game is terminated:
      setCardStatus((prev) => {
        const updatedStatus = [...prev]; // Creating a copy of the previous state
        updatedStatus[index] = ""; // Updating the status at the specified index
        return updatedStatus; // Returning the updated array
      });
    }
  }, [cardStatus, session.gameStarted]);
}

export default useResetCardStatus;
