import useGetWords from "@/Hooks/useGetWords";
import { teams } from "../../../../public/db/teams";
import { useMemo, useState } from "react";
import GameCard from "../GameCard";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import RandomWord from "@/Models/randomWord";
import "../GameArea.css";
import useDisplayCards from "@/Hooks/useDisplayCards";
function Adults(): JSX.Element {
  const [words, setWords] = useState<RandomWord[]>(); // a state for 25 words to use on first render
  const [spareWords, setSpareWords] = useState<RandomWord[]>(); // a state for 25 words to use for spare if user changes a word
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false));
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const randomizedTeams = useMemo(() => {
    return teams.sort(() => Math.random() - 0.5); // randomize teams for the game.
  }, []);

  const {
    randomWords,
    isError: adultsIsError,
    isLoading: adultsIsLoading,
  } = useGetWords(false);

  useDisplayCards<RandomWord>( // visit 'Hooks/' to learn more what the hook does.
    randomWords,
    setWords,
    setSpareWords,
    setShowCards
  );

  if (adultsIsLoading) {
    return <div>Loading...</div>; // display loading component.NOTE TO SELF: create loading component.
  } else if (adultsIsError) {
    return <div>Error!!</div>; // display error component.NOTE TO SELF: create error component.
  }

  return (
    <div className="cards-container">
      {words?.length &&
        words.map((_, index) => (
          <GameCard
            showCard={showCards[index]}
            wordType="RandomWord"
            isFamily={false}
            team={randomizedTeams[index]}
            key={words[index].id}
            word={words[index]}
            wordHasBeenReplaced={currIndexForReplacement}
            onReplaceBtnClick={() => {
              setNewItemInArrAtIndex(
                // visit function at 'Utils/' to learn about it's functionality.
                setWords,
                spareWords[currIndexForReplacement],
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
