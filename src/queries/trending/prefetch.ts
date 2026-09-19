import { getQueryClient } from "@/queries/common/query-client";
import { fetchTrendingRepos, trendingKeys } from "@/queries/trending";

export async function prefetchTrendingRepos(language: string, daysAge: number) {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.query({
      queryKey: trendingKeys.repos(language, daysAge),
      queryFn: () => fetchTrendingRepos(language, daysAge),
    }),
  ]);

  return queryClient;
}
