"use client";

import { useState } from "react";
import { LogoText } from "@/components/ui/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/base/sheet";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  function handleCLick() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open Menu" render={<button />}>
        <Menu className="w-5 h-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-62.5 sm:w-75">
        <SheetHeader>
          <SheetTitle
            onClick={handleCLick}
            className="flex items-center gap-2 text-left"
          >
            <LogoText />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleCLick}
                className="flex items-center gap-3 border-b border-border/40 py-4 pl-4 text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
