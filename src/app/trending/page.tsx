import PageHeader from "@/components/ui/page-header";
import TrendingRepositories from "@/features/trending/trending-repositories";
import { TOP_LANGUAGES } from "@/queries/common/constants";
import { isValidLanguage } from "@/queries/trending";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;

  const currentLang =
    TOP_LANGUAGES.find((l) => l.value === lang) || TOP_LANGUAGES[0];

  const title = `Trending ${currentLang.label} GitHub Repositories | DevCard`;
  const description = `Explore top trending ${currentLang.label} repositories on GitHub today. Filter by programming language and discover popular projects with DevCard.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TrendingPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const formattedLanguage = lang?.trim().toLowerCase();

  if (
    formattedLanguage &&
    !isValidLanguage(formattedLanguage.trim().toLocaleLowerCase())
  ) {
    notFound();
  }

  const currentLang =
    TOP_LANGUAGES.find((l) => l.value === formattedLanguage) ||
    TOP_LANGUAGES[0];

  return (
    <div className="w-full mx-auto p-6 space-y-6 lg:w-3/4">
      <PageHeader
        title={`Trending ${currentLang.label} Repositories on GitHub`}
      />
      <TrendingRepositories currentLang={currentLang} />
    </div>
  );
}
