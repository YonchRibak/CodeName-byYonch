import { Card, CardContent } from "@/components/ui/card";
import i18n from "@/i18n";
import "./GameArea.css";
import { Info, RefreshCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dispatch, SetStateAction, useState } from "react";
import CardText from "./CardText";
import useGameContext from "@/Hooks/useGameContext";
import useKeepScore from "@/Hooks/useKeepScore";
import useResetCardStatus from "@/Hooks/useResetCardStatus";
import { GiRollingBomb } from "react-icons/gi";
import { cardService } from "@/Services/CardService";

type GameCardProps = {
  index: number;
  wordType: string;
  word: any;
  isCaptain: boolean;
  onReplaceBtnClick: (newWord?: any, index?: number) => void;
  team: string;
  showCard: boolean;
  cardStatus: string;
  setCardStatus: Dispatch<SetStateAction<string[]>>;
};

function GameCard(props: GameCardProps): JSX.Element {
  const [popoverState, setPopoverState] = useState(false);
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
      <Popover
        open={popoverState}
        onOpenChange={(isOpen) => setPopoverState(isOpen)}
      >
        <PopoverTrigger
          disabled={props.wordType === "RandomWord"}
          className={`max-w-min absolute sm:top-[-2px] sm:left-[-2px] sm:scale-50 md:scale-[60%] md:top-[1px] md:left-[1px] lg:scale-[150%] lg:top-3 lg:left-4 top-2 left-2 xl:top-4 xl:left-4 xl:scale-125`}
          onMouseEnter={() => setPopoverState(true)}
          onMouseLeave={() => setPopoverState(false)}
        >
          <Info className={props.wordType === "RandomWord" ? "hidden" : ""} />
        </PopoverTrigger>
        <PopoverContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          className={i18n.language === "en-US" ? "ltr " : "rtl "}
        >
          <div className="text-xl md:text-3xl sm:text-sm">
            {props.word?.extract}
          </div>
        </PopoverContent>
      </Popover>

      <CardContent className="card-content h-full flex justify-center items-center p-4 sm:p-1 overflow-hidden overflow-ellipsis">
        <CardText
          valueLength={
            props.wordType === "RandomWord" // card content depending on props.wordType.
              ? i18n.language === "en-US" // card content language depending on current selected language.
                ? props.word?.English?.length
                : props.word?.Hebrew?.length
              : props.word?.title?.length
          }
          isCaptain={props.isCaptain}
          wordHasBeenReplaced={wordHasBeenReplaced}
          className={
            "select-none " + i18n.language === "en-US" ? "ltr " : "rtl "
          }
        >
          {props.wordType === "RandomWord" // card content depending on props.wordType.
            ? i18n.language === "en-US" // card content language depending on current selected language.
              ? props.word?.English
              : props.word?.Hebrew
            : props.word?.title}
        </CardText>
      </CardContent>

      {!session.gameStarted && (
        <RefreshCcw
          className={`opacity-0 group-hover:opacity-100 absolute top-2 right-2 4xl:top-4 4xl:right-2 4xl:scale-125 cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={() => {
            setWordHasBeenReplaced((prev) => !prev);
            props.onReplaceBtnClick();
          }}
        />
      )}
      {props.team === "bomb" && props.isCaptain && (
        <GiRollingBomb className="absolute bottom-3 left-3 scale-[250%] md:scale-[150%] md:bottom-2 md:left-2 xl:scale-[400%] xl:bottom-8 xl:left-8 sm:scale-90 sm:bottom-[2px] sm:left-[2px]" />
      )}
    </Card>
  );
}

export default GameCard;
