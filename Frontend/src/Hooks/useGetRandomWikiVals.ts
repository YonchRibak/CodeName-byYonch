import axios from "axios";
import { useEffect, useState } from "react";
import { useQueries } from "react-query";
import useStoreWikiData from "./useStoreWikiData";

function useGetRandomWikiVals(lang: "en" | "he", pages: number) {
  const [fetchedWikis, setFetchedWikis] = useState([]);
  const [isWikisStored, setIsWikisStored] = useState({
    en: true,
    he: true,
  });

  useEffect(() => {
    // check if wikis aren't stored in current language and setIsWikisStored accordingly.
    if (!localStorage.getItem(`${lang}-initWikis`)) {
      setIsWikisStored((prev) => ({
        ...prev,
        [lang]: false,
      }));
    }

    return () => setFetchedWikis([]); // Clean-up for the hook: reset fetchedWikis to an empty array.
  }, [localStorage.length, lang]);

  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exsentences=1&exintro&explaintext&generator=random&grnnamespace=0&grnlimit=20`;

  const results = useQueries(
    Array.from({ length: pages }, (_, i) => i).map((index) => {
      return {
        queryKey: [`getRandomWikis-${index}-${lang}`],
        queryFn: async () => {
          const res = await axios.get(url);
          return res;
        },
        enabled: lang === "en" ? !isWikisStored.en : !isWikisStored.he, // only if isStored is falsy (meaning: no items in storage), run the query.
      };
    })
  );

  useEffect(() => {
    if (results.every((res) => res.isSuccess)) {
      // if ALL queries have been resolved,

      const allWikis = results.reduce((acc, result) => {
        // rejoin all pages
        return [...acc, ...Object.values(result.data?.data?.query?.pages)];
      }, []);

      setFetchedWikis(
        allWikis.filter(
          (obj) =>
            obj.extract &&
            obj.extract !== "האם התכוונתם ל..." &&
            !obj.extract.includes("may refer to:") &&
            !obj.extract.includes("is a surname.") &&
            obj.extract.length > 5
        )
      );
    }
  }, [results.every((res) => res.isSuccess)]);

  useStoreWikiData(fetchedWikis, lang, isWikisStored, setIsWikisStored); // store in local storage and in session (GameContext).

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  return { isLoading, isError };
}

export default useGetRandomWikiVals;
