import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Footer() {
  return (
    <footer className="border-t border-border py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 items-center text-xs text-muted-foreground">
        <div />

        <p className="text-center">Made by Alir3za Samadi</p>

        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
