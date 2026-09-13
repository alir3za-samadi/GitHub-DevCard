"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container flex min-h w-full flex-col items-center justify-center my-10 p-4 mx-auto">
      <Card className="w-full max-w-lg border-border/50 bg-background/60 shadow-2xl backdrop-blur-xl">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <FileQuestion className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold tracking-widest uppercase">
            Error 404
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            The profile, repository, or page you are looking for doesn't exist,
            has been removed, or the username entered is invalid.
          </p>

          <div className="mt-6 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full gap-2 sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
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
