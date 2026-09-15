import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SORT_OPTIONS } from "@/lib/constants";

import type { SortOptionsValue } from "@/lib/types";
import type { ProfileRepos } from "@/queries/profile/types";

export type { ClassValue };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function sortRepos(repos: ProfileRepos, sortBy: SortOptionsValue) {
  const newRepos = [...repos];

  switch (sortBy) {
    case "updated": {
      // default is sort byt updatedd
      break;
    }

    case "stars": {
      newRepos.sort((a, b) => b.stargazersCount - a.stargazersCount);
      break;
    }
    case "name": {
      newRepos.sort((a, b) => a.name.localeCompare(b.name));
      break;
    }
  }

  return newRepos;
}

export const isValidSortBy = (sortBy: string): sortBy is SortOptionsValue => {
  return SORT_OPTIONS.some(
    (item) => item.value === sortBy.trim().toLowerCase(),
  );
};
