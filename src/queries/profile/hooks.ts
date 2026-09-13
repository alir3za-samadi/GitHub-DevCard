import { useQuery } from "@tanstack/react-query";
import {
  fetchProfileDetails,
  fetchProfileRepos,
  fetchProfileGivenStarredCount,
  fetchProfileFeaturedRepo,
} from "@/queries/profile/api";
import { profileKeys } from "@/queries/profile/keys";
import {
  formatProfile,
  formatRepos,
  formatRepoItem,
} from "@/queries/profile/utils";

export function useProfile(username: string) {
  const profileDetailsQuery = useQuery({
    queryKey: profileKeys.details(username),
    queryFn: () => fetchProfileDetails(username),
    enabled: Boolean(username && username.trim().length > 0),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const reposQuery = useProfileRepos(username);
  const starredQuery = useProfileGivenStarred(username);
  const featuredRepoQuery = useProfileFeaturedRepo(username);

  const rawProfile = profileDetailsQuery.data ?? null;
  const rawRepos = reposQuery.data ?? null;
  const rawFeaturedRepo = featuredRepoQuery.data ?? null;

  const repos = rawRepos ? formatRepos(rawRepos) : null;
  const profile =
    rawProfile && rawRepos !== null
      ? formatProfile(rawProfile, rawRepos)
      : null;
  const featuredRepo = rawFeaturedRepo ? formatRepoItem(rawFeaturedRepo) : null;

  const isLoading =
    profileDetailsQuery.isPending ||
    reposQuery.isPending ||
    starredQuery.isPending ||
    featuredRepoQuery.isPending;

  const isNotFound =
    (!profileDetailsQuery.isPending && profileDetailsQuery.data === null) ||
    (!reposQuery.isPending && reposQuery.data === null) ||
    (!starredQuery.isPending && starredQuery.data === null);

  const isError =
    profileDetailsQuery.isError ||
    reposQuery.isError ||
    starredQuery.isError ||
    featuredRepoQuery.isError;

  const error =
    profileDetailsQuery.error ||
    reposQuery.error ||
    starredQuery.error ||
    featuredRepoQuery.error;

  const refetch = async () => {
    await Promise.all([
      profileDetailsQuery.refetch(),
      reposQuery.refetch(),
      starredQuery.refetch(),
      featuredRepoQuery.refetch(),
    ]);
  };

  return {
    profile,
    repos,
    givenStarredCount: starredQuery.data ?? 0,
    featuredRepo,
    isLoading,
    isNotFound,
    isError,
    error,
    refetch,
  };
}

export function useProfileDetails(username: string) {
  return useQuery({
    queryKey: profileKeys.details(username),
    queryFn: () => fetchProfileDetails(username),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useProfileRepos(username: string) {
  return useQuery({
    queryKey: profileKeys.repos(username),
    queryFn: () => fetchProfileRepos(username),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useProfileGivenStarred(username: string) {
  return useQuery({
    queryKey: profileKeys.givenStarred(username),
    queryFn: () => fetchProfileGivenStarredCount(username),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useProfileFeaturedRepo(username: string) {
  return useQuery({
    queryKey: profileKeys.featuredRepo(username),
    queryFn: () => fetchProfileFeaturedRepo(username),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
