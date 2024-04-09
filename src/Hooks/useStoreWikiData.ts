import { Dispatch, SetStateAction, useEffect } from "react";
import useGameContext from "./useGameContext";
import WikiObj from "@/Models/WikiObj";

function useStoreWikiData(
  wikiData: WikiObj[],
  lang: string,
  blockStoring: boolean,
  setBlockStoring: Dispatch<SetStateAction<boolean>>
) {
  const { setSession } = useGameContext();
  useEffect(() => {
    if (
      !localStorage.getItem(`${lang}-initWikis`) ||
      !localStorage.getItem(`${lang}-spareWikis`)
    ) {
      if (wikiData.length > 1 && !blockStoring) {
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

        setBlockStoring(true);
      }
    }
  }, [wikiData, lang, blockStoring]);
}

export default useStoreWikiData;
