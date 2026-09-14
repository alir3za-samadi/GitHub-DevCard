import { ModeToggle } from "@/components/ui/mode-toggle";
import { LogoText } from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="flex justify-center border-t border-border h-16 mt-auto">
      <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-3 items-center text-xs ">
        <div className="flex justify-start items-center gap-2">
          <div className="w-11 h-11" />
          <LogoText className="text-muted-foreground" />
        </div>

        <p className="text-center text-muted-foreground">
          Made by Alir3za Samadi
        </p>

        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
