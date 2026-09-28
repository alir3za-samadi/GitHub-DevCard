import { getQueryClient } from "@/queries/common/query-client";
import { fetchTrendingRepos, trendingKeys } from "@/queries/trending";

export async function prefetchTrendingRepos(language: string, daysAgo: number) {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.query({
      queryKey: trendingKeys.repos({ language, daysAgo }),
      queryFn: () => fetchTrendingRepos(language, daysAgo),
    }),
  ]);

  return queryClient;
}
