import { Badge } from "@/components/base/badge";
import { Card } from "@/components/base/card";
import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { TrendingRepoItem, Language } from "@/queries/trending/types";

export default function Repo({
  repo,
  currentLang,
}: {
  repo: TrendingRepoItem;
  currentLang: Language;
}) {
  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full block group"
    >
      <Card className="p-4 transition-all duration-200 hover:border-foreground/30 hover:bg-accent/40 flex items-start justify-between gap-5">
        <div className="space-y-4 flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <Image
              src={repo.owner.avatarUrl}
              alt={`${repo.owner.login}-avatar`}
              width={56}
              height={56}
              className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border bg-foreground md:w-13 md:h-13"
            />
            <h2 className="font-bold text-[13px] truncate md:text-base">
              <span className="text-muted-foreground font-normal">
                {repo.owner.login} /{" "}
              </span>
              {repo.name}
            </h2>
            <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {repo.description}
          </p>
        </div>

        <div className="flex flex-row items-end md:items-center gap-2 md:gap-4 shrink-0">
          <Badge variant="outline" className={cn("text-xs", currentLang.color)}>
            {repo.language}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
            <Star className="size-4 fill-yellow-500/20 text-yellow-500" />
            <span>
              {repo.stargazersCount >= 1000
                ? `${(repo.stargazersCount / 1000).toFixed(0)}k`
                : repo.stargazersCount}
            </span>
          </div>
        </div>
      </Card>
    </a>
  );
}
