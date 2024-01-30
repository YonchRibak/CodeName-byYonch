import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import i18n from "@/i18n";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import "./GameArea.css";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
type GameCardProps = {
  isFamily: boolean;
  wordType: string;
  word: any;
  onReplaceBtnClick: (newWord?: any, index?: number) => void;
  team: "red" | "blue" | "bomb" | "neutral";
};

function GameCard(props: GameCardProps): JSX.Element {
  const [popoverState, setPopoverState] = useState(false);
  const { t } = useTranslation();

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
    <Card className={`${teamAssignClass(props.team)} game-card relative`}>
      <CardHeader>
        <Popover
          open={popoverState}
          onOpenChange={(isOpen) => {
            isOpen ? setPopoverState(true) : setPopoverState(false);
          }}
        >
          <PopoverTrigger
            disabled={props.wordType === "RandomWord"}
            className="max-w-min"
            onMouseEnter={() => setPopoverState(true)}
            onMouseLeave={() => setPopoverState(false)}
          >
            <Info className={props.wordType === "RandomWord" ? "hidden" : ""} />
          </PopoverTrigger>
          <PopoverContent>{props.word.extract}</PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        {props.wordType === "RandomWord" // card content depending on props.wordType.
          ? i18n.language === "en-US" // card content language depending on current selected language.
            ? props.word.English
            : props.word.Hebrew
          : props.word.title}
      </CardContent>

      <Button
        className="replace-btn md:w-24 absolute bottom-2 mx-auto left-0 right-0"
        onClick={() => props.onReplaceBtnClick()}
      >
        {t("gameCard.replaceBtn")}
      </Button>
    </Card>
  );
}

export default GameCard;
