import useGameContext from "@/Hooks/useGameContext";
import { useParams } from "react-router-dom";
import CardsContainer from "../GameArea/CardsContainer";
import RandomWord from "@/Models/randomWord";
import WikiObj from "@/Models/WikiObj";
import useConnectCaptainToSocketRoom from "@/Hooks/useConnectCaptainToSocketRoom";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { useTranslation } from "react-i18next";
import Header from "../LayoutArea/Header";
import LangToggler from "../SharedArea/LangToggler";

function CaptainScreen(): JSX.Element {
  const { session, setSession } = useGameContext();
  const { t } = useTranslation();
  const landscape = useMediaQuery("(orientation: landscape)");
  const params = useParams();

  useConnectCaptainToSocketRoom(params, setSession);

  if (!landscape)
    return (
      <div className="flex flex-col overflow-hidden justify-center items-center gap-3 w-full h-full">
        <LangToggler className="w-1/4" />
        <div className="text-2xl font-semibold whitespace-pre-line">
          {t("captain.landscape")}
        </div>
      </div>
    );
  return (
    <CardsContainer
      randomWords={
        (session.cards[0] as WikiObj)?.pageid
          ? null
          : (session.cards as RandomWord[])
      }
      isCaptain
      cardsType={
        (session.cards[0] as WikiObj)?.pageid ? "WikiObj" : "RandomWord"
      }
    />
  );
}

export default CaptainScreen;
