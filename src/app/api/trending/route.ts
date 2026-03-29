/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const version = searchParams.get("version") || "all";
  const trendingTime = searchParams.get("trendingTime") || "day";
  const pageNo = searchParams.get("page") || 1;
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = process.env.TMDB_BASE_URL;

    if (!apiKey || !baseUrl) {
      return NextResponse.json(
        { error: "API key or Base URL is missing" },
        { status: 500 },
      );
    }

    const endpoint =
      version === "movie"
        ? "trending/movie"
        : version === "tv"
          ? "trending/tv"
          : "trending/all";

    const url = `${baseUrl}/${endpoint}/${trendingTime}?api_key=${apiKey}&page=${pageNo}`;
    // console.log('Fetching URL: ', url);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data from TMDb: ${res.statusText}` },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
