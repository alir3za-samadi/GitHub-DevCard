import { useQuery } from "@tanstack/react-query";
import {
  fetchTrendingRepos,
  trendingKeys,
  formatTrendingRepos,
  isValidLanguage,
} from "@/queries/trending";

export function useTrending(language: string = "", daysAgo: number = 30) {
  const trendingQuery = useTrendingRepos(language, daysAgo);

  const rawData = trendingQuery.data ?? null;

  const data = rawData ? formatTrendingRepos(rawData) : null;

  const isLoading = trendingQuery.isLoading;

  const isNotFound = !isLoading && trendingQuery.data === null;

  const isError = trendingQuery.isError;
  const error = trendingQuery.error;

  const refetch = async () => {
    await trendingQuery.refetch();
  };

  return {
    data,
    repos: data?.items ?? null,
    totalCount: data?.totalCount ?? 0,
    isLoading,
    isNotFound,
    isError,
    error,
    refetch,
  };
}

export function useTrendingRepos(language: string, daysAgo: number = 30) {
  const validLanguage = !language || isValidLanguage(language);

  return useQuery({
    queryKey: trendingKeys.repos(language, daysAgo),
    queryFn: () => fetchTrendingRepos(language, daysAgo),
    enabled: validLanguage,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 120,
  });
}
