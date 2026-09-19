import PageHeader from "@/components/ui/page-header";
import CompareUsers from "@/features/compare/compare-users";
import { prefetchProfileDetails } from "@/queries/profile";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ usernameA?: string; usernameB?: string }>;
}): Promise<Metadata> {
  const { usernameA = "", usernameB = "" } = await searchParams;

  const hasUsers = Boolean(usernameA && usernameB);

  const title = hasUsers
    ? `Compare ${usernameA} vs ${usernameB} | DevCard`
    : "Compare GitHub Profiles | DevCard";

  const description = hasUsers
    ? `Head-to-head GitHub profile comparison between ${usernameA} and ${usernameB}.`
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
  searchParams: Promise<{ usernameA?: string; usernameB?: string }>;
}) {
  const { usernameA = "", usernameB = "" } = await searchParams;

  const pageTitle =
    usernameA && usernameB
      ? `Compare ${usernameA} vs ${usernameB}`
      : "Compare GitHub Profiles";

  const [queryClient] = await Promise.all([
    prefetchProfileDetails(usernameA),
    prefetchProfileDetails(usernameB),
  ]);

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader title={pageTitle} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CompareUsers usernameA={usernameA} usernameB={usernameB} />
      </HydrationBoundary>
    </div>
  );
}
