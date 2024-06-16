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
  isFamily?: boolean;
};

function CardsContainer(props: CardsContainerProps): JSX.Element {
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false));
  const [cardStatus, setCardStatus] = useState<string[]>(Array(25).fill(""));

  const { session, setSession } = useGameContext();

  useStoreCardsToSession(
    props.cardsType,
    props.isCaptain,
    props.randomWords,
    props.isFamily
  );
  useDisplayCards(setShowCards, props.cardsType); // visit 'Hooks/' to learn more what the hook does.

  useRevealSelectedCards(cardStatus, setCardStatus);

  return (
    <div className="grid h-max grid-cols-5 grid-rows-[repeat(5,15vh)] lg:gap-5 sm:gap-2">
      {session.cards?.length &&
        session.cards.map((card, index) => {
          return (
            <GameCard
              key={
                props.cardsType === "RandomWord"
                  ? (card as RandomWord)?.id
                  : (card as WikiObj)?.pageid
              }
              index={index}
              showCard={showCards[index]}
              wordType={props.cardsType}
              isCaptain={props.isCaptain}
              isFamily={props.isFamily}
              team={session.teamAscription[index]}
              cardStatus={cardStatus[index]}
              setCardStatus={setCardStatus}
              word={session.cards[index]}
            />
          );
        })}
    </div>
  );
}

export default CardsContainer;
