import useGetWords from "@/Hooks/useGetWords";
import "../GameArea.css";
import Loading from "@/components/SharedArea/Interact/Loading";
import CardsContainer from "../CardsContainer";
import Error from "@/components/SharedArea/Interact/Error";

function Adults(): JSX.Element {
  const { randomWords, isError, isLoading } = useGetWords(false);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <CardsContainer
      cardsType={"RandomWord"}
      randomWords={randomWords}
      isCaptain={false}
    />
  );
}

export default Adults;
