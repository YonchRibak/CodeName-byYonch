import RandomWikiQuery from "@/Models/RandomWikiQuery";
import axios from "axios";
import { useQuery } from "react-query";

function useGetSingleRandomWikiVal(lang: string): RandomWikiQuery {
  const {
    data: randomWiki,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getSingleRandomWikiValue"],
    queryFn: async () => {
      const res = await axios.get(
        `https://${lang}.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exsentences=2&exintro=&explaintext=&generator=random&grnnamespace=0&grnlimit=1`
      );
      return res;
    },
  });

  return {
    data: randomWiki?.data?.query?.pages,
    isError,
    isLoading,
    refetch,
  };
}

export default useGetSingleRandomWikiVal;
