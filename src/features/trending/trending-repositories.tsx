"use client";

import PageHeader from "@/components/ui/page-header";
import FilterSection from "@/features/trending/trending-section/filter-section";
import ReposSection from "@/features/trending/trending-section/repos-section";
import GenerateCard from "@/components/ui/generate-card";
import TrendingRepositoriesLoading from "@/features/trending/trending-repositories-loading";

import { useTrending } from "@/queries/trending";
import type { Language } from "@/queries/trending";

export default function TrendingRepositories({
  currentLang,
}: {
  currentLang: Language;
}) {
  const { repos, isLoading, isError, error } = useTrending(
    currentLang.label,
    30,
  );

  if (isError) {
    throw error;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <FilterSection currentLang={currentLang} />

        <GenerateCard triggerClassName="text-sm">
          <PageHeader
            title={`Trending ${currentLang.label} Repositories on GitHub`}
          />
          {isLoading ? (
            <TrendingRepositoriesLoading />
          ) : (
            <ReposSection
              repos={repos ? repos.slice(0, 5) : null}
              currentLang={currentLang}
            />
          )}
        </GenerateCard>
      </div>

      {isLoading ? (
        <TrendingRepositoriesLoading />
      ) : (
        <ReposSection repos={repos ? repos : null} currentLang={currentLang} />
      )}
    </div>
  );
}
