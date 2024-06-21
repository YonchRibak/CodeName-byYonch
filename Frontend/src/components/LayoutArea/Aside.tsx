import useGameContext from "@/Hooks/useGameContext";
import InitGame from "../GameArea/InitGame";
import "./LayoutArea.css";
import ManageGame from "../GameArea/ManageGame";

function Aside(): JSX.Element {
  const { session } = useGameContext();

  if (!session.gameStarted) {
    return <InitGame />;
  } else {
    return (
      <>
        <ManageGame />
      </>
    );
  }
}

export default Aside;
