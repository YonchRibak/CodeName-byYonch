import i18n from "@/i18n";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQueries } from "react-query";
import useStoreWikiData from "./useStoreWikiData";

function useGetRandomWikiVals(lang: string, pages: number) {
  const [allData, setAllData] = useState([]); // state to regroup all data to.
  const [isEngStored, setIsEngStored] = useState(true); // boolean to indicate whether there are already items in local storage (rendering the fetch unnecessary)
  const [isHebStored, setIsHebStored] = useState(true); // boolean to indicate whether there are already items in local storage (rendering the fetch unnecessary)
  const [doneFetch, setDoneFetch] = useState(false); //boolean to indicate whether fetching finished. useQueries's features failed at production.

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
  }, []);

  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exsentences=1&exintro&explaintext&generator=random&grnnamespace=0&grnlimit=20`;

  const results = useQueries(
    Array.from({ length: pages }, (_, i) => i).map((index) => {
      return {
        queryKey: [`getRandomWikis-${index}-${lang}`],
        queryFn: async () => {
          const res = await axios.get(url);
          return res;
        },
        enabled: i18n.language === "en-US" ? !isEngStored : !isHebStored, // only if isStored is falsy (meaning: no items in storage), run the query.
      };
    })
  );

  useEffect(() => {
    if (results[pages - 1].data?.data) {
      // if last query resolved,
      const allWikis = results.reduce((acc, result) => {
        // rejoin all pages
        return [...acc, ...Object.values(result.data?.data?.query.pages)];
      }, []);

      setAllData(allWikis);
      setDoneFetch(true);
    }
  }, [results[pages - 1].data?.data]);

  useStoreWikiData(allData, lang === "en" ? "en-US" : "he-IL"); // store in local storage.

  return doneFetch; // returns a boolean indicting fetching is in progress (false) or has finished (true)
}

export default useGetRandomWikiVals;
