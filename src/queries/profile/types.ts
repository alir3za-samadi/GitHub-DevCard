// Raw API Responses (GitHub API Data)
export interface RawProfileDetails {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface RawProfileRepoItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export type RawProfileRepos = RawProfileRepoItem[];

export type RawProfileGivenStarredCount = number;

// Domain / UI Models (Formatted Data)
export interface ProfileDetails {
  username: string;
  id: number;
  avatarUrl: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
  totalStars: number;
  topLanguages: LanguageStat[];
}

export interface ProfileRepoItem {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  stargazersCount: number;
  forksCount: number;
  language: string | null;
  updatedAt: string;
  topics: string[];
  owner: {
    login: string;
    avatarUrl: string;
  };
}

export type ProfileRepos = ProfileRepoItem[];

export type ProfileGivenStarredCount = number;

// Helper / Computed Types
export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
}
