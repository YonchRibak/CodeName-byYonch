import { Route, Routes } from "react-router-dom";
import CaptainScreen from "../CaptainsArea/CaptainScreen";
import DeckContainer from "../GameArea/Decks/DeckContainer";
import RulesContainer from "../RulesArea/RulesContainer";
import StartScreen from "./StartScreen";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/rules" element={<RulesContainer />} />
      <Route path="/:deck" element={<DeckContainer />} />
      <Route path="/captain/:gameId" element={<CaptainScreen />} />
    </Routes>
  );
}

export default Routing;
