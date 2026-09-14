"use client";

import Link from "next/link";
import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";
import { UserX, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex min-h w-full flex-col items-center justify-center my-10 p-4 mx-auto">
      <Card className="w-full max-w-lg border-border/50 bg-background/60 shadow-2xl backdrop-blur-xl">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <UserX className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold tracking-widest uppercase">
            Error 404
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            User Not Found
          </h1>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            The requested username is not available on GitHub or has been
            changed.
          </p>

          <div className="mt-6 flex w-full justify-center">
            <Button
              nativeButton={false}
              render={<Link href="/" />}
              className="w-full gap-2 sm:w-auto"
            >
              <Search className="h-4 w-4" />
              Search Another Username
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
