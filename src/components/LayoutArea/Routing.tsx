import { Route, Routes } from "react-router-dom";
import Wiki from "../GameArea/Decks/Wiki";
import Family from "../GameArea/Decks/Family";
import Adults from "../GameArea/Decks/Adults";
import StartScreen from "./StartScreen";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<StartScreen />} />
      <Route path="/go-nuts" element={<Wiki />} />
      <Route path="/family" element={<Family />} />
      <Route path="/adults" element={<Adults />} />
    </Routes>
  );
}

export default Routing;
