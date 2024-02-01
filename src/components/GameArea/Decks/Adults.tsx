import useGetWords from "@/Hooks/useGetWords";
import { useState } from "react";
import GameCard from "../GameCard";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import RandomWord from "@/Models/randomWord";
import "../GameArea.css";
import useDisplayCards from "@/Hooks/useDisplayCards";
import useGameContext from "@/Hooks/useGameContext";
import Loading from "@/components/SharedArea/Interact/Loading";
function Adults(): JSX.Element {
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false));
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const { session } = useGameContext();

  const { randomWords, isError, isLoading } = useGetWords(false);

  useDisplayCards<RandomWord>( // visit 'Hooks/' to learn more what the hook does.
    randomWords,

    setShowCards
  );

  if (isLoading) {
    return <Loading />; // display loading component.
  } else if (isError) {
    return <div>Error!!</div>; // display error component.NOTE TO SELF: create error component.
  }

  return (
    <div className="cards-container">
      {session.cards?.length &&
        session.cards.map((_, index) => (
          <GameCard
            showCard={showCards[index]}
            wordType="RandomWord"
            isFamily={false}
            team={session.teamAscription[index]}
            key={(session.cards[index] as RandomWord).id}
            word={session.cards[index]}
            onReplaceBtnClick={() => {
              setNewItemInArrAtIndex(
                // visit function at 'Utils/' to learn about it's functionality.

                session.spareCards[currIndexForReplacement],
                index
              );
              setCurrIndexForReplacement((prev) => prev + 1);
              // increase currIndexForReplacement so that next card change will bring a different word from spare words array.
            }}
          />
        ))}
    </div>
  );
}

export default Adults;
