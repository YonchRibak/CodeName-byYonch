import useGameContext from "@/Hooks/useGameContext";
import { useTranslation } from "react-i18next";

function Score(): JSX.Element {
  const { session } = useGameContext();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <span>{t("manageGame.blueScore") + session.blueScore}</span>
      <span>{t("manageGame.redScore") + session.redScore}</span>
    </div>
  );
}

export default Score;
