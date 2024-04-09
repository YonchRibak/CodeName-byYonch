import axios from "axios";
import { useEffect, useState } from "react";
import { useQueries } from "react-query";
import useStoreWikiData from "./useStoreWikiData";
import useGameContext from "./useGameContext";

function useGetRandomWikiVals(lang: string, pages: number) {
  const [allData, setAllData] = useState([]); // state to regroup all data to.
  const [isEngStored, setIsEngStored] = useState(true); // boolean to indicate whether there are already items in local storage (rendering the fetch unnecessary)
  const [isHebStored, setIsHebStored] = useState(true); // boolean to indicate whether there are already items in local storage (rendering the fetch unnecessary)
  const [blockStoring, setBlockStoring] = useState(true);

  const { session } = useGameContext();

  useEffect(() => {
    if (!allData.length) {
      setBlockStoring(false);
    }
  }, []);

  useEffect(() => {
    // if no corresponding items are in storage, set isStored to false.
    if (
      !localStorage.getItem(`en-US-initWikis`) ||
      !localStorage.getItem(`en-US-spareWikis`)
    ) {
      setIsEngStored(false);
    }
    if (
      !localStorage.getItem(`he-IL-initWikis`) ||
      !localStorage.getItem(`he-IL-spareWikis`)
    ) {
      setIsHebStored(false);
    }
  }, [session.cards]);

  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exsentences=1&exintro&explaintext&generator=random&grnnamespace=0&grnlimit=20`;

  const results = useQueries(
    Array.from({ length: pages }, (_, i) => i).map((index) => {
      return {
        queryKey: [`getRandomWikis-${index}-${lang}`],
        queryFn: async () => {
          const res = await axios.get(url);
          return res;
        },
        enabled: lang === "en" ? !isEngStored : !isHebStored, // only if isStored is falsy (meaning: no items in storage), run the query.
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

      setAllData(
        allWikis.filter(
          (obj) =>
            obj.extract &&
            obj.extract !== "האם התכוונתם ל..." &&
            !obj.extract.includes("may refer to:") &&
            !obj.extract.includes("is a surname.") &&
            obj.extract.length > 5
        )
      );
      setBlockStoring(false);
    }
  }, [results.every((res) => res.isSuccess)]);

  useStoreWikiData(
    allData,
    lang === "en" ? "en-US" : "he-IL",
    blockStoring,
    setBlockStoring
  ); // store in local storage and in session (GameContext).

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  return { isLoading, isError };
}

export default useGetRandomWikiVals;
