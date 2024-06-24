import useGetWords from "@/Hooks/useGetWords";
import "../GameArea.css";
import Loading from "@/components/SharedArea/Interact/Loading";
import CardsContainer from "../CardsContainer";
import Error from "@/components/SharedArea/Interact/Error";

function Family(): JSX.Element {
  const { randomWords, isError, isLoading } = useGetWords(true);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <CardsContainer
      cardsType={"RandomWord"}
      randomWords={randomWords}
      isCaptain={false}
      isFamily
    />
  );
}

export default Family;
