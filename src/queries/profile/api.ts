"use server";

import { GITHUB_API_BASE_URL } from "@/queries/common/constants";
import {
  RawProfileDetails,
  RawProfileRepos,
  RawProfileRepoItem,
  RawProfileGivenStarredCount,
} from "@/queries/profile/types";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: RequestInit["headers"] = {
  Accept: "application/vnd.github.v3+json",
};

if (GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

const ENDPOINTS = {
  PROFILE: (username: string) => `${GITHUB_API_BASE_URL}/users/${username}`,
  REPOSITORIES: (username: string) =>
    `${GITHUB_API_BASE_URL}/users/${username}/repos?sort=updated&per_page=99`,
  USER_STARRED: (username: string) =>
    `${GITHUB_API_BASE_URL}/users/${username}/starred?per_page=100`,
  USER_SEARCH_REPOS: (username: string, sort: "stars" | "updated") =>
    `${GITHUB_API_BASE_URL}/search/repositories?q=user:${username}&sort=${sort}&order=desc&per_page=1`,
};

export async function fetchProfileDetails(
  username: string,
): Promise<RawProfileDetails | null> {
  const res = await fetch(ENDPOINTS.PROFILE(username), {
    headers,
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `GitHub API error: ${res.status}`);
  }

  return await res.json();
}

export async function fetchProfileRepos(
  username: string,
): Promise<RawProfileRepos | null> {
  const res = await fetch(ENDPOINTS.REPOSITORIES(username), {
    headers,
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `GitHub API error: ${res.status}`);
  }

  return await res.json();
}

export async function fetchProfileGivenStarredCount(
  username: string,
): Promise<RawProfileGivenStarredCount | null> {
  const res = await fetch(ENDPOINTS.USER_STARRED(username), {
    headers,
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `GitHub API error: ${res.status}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}

export async function fetchProfileFeaturedRepo(
  username: string,
): Promise<RawProfileRepoItem | null> {
  const starredRes = await fetch(
    ENDPOINTS.USER_SEARCH_REPOS(username, "stars"),
    {
      headers,
    },
  );

  if (starredRes.status === 404 || starredRes.status === 422) return null;

  if (!starredRes.ok) {
    const errorData = await starredRes.json().catch(() => ({}));
    throw new Error(
      errorData.message || `GitHub Search API error: ${starredRes.status}`,
    );
  }

  const starredData = await starredRes.json();
  const topRepo = starredData.items?.[0];

  if (topRepo && topRepo.stargazers_count > 0) {
    return topRepo;
  }

  const updatedRes = await fetch(
    ENDPOINTS.USER_SEARCH_REPOS(username, "updated"),
    {
      headers,
    },
  );

  if (updatedRes.status === 404 || updatedRes.status === 422) return null;

  if (!updatedRes.ok) {
    const errorData = await updatedRes.json().catch(() => ({}));
    throw new Error(
      errorData.message || `GitHub Search API error: ${updatedRes.status}`,
    );
  }

  const updatedData = await updatedRes.json();
  return updatedData.items?.[0] || null;
}
