export const trendingKeys = {
  all: ["trending"] as const,
  repos: (language: string, daysAgo: number) =>
    [...trendingKeys.all, "repos", { language, daysAgo }] as const,
};
