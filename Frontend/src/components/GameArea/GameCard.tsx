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
import { cardStyleService } from "@/Services/CardStyleService";
import WikiObj from "@/Models/WikiObj";
import i18n from "@/i18n";
import useDefeatByBombSelection from "@/Hooks/useDefeatByBombSelection";

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

  useResetCardStatus(
    // resetting cards to initial cardStatus when game is terminated
    // and resetting neutral cards to initial cardStatus after revelation so that they can be reselected:
    props.team,
    props.cardStatus,
    props.setCardStatus,
    props.index
  );

  useKeepScore(props.cardStatus, props.team); // keeping score according to team ascription after revelation.

  useDefeatByBombSelection(
    props.team,
    props.cardStatus,
    props.isCaptain,
    session,
    setSession
  );
  return (
    <Card
      onClick={() =>
        cardService.handleCardSelection(
          session,
          props.cardStatus,
          props.index,
          props.isCaptain,
          props.setCardStatus,
          setSession
        )
      }
      className={cardStyleService.classListManager(
        // class list is managed according to logic handled in cardStyleService for readability.
        props.cardStatus,
        props.isCaptain,
        session,
        props.index,
        props.showCard,
        props.team
      )}
    >
      {/* if wordType is "WikiObj" render InfoPopover component: */}
      {props.wordType === "WikiObj" && (
        <InfoPopover
          text={(props.word as WikiObj)?.extract}
          textAlign={i18n.language === "en-US" ? "ltr" : "rtl"}
        />
      )}

      <CardContent className="card-content h-full flex justify-center items-center p-4 sm:p-1 overflow-hidden overflow-ellipsis">
        <CardText
          valueLength={
            cardService.selectWordValue(props.wordType, props.word)?.length // the length of the value is needed at CardText to manipulate font-size;
          }
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
