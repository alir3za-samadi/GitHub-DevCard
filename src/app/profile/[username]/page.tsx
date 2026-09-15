import PageHeader from "@/components/ui/page-header";
import UserProfile from "@/features/profile/user-profile";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const username = (await params).username;

  const title = `${username}'s GitHub Profile | DevCard`;
  const description = `View ${username}'s GitHub repositories, stars, and developer stats on DevCard.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader title={`Profile of ${username}`} />
      <UserProfile username={username} />
    </div>
  );
}
