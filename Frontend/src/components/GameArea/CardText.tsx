import { ReactNode, useState } from "react";
import "./GameArea.css";
import useAdjustFontSize from "@/Hooks/useAdjustFontSize";
import useManageTextLineBreaks from "@/Hooks/useManageTextLineBreaks";
import i18n from "@/i18n";

type CardTextProps = {
  children: ReactNode;
  wordHasBeenReplaced: boolean;
  valueLength: number;
  isCaptain: boolean;
};

function CardText({
  children,
  wordHasBeenReplaced,
  valueLength,
  isCaptain,
}: CardTextProps): JSX.Element {
  const [textValue, setTextValue] = useState("");
  const [adjustedFontSize, setAdjustedFontSize] = useState("");

  useAdjustFontSize(valueLength, setAdjustedFontSize, wordHasBeenReplaced);

  useManageTextLineBreaks(
    // This custom hook manages text line breaks based on the word type and length
    children?.toString(),
    setTextValue,
    wordHasBeenReplaced
  );
  return (
    <div
      className={`
        h-auto w-full font-medium select-none sm:leading-tight whitespace-pre-line 
         ${adjustedFontSize}
        ${i18n.language === "en-US" ? "ltr " : "rtl "}
      `}
    >
      {isCaptain ? textValue : children}
    </div>
  );
}

export default CardText;
