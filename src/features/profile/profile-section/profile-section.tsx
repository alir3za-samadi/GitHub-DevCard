import Repo from "@/features/profile/repos-section/repo";
import InfoSection from "@/features/profile/profile-section/info-section";
import GenerateCard from "@/components/ui/generate-card";
import DetailCards from "@/features/profile/profile-section/detail-cards";
import type { ProfileDetails, ProfileRepoItem } from "@/queries/profile";

export default function ProfileSection({
  profile,
  givenStarredCount,
  featuredRepo,
}: {
  profile: ProfileDetails;
  givenStarredCount: number;
  featuredRepo: ProfileRepoItem | null;
}) {
  return (
    <>
      <InfoSection profile={profile}>
        <GenerateCard cardName={profile?.name}>
          <InfoSection
            profile={profile}
            className="flex-col sm:flex-row gap-4 items-start sm:items-center"
            childrenContainerClassName="w-full sm:w-1/2"
          >
            {featuredRepo && (
              <div className="w-full">
                <Repo repo={featuredRepo} key={featuredRepo.id} />
              </div>
            )}
          </InfoSection>

          <DetailCards
            profile={profile}
            givenStarredCount={givenStarredCount}
          />
        </GenerateCard>
      </InfoSection>

      <DetailCards profile={profile} givenStarredCount={givenStarredCount} />
    </>
  );
}
