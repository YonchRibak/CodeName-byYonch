import useGetWords from "@/Hooks/useGetWords";
import "../GameArea.css";
import Loading from "@/components/SharedArea/Interact/Loading";
import CardsContainer from "../CardsContainer";

function Adults(): JSX.Element {
  const { randomWords, isError, isLoading } = useGetWords(false);

  if (isLoading) return <Loading />; // display loading component.
  if (isError) return <div>Error!!</div>; // display error component.NOTE TO SELF: create error component.

  return (
    <CardsContainer
      cardsType={"RandomWord"}
      randomWords={randomWords}
      isCaptain={false}
    />
  );
}

export default Adults;
