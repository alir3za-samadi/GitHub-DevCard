import { fetchTrendingRepos, formatTrendingRepos } from "@/queries/trending";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get("lang");

    const rawDaysAge = searchParams.get("daysAge");
    const daysAge = rawDaysAge ? Number(rawDaysAge) : 30;

    if (!language) {
      return NextResponse.json(
        { message: "Language is required" },
        { status: 400 },
      );
    }

    const rawData = await fetchTrendingRepos(language, daysAge);

    if (!rawData) {
      return NextResponse.json(
        { message: "Trending repositories not found" },
        { status: 404 },
      );
    }

    const formattedData = formatTrendingRepos(rawData);

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch trending repositories" },
      { status: 500 },
    );
  }
}
