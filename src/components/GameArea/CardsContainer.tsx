import useGameContext from "@/Hooks/useGameContext";
import GameCard from "./GameCard";
import RandomWord from "@/Models/randomWord";
import { useState } from "react";
import useDisplayCards from "@/Hooks/useDisplayCards";
import useRevealSelectedCards from "@/Hooks/useRevealSelectedCards";
import WikiObj from "@/Models/WikiObj";
import useStoreCardsToSession from "@/Hooks/useStoreCardsToSession";
import i18n from "@/i18n";

type CardsContainerProps = {
  randomWords?: RandomWord[];
  cardsType: "RandomWord" | "WikiObj";
  isCaptain: boolean;
  isFamily?: boolean;
};

function CardsContainer(props: CardsContainerProps): JSX.Element {
  const [showCards, setShowCards] = useState<boolean[]>(Array(25).fill(false));
  const [cardStatus, setCardStatus] = useState<string[]>(Array(25).fill(""));
  //   const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const { session, setSession } = useGameContext();

  useStoreCardsToSession(
    props.cardsType,
    props.isCaptain,
    props.randomWords,
    props.isFamily
  );
  useDisplayCards(setShowCards, props.cardsType); // visit 'Hooks/' to learn more what the hook does.

  useRevealSelectedCards(cardStatus, setCardStatus);

  console.log(props.randomWords);
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
              team={session.teamAscription[index]}
              cardStatus={cardStatus[index]}
              setCardStatus={setCardStatus}
              word={session.cards[index]}
              onReplaceBtnClick={() => {
                if (props.cardsType === "RandomWord") {
                  // Update session state with the replaced card
                  setSession((prevSession) => {
                    return {
                      ...prevSession,
                      cards: [
                        ...prevSession.cards.slice(0, index), // Keep cards before the replaced card
                        prevSession.spareCards[ // Replace the card at the specified index with a spare card
                          sessionStorage.getItem(
                            // If indexForReplacement-currentDeck is stored in sessionStorage use it
                            props.isFamily
                              ? "indexForReplacement-family"
                              : "indexForReplacement-adults"
                          )
                            ? parseInt(
                                sessionStorage.getItem(
                                  props.isFamily
                                    ? "indexForReplacement-family"
                                    : "indexForReplacement-adults"
                                )
                              )
                            : 0 // If indexForReplacement-currentDeck ISN'T stored in sessionStorage use 0
                        ] as RandomWord,
                        ...prevSession.cards.slice(index + 1), // Keep cards after the replaced card
                      ],
                    };
                  });

                  // Store the updated cards in sessionStorage after replacement
                  sessionStorage.setItem(
                    props.isFamily ? "family-cards" : "adults-cards",
                    JSON.stringify([
                      ...session.cards.slice(0, index), // Keep cards before the replaced card
                      session.spareCards[ // Replace the card at the specified index with a spare card
                        sessionStorage.getItem(
                          // If indexForReplacement-currentDeck is stored in sessionStorage use it
                          props.isFamily
                            ? "indexForReplacement-family"
                            : "indexForReplacement-adults"
                        )
                          ? parseInt(
                              sessionStorage.getItem(
                                props.isFamily
                                  ? "indexForReplacement-family"
                                  : "indexForReplacement-adults"
                              )
                            )
                          : 0 // If indexForReplacement-currentDeck ISN'T stored in sessionStorage use 0
                      ],
                      ...session.cards.slice(index + 1), // Keep cards after the replaced card
                    ])
                  );
                  sessionStorage.setItem(
                    props.isFamily ? "family-spares" : "adults-spares",
                    JSON.stringify(session.spareCards)
                  );
                } else {
                  // If the card type is not "RandomWord"
                  // Update session state with the replaced card
                  setSession((prevSession) => {
                    return {
                      ...prevSession,
                      cards: [
                        ...prevSession.cards.slice(0, index), // Keep cards before the replaced card
                        prevSession.spareCards[ // Replace the card at the specified index with a spare card
                          localStorage.getItem("indexForReplacement-wiki") // If indexForReplacement-wiki is stored in sessionStorage use it
                            ? parseInt(
                                localStorage.getItem("indexForReplacement-wiki")
                              )
                            : 0 // If indexForReplacement-wiki ISN'T stored in sessionStorage use 0
                        ] as WikiObj,
                        ...prevSession.cards.slice(index + 1), // Keep cards after the replaced card
                      ],
                    };
                  });

                  // Store the updated cards in localStorage after replacement
                  localStorage.setItem(
                    `${i18n.language}-initWikis`,
                    JSON.stringify([
                      ...session.cards.slice(0, index), // Keep cards before the replaced card
                      session.spareCards[ // Replace the card at the specified index with a spare card
                        localStorage.getItem("indexForReplacement-wiki") // If indexForReplacement-wiki is stored in sessionStorage use it
                          ? parseInt(
                              localStorage.getItem("indexForReplacement-wiki")
                            )
                          : 0 // If indexForReplacement-wiki ISN'T stored in sessionStorage use 0
                      ],
                      ...session.cards.slice(index + 1), // Keep cards after the replaced card
                    ])
                  );
                }

                // Increment the index for the next replacement based on card type
                if (props.cardsType === "RandomWord") {
                  // Increment the index for RandomWord cards
                  const prevIndex = parseInt(
                    sessionStorage.getItem(
                      props.isFamily
                        ? "indexForReplacement-family"
                        : "indexForReplacement-adults"
                    )
                  );
                  sessionStorage.setItem(
                    props.isFamily
                      ? "indexForReplacement-family"
                      : "indexForReplacement-adults",
                    prevIndex ? JSON.stringify(prevIndex + 1) : "1" // if PrevIndex is null, this means 0 was used and there for the next index is 1.
                  );
                } else {
                  // Increment the index for Wiki cards type:
                  const prevIndex = parseInt(
                    localStorage.getItem("indexForReplacement-wiki")
                  );
                  localStorage.setItem(
                    "indexForReplacement-wiki",
                    prevIndex ? JSON.stringify(prevIndex + 1) : "1" // if PrevIndex is null, this means 0 was used and there for the next index is 1.
                  );
                }
              }}
            />
          );
        })}
    </div>
  );
}

export default CardsContainer;
