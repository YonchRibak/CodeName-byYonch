import i18n from "@/i18n";
import { Toggle } from "../ui/toggle";

type LangTogglerProps = {
  className?: string;
};

function LangToggler(props: LangTogglerProps): JSX.Element {
  return (
    <Toggle
      className={props.className}
      onClick={() =>
        i18n.changeLanguage(i18n.language === "he-IL" ? "en-US" : "he-IL")
      }
    >
      {i18n.language === "he-IL" ? "עב" : "EN"}
    </Toggle>
  );
}

export default LangToggler;
