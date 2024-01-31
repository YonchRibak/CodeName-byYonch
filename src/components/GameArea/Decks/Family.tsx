import useGetWords from "@/Hooks/useGetWords";
import { teams } from "../../../../public/db/teams";
import { useMemo, useState } from "react";
import GameCard from "../GameCard";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import RandomWord from "@/Models/randomWord";
import "../GameArea.css";
import useDisplayCards from "@/Hooks/useDisplayCards";

function Family(): JSX.Element {
  const [familyWords, setFamilyWords] = useState<RandomWord[]>(); // a state for 25 family words to use on first render
  const [spareFamilyWords, setSpareFamilyWords] = useState<RandomWord[]>(); // a state for 25 family words to use for spare if user changes a word
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false)); // 25 states defaulted to 'false' for the display of the cards.
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const randomizedTeams = useMemo(() => {
    return teams.sort(() => Math.random() - 0.5); // randomize teams for the game.
  }, []);

  //   const { gameStarted, setGameStarted } = useGameContext();

  const { randomWords, isError, isLoading } = useGetWords(true);

  useDisplayCards<RandomWord>( // visit 'Hooks/' to learn more what the hook does.
    randomWords,
    setFamilyWords,
    setSpareFamilyWords,
    setShowCards
  );

  if (isLoading) return <div>Loading...</div>; // display loading component.NOTE TO SELF: create loading component.
  if (isError) return <div>Error</div>; // display error component.NOTE TO SELF: create error component.

  return (
    <div className="cards-container">
      {familyWords?.length &&
        familyWords.map((_, index) => (
          <GameCard
            showCard={showCards[index]}
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
