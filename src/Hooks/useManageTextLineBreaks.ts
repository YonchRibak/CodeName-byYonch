import { Dispatch, SetStateAction, useEffect } from "react";

// This custom hook manages text line breaks based on the word type and length:
function useManageTextLineBreaks(
  word: string,
  setTextValue: Dispatch<SetStateAction<string>>,
  wordHasBeenReplaced: boolean
): void {
  useEffect(() => {
    const words = word?.split(" ");
    if (words?.length > 2) {
      let newString = "";

      for (let i = 0; i < words?.length; i++) {
        newString += words[i];

        // Determine where the line break is needed based on the length of the first two words:
        if (
          words[0]?.length + words[1]?.length <= 10 ||
          words[2]?.length > 10
        ) {
          if (i === 1) {
            newString += "\n"; // Add a line break after the second word
          } else if (i !== words?.length - 1) {
            newString += " ";
          }
        } else {
          if (i === 0) {
            newString += "\n"; // Add a line break after the first word
          } else if (i !== words.length - 1) {
            newString += " ";
          }
        }
      }
      setTextValue(newString); // Update the component's state with the modified text
    } else {
      setTextValue(word);
    }
  }, [wordHasBeenReplaced]);
}
export default useManageTextLineBreaks;
