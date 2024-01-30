import RandomWord from "@/Models/randomWord";
import { appConfig } from "@/Utils/appConfig";
import axios from "axios";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

function useGetSingleRandomWord(
  isFamily: boolean = false // determines whether results will be filtered to fit a family game. default is false.
  //   currSet: RandomWord[] = [],
  //   instance: number = 0
) {
  const [sortedArray, setSortedArray] = useState<RandomWord[]>();
  const [currIndex, setCurrIndex] = useState(0);

  const {
    data: newRandomWords,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getRandomWords"],
    queryFn: fetchData,
    // enabled: instance > currIndex && currSet.length > 1,
  });

  async function fetchData() {
    console.log("fetch data for singleRandWord ran");
    const res = await axios.get(appConfig.wordBankUrl);
    return res.data;
  }
  //   function selectNewUniqueRandomWord(fetchedArr: RandomWord[]): RandomWord {
  //     if (!sortedArray) {
  //       setSortedArray([...fetchedArr].sort(() => Math.random() - 0.5)); //randomly sort the array only once.
  //     }

  //     if (isFamily)
  //       return fetchedArr.filter((obj: RandomWord) => obj.isFamily)[
  //         getRandomNum(0, fetchedArr.length - 1)
  //       ];
  //     const newRandomWord = sortedArray[currIndex];
  //     setCurrIndex((prevIndex) => prevIndex + 1);
  //     if (!currSet.includes(newRandomWord)) {
  //       console.log(newRandomWord);
  //       return newRandomWord;
  //     }
  //     return selectNewUniqueRandomWord(sortedArray);
  //   }

  const changeMyName = useMemo(() => {
    if (newRandomWords?.length > 0) {
      if (!sortedArray) {
        setSortedArray([...newRandomWords].sort(() => Math.random() - 0.5)); //randomly sort the array only once.
      }

      if (isFamily) {
        return;
        // fetchedArr.filter((obj: RandomWord) => obj.isFamily)[
        //     getRandomNum(0, fetchedArr.length - 1)];
      }
      const memoizedVal = checkIfValUnique();

      function checkIfValUnique() {
        const newRandomWord = sortedArray[currIndex];
        setCurrIndex((prevIndex) => prevIndex + 1);
        if (!currSet.includes(newRandomWord)) {
          console.log(newRandomWord);
          return newRandomWord;
        } else {
          setCurrIndex((prev) => prev + 1);
          checkIfValUnique();
        }
      }

      return memoizedVal;
    } else {
      return {
        id: 10000,
        English: "MADEUP",
        Hebrew: "MADEUP",
        isFamily: false,
      };
    }
  }, []);
  return { changeMyName, isLoading, isError, refetch };
}

export default useGetSingleRandomWord;
