import useGetWords from "@/Hooks/useGetWords";
import { teams } from "../../../../public/db/teams";
import { useEffect, useMemo, useState } from "react";
import GameCard from "../GameCard";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import RandomWord from "@/Models/randomWord";
import "../GameArea.css";
function Adults(): JSX.Element {
  const [words, setWords] = useState<RandomWord[]>(); // a state for 25 words to use on first render
  const [spareWords, setSpareWords] = useState<RandomWord[]>(); // a state for 25 words to use for spare if user changes a word

  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const randomizedTeams = useMemo(() => {
    return teams.sort(() => Math.random() - 0.5); // randomize teams for the game.
  }, []);

  const {
    randomWords,
    isError: adultsIsError,
    isLoading: adultsIsLoading,
  } = useGetWords(false);

  useEffect(() => {
    if (randomWords?.length) {
      setWords(randomWords.slice(0, 25)); // set 25 words for initial setting of the game.
      setSpareWords(randomWords.slice(25)); // set other 25 words for spare, in case user opts to replace some of the words.
    }
  }, [randomWords]);

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
