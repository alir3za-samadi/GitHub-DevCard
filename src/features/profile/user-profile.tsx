"use client";

import ReposSection from "@/features/profile/repos-section/repos-section";
import ProfileSection from "@/features/profile/profile-section/profile-section";
import UserProfileLoading from "@/features/profile/user-profile-loading";
import { Separator } from "@/components/base/separator";
import { notFound } from "next/navigation";
import { useProfile } from "@/queries/profile";

export default function UserProfile({ username }: { username: string }) {
  const {
    profile,
    repos,
    givenStarredCount,
    featuredRepo,
    isLoading,
    isNotFound,
  } = useProfile(username);

  if (isLoading) {
    return <UserProfileLoading />;
  }

  if (isNotFound || !profile) {
    notFound();
  }

  return (
    <>
      <ProfileSection
        profile={profile}
        givenStarredCount={givenStarredCount}
        featuredRepo={featuredRepo}
      />

      <Separator />

      <ReposSection repos={repos ?? []} />
    </>
  );
}
