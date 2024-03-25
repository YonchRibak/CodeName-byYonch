import { Card, CardContent } from "@/components/ui/card";
import i18n from "@/i18n";
import "./GameArea.css";
import { Info, RefreshCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CardText from "./CardText";
import useGameContext from "@/Hooks/useGameContext";
import useKeepScore from "@/Hooks/useKeepScore";

type GameCardProps = {
  index: number;
  isFamily: boolean;
  wordType: string;
  word: any;
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

  useEffect(() => {
    //resetting neutral cards after being revealed so they can be reselected
    if (props.team === "neutral" && props.cardStatus === "revealed") {
      props.setCardStatus((prev) => {
        const updatedStatus = [...prev]; // Creating a copy of the previous state
        updatedStatus[props.index] = ""; // Updating the status at the specified index
        return updatedStatus; // Returning the updated array
      });
    }
  }, [props.cardStatus]);

  useKeepScore(props.cardStatus, props.team);

  function teamAssignClass(team: string): string {
    switch (team) {
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "bomb":
        return "bomb";
      case "neutral":
        return "";
    }
  }

  return (
    <Card
      onClick={props.cardStatus === "revealed" ? null : handleCardStatus}
      className={`${props.cardStatus} ${
        props.cardStatus === "revealed" ? teamAssignClass(props.team) : " "
      } game-card relative ${props.showCard ? "show " : " "} ${
        session.gameStarted ? "game-in-progress cursor-pointer " : " "
      } `}
    >
      <Popover
        open={popoverState}
        onOpenChange={(isOpen) => {
          isOpen ? setPopoverState(true) : setPopoverState(false);
        }}
      >
        <PopoverTrigger
          disabled={props.wordType === "RandomWord"}
          className="max-w-min absolute top-2 left-2 4xl:top-4 4xl:left-4 4xl:scale-125"
          onMouseEnter={() => setPopoverState(true)}
          onMouseLeave={() => setPopoverState(false)}
        >
          <Info className={props.wordType === "RandomWord" ? "hidden" : " "} />
        </PopoverTrigger>
        <PopoverContent
          className={
            "popover-text " + (i18n.language === "en-US" ? "ltr " : "rtl ")
          }
        >
          {props.word.extract}
        </PopoverContent>
      </Popover>

      <CardContent className="card-content h-full flex justify-center items-center p-4 ">
        <CardText
          wordHasBeenReplaced={wordHasBeenReplaced}
          className={"card-text " + i18n.language === "en-US" ? "ltr " : "rtl "}
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
          className={`replace-btn absolute top-2 right-2 4xl:top-4 4xl:right-2 4xl:scale-125 cursor-pointer`}
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
