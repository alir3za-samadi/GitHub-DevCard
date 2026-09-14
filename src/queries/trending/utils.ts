import { TOP_LANGUAGES } from "@/queries/common/constants";
import type { LanguagesValue } from "@/queries/trending";

import type {
  RawTrendingRepoItem,
  RawTrendingReposResponse,
  TrendingRepoItem,
  TrendingReposData,
} from "@/queries/trending";

export function formatTrendingRepoItem(
  repo: RawTrendingRepoItem,
): TrendingRepoItem {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    htmlUrl: repo.html_url,
    description: repo.description,
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    language: repo.language,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    owner: {
      login: repo.owner.login,
      avatarUrl: repo.owner.avatar_url,
    },
  };
}

export function formatTrendingRepos(
  raw: RawTrendingReposResponse,
): TrendingReposData {
  return {
    totalCount: raw.total_count,
    items: (raw.items || []).map(formatTrendingRepoItem),
  };
}

export function getDaysAge(daysAgo: number = 30): string {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - daysAgo);
  return targetDate.toISOString().split("T")[0];
}

export const isValidLanguage = (lang: string): lang is LanguagesValue => {
  return TOP_LANGUAGES.some((item) => item.value === lang.trim().toLowerCase());
};
