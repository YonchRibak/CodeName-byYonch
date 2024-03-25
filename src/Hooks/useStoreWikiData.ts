import { useEffect } from "react";

function useStoreWikiData(wikiData: unknown[], lang: string) {
  useEffect(() => {
    if (
      !localStorage.getItem(`${lang}-initWikis`) ||
      !localStorage.getItem(`${lang}-spareWikis`)
    ) {
      if (wikiData.length > 1) {
        localStorage.setItem(
          `${lang}-initWikis`,
          JSON.stringify(wikiData.slice(0, 25))
        ); // store 25 wiki values for initial setting.

        localStorage.setItem(
          `${lang}-spareWikis`,
          JSON.stringify(wikiData.slice(25))
        ); // store other 575 wiki values for spare, in case user opts to replace some of the values.
        // the reason to store so many spare wiki values is that wikipedia blocks you after too many get request
      }
    }
  }, [wikiData, lang]);
}

export default useStoreWikiData;
