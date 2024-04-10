import { ReactNode, useEffect, useRef, useState } from "react";
import "./GameArea.css";

type CardTextProps = {
  children: ReactNode;
  wordHasBeenReplaced: boolean;
  className: string;
  valueLength: number;
};

function CardText({
  children,
  wordHasBeenReplaced,
  className,
  valueLength,
}: CardTextProps): JSX.Element {
  const [adjustedFontSize, setAdjustedFontSize] = useState(
    " 2xl:text-5xl lg:text-4xl md:text-3xl sm:text-xl "
  );

  useEffect(() => {

    if (valueLength >= 60) {
      setAdjustedFontSize("lg:text-2xl md:text-[0.7rem] sm:text-[0.575rem]");
    } else if (valueLength >= 50 && valueLength < 60) {
      setAdjustedFontSize("lg:text-2xl md:text-xs sm:text-[0.6rem]");
    } else if (valueLength >= 40 && valueLength < 50) {
      setAdjustedFontSize("lg:text-2xl md:text-sm sm:text-[0.6rem]");
    } else if (valueLength >= 35 && valueLength < 40) {
      setAdjustedFontSize("lg:text-2xl md:text-sm sm:text-[0.65rem]");
    } else if (valueLength >= 30 && valueLength < 35) {
      setAdjustedFontSize("lg:text-3xl md:text-base sm:text-[0.675rem]");
    } else if (valueLength >= 25 && valueLength < 30) {
      setAdjustedFontSize("lg:text-3xl md:text-lg sm:text-sm");
    } else if (valueLength >= 20 && valueLength < 25) {
      setAdjustedFontSize("lg:text-4xl md:text-lg sm:text-sm");
    } else if (valueLength >= 15 && valueLength < 20) {
      setAdjustedFontSize("lg:text-4xl md:text-lg sm:text-base");
    } else if (valueLength >= 10 && valueLength < 15) {
      setAdjustedFontSize("lg:text-4xl md:text-2xl sm:text-base");
    }
  }, [wordHasBeenReplaced]);

  return (
    <div
      className={`
        h-auto w-full font-medium select-none sm:leading-tight whitespace-pre-line
         ${adjustedFontSize}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default CardText;
