import { GITHUB_API_BASE_URL } from "@/queries/common/constants";
import { getDaysAge } from "@/queries/trending/utils";
import { RawTrendingReposResponse } from "@/queries/trending/types";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: RequestInit["headers"] = {
  Accept: "application/vnd.github.v3+json",
};

if (GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

const ENDPOINTS = {
  TRENDING_REPOS: (language: string, daysAgo: number) => {
    const dateQuery = getDaysAge(daysAgo);
    const rawQuery = `language:${language} pushed:>${dateQuery}`;
    const encodedQuery = encodeURIComponent(rawQuery);
    return `${GITHUB_API_BASE_URL}/search/repositories?q=${encodedQuery}&sort=stars&order=desc`;
  },
};

export async function fetchTrendingRepos(
  language: string,
  daysAgo: number = 30,
): Promise<RawTrendingReposResponse | null> {
  const res = await fetch(ENDPOINTS.TRENDING_REPOS(language, daysAgo), {
    headers,
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `GitHub Trending API error: ${res.status}`,
    );
  }

  const data: RawTrendingReposResponse = await res.json();
  return data;
}
