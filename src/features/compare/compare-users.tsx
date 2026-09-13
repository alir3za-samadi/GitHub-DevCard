"use client";

import CompareUsersLoading from "@/features/compare/compare-users-loading";
import CompareForm from "@/features/compare/compare-form/compare-form";
import UserInfo from "@/features/compare/compare-section/user-info";
import HeadToHead from "@/features/compare/compare-section/head-to-head";
import GenerateCard from "@/components/ui/generate-card";
import { Separator } from "@/components/base/separator";
import { Swords } from "lucide-react";
import { useProfile } from "@/queries/profile";

export default function CompareUsers({
  usernameA,
  usernameB,
}: {
  usernameA: string;
  usernameB: string;
}) {
  const profileDataA = useProfile(usernameA || "");
  const profileDataB = useProfile(usernameB || "");

  const {
    profile: profileA,
    isLoading: isLoadingA,
    isNotFound: isNotFoundA,
    isError: isErrorA,
  } = profileDataA;

  const {
    profile: profileB,
    isLoading: isLoadingB,
    isNotFound: isNotFoundB,
    isError: isErrorB,
  } = profileDataB;

  const isLoading =
    (usernameA ? isLoadingA && !isNotFoundA : false) ||
    (usernameB ? isLoadingB && !isNotFoundB : false);

  return (
    <div className="w-full space-y-6">
      <CompareForm
        usernameA={usernameA}
        usernameB={usernameB}
        errorA={
          usernameA && isNotFoundA ? `User "${usernameA}" not found` : null
        }
        errorB={
          usernameB && isNotFoundB ? `User "${usernameB}" not found` : null
        }
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
