import i18n from "@/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function useSetTitle(): void {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = `${t("configurations.docTitle")}`;
  }, [i18n.language]);
}
export default useSetTitle;
