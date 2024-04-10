import useGameContext from "@/Hooks/useGameContext";
import GameCard from "./GameCard";
import RandomWord from "@/Models/randomWord";
import { useState } from "react";
import useDisplayCards from "@/Hooks/useDisplayCards";
import useRevealSelectedCards from "@/Hooks/useRevealSelectedCards";
import WikiObj from "@/Models/WikiObj";
import useStoreCardsToSession from "@/Hooks/useStoreCardsToSession";

type CardsContainerProps = {
  randomWords?: RandomWord[];
  cardsType: "RandomWord" | "WikiObj";
  isCaptain: boolean;
};

function CardsContainer(props: CardsContainerProps): JSX.Element {
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false));
  const [cardStatus, setCardStatus] = useState<string[]>(Array(25).fill(""));
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const { session, setSession } = useGameContext();

  useStoreCardsToSession(props.isCaptain, props.randomWords);
  useDisplayCards(setShowCards, props.cardsType); // visit 'Hooks/' to learn more what the hook does.

  useRevealSelectedCards(cardStatus, setCardStatus);

  return (
    <div className=" grid h-max grid-cols-5 grid-rows-[repeat(5,15vh)] lg:gap-5 sm:gap-2">
      {session.cards?.length &&
        session.cards.map((card, index) => {
          return (
            <GameCard
              key={
                props.cardsType === "RandomWord"
                  ? (card as RandomWord).id
                  : (card as WikiObj).pageid
              }
              index={index}
              showCard={showCards[index]}
              wordType={props.cardsType}
              isCaptain={props.isCaptain}
              team={session.teamAscription[index]}
              cardStatus={cardStatus[index]}
              setCardStatus={setCardStatus}
              word={session.cards[index]}
              onReplaceBtnClick={() => {
                props.cardsType === "RandomWord"
                  ? setSession((prevSession) => {
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
                    })
                  : setSession((prevSession) => {
                      return {
                        ...prevSession,
                        cards: [
                          ...prevSession.cards.slice(0, index),
                          prevSession.spareCards[
                            currIndexForReplacement
                          ] as WikiObj,
                          ...prevSession.cards.slice(index + 1),
                        ],
                      };
                    });

                setCurrIndexForReplacement((prev) => prev + 1);
                // increase currIndexForReplacement so that the next card change will bring a different word from spare words array.
              }}
            />
          );
        })}
    </div>
  );
}

export default CardsContainer;
