"use client";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";
import { CloudAlert, RefreshCw, Home } from "lucide-react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { refresh } = useRouter();
  const { reset: resetQueries } = useQueryErrorResetBoundary();

  function handleRetry() {
    startTransition(() => {
      resetQueries();
      refresh();
      reset();
    });
  }

  return (
    <div className="container flex w-full flex-col items-center justify-center my-10 p-4 mx-auto">
      <Card className="w-full max-w-lg border-border/50 bg-background/60 shadow-2xl backdrop-blur-xl">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <div className=" mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 text-destructive shadow-inner">
            <CloudAlert className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold tracking-widest text-destructive uppercase">
            System Error
          </span>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl">
            Something Went Wrong!
          </h1>

          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            {error.message ||
              "An unexpected error has occurred while processing your request."}
          </p>

          <div className="mt-6 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Button
              nativeButton={false}
              render={<Link href="/" />}
              variant="outline"
              className="w-full gap-2 sm:w-auto"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>

            <Button onClick={handleRetry} className="w-full gap-2 sm:w-auto">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
