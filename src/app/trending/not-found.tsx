"use client";

import Link from "next/link";
import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";
import { BookType, ArrowLeft, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { VALID_LANGUAGES } from "@/queries/common/constants";

export default function NotFound() {
  const searchParams = useSearchParams();
  const language = searchParams.get("lang");

  return (
    <div className="container flex min-h w-full flex-col items-center justify-center my-10 p-4 mx-auto">
      <Card className="w-full max-w-lg border-border/50 bg-background/60 shadow-2xl backdrop-blur-xl">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <BookType className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold tracking-widest uppercase">
            Error 404
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Language Not Found
          </h1>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {`Invalid language '${language}'. Allowed values: ${VALID_LANGUAGES}`}
          </p>

          <div className="mt-6 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Button
              nativeButton={false}
              render={<a href="/trending" />}
              className="w-full gap-2 sm:w-auto"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to Trending Page
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/" />}
              className="w-full gap-2 sm:w-auto"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
