import { ModeToggle } from "@/components/ui/mode-toggle";
import { LogoText } from "@/components/ui/logo";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/base/tooltip";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center border-t border-border h-16 mt-auto">
      <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-3 items-center text-xs ">
        <div className="flex justify-start items-center gap-2">
          <div className="w-0 h-0 md:w-11 md:h-11" />
          <LogoText className="text-muted-foreground" />
        </div>

        <p className="flex flex-col justify-center items-center gap-1 text-muted-foreground md:flex-row">
          <span>Made with </span>
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  href="/profile/alir3za-samadi"
                  className="text-foreground"
                />
              }
            >
              Alireza Samadi
            </TooltipTrigger>

            <TooltipContent side={"bottom"}>
              <p>Check Creator Github Profile</p>
            </TooltipContent>
          </Tooltip>
        </p>

        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
