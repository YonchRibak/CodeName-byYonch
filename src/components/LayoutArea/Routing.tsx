import { Route, Routes } from "react-router-dom";
import Wiki from "../GameArea/Decks/Wiki";
import Family from "../GameArea/Decks/Family";
import Adults from "../GameArea/Decks/Adults";
import StartScreen from "./StartScreen";
import CaptainScreen from "../CaptainsArea/CaptainScreen";
import CaptainLogin from "../CaptainsArea/CaptainLogin";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/go-nuts" element={<Wiki />} />
      <Route path="/family" element={<Family />} />
      <Route path="/adults" element={<Adults />} />
      <Route path="/captain" element={<CaptainLogin />} />
      <Route path="/captain/:gameId" element={<CaptainScreen />} />
    </Routes>
  );
}

export default Routing;
