import { useParams } from "react-router-dom";
import Family from "./Family";
import Adults from "./Adults";
import Wiki from "./Wiki";
import Page404 from "@/components/SharedArea/Page404";

function DeckContainer(): JSX.Element {
  const params = useParams();

  switch (params.deck) {
    case "family":
      return <Family />;
    case "adults":
      return <Adults />;
    case "go-nuts":
      return <Wiki />;
    default:
      return <Page404 />;
  }
}

export default DeckContainer;
