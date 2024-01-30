import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // externalize translation to json files.
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    // initialize i18next
    debug: false,
    fallbackLng: "he-IL",
    keySeparator: ".",
  });

export default i18n;
