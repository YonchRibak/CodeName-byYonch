import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { t } from "i18next";
import { useState } from "react";

function GoNutsInfoPopover(): JSX.Element {
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
        className="text-center"
      >
        <div className="text-xl md:text-3xl sm:text-sm">
          {t("initGame.goNutsPopover")}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default GoNutsInfoPopover;
