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
      <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-3 items-center">
        <div className="flex justify-center md:justify-start">
          <LogoText className="text-muted-foreground" />
        </div>

        <div className="flex flex-col items-center gap-1 text-[11px] text-muted-foreground mx-auto md:flex-row">
          Made By
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
              <p>Click to check profile</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex justify-center md:justify-end">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
