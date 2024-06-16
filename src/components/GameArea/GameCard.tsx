import { Card, CardContent } from "@/components/ui/card";
import "./GameArea.css";
import { Dispatch, SetStateAction, useState } from "react";
import CardText from "./CardText";
import useGameContext from "@/Hooks/useGameContext";
import useKeepScore from "@/Hooks/useKeepScore";
import useResetCardStatus from "@/Hooks/useResetCardStatus";
import { GiRollingBomb } from "react-icons/gi";
import { cardService } from "@/Services/CardService";
import InfoPopover from "./InfoPopover";
import ReplaceCardIcon from "./ReplaceCardIcon";

type GameCardProps = {
  index: number;
  wordType: string;
  word: any;
  isCaptain: boolean;
  isFamily?: boolean;
  team: string;
  showCard: boolean;
  cardStatus: string;
  setCardStatus: Dispatch<SetStateAction<string[]>>;
};

function GameCard(props: GameCardProps): JSX.Element {
  const [wordHasBeenReplaced, setWordHasBeenReplaced] = useState(false);

  const { session, setSession } = useGameContext();

  function handleSelection() {
    if (session.gameStarted) {
      cardService.handleCardStatus(
        props.cardStatus,
        props.index,
        props.setCardStatus
      );
      cardService.pushOrRemoveIndexFromCardsRevealedArr(
        props.cardStatus,
        props.index,
        setSession
      );
    }
  }

  useResetCardStatus(
    // resetting cards to initial cardStatus when game is terminated
    // and resetting neutral cards to initial cardStatus after revelation so that they can be reselected:
    props.team,
    props.cardStatus,
    props.setCardStatus,
    props.index
  );

  useKeepScore(props.cardStatus, props.team); // keeping score according to team ascription after revelation.

  return (
    <Card
      onClick={
        props.cardStatus === "revealed" || props.isCaptain
          ? null
          : handleSelection
      }
      className={`

      ${/*card's status. ".selected" is defined in GameArea.css:*/ ""} 
      ${props.cardStatus}
  
    ${/*   general settings:*/ ""} 
    group relative h-full opacity-0 transform translate-x-5 translate-y-5 transition-all duration-300 ease-in-out
   
  
    ${
      props.isCaptain &&
      session.indicesOfRevealedCards.includes(props.index) &&
      "!border-4 sm:!border-2 !border-white"
    }
    ${/*in case props.showCard is true, show card:*/ ""} 
    ${props.showCard && "opacity-100 transform translate-x-0 translate-y-0"}

    ${
      /* in case isCaptain is true or card is revealed, show team-background:*/ ""
    } 

    ${
      props.team === "bomb" &&
      props.isCaptain &&
      "!border-4 sm:!border-2 border-pink-600 bg-white dark:bg-zinc-700"
    }
    ${
      props.isCaptain || props.cardStatus === "revealed"
        ? cardService.assignClassToTeam(props.team, props.isCaptain)
        : "bg-[#F9F7DC] dark:bg-zinc-700"
    }
    ${
      /* in case game has started, transform scale on hover, unless isCaptain is true: */ ""
    }
    ${
      session.gameStarted &&
      !props.isCaptain &&
      "hover:scale-105 cursor-pointer"
    }
       `}
    >
      {/* if wordType is "WikiObj" render InfoPopover component: */}
      {props.wordType === "WikiObj" && <InfoPopover word={props.word} />}

      <CardContent className="card-content h-full flex justify-center items-center p-4 sm:p-1 overflow-hidden overflow-ellipsis">
        <CardText
          valueLength={cardService.calculateWordValueLength(
            props.wordType,
            props.word
          )}
          isCaptain={props.isCaptain}
          wordHasBeenReplaced={wordHasBeenReplaced}
        >
          {/* selects which value to give CardText as child: */}
          {cardService.selectWordValue(props.wordType, props.word)}
        </CardText>
      </CardContent>

      {!session.gameStarted && (
        <ReplaceCardIcon
          setWordHasBeenReplaced={setWordHasBeenReplaced}
          wordType={props.wordType}
          index={props.index}
          isFamily={props.isFamily}
        />
      )}
      {props.team === "bomb" && props.isCaptain && (
        <GiRollingBomb className="absolute bottom-3 left-3 scale-[250%] md:scale-[150%] md:bottom-2 md:left-2 xl:scale-[400%] xl:bottom-8 xl:left-8 sm:scale-90 sm:bottom-[2px] sm:left-[2px]" />
      )}
    </Card>
  );
}

export default GameCard;
