import useGetWords from "@/Hooks/useGetWords";
import { teams } from "../../../../public/db/teams";
import { useEffect, useMemo, useState } from "react";
import GameCard from "../GameCard";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import RandomWord from "@/Models/randomWord";
import "../GameArea.css";

function Family(): JSX.Element {
  const [familyWords, setFamilyWords] = useState<RandomWord[]>(); // a state for 25 family words to use on first render
  const [spareFamilyWords, setSpareFamilyWords] = useState<RandomWord[]>(); // a state for 25 family words to use for spare if user changes a word

  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const randomizedTeams = useMemo(() => {
    return teams.sort(() => Math.random() - 0.5); // randomize teams for the game.
  }, []);

  //   const { gameStarted, setGameStarted } = useGameContext();

  const { randomWords, isError, isLoading } = useGetWords(true);

  useEffect(() => {
    if (randomWords?.length) {
      setFamilyWords(randomWords.slice(0, 25)); // set 25 words for initial setting of the game.
      setSpareFamilyWords(randomWords.slice(25)); // set other 25 words for spare, in case user opts to replace some of the words.
    }
  }, [randomWords]);

  if (isLoading) return <div>Loading...</div>; // display loading component.NOTE TO SELF: create loading component.
  if (isError) return <div>Error</div>; // display error component.NOTE TO SELF: create error component.

  return (
    <div className="cards-container">
      {familyWords?.length &&
        familyWords.map((_, index) => (
          <GameCard
            wordType="RandomWord"
            isFamily
            team={randomizedTeams[index]}
            key={familyWords[index].id}
            word={familyWords[index]}
            wordHasBeenReplaced={currIndexForReplacement}
            onReplaceBtnClick={() => {
              setNewItemInArrAtIndex(
                // visit function at 'Utils/' to learn about it's functionality.
                setFamilyWords,
                spareFamilyWords[currIndexForReplacement],
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

export default Family;
