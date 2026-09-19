import { QueryClient, environmentManager } from "@tanstack/react-query";
import { cache } from "react";

let browserQueryClient: QueryClient | undefined = undefined;

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        throwOnError: true,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

export const getServerQueryClient = cache(() => makeQueryClient());

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return getServerQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
