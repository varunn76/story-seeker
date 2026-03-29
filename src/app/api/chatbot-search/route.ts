import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const searchParams = await req.json();
    console.log(
      "\n🔍 [Search API] Incoming params:",
      JSON.stringify(searchParams, null, 2),
    );
    let TMDB_API_KEY = process.env.TMDB_API_KEY || "";
    let TMDB_BASE_URL =
      process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";

    TMDB_API_KEY = TMDB_API_KEY.trim();
    TMDB_BASE_URL = TMDB_BASE_URL.replace(/['"]/g, "").trim();

    if (!TMDB_API_KEY) {
      return NextResponse.json(
        { error: "TMDB API key missing" },
        { status: 500 },
      );
    }

    let queryText =
      searchParams.title || searchParams.textQuery || searchParams.query || "";
    if (!queryText && searchParams.keywords?.length) {
      queryText = searchParams.keywords.join(" ");
    }

    if (!queryText) {
      return NextResponse.json({ results: [] });
    }

    // Direct search using /search/multi as requested
    let url = `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(queryText)}&api_key=${TMDB_API_KEY}&sort_by=popularity.desc&page=1`;

    // Add year and language filters if available and supported
    if (searchParams.language) {
      url += `&language=${searchParams.language}`;
    }
    if (searchParams.year) {
      // Note: /search/multi doesn't officially support 'year', but we can append it to the query for better matching
      // or rely on TMDB's internal sorting.
    }

    console.log("🔍 [Search API] TMDB URL:", url);
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("TMDB API Error:", errorText);
      throw new Error(`TMDB API returned ${response.status}`);
    }

    const data = await response.json();
    let merged = data.results || [];

    // Include movies, TV shows, and people
    merged = merged.filter(
      (m: any) =>
        m.media_type === "movie" ||
        m.media_type === "tv" ||
        m.media_type === "person",
    );

    // If we know the language, sort matches by language first (correct language > others)
    const preferredLang = searchParams.language || "";
    if (preferredLang) {
      merged.sort((a: any, b: any) => {
        const aMatch = a.original_language === preferredLang ? 1 : 0;
        const bMatch = b.original_language === preferredLang ? 1 : 0;
        return bMatch - aMatch; // language matches come first
      });
    }

    const results = merged.slice(0, 5).map((m: any) => ({
      id: m.id,
      title: m.title || m.name,
      poster_path: m.media_type === "person" ? m.profile_path : m.poster_path,
      release_date: m.media_type === "person" ? m.known_for_department : (m.release_date || m.first_air_date),
      vote_average: m.vote_average,
      media_type: m.media_type || "movie",
    }));

    console.log(
      "🔍 [Search API] Final results:",
      results.map((r: any) => `${r.title} (${r.release_date})`).join(", "),
    );
    return NextResponse.json({ results });
  } catch (error: unknown) {
    console.error("Search API Error:", error);
    const msg = error instanceof Error ? error.message : "Search failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
