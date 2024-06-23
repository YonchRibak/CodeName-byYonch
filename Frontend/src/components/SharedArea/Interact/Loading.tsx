import { useTranslation } from "react-i18next";
import loadingCardsGifSrc from "../../../assets/cards-loading.gif";

type LoadingProps = {
  isWikiLoading?: boolean;
};

function Loading({ isWikiLoading = false }: LoadingProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {isWikiLoading && (
        <p className="text-4xl text-primary text-center font-semibold whitespace-pre-wrap">
          {t("loading.wikisTakeLong")}
        </p>
      )}
      <div>
        <img src={loadingCardsGifSrc} alt="" />
      </div>
    </div>
  );
}

export default Loading;
