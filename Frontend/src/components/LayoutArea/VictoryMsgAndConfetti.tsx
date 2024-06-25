import useGameContext from "@/Hooks/useGameContext";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { gameService } from "@/Services/GameService";
import { useEffect, useState } from "react";
import i18n from "@/i18n";

function VictoryMsgAndConfetti(): JSX.Element {
  const { session, setSession } = useGameContext();
  const { t } = useTranslation();
  const [width, height] = useWindowSize();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1500);

    return () => {
      setOpen(false);
    };
  }, []);
  return (
    <>
      <Dialog open={open}>
        <DialogContent className="w-full whitespace-pre dark:bg-slate-800/80 bg-[#F9F7DC]/90 border-transparent flex flex-col gap-12 items-center">
          <DialogHeader className="flex justify-center">
            <DialogTitle
              style={{ direction: i18n.language === "en-US" ? "ltr" : "rtl" }}
              className={`text-8xl font-bold text-center ${
                session.victory === "blue" ? "text-primary" : "text-secondary"
              }`}
            >
              {session.victory === "blue"
                ? t("victory.blue")
                : t("victory.red")}
            </DialogTitle>
          </DialogHeader>
          <div
            style={{ direction: i18n.language === "en-US" ? "ltr" : "rtl" }}
            className={`text-6xl font-semibold text-center ${
              session.victory === "blue" ? "text-secondary" : "text-primary"
            }`}
          >
            {session.blueScore === 9 || session.redScore === 8
              ? t("victory.cards")
              : t("victory.bomb")}
          </div>
          <DialogFooter className="flex flex-row justify-end">
            <Button
              className="text-4xl h-20 bg-destructive  w-full"
              onClick={() => gameService.handleAbortGame(session, setSession)}
            >
              {t("manageGame.abortBtn")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Confetti
        width={width}
        height={height}
        colors={
          session.victory === "blue"
            ? ["#00FFFF", "#89CFF0", "#0000FF", "#088F8F", "#CCCCFF"]
            : ["#EE4B2B", "#800020", "#C41E3A", "#DE3163", "#D2042D"]
        }
      />
    </>
  );
}

export default VictoryMsgAndConfetti;
