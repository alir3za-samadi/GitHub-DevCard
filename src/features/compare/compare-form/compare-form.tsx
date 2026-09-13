"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/base/input";
import { Button } from "@/components/base/button";
import { Field } from "@/components/base/field";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/base/tooltip";
import { Swords } from "lucide-react";

import { type SubmitEvent } from "react";
import Link from "next/link";

const PRESET_COMPARE_USERS = [
  "torvalds vs gaearon",
  "gaearon vs sindresorhus",
] as const;

export default function CompareForm({
  usernameA,
  usernameB,
  errorA,
  errorB,
}: {
  usernameA: string;
  usernameB: string;
  errorA?: string | null;
  errorB?: string | null;
}) {
  const router = useRouter();

  function handleCompare(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputA = formData.get("inputA")?.toString().trim() || "";
    const inputB = formData.get("inputB")?.toString().trim() || "";

    if (!inputA || !inputB) return;

    const query = `?usernameA=${encodeURIComponent(inputA)}&usernameB=${encodeURIComponent(inputB)}`;
    router.push(query);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        key={`${usernameA}-${usernameB}`}
        onSubmit={handleCompare}
        className="flex flex-col w-full items-center gap-4"
      >
        <div className="flex flex-col w-full gap-2 px-4 pt-8 border rounded-xl bg-card items-center md:items-start md:flex-row lg:gap-4">
          <Field className="flex-1 w-full">
            <Input
              name="inputA"
              placeholder="First username (torvalds)"
              defaultValue={usernameA}
              aria-invalid={!!errorA}
              required
            />

            <div className="min-h-2 mb-1 md:min-h-5">
              {errorA && (
                <p className="text-xs font-medium text-destructive">{errorA}</p>
              )}
            </div>
          </Field>

          <Swords
            className="text-muted-foreground shrink-0 my-2"
            size={18}
            aria-hidden="true"
          />

          <Field className="flex-1 w-full">
            <div className="min-h-2 md:hidden" aria-hidden="true" />

            <Input
              name="inputB"
              placeholder="Second username (gaearon)"
              defaultValue={usernameB}
              aria-invalid={!!errorB}
              required
            />

            <div className="min-h-2 mb-1 md:min-h-5">
              {errorB && (
                <p className="text-xs font-medium text-destructive">{errorB}</p>
              )}
            </div>
          </Field>
        </div>

        <Button type="submit" className="w-full min-w-30 md:w-auto px-4">
          Compare
        </Button>
      </form>

      <p className="flex gap-1 items-center text-[13px] text-muted-foreground md:text-base">
        Try:
        {PRESET_COMPARE_USERS.map((user, index) => {
          const [partA, partB] = user.split("vs");
          const usernameA = partA.trim();
          const usernameB = partB.trim();

          return (
            <span key={user} className="">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href={`/compare?usernameA=${usernameA}&usernameB=${usernameB}`}
                      className="text-foreground"
                    />
                  }
                >
                  {user}
                </TooltipTrigger>

                <TooltipContent side={"bottom"}>
                  <p>Click to compare</p>
                </TooltipContent>
              </Tooltip>

              <span key={user} className="">
                {" "}
                {index < PRESET_COMPARE_USERS.length - 1 && <span>·</span>}
              </span>
            </span>
          );
        })}
      </p>
    </div>
  );
}
