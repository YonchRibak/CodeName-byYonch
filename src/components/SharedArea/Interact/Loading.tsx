import loadingCardsGifSrc from "../../../assets/cards-loading.gif";

function Loading(): JSX.Element {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div>
        <img src={loadingCardsGifSrc} alt="" />
      </div>
    </div>
  );
}

export default Loading;
