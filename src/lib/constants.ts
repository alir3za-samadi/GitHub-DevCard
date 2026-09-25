import { GitCompare, TrendingUp } from "lucide-react";

export const PRESET_PROFILE_USERS = [
  "torvalds",
  "gaearon",
  "sindresorhus",
] as const;

export const PRESET_COMPARE_USERS = [
  { uA: "torvalds", uB: "gaearon" },
  { uA: "gaearon", uB: "sindresorhus" },
] as const;

export const SORT_OPTIONS = [
  { label: "Recently Updated", value: "updated" },
  { label: "Most Stars", value: "stars" },
  { label: "Name", value: "name" },
] as const;

export const NAV_ITEMS = [
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/trending", label: "Trending", icon: TrendingUp },
] as const;

export const INTL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
