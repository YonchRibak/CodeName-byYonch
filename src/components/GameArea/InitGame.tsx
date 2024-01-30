import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

function InitGame(): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="">
      <Card onClick={() => navigate("/family")}>
        <CardContent>{t("initGame.family")}</CardContent>
      </Card>
      <Card onClick={() => navigate("/adults")}>
        <CardContent>{t("initGame.adults")}</CardContent>
      </Card>
      <Card onClick={() => navigate("/go-nuts")}>
        <CardContent>{t("initGame.goNuts")}</CardContent>
      </Card>
    </div>
  );
}

export default InitGame;
