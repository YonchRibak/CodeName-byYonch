import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function useGetRandomWikiPAGES() {
  const [count, setCount] = useState(1);
  const [endpoint, setEndpoint] = useState("");
  const [allData, setAllData] = useState([]);

  let url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exsentences=1&exintro&explaintext&generator=random&grnnamespace=0&grnlimit=20`;

  const { data, isLoading, isError, isStale, refetch } = useQuery({
    queryKey: ["getRandom", count],
    queryFn: async () => {
      const res = await axios.get(url + endpoint);
      return res;
    },
  });

  if (data?.data && count < pages) {
    console.log(count);
    setAllData((prev) => [...prev, data.data.query.pages]);
    setCount((prev) => prev + 1);
    setEndpoint(`&grncontinue||=${data.data.continue?.grncontinue}`);
    refetch();
  } else if (data?.data && count === pages) {
    console.log(allData);
    console.log(allData.map((obj) => Object.values(obj)).flat());

    console.log(data);
    console.log(count);
    console.log(endpoint);
  } else return;
}

export default useGetRandomWikiPAGES;
