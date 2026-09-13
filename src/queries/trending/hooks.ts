import { useQuery } from "@tanstack/react-query";
import { fetchTrendingRepos } from "./api";
import { trendingKeys } from "./keys";
import { formatTrendingRepos } from "./utils";

export function useTrending(language: string, daysAgo: number = 30) {
  const trendingQuery = useTrendingRepos(language, daysAgo);

  const rawData = trendingQuery.data ?? null;

  const data = rawData ? formatTrendingRepos(rawData) : null;

  const isLoading = trendingQuery.isPending;

  const isNotFound = !trendingQuery.isPending && trendingQuery.data === null;

  const isError = trendingQuery.isError;
  const error = trendingQuery.error;

  const refetch = async () => {
    await trendingQuery.refetch();
  };

  return {
    data,
    repos: data ? data.items : null,
    totalCount: data?.totalCount ?? 0,
    isLoading,
    isNotFound,
    isError,
    error,
    refetch,
  };
}

export function useTrendingRepos(language: string, daysAgo: number = 30) {
  return useQuery({
    queryKey: trendingKeys.repos(language, daysAgo),
    queryFn: () => fetchTrendingRepos(language, daysAgo),
    staleTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
