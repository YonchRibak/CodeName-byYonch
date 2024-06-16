import useGameContext from "@/Hooks/useGameContext";
import { cardService } from "@/Services/CardService";
import { RefreshCcw } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type ReplaceCardIconProps = {
  setWordHasBeenReplaced: Dispatch<SetStateAction<boolean>>;
  wordType: string;
  index: number;
  isFamily?: boolean;
};

function ReplaceCardIcon(props: ReplaceCardIconProps): JSX.Element {
  const { session, setSession } = useGameContext();

  return (
    <RefreshCcw
      className={`opacity-0 group-hover:opacity-100 absolute top-2 right-2 4xl:top-4 4xl:right-2 4xl:scale-125 cursor-pointer transition-all duration-300 ease-in-out`}
      onClick={() => {
        props.setWordHasBeenReplaced((prev) => !prev);
        cardService.handleCardReplacement(
          props.wordType,
          props.index,
          setSession,
          session,
          props.isFamily
        );
      }}
    />
  );
}

export default ReplaceCardIcon;
