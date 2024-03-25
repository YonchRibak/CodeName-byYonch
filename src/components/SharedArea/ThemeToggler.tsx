import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../theme-provider";

type ThemeTogglerProps = {
  className?: string;
};

function ThemeToggler(props: ThemeTogglerProps): JSX.Element {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle Theme"
      className={props.className}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}

export default ThemeToggler;
