import useGetRandomWikiVals from "@/Hooks/useGetRandomWikiVals";
import i18n from "@/i18n";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import GameCard from "../GameCard";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import WikiObj from "@/Models/WikiObj";
import { teams } from "../../../../public/db/teams";
import "../GameArea.css";

function Wiki(): JSX.Element {
  const [wikis, setWikis] = useState<WikiObj[]>(); // a state for 25 wiki words to use on first render
  const [spareWikis, setSpareWikis] = useState<WikiObj[]>(); // a state for 25 wiki words to use for spare if user changes a word
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const randomizedTeams = useMemo(() => {
    return teams.sort(() => Math.random() - 0.5); // randomize teams for the game.
  }, []);
  const { t } = useTranslation();

  useEffect(() => {
    if (
      //  if there are already target items on local storage, set wikis' and spareWikis' states to them.
      localStorage.getItem(`${i18n.language}-initWikis`) ||
      localStorage.getItem(`${i18n.language}-spareWikis`)
    ) {
      setWikis(JSON.parse(localStorage.getItem(`${i18n.language}-initWikis`)));
      setSpareWikis(
        JSON.parse(localStorage.getItem(`${i18n.language}-spareWikis`))
      );
    }
  }, []);

  const doneFetch = useGetRandomWikiVals(t("configurations.wikiLangName"), 30); // retrieves random values from wikipedia, go to 'Hooks/' to learn more.

  useEffect(() => {
    if (doneFetch) {
      setWikis(JSON.parse(localStorage.getItem(`${i18n.language}-initWikis`)));
      setSpareWikis(
        JSON.parse(localStorage.getItem(`${i18n.language}-spareWikis`))
      );
    }
  }, [doneFetch]);

  //   function handleFreshWikis() {
  //     setWikis(spareWikis.slice(-25));
  //     setSpareWikis((prev) => prev.slice(0, -25));
  //   }

  if (!doneFetch && !wikis?.length) {
    return <div>Loading...</div>; // display loading component.NOTE TO SELF: create loading component.
  }

  return (
    <div className="cards-container">
      {wikis?.length &&
        wikis.map((_, index) => (
          <GameCard
            key={wikis[index].pageid}
            wordType="WikiObj"
            isFamily={false}
            team={randomizedTeams[index]}
            word={wikis[index]}
            wordHasBeenReplaced={currIndexForReplacement}
            onReplaceBtnClick={() => {
              setNewItemInArrAtIndex(
                // visit function at 'Utils/' to learn about it's functionality.
                setWikis,
                spareWikis[currIndexForReplacement],
                index
              );
              setCurrIndexForReplacement((prev) => prev + 1);
              // increase currIndexForReplacement so that next card change will bring a different word from spare words array.
            }}
          />
        ))}
    </div>
  );
}

export default Wiki;
