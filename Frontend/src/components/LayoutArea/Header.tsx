import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import appIconSrc from "../../../public/codeNameIcon.png";
import { useTranslation } from "react-i18next";
import "./LayoutArea.css";
import ThemeToggler from "../SharedArea/ThemeToggler";
import LangToggler from "../SharedArea/LangToggler";
import useGameContext from "@/Hooks/useGameContext";

function Header(): JSX.Element {
  const { session } = useGameContext();
  const { t } = useTranslation();

  const routes = [
    {
      href: "/rules",
      label: `${t("header.routes.gameRules")}`,
    },
    {
      href: "/about",
      label: `${t("header.routes.about")}`,
    },
    {
      href: session.lastRoute,
      label: `${t("header.routes.home")}`,
    },
  ];

  return (
    <div className="sm:flex sm:justify-between py-3 px-4 border-b">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        <div className="grid grid-rows-1 grid-cols-4 w-[15%] items-center">
          <img src={appIconSrc} className="scale-[70%] " />
          <h1 className="text-4xl col-span-3 select-none">
            {t("header.title")}
          </h1>
        </div>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 md:block">
          {routes.map((route, i) => (
            <Button
              key={i}
              asChild
              size="lg"
              variant="ghost"
              className="hover:bg-primary active:bg-primary focus:bg-primary"
            >
              <Link to={route.href} className="!text-2xl select-none">
                {route.label}
              </Link>
            </Button>
          ))}
          <ThemeToggler className="mr-6 select-none hover:bg-secondary" />
          <LangToggler className="text-3xl select-none active:bg-primary" />
        </nav>
      </div>
    </div>
  );
}

export default Header;
