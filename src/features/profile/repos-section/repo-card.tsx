import { Card, CardContent } from "@/components/base/card";
import { formatDate } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/base/hover-card";
import { ExternalLink } from "lucide-react";
import type { ProfileRepoItem } from "@/queries/profile/types";

export default function RepoCard({
  repo,
  className,
}: {
  repo: ProfileRepoItem;
  className?: string;
}) {
  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="px-4 flex flex-col h-21 gap-4">
        <HoverCard>
          <HoverCardTrigger
            delay={10}
            closeDelay={100}
            render={
              <h3 className="text-md">
                <a
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  className="flex items-center gap-2 truncate w-full group "
                >
                  {repo.name}
                  <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground shrink-0" />
                </a>
              </h3>
            }
          />
          <HoverCardContent className="flex w-64 flex-col gap-0.5">
            <p>{repo.description || "The repositorie has no description"}</p>

            <span className="mt-1 text-xs text-muted-foreground">
              {formatDate(repo.updatedAt)}
            </span>
          </HoverCardContent>
        </HoverCard>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-mono">
            {repo.language || "Unknown"} ·{" "}
            <span className="text-amber-400">{repo.stargazersCount}★</span>
          </p>

          <span className="mt-1 text-xs text-muted-foreground">
            {formatDate(repo.updatedAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
