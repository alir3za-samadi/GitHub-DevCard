import PageHeader from "@/components/ui/page-header";
import CompareUsers from "@/features/compare/compare-users";
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
  searchParams: Promise<{ usernameA?: string; usernameB?: string }>;
}) {
  const { usernameA = "", usernameB = "" } = await searchParams;
  const pageTitle =
    usernameA && usernameB
      ? `Compare ${usernameA} vs ${usernameB}`
      : "Compare GitHub Profiles";

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader title={pageTitle} />
      <CompareUsers usernameA={usernameA} usernameB={usernameB} />
    </div>
  );
}
