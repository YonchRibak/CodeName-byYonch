import { useTranslation } from "react-i18next";
import iconSrc from "../../../public/codeNameIcon.png";
import { Input } from "../ui/input";
import ThemeToggler from "../SharedArea/ThemeToggler";
import LangToggler from "../SharedArea/LangToggler";
import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function CaptainLogin(): JSX.Element {
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="h-full flex flex-col grid-col-1 col-span-2 landscape:relative items-center portrait:justify-start landscape:justify-center overflow-hidden">
      <div className="landscape:absolute landscape:top-2 landscape:right-2">
        <ThemeToggler className="" />
        <LangToggler className="text-3xl" />
      </div>
      <div className="landscape:absolute landscape:-top-[205px] landscape:-left-[200px]">
        <img
          src={iconSrc}
          className="scale-50 landscape:scale-[15%] portrait:mt-16"
        />
      </div>

      <div className="row-start-2 flex flex-col items-center gap-3">
        <h1 className="text-4xl landscape:text-3xl">
          {t("captain.loginScreen.enterCode")}
        </h1>
        <Input
          onChange={(e) => setGameCode(e.target.value)}
          type="text"
          className=" dark:border-orange-300 w-[75%]"
        />
        <Button onClick={() => navigate("/captain/" + gameCode)}>
          {t("captain.loginScreen.enterGame")}
        </Button>
      </div>
    </div>
  );
}

export default CaptainLogin;
