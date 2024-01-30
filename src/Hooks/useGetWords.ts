import RandomWord from "@/Models/randomWord";
import { useQuery } from "react-query";
import axios from "axios";
import { appConfig } from "@/Utils/appConfig";

function useGetWords(isFamily: boolean = false) {
  const {
    data: randomWords,
    isLoading,
    isError,
    refetch, // in case there is a need to force useQuery to fetch new data entirely, rather than providing cached data.
  } = useQuery({
    queryKey: ["getRandomWords"],
    queryFn: fetchAndHandleData,
  });
  async function fetchData() {
    const res = await axios.get(appConfig.wordBankUrl);
    return res.data;
  }
  async function fetchAndHandleData() {
    const fetchedArr = await fetchData();

    if (isFamily) {
      // if isFamily is true, filter through and select only objects that have isFamily: true.
      return fetchedArr
        .filter((obj: RandomWord) => obj.isFamily)
        .sort(() => Math.random() - 0.5) // sort the array randomly.
        .slice(0, 50); // return only 50 objects. later they will be sliced to 2 arrays of length 25:
      // an initial array to map through, and a spare one for when a user chooses to replace a word.
    }
    return fetchedArr.sort(() => Math.random() - 0.5).slice(0, 50); // if isFamily is false, sort the array randomly,
  } // and return only 50 objects. later they will be sliced to 2 arrays of length 25:
  // an initial array to map through,
  // and a spare one for when a user chooses to replace a word.

  return { randomWords, isLoading, isError, refetch };
}

export default useGetWords;
