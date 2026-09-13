import { SORT_OPTIONS } from "@/lib/constants";

export interface SortOption {
  label: string;
  value: string;
}
export type SortOptions = SortOption[];
export type SortOptionsValue = (typeof SORT_OPTIONS)[number]["value"];
