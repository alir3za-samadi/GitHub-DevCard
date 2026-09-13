import { TOP_LANGUAGES } from "@/queries/common/constants";

export interface Language {
  label: string;
  value: string;
  color: string;
}

// Raw API Response Types
export interface RawTrendingRepoItem {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at?: string;
  topics?: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface RawTrendingReposResponse {
  total_count: number;
  items: RawTrendingRepoItem[];
}

// UI Domain Models
export interface TrendingRepoItem {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  stargazersCount: number;
  forksCount: number;
  language: string | null;
  topics: string[];
  owner: {
    login: string;
    avatarUrl: string;
  };
}

export interface TrendingReposData {
  totalCount: number;
  items: TrendingRepoItem[];
}

export type TrendingRepos = TrendingRepoItem[];
