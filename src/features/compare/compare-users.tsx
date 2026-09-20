"use client";

import CompareUsersLoading from "@/features/compare/compare-users-loading";
import CompareForm from "@/features/compare/compare-form";
import UserInfo from "@/features/compare/compare-details/user-info";
import HeadToHead from "@/features/compare/compare-details/head-to-head";
import GenerateCard from "@/components/ui/generate-card";
import { Separator } from "@/components/base/separator";
import { Swords } from "lucide-react";
import { useProfile } from "@/queries/profile";

export default function CompareUsers({
  userA,
  userB,
}: {
  userA: string;
  userB: string;
}) {
  const profileDataA = useProfile(userA || "");
  const profileDataB = useProfile(userB || "");

  const {
    profile: profileA,
    isLoading: isLoadingA,
    isNotFound: isNotFoundA,
  } = profileDataA;

  const {
    profile: profileB,
    isLoading: isLoadingB,
    isNotFound: isNotFoundB,
  } = profileDataB;

  const isLoading =
    (userA ? isLoadingA && !isNotFoundA : false) ||
    (userB ? isLoadingB && !isNotFoundB : false);

  return (
    <div className="w-full space-y-6">
      <CompareForm
        userA={userA}
        userB={userB}
        errorA={userA && isNotFoundA ? `User "${userA}" not found` : null}
        errorB={userB && isNotFoundB ? `User "${userB}" not found` : null}
      />

      {isLoading ? (
        <>
          <Separator />
          <CompareUsersLoading />
        </>
      ) : (
        profileA &&
        profileB && (
          <>
            <Separator />

            <div className="flex justify-center">
              <GenerateCard triggerClassName="w-full text-sm">
                <div className="flex flex-col gap-4 md:flex-row">
                  <UserInfo userProfileData={profileA} />
                  <Swords
                    className="text-muted-foreground shrink-0 mx-auto md:my-auto"
                    size={18}
                    aria-hidden="true"
                  />
                  <UserInfo userProfileData={profileB} />
                </div>

                <HeadToHead dataA={profileA} dataB={profileB} />
              </GenerateCard>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <UserInfo userProfileData={profileA} />
              <Swords
                className="text-muted-foreground shrink-0 mx-auto md:my-auto"
                size={18}
                aria-hidden="true"
              />
              <UserInfo userProfileData={profileB} />
            </div>

            <HeadToHead dataA={profileA} dataB={profileB} />
          </>
        )
      )}
    </div>
  );
}
