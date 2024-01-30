import i18n from "@/i18n";
import { useEffect } from "react";

function useStoreWikiData(wikiData: unknown[]) {
  useEffect(() => {
    console.log("useStoreRan");
    if (
      !localStorage.getItem(`${i18n.language}-initWikis`) ||
      !localStorage.getItem(`${i18n.language}-spareWikis`)
    ) {
      if (wikiData.length > 1) {
        localStorage.setItem(
          `${i18n.language}-initWikis`,
          JSON.stringify(wikiData.slice(0, 25))
        ); // store 25 wiki values for initial setting.

        localStorage.setItem(
          `${i18n.language}-spareWikis`,
          JSON.stringify(wikiData.slice(25))
        ); // store other 575 wiki values for spare, in case user opts to replace some of the values.
        // the reason to store so many spare wiki values is that wikipedia blocks you after too many get request
      }
    }
  }, [wikiData]);
}

export default useStoreWikiData;
