import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const genre = searchParams.get("genre");
  const year = searchParams.get("year");
  const version = searchParams.get("version") || "movie";
  const adult = searchParams.get("adult") || "false";
  const provider = searchParams.get("provider");
  const page = searchParams.get("pagination") || "1";
  const watchRegion = searchParams.get("watchRegion") || "US";
  const castId = searchParams.get("castId");
  const language = searchParams.get("language");
  const originLanguage = searchParams.get("originLanguage");
  const originCountry = searchParams.get("originCountry");
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = process.env.TMDB_BASE_URL;

    if (!apiKey || !baseUrl) {
      return NextResponse.json(
        { error: "API key or Base URL is missing" },
        { status: 500 },
      );
    }

    const endpoint = version === "movie" ? "/discover/movie" : "/discover/tv";

    const uri =
      `${baseUrl}${endpoint}?api_key=${apiKey}&sort_by=popularity.desc&page=${page}` +
      `${provider ? `&with_watch_providers=${provider}` : ""}` +
      `&include_adult=${adult}` +
      `${genre ? `&with_genres=${genre}` : ""}` +
      `${year ? `&primary_release_year=${year}` : ""}` +
      `${castId ? `&with_cast=${castId}` : ""}` +
      `${language ? `&language=${language}` : ""}` +
      `${originLanguage ? `&with_original_language=${originLanguage}` : ""}` +
      `${originCountry ? `&with_origin_country=${originCountry}` : ""}` +
      `&watch_region=${watchRegion}` +
      `&sort_by=popularity.desc`;

    const res = await fetch(uri, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("TMDb API Response Error:", res.statusText);
      return NextResponse.json(
        { error: "Failed to fetch data from TMDb" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
