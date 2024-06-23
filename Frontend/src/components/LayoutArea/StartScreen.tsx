import { useTranslation } from "react-i18next";
import logoSrc from "../../../public/codeNameIcon.png";
function StartScreen(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center ">
      <img src={logoSrc} className="w-[15vw] animate-pulse" />
      <h1 className="text-7xl font-semibold text-secondary my-12">
        {t("startScreen.header")}
      </h1>
      <p className="text-5xl text-primary">{t("startScreen.description")}</p>
    </div>
  );
}

export default StartScreen;
