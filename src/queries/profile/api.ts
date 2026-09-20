import { GITHUB_API_BASE_URL } from "@/queries/common/constants";
import type {
  RawProfileDetails,
  RawProfileRepos,
  RawProfileRepoItem,
  RawProfileGivenStarredCount,
} from "@/queries/profile";

const ENDPOINTS = {
  PROFILE: (username: string) => `${GITHUB_API_BASE_URL}/users/${username}`,
  REPOSITORIES: (username: string) =>
    `${GITHUB_API_BASE_URL}/users/${username}/repos?sort=updated&per_page=99`,
  USER_STARRED: (username: string) =>
    `${GITHUB_API_BASE_URL}/users/${username}/starred?per_page=100`,
  USER_SEARCH_REPOS: (username: string, sort: "stars" | "updated") =>
    `${GITHUB_API_BASE_URL}/search/repositories?q=user:${username}&sort=${sort}&order=desc&per_page=1`,
};

function getHeaders(): RequestInit["headers"] {
  const token = process.env.GITHUB_TOKEN;
  console.log(token);
  
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function fetchProfileDetails(
  username: string,
): Promise<RawProfileDetails | null> {
  const formattedUsername = encodeURIComponent(username.trim().toLowerCase());

  const res = await fetch(ENDPOINTS.PROFILE(formattedUsername), {
    headers: getHeaders(),
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
  const formattedUsername = encodeURIComponent(username.trim().toLowerCase());

  const res = await fetch(ENDPOINTS.REPOSITORIES(formattedUsername), {
    headers: getHeaders(),
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
  const formattedUsername = encodeURIComponent(username.trim().toLowerCase());

  const res = await fetch(ENDPOINTS.USER_STARRED(formattedUsername), {
    headers: getHeaders(),
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
  const formattedUsername = encodeURIComponent(username.trim().toLowerCase());

  const starredRes = await fetch(
    ENDPOINTS.USER_SEARCH_REPOS(formattedUsername, "stars"),
    {
      headers: getHeaders(),
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
    ENDPOINTS.USER_SEARCH_REPOS(formattedUsername, "updated"),
    {
      headers: getHeaders(),
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
