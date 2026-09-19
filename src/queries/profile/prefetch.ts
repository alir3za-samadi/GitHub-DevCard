import { getQueryClient } from "@/queries/common/query-client";
import {
  fetchProfileDetails,
  fetchProfileRepos,
  fetchProfileGivenStarredCount,
  fetchProfileFeaturedRepo,
  profileKeys,
} from "@/queries/profile";

export async function prefetchProfile(username: string) {
  const queryClient = getQueryClient();

  await Promise.all([
    prefetchProfileDetails(username),
    prefetchProfileRepos(username),
    prefetchProfileGivenStarred(username),
    prefetchProfileFeaturedRepo(username),
  ]);

  return queryClient;
}

export async function prefetchProfileDetails(username: string) {
  const queryClient = getQueryClient();

  await queryClient.query({
    queryKey: profileKeys.details(username),
    queryFn: () => fetchProfileDetails(username),
  });

  return queryClient;
}

export async function prefetchProfileRepos(username: string) {
  const queryClient = getQueryClient();

  await queryClient.query({
    queryKey: profileKeys.repos(username),
    queryFn: () => fetchProfileRepos(username),
  });

  return queryClient;
}

export async function prefetchProfileGivenStarred(username: string) {
  const queryClient = getQueryClient();

  await queryClient.query({
    queryKey: profileKeys.givenStarred(username),
    queryFn: () => fetchProfileGivenStarredCount(username),
  });

  return queryClient;
}

export async function prefetchProfileFeaturedRepo(username: string) {
  const queryClient = getQueryClient();

  await queryClient.query({
    queryKey: profileKeys.featuredRepo(username),
    queryFn: () => fetchProfileFeaturedRepo(username),
  });

  return queryClient;
}
