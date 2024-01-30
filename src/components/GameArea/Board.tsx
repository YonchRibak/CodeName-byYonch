import useGetRandomWikiVals from "@/Hooks/useGetRandomWikiVals";
import { useTranslation } from "react-i18next";
import GameCard from "./GameCard";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { useEffect, useMemo, useState } from "react";
import useGetWords from "@/Hooks/useGetWords";
import { useParams } from "react-router-dom";
import { teams } from "../../../public/db/teams";
import RandomWord from "@/Models/randomWord";
import WikiObj from "@/Models/WikiObj";
import { setNewItemInArrAtIndex } from "@/Utils/setNewItemInArrAtIndex";
import i18n from "@/i18n";
import useStoreWikiData from "@/Hooks/useStoreWikiData";

function Board(): JSX.Element {
  const [words, setWords] = useState<RandomWord[]>(); // a state for 25 words to use on first render
  const [spareWords, setSpareWords] = useState<RandomWord[]>(); // a state for 25 words to use for spare if user changes a word
  const [familyWords, setFamilyWords] = useState<RandomWord[]>(); // a state for 25 family words to use on first render
  const [spareFamilyWords, setSpareFamilyWords] = useState<RandomWord[]>(); // a state for 25 family words to use for spare if user changes a word
  const [wikis, setWikis] = useState<WikiObj[]>(); // a state for 25 wiki words to use on first render
  const [spareWikis, setSpareWikis] = useState<WikiObj[]>(); // a state for 25 wiki words to use for spare if user changes a word

  const [popoverStates, setPopoverStates] = useState([
    // this is an array of 25 booleans set to false, to handle PopOver's "open" state
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [currIndexForReplacement, setCurrIndexForReplacement] = useState(0); // the index by which to chose a word from spare words array

  const params = useParams();
  const randomizedTeams = useMemo(() => {
    return teams.sort(() => Math.random() - 0.5); // randomize teams for the game.
  }, []);

  if (params.deck === "go-nuts") {
    // if user selected "Go Nuts" feature, which sets the board with 25 random WikiPedia values.
    const { t } = useTranslation();
    useEffect(() => {
      if (
        localStorage.getItem(`${i18n.language}-initWikis`) ||
        localStorage.getItem(`${i18n.language}-spareWikis`)
      ) {
        setWikis(
          JSON.parse(localStorage.getItem(`${i18n.language}-initWikis`))
        );
        setSpareWikis(
          JSON.parse(localStorage.getItem(`${i18n.language}-spareWikis`))
        );
      }
    }, []);
    const {
      // fetch 600 random wiki values (25 for initial setting, 575 for spare), in the language currently selected by user.
      wikisArr: randomWikiArr,
      isError: wikiIsError,
      isLoading: wikiIsLoading,
    } = useGetRandomWikiVals(t("configurations.wikiLangName"), 30);

    randomWikiArr.length > 0 && useStoreWikiData(randomWikiArr);

    if (wikiIsLoading) {
      return <div>Loading...</div>; // display loading component.NOTE TO SELF: create loading component.
    }
    if (wikiIsError) {
      return <div>Error</div>; // display error component.NOTE TO SELF: create error component.
    }

    function handleFreshWikis() {
      setWikis(spareWikis.slice(-25));
      setSpareWikis(spareWikis.slice(0, -25));
    }
    function handleMouseEnter(index: number) {
      //this handles the hovering (mouse-enter) over a wiki value, and sets specified popOverState to true.
      setPopoverStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = true;
        return newStates;
      });
    }

    function handleMouseLeave(index: number) {
      //this handles the hovering (mouse-leave) over a wiki value, and sets specified popOverState back to false.
      setPopoverStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index] = false;
        return newStates;
      });
    }

    return (
      <div className="grid grid-cols-5 grid-rows-6 gap-8">
        {wikis?.length &&
          wikis.map((randomWiki, index) => (
            <div key={wikis[index].pageid}>
              <Popover
                open={popoverStates[index]}
                onOpenChange={(isOpen) => {
                  isOpen ? handleMouseEnter(index) : handleMouseLeave(index);
                }}
              >
                <PopoverTrigger
                  onMouseEnter={() => {
                    handleMouseEnter(index);
                  }}
                  onMouseLeave={() => {
                    handleMouseLeave(index);
                  }}
                >
                  <GameCard
                    wordType="WikiObj"
                    isFamily={false}
                    team={randomizedTeams[index]}
                    word={wikis[index]}
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
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    {wikis[index].extract // not all wiki values come with an extract, so if not provided display template message.
                      ? wikis[index].extract
                      : `${t("board.cards.hoverStatement")}`}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}
      </div>
    );
  } else if (params.deck === "adults") {
    // if user selected "adults" card deck, which sets the board with 25 random words not suitable for children (too difficult, not inappropriate).
    const {
      randomWords,
      isError: adultsIsError,
      isLoading: adultsIsLoading,
    } = useGetWords(false);

    useEffect(() => {
      if (randomWords?.length) {
        setWords(randomWords.slice(0, 25)); // set 25 words for initial setting of the game.
        setSpareWords(randomWords.slice(25)); // set other 25 words for spare, in case user opts to replace some of the words.
      }
    }, [randomWords]);

    if (adultsIsLoading) {
      return <div>Loading...</div>; // display loading component.NOTE TO SELF: create loading component.
    } else if (adultsIsError) {
      return <div>Error!!</div>; // display error component.NOTE TO SELF: create error component.
    }

    return (
      <div className="grid grid-cols-5 grid-rows-6 gap-8">
        {words?.length &&
          words.map((adultWord, index) => (
            <GameCard
              wordType="RandomWord"
              isFamily={false}
              team={randomizedTeams[index]}
              key={words[index].id}
              word={words[index]}
              onReplaceBtnClick={() => {
                setNewItemInArrAtIndex(
                  // visit function at 'Utils/' to learn about it's functionality.
                  setWords,
                  spareWords[currIndexForReplacement],
                  index
                );
                setCurrIndexForReplacement((prev) => prev + 1);
                // increase currIndexForReplacement so that next card change will bring a different word from spare words array.
              }}
            />
          ))}
      </div>
    );
  } else {
    // if user selected "family" card deck, which sets the board with 25 random words suitable for children.
    const {
      randomWords: randomFamilyWords,
      isError: familyIsError,
      isLoading: familyIsLoading,
    } = useGetWords(true);

    useEffect(() => {
      if (randomFamilyWords?.length) {
        setFamilyWords(randomFamilyWords.slice(0, 25)); // set 25 words for initial setting of the game.
        setSpareFamilyWords(randomFamilyWords.slice(25)); // set other 25 words for spare, in case user opts to replace some of the words.
      }
    }, [randomFamilyWords]);

    if (familyIsLoading) return <div>Loading...</div>; // display loading component.NOTE TO SELF: create loading component.
    if (familyIsError) return <div>Error</div>; // display error component.NOTE TO SELF: create error component.

    return (
      <div className="grid grid-cols-5 grid-rows-6 gap-8">
        {familyWords?.length &&
          familyWords.map((familyWord, index) => (
            <GameCard
              wordType="RandomWord"
              isFamily
              team={randomizedTeams[index]}
              key={familyWords[index].id}
              word={familyWords[index]}
              onReplaceBtnClick={() => {
                setNewItemInArrAtIndex(
                  // visit function at 'Utils/' to learn about it's functionality.
                  setFamilyWords,
                  spareFamilyWords[currIndexForReplacement],
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
}
export default Board;
