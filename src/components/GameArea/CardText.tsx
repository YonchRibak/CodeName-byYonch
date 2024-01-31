import { ReactNode, useEffect, useRef, useState } from "react";
import "./GameArea.css";

type CardTextProps = {
  children: ReactNode;
  wordHasBeenReplaced: number;
};

function CardText({
  children,
  wordHasBeenReplaced,
}: CardTextProps): JSX.Element {
  const textContainer = useRef(null);
  const [adjustedFontSize, setAdjustedFontSize] = useState("text-4xl");

  useEffect(() => {
    if (textContainer.current) {
      const containerHeight = textContainer.current.offsetHeight;
      const screenHeight = window.innerHeight;
      const containerRelativeHeight = (containerHeight / screenHeight) * 100;
      console.log(containerRelativeHeight);

      if (containerRelativeHeight > 20) {
        setAdjustedFontSize("text-xl");
      } else if (containerRelativeHeight > 17 && containerRelativeHeight < 20) {
        setAdjustedFontSize("text-2xl");
      } else if (containerRelativeHeight > 9 && containerRelativeHeight < 17) {
        setAdjustedFontSize("text-3xl");
      }
    }
  }, [wordHasBeenReplaced]);

  return (
    <div ref={textContainer} className={"h-auto w-full " + adjustedFontSize}>
      {children}
    </div>
  );
}

export default CardText;
