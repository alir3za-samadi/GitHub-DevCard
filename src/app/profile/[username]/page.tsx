import PageHeader from "@/components/ui/page-header";
import UserProfile from "@/features/profile/user-profile";
import { PRESET_PROFILE_USERS } from "@/lib/constants";
import { prefetchProfile } from "@/queries/profile";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  const title = `${username}'s GitHub Profile | DevCard`;
  const description = `View ${username}'s GitHub repositories, stars, and developer stats on DevCard.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export async function generateStaticParams() {
  return PRESET_PROFILE_USERS.map((username) => ({ username: username }));
}

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const queryClient = await prefetchProfile(username);

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader title={`Profile of ${username}`} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile username={username} />
      </HydrationBoundary>
    </div>
  );
}
