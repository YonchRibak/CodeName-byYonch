import useGameContext from "@/Hooks/useGameContext";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";

function CaptainsData(): JSX.Element {
  const { session } = useGameContext();
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col h-full justify-evenly items-center ${
        i18n.language === "en-US" ? "ltr" : "rtl"
      }`}
    >
      <div className="text-3xl whitespace-pre-line">
        {t("captainsData.instructions")}
      </div>
      <div className={`text-4xl font-bold`}>
        {t("captainsData.sessionCode")} {session.sessionId}
      </div>
      <div className="bg-white p-5 grid place-items-center w-fit">
        <QRCode value={`http://localhost:5173/captain/${session.sessionId}`} />
      </div>
    </div>
  );
}

export default CaptainsData;
