import PageHeader from "@/components/ui/page-header";
import CompareUsers from "@/features/compare/compare-users";
import { prefetchProfileDetails } from "@/queries/profile";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ userA?: string; userB?: string }>;
}): Promise<Metadata> {
  const { userA = "", userB = "" } = await searchParams;

  const hasUsers = Boolean(userA && userB);

  const title = hasUsers
    ? `Compare ${userA} vs ${userB} | DevCard`
    : "Compare GitHub Profiles | DevCard";

  const description = hasUsers
    ? `Head-to-head GitHub profile comparison between ${userA} and ${userB}.`
    : "Compare two GitHub developer profiles side-by-side with DevCard.";

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ uA?: string; uB?: string }>;
}) {
  const { uA: userA = "", uB: userB = "" } = await searchParams;

  const pageTitle =
    userA && userB ? `Compare ${userA} vs ${userB}` : "Compare GitHub Profiles";

  const [queryClient] = await Promise.all([
    prefetchProfileDetails(userA),
    prefetchProfileDetails(userB),
  ]);

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader title={pageTitle} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CompareUsers userA={userA} userB={userB} />
      </HydrationBoundary>
    </div>
  );
}
