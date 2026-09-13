"use client";

import Repo from "@/features/trending/trending-section/repo";
import TrendingReposPaginationControls from "@/features/trending/trending-section/trending-repos-pagination-controls";
import { useSearchParams } from "next/navigation";
import type { TrendingRepos, Language } from "@/queries/trending/types";

const ITEMS_PER_PAGE = 5;

export default function ReposSection({
  repos,
  currentLang,
}: {
  repos: TrendingRepos | null;
  currentLang: Language;
}) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  if (!repos) {
    return (
      <p className="text-muted-foreground w-full text-center">
        The languages has no trending repositories
      </p>
    );
  }

  const totalItems = repos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const paginatedRepos = repos?.slice(startItem, endItem);

  return (
    <div className="flex flex-col items-center gap-4">
      {paginatedRepos?.map((repo) => (
        <Repo key={repo.id} repo={repo} currentLang={currentLang} />
      ))}

      {totalItems > 0 && (
        <span className="text-muted-foreground text-sm">
          Showing {startItem + 1} - {endItem} of {totalItems} repositories
        </span>
      )}

      <TrendingReposPaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
