import { useTranslation } from "react-i18next";
import loadingCardsGifSrc from "../../../assets/cards-loading.gif";
import i18n from "@/i18n";

function Error(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p
        style={{ direction: i18n.language === "he-IL" ? "rtl" : "ltr" }}
        className="text-4xl text-primary text-center font-semibold whitespace-pre-wrap"
      >
        {t("error.message1")}
        <a
          className="text-pink-400"
          href="https://mail.google.com/mail/?view=cm&to=yonch.baalil@gmail.com"
          target="_blank"
        >
          {t("error.clickHere")}
        </a>
        {t("error.message2")}
      </p>

      <div>
        <img src={loadingCardsGifSrc} alt="" />
      </div>
    </div>
  );
}

export default Error;
