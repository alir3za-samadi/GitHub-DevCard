export const profileKeys = {
  all: ["profile"] as const,
  details: (username: string) =>
    [...profileKeys.all, "details", username] as const,
  repos: (username: string) => [...profileKeys.all, "repos", username] as const,
  givenStarred: (username: string) =>
    [...profileKeys.all, "givenStarred", username] as const,
  featuredRepo: (username: string) =>
    [...profileKeys.all, "featuredRepo", username] as const,
};
