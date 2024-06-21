import { Dispatch, SetStateAction, useEffect } from "react";

function useAdjustFontSize(
  valueLength: number,
  setAdjustedFontSize: Dispatch<SetStateAction<string>>,
  wordHasBeenReplaced: boolean
) {
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
      setAdjustedFontSize("lg:text-3xl md:text-base sm:text-xs");
    } else if (valueLength >= 20 && valueLength < 25) {
      setAdjustedFontSize("lg:text-4xl md:text-lg sm:text-sm");
    } else if (valueLength >= 15 && valueLength < 20) {
      setAdjustedFontSize("lg:text-4xl md:text-lg sm:text-base");
    } else if (valueLength >= 10 && valueLength < 15) {
      setAdjustedFontSize("lg:text-4xl md:text-2xl sm:text-base");
    } else {
      setAdjustedFontSize("2xl:text-5xl lg:text-4xl md:text-3xl sm:text-xl");
    }
  }, [wordHasBeenReplaced]);
}

export default useAdjustFontSize;
