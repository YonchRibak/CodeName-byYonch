import { useTranslation } from "react-i18next";
import englishCaptainsViewImgSrc from "../../assets/images/captainViewEnglish.png";
import hebrewCaptainsViewImgSrc from "../../assets/images/captainViewHebrew.png";
import i18n from "@/i18n";
import "../GameArea/GameArea.css";

function RulesContainer(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div
      className={`scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full  scrollbar-thumb-primary scrollbar-track-transparent container flex flex-col gap-12 whitespace-pre-line text-justify ${
        i18n.language === "en-US" ? "ltr" : "rtl"
      } mx-auto px-4 py-8 overflow-y-scroll overflow-x-clip pe-48 font-normal`}
    >
      <h1 className="text-7xl font-bold mb-4 text-secondary">
        {t("gameRules.title")}
      </h1>
      <div className="mb-8 flex flex-col items-start gap-5">
        <h3 className="text-5xl font-semibold mb-8 text-primary">
          {t("gameRules.concept.title")}
        </h3>
        <p className="text-3xl ms-8">{t("gameRules.concept.content")}</p>
      </div>
      <div className="mb-8 flex flex-col items-start gap-5">
        <h3 className="text-5xl font-semibold mb-8 text-primary">
          {t("gameRules.beginningTheGame.title")}
        </h3>
        <p className="text-3xl ms-8">
          {t("gameRules.beginningTheGame.firstInstructions")}
        </p>
        <p className="text-3xl ms-8">
          {t("gameRules.beginningTheGame.selectDeck")}
        </p>
        <p className="text-3xl ms-8">
          {t("gameRules.beginningTheGame.customizeDeck")}
        </p>
        <p className="text-3xl ms-8">
          {t("gameRules.beginningTheGame.startGame")}
        </p>
        <p className="text-3xl ms-8">
          {t("gameRules.beginningTheGame.captainsLogin")}
        </p>
        <p className="text-3xl ms-8">
          {t("gameRules.beginningTheGame.gameBegins")}
        </p>
      </div>
      <div className="mb-8 flex flex-col items-start gap-5">
        <h3 className="text-5xl font-semibold mb-8 text-primary">
          {t("gameRules.captainsRole.title")}
        </h3>
        <p className="text-3xl ms-8">
          {t("gameRules.captainsRole.captainsView.explanation")}
        </p>
        <div className="w-full flex ms-12">
          <img
            src={
              i18n.language === "en-US"
                ? englishCaptainsViewImgSrc
                : hebrewCaptainsViewImgSrc
            }
            className="w-1/2 my-5"
            alt="Captains View"
          />
        </div>
        <p className="text-3xl ms-8">
          {t("gameRules.captainsRole.captainsView.teamAscription")}
        </p>
        <p className="text-3xl ms-8">
          {t("gameRules.captainsRole.captainsView.bomb")}
        </p>
      </div>
      <div className="mb-8 flex flex-col items-start gap-5">
        <p className="text-3xl ms-8">{t("gameRules.captainsRole.goal")}</p>
        <p className="text-3xl ms-8">{t("gameRules.captainsRole.turn")}</p>
        <p className="text-3xl ms-8">{t("gameRules.captainsRole.example")}</p>
        <p className="text-3xl ms-8">{t("gameRules.captainsRole.number")}</p>
      </div>
      <div className="mb-8 flex flex-col items-start gap-5">
        <h3 className="text-5xl font-semibold mb-8 text-primary">
          {t("gameRules.captainsRole.restrictions.title")}
        </h3>
        <ul className="list-disc pl-4 ms-24 space-y-5">
          <li className="text-3xl">
            {t("gameRules.captainsRole.restrictions.oneWord")}
          </li>
          <li className="text-3xl">
            {t("gameRules.captainsRole.restrictions.inflections")}
          </li>
          <li className="text-3xl">
            {t("gameRules.captainsRole.restrictions.contained")}
          </li>
          <li className="text-3xl">
            {t("gameRules.captainsRole.restrictions.indexReferencing")}
          </li>
          <li className="text-3xl">
            {t("gameRules.captainsRole.restrictions.spelling")}
          </li>
          <li className="text-3xl">
            {t("gameRules.captainsRole.restrictions.language")}
          </li>
          <li className="text-3xl">
            {t("gameRules.captainsRole.restrictions.leadingGestures")}
          </li>
          <li className="text-3xl">
            {t("gameRules.captainsRole.restrictions.pokerFace")}
          </li>
        </ul>
      </div>
      <div className="mb-8 flex flex-col items-start gap-5">
        <p className="text-3xl ms-8">{t("gameRules.captainsRole.violation")}</p>
        <p className="text-3xl ms-8">
          {t("gameRules.captainsRole.otherTeamCard")}
        </p>
        <p className="text-3xl ms-8">
          {t("gameRules.captainsRole.whenBombIsSelected")}
        </p>
      </div>
    </div>
  );
}

export default RulesContainer;
