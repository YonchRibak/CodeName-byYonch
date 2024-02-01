import { Card, CardContent } from "@/components/ui/card";
import i18n from "@/i18n";
import "./GameArea.css";
import { Info, RefreshCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useEffect, useState } from "react";
import CardText from "./CardText";
import useGameContext from "@/Hooks/useGameContext";

type GameCardProps = {
  isFamily: boolean;
  wordType: string;
  word: any;
  onReplaceBtnClick: (newWord?: any, index?: number) => void;
  team: string;
  showCard: boolean;
};

function GameCard(props: GameCardProps): JSX.Element {
  const [popoverState, setPopoverState] = useState(false);
  const [wordHasBeenReplaced, setWordHasBeenReplaced] = useState(false);
  const [cardStatus, setCardStatus] = useState("");
  const [activeTurnNumber, setActiveTurnNumber] = useState<number>(0);

  const { session, setSession } = useGameContext();

  function handleCardStatus() {
    setActiveTurnNumber(session.turnsPlayed);
    if (
      session.gameStarted &&
      cardStatus !== "selected" &&
      cardStatus !== "revealed"
    ) {
      // card was first selected
      setCardStatus("selected");
      setActiveTurnNumber(session.turnsPlayed + 1);
    }
    if (
      session.gameStarted &&
      session.turnsPlayed === activeTurnNumber &&
      cardStatus === "selected"
    ) {
      // card was clicked again after selection
      setCardStatus("");
      setActiveTurnNumber(-1);
    }
  }

  useEffect(() => {
    if (
      session.gameStarted &&
      session.turnsPlayed === activeTurnNumber &&
      cardStatus === "selected"
    ) {
      if (props.team === "bomb") {
        setCardStatus(`revealed ${teamAssignClass(props.team)}`);
        setTimeout(() => {
          setCardStatus("exploded");
        }, 500);
      }
      setCardStatus(`revealed ${teamAssignClass(props.team)}`);
      if (props.team === "red")
        setSession((prevSession) => ({
          ...prevSession,
          redScore: session.redScore + 1,
        }));
      if (props.team === "blue")
        setSession((prevSession) => ({
          ...prevSession,
          redScore: session.blueScore + 1,
        }));
    }

    if (!session.gameStarted) {
      setCardStatus("");
    }
  }, [session.turnsPlayed, session.gameStarted]);

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
      onClick={cardStatus === "revealed" ? null : handleCardStatus}
      className={`${cardStatus} game-card relative ${
        props.showCard ? "show " : " "
      } ${session.gameStarted ? "game-in-progress cursor-pointer " : " "} `}
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
          <Info className={props.wordType === "RandomWord" ? "hidden" : " "} />
        </PopoverTrigger>
        <PopoverContent
          className={"text-4xl " + i18n.language === "en-US" ? "ltr " : "rtl "}
        >
          {props.word.extract}
        </PopoverContent>
      </Popover>

      <CardContent className="card-content h-full flex justify-center items-center p-4 ">
        <CardText
          wordHasBeenReplaced={wordHasBeenReplaced}
          className="card-text "
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
          className="replace-btn absolute top-1 right-1 "
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
