import { Dispatch, SetStateAction, useEffect } from "react";
import useGameContext from "./useGameContext";
import WikiObj from "@/Models/WikiObj";

type isWikisStoredType = {
  en: boolean;
  he: boolean;
};
function useStoreWikiData(
  wikiData: WikiObj[],
  lang: "en" | "he",
  isWikiStored: isWikisStoredType,
  setIsWikiStored: Dispatch<SetStateAction<isWikisStoredType>>
) {
  const { setSession } = useGameContext();

  useEffect(() => {
    if (
      !localStorage.getItem(`${lang}-initWikis`) ||
      !localStorage.getItem(`${lang}-spareWikis`)
    ) {
      if (wikiData.length > 1 && !isWikiStored[lang]) {
        localStorage.setItem(
          `${lang}-initWikis`,
          JSON.stringify(wikiData.slice(0, 25))
        ); // store 25 wiki values for initial setting.

        localStorage.setItem(
          `${lang}-spareWikis`,
          JSON.stringify(wikiData.slice(25))
        ); // store other 575 wiki values for spare, in case user opts to replace some of the values.
        // the reason to store so many spare wiki values is that wikipedia blocks you after too many get request

        setSession((prevSession) => ({
          ...prevSession,
          cards: wikiData.slice(0, 25),
        }));
        setSession((prevSession) => ({
          ...prevSession,
          spareCards: wikiData.slice(25),
        }));

        setIsWikiStored((prev) => ({
          ...prev,
          [lang]: true,
        }));
      }
    }
  }, [wikiData, lang, isWikiStored]);
}

export default useStoreWikiData;
