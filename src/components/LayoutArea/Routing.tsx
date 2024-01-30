import { Route, Routes } from "react-router-dom";
import InitGame from "../GameArea/InitGame";
import Wiki from "../GameArea/Decks/Wiki";
import Family from "../GameArea/Decks/Family";
import Adults from "../GameArea/Decks/Adults";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<InitGame />} />
      <Route path="/go-nuts" element={<Wiki />} />
      <Route path="/family" element={<Family />} />
      <Route path="/adults" element={<Adults />} />
    </Routes>
  );
}

export default Routing;
