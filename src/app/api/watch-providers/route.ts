import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type") || "movie"; // 'movie' or 'tv'

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = process.env.TMDB_BASE_URL?.replace(/['"]/g, "").trim();

    if (!apiKey || !baseUrl) {
      return NextResponse.json(
        { error: "API configuration missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${baseUrl}/${type}/${id}/watch/providers?api_key=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDb");
    }

    const data = await response.json();
    
    // We'll focus on US results by default, or you can pass a region
    // The structure is results: { [region]: { flatrate: [], rent: [], buy: [] } }
    return NextResponse.json({ data: data.results });
  } catch (error: any) {
    console.error("Watch Providers Error:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
