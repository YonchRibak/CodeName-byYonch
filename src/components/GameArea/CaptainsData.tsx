import useGameContext from "@/Hooks/useGameContext";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

function CaptainsData(): JSX.Element {
  const { session } = useGameContext();
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col h-full justify-evenly ${
        i18n.language === "en-US" ? "ltr" : "rtl"
      }`}
    >
      <div className="text-3xl whitespace-pre-line">
        {t("captainsData.instructions")}
      </div>
      <div className={`text-4xl font-bold`}>
        {t("captainsData.sessionCode")} {session.sessionId}
      </div>
    </div>
  );
}

export default CaptainsData;
