import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const castId = searchParams.get("castId");
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = process.env.TMDB_BASE_URL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 },
      );
    }

    const res = await fetch(
      `${baseUrl}/person/${castId}?api_key=${apiKey}&append_to_response=combined_credits`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // https://api.themoviedb.org/3/person/18918?language=en-US
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from TMDb" },
        { status: res.status },
      );
    }

    const data = await res.json();
    // console.log('search data--------------------------------------->', data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
