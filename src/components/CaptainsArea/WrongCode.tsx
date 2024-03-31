import useGameContext from "@/Hooks/useGameContext";

function WrongCode(): JSX.Element {
  const { session, setSession } = useGameContext();
  console.log(session);
  return <div className="">WRONG GAME CODE</div>;
}

export default WrongCode;
