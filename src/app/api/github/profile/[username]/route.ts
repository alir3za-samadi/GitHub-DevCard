import {
  fetchProfileDetails,
  fetchProfileRepos,
  formatRepos,
} from "@/queries/profile";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const { username } = await params;

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 },
      );
    }

    const [userData, reposData] = await Promise.all([
      fetchProfileDetails(username),
      fetchProfileRepos(username),
    ]);

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const formattedRepos = reposData ? formatRepos(reposData) : [];
    const totalStars = formattedRepos.reduce(
      (acc, repo) => acc + repo.stargazersCount,
      0,
    );

    return NextResponse.json({
      username: userData.login,
      followers: userData.followers,
      public_repos: userData.public_repos,
      avatar_url: userData.avatar_url,
      login: userData.login,
      totalStars,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch GitHub data" },
      { status: 500 },
    );
  }
}
