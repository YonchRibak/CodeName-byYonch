import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

type InfoPopoverProps = {
  text: string;
  textAlign: string;
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
        className={props.textAlign}
      >
        <div className="text-xl md:text-3xl sm:text-sm">{props.text}</div>
      </PopoverContent>
    </Popover>
  );
}

export default InfoPopover;
