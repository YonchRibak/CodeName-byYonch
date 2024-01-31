import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useGameContext from "@/Hooks/useGameContext";

function InitGame(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setGameStarted } = useGameContext();

  const decks = [
    { id: 1, text: t("initGame.family"), href: "/family" },
    { id: 2, text: t("initGame.adults"), href: "/adults" },
    { id: 3, text: t("initGame.goNuts"), href: "/go-nuts" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-8 h-full">
        <h1 className="text-4xl">{t("initGame.title")}</h1>
        {decks.map((deck) => (
          <Card
            key={deck.id}
            className="h-24 cursor-pointer"
            onClick={() => navigate(deck.href)}
          >
            <CardContent className="flex justify-center items-center h-full p-2 text-4xl">
              {deck.text}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        onClick={() => setGameStarted(true)}
        className="text-4xl h-40 bg-pink-500 mb-56"
      >
        {t("initGame.startGameBtn")}
      </Button>
    </div>
  );
}

export default InitGame;
