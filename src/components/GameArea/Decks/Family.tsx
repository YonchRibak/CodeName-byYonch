import useGetWords from "@/Hooks/useGetWords";
import { useState } from "react";
import GameCard from "../GameCard";
import RandomWord from "@/Models/randomWord";
import "../GameArea.css";
import useDisplayCards from "@/Hooks/useDisplayCards";
import useGameContext from "@/Hooks/useGameContext";
import Loading from "@/components/SharedArea/Interact/Loading";
import useRevealSelectedCards from "@/Hooks/useRevealSelectedCards";

function Family(): JSX.Element {
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false)); // 25 states defaulted to 'false' for the display of the cards.
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array
  const [cardStatus, setCardStatus] = useState<string[]>(Array(25).fill(""));

  const { session, setSession } = useGameContext();

  const { randomWords, isError, isLoading } = useGetWords(true);

  useDisplayCards<RandomWord>(randomWords, setShowCards); // visit 'Hooks/' to learn more what the hook does.

  useRevealSelectedCards(cardStatus, setCardStatus);

  if (isLoading) return <Loading />; // display loading component.
  if (isError) return <div>Error</div>; // display error component.NOTE TO SELF: create error component.

  return (
    <div className="cards-container">
      {session.cards?.length &&
        session.cards.map((card, index) => (
          <GameCard
            key={(card as RandomWord).id}
            index={index}
            showCard={showCards[index]}
            wordType="RandomWord"
            isFamily
            team={session.teamAscription[index]}
            cardStatus={cardStatus[index]}
            setCardStatus={setCardStatus}
            word={session.cards[index]}
            onReplaceBtnClick={() => {
              setSession((prevSession) => {
                return {
                  ...prevSession,
                  cards: [
                    ...prevSession.cards.slice(0, index),
                    prevSession.spareCards[
                      currIndexForReplacement
                    ] as RandomWord,
                    ...prevSession.cards.slice(index + 1),
                  ],
                };
              });

              setCurrIndexForReplacement((prev) => prev + 1);
              // increase currIndexForReplacement so that the next card change will bring a different word from spare words array.
            }}
          />
        ))}
    </div>
  );
}

export default Family;
