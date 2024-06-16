import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import i18n from "@/i18n";
import { useState } from "react";
import WikiObj from "@/Models/WikiObj";

type InfoPopoverProps = {
  word: WikiObj;
};

function InfoPopover(props: InfoPopoverProps): JSX.Element {
  const [popoverState, setPopoverState] = useState(false);
  return (
    <Popover
      open={popoverState}
      onOpenChange={(isOpen) => setPopoverState(isOpen)}
    >
      <PopoverTrigger
        className={`max-w-min absolute sm:top-[-2px] sm:left-[-2px] sm:scale-50 md:scale-[60%] md:top-[1px] md:left-[1px] lg:scale-[150%] lg:top-3 lg:left-4 top-2 left-2 xl:top-4 xl:left-4 xl:scale-125`}
        onMouseEnter={() => setPopoverState(true)}
        onMouseLeave={() => setPopoverState(false)}
      >
        <Info />
      </PopoverTrigger>
      <PopoverContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
        className={i18n.language === "en-US" ? "ltr " : "rtl "}
      >
        <div className="text-xl md:text-3xl sm:text-sm">
          {props.word?.extract}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default InfoPopover;
