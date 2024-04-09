import useGetRandomWikiVals from "@/Hooks/useGetRandomWikiVals";
import i18n from "@/i18n";
import { useEffect } from "react";
import "../GameArea.css";
import useGameContext from "@/Hooks/useGameContext";
import Loading from "@/components/SharedArea/Interact/Loading";

import CardsContainer from "../CardsContainer";
import { useTranslation } from "react-i18next";
import WikiObj from "@/Models/WikiObj";

function Wiki(): JSX.Element {
  const { session, setSession } = useGameContext();

  const { t } = useTranslation();

  useEffect(() => {
    if (
      //  if there are already target items on local storage, set wikis' and spareWikis' states to them.
      localStorage.getItem(`${i18n.language}-initWikis`) ||
      localStorage.getItem(`${i18n.language}-spareWikis`)
    ) {
      setSession((prevSession) => ({
        ...prevSession,
      
        cards: JSON.parse(localStorage.getItem(`${i18n.language}-initWikis`)),
      }));
      setSession((prevSession) => ({
        ...prevSession,
      
        spareCards: JSON.parse(
          localStorage.getItem(`${i18n.language}-spareWikis`)
        ),
      }));
    }
  }, [i18n.language]);

  const { isLoading, isError } = useGetRandomWikiVals(
    t("configurations.wikiLangName"),
    30
  ); // retrieves random values from wikipedia in English, go to 'Hooks/' to learn more.

  if (isLoading) return <Loading />; // display loading component.
  if (isError) return <div>Error</div>; // display error component.NOTE TO SELF: create error component.
  if ((session.cards[0] as WikiObj)?.pageid)
    return <CardsContainer cardsType="WikiObj" isCaptain={false} />;
}

export default Wiki;
