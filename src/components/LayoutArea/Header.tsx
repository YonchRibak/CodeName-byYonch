import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Toggle } from "../ui/toggle";

function Header(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const routes = [
    {
      href: "/",
      label: `${t("header.routes.gameRules")}`,
    },
    {
      href: "/",
      label: `${t("header.routes.about")}`,
    },
    {
      href: "/",
      label: `${t("header.routes.settings")}`,
    },
  ];

  return (
    <div className="Header sm:flex sm:justify-between py-3 px-4 border-b">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        <div className="flex items-center">
          <Link to="/" className="ml-4 lg:ml-0">
            <h1 className="text-xl font-bold">{t("header.title")}</h1>
          </Link>
        </div>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
          {routes.map((route, i) => (
            <Button key={i} asChild variant="ghost">
              <Link
                to={route.href}
                className="text-sm font-medium transition-colors"
              >
                {route.label}
              </Link>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="mr-6"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
          <Toggle
            onClick={() =>
              i18n.changeLanguage(i18n.language === "he-IL" ? "en-US" : "he-IL")
            }
          >
            {i18n.language === "he-IL" ? "עב" : "EN"}
          </Toggle>
        </nav>
      </div>
    </div>
  );
}

export default Header;
