import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

function InitGame(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 ">
      <Card onClick={() => navigate("/family")}>
        <CardContent className="flex justify-center items-center h-full p-2">
          {t("initGame.family")}
        </CardContent>
      </Card>
      <Card onClick={() => navigate("/adults")}>
        <CardContent className="flex justify-center items-center h-full p-2">
          {t("initGame.adults")}
        </CardContent>
      </Card>
      <Card onClick={() => navigate("/go-nuts")}>
        <CardContent className="flex justify-center items-center h-full p-2">
          {t("initGame.goNuts")}
        </CardContent>
      </Card>
    </div>
  );
}

export default InitGame;
