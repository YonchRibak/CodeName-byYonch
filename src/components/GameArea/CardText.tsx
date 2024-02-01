import { ReactNode, useEffect, useRef, useState } from "react";
import "./GameArea.css";

type CardTextProps = {
  children: ReactNode;
  wordHasBeenReplaced: boolean;
  className: string;
};

function CardText({
  children,
  wordHasBeenReplaced,
  className,
}: CardTextProps): JSX.Element {
  const textContainer = useRef(null);
  const [adjustedFontSize, setAdjustedFontSize] = useState("text-4xl");

  useEffect(() => {
    if (textContainer.current) {
      const containerHeight = textContainer.current.offsetHeight;
      const screenHeight = window.innerHeight;
      const containerRelativeHeight = (containerHeight / screenHeight) * 100;

      if (containerRelativeHeight > 20) {
        setAdjustedFontSize("text-xl");
      } else if (containerRelativeHeight > 15 && containerRelativeHeight < 20) {
        setAdjustedFontSize("text-2xl");
      } else if (containerRelativeHeight > 9 && containerRelativeHeight < 15) {
        setAdjustedFontSize("text-3xl");
      }
    }
  }, [wordHasBeenReplaced]);

  return (
    <div
      ref={textContainer}
      className={"h-auto w-full " + adjustedFontSize + " " + className}
    >
      {children}
    </div>
  );
}

export default CardText;
