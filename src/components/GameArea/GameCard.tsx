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

  const { session } = useGameContext();

  function handleCardStatus() {
    if (
      session.gameStarted &&
      props.cardStatus !== "selected" &&
      props.cardStatus !== "revealed"
    ) {
      // card was first selected
      props.setCardStatus((prev) => {
        const updatedStatus = [...prev]; // Creating a copy of the previous state
        updatedStatus[props.index] = "selected"; // Updating the status at the specified index
        return updatedStatus; // Returning the updated array
      });
    }
    if (session.gameStarted && props.cardStatus === "selected") {
      // card was clicked again after selection
      props.setCardStatus((prev) => {
        const updatedStatus = [...prev]; // Creating a copy of the previous state
        updatedStatus[props.index] = ""; // Updating the status at the specified index
        return updatedStatus; // Returning the updated array
      });
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

  function assignClassToTeam(team: string): string {
    switch (team) {
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "bomb":
        if (props.isCaptain) return "captain-bomb";
        return "bomb";
      case "neutral":
        return "";
    }
  }

  return (
    <Card
      onClick={
        props.cardStatus === "revealed" || props.isCaptain
          ? null
          : handleCardStatus
      }
      className={`
    ${/*   general settings:*/ ""} 
    group relative h-[clamp(${
      props.isCaptain ? "50px" : "110px"
    },14vh,15vh)] opacity-0 transform translate-x-5 translate-y-5 transition-all duration-300 ease-in-out
   
    ${/*card's status. ".selected" is defined in GameArea.css:*/ ""} 
    ${props.cardStatus}

    ${/*in case props.showCard is true, show card:*/ ""} 
    ${props.showCard && "opacity-100 transform translate-x-0 translate-y-0"}

    ${
      /* in case isCaptain is true or card is revealed, show team-background:*/ ""
    } 
    ${
      props.isCaptain || props.cardStatus === "revealed"
        ? assignClassToTeam(props.team)
        : "bg-blue-100 dark:bg-zinc-800"
    }
    ${
      /* in case game has started, transform scale on hover, unless isCaptain is true: */ ""
    }
    ${
      session.gameStarted &&
      !props.isCaptain &&
      "hover:scale-110 cursor-pointer"
    }
       `}
    >
      <Popover
        open={popoverState}
        onOpenChange={(isOpen) => setPopoverState(isOpen)}
      >
        <PopoverTrigger
          disabled={props.wordType === "RandomWord"}
          className={`max-w-min absolute md:top-[1px] md:left-[1px] md:scale-75 top-2 left-2 4xl:top-4 4xl:left-4 4xl:scale-125`}
          onMouseEnter={() => setPopoverState(true)}
          onMouseLeave={() => setPopoverState(false)}
        >
          <Info className={props.wordType === "RandomWord" ? "hidden" : " "} />
        </PopoverTrigger>
        <PopoverContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          className={"text-xl " + (i18n.language === "en-US" ? "ltr " : "rtl ")}
        >
          {props.word.extract}
        </PopoverContent>
      </Popover>

      <CardContent className="card-content h-full flex justify-center items-center p-4 overflow-hidden overflow-ellipsis">
        <CardText
          isCaptain={props.isCaptain}
          wordHasBeenReplaced={wordHasBeenReplaced}
          className={
            "select-none " + i18n.language === "en-US" ? "ltr " : "rtl "
          }
        >
          {props.wordType === "RandomWord" // card content depending on props.wordType.
            ? i18n.language === "en-US" // card content language depending on current selected language.
              ? props.word.English
              : props.word.Hebrew
            : props.word.title}
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
    </Card>
  );
}

export default GameCard;
