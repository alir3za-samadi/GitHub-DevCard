import {
  RawProfileDetails,
  RawProfileRepoItem,
  RawProfileRepos,
  ProfileDetails,
  ProfileRepoItem,
  ProfileRepos,
  LanguageStat,
} from "@/queries/profile/types";

export function formatProfile(
  raw: RawProfileDetails,
  repos: RawProfileRepos,
): ProfileDetails {
  const baseDetails = formatProfileDetails(raw);
  const totalStars = repos.reduce(
    (acc, repo) => acc + (repo.stargazers_count || 0),
    0,
  );
  const topLanguages = repos ? languageCount(repos) : [];

  return {
    ...baseDetails,
    totalStars,
    topLanguages,
  };
}

export function formatProfileDetails(raw: RawProfileDetails) {
  return {
    username: raw.login,
    id: raw.id,
    avatarUrl: raw.avatar_url,
    name: raw.name,
    company: raw.company,
    blog: raw.blog,
    location: raw.location,
    bio: raw.bio,
    publicRepos: raw.public_repos,
    publicGists: raw.public_gists,
    followers: raw.followers,
    following: raw.following,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export function formatRepoItem(repo: RawProfileRepoItem): ProfileRepoItem {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    htmlUrl: repo.html_url,
    description: repo.description,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    language: repo.language,
    updatedAt: repo.updated_at,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    owner: {
      login: repo.owner.login,
      avatarUrl: repo.owner.avatar_url,
    },
  };
}

export function formatRepos(repos: RawProfileRepos): ProfileRepos {
  return repos.map(formatRepoItem);
}

export function languageCount(repos: RawProfileRepos): LanguageStat[] {
  const languageCounts = repos.reduce<Record<string, number>>((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const topFiveRaw = Object.entries(languageCounts)
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topFiveTotalCount = topFiveRaw.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return topFiveRaw.map(({ language, count }) => ({
    language,
    count,
    percentage:
      topFiveTotalCount > 0 ? Math.round((count / topFiveTotalCount) * 100) : 0,
  }));
}
