import { Card, CardContent } from "@/components/ui/card";
import i18n from "@/i18n";
import "./GameArea.css";
import { Info, RefreshCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import CardText from "./CardText";

type GameCardProps = {
  isFamily: boolean;
  wordType: string;
  word: any;
  onReplaceBtnClick: (newWord?: any, index?: number) => void;
  team: "red" | "blue" | "bomb" | "neutral";
  wordHasBeenReplaced: number;
  showCard: boolean;
};

function GameCard(props: GameCardProps): JSX.Element {
  const [popoverState, setPopoverState] = useState(false);

  function teamAssignClass(team: string): string {
    switch (team) {
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "bomb":
        return "bg-yellow-300";
      case "neutral":
        return "";
    }
  }

  return (
    <Card
      className={`${teamAssignClass(props.team)} game-card relative ${
        props.showCard ? "show" : ""
      }`}
    >
      <Popover
        open={popoverState}
        onOpenChange={(isOpen) => {
          isOpen ? setPopoverState(true) : setPopoverState(false);
        }}
      >
        <PopoverTrigger
          disabled={props.wordType === "RandomWord"}
          className="max-w-min absolute top-1 left-1"
          onMouseEnter={() => setPopoverState(true)}
          onMouseLeave={() => setPopoverState(false)}
        >
          <Info className={props.wordType === "RandomWord" ? "hidden" : ""} />
        </PopoverTrigger>
        <PopoverContent
          className={"text-4xl " + i18n.language === "en-US" ? "ltr" : "rtl"}
        >
          {props.word.extract}
        </PopoverContent>
      </Popover>

      <CardContent className="card-content h-full flex justify-center items-center p-4">
        <CardText wordHasBeenReplaced={props.wordHasBeenReplaced}>
          {props.wordType === "RandomWord" // card content depending on props.wordType.
            ? i18n.language === "en-US" // card content language depending on current selected language.
              ? props.word.English
              : props.word.Hebrew
            : props.word.title}
        </CardText>
      </CardContent>

      <RefreshCcw
        className="replace-btn absolute top-1 right-1"
        onClick={() => props.onReplaceBtnClick()}
      />
    </Card>
  );
}

export default GameCard;
