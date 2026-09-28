export const trendingKeys = {
  all: ["trending"] as const,
  repos: (filters: { language: string; daysAgo: number }) =>
    [...trendingKeys.all, "repos", filters] as const,
};
