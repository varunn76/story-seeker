/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  function findKeysInNestedData(
    data: unknown,
    targetKey: string,
    results: unknown[] = [],
  ): unknown[] {
    if (Array.isArray(data)) {
      for (const item of data) {
        findKeysInNestedData(item, targetKey, results);
      }
    } else if (data !== null && typeof data === "object") {
      for (const key in data) {
        if (key === targetKey) {
          results.push((data as Record<string, unknown>)[key]);
        } else {
          findKeysInNestedData(
            (data as Record<string, unknown>)[key],
            targetKey,
            results,
          );
        }
      }
    }
    return results;
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "ID is missing in the query parameters" },
        { status: 400 },
      );
    }

    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = process.env.TMDB_BASE_URL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 },
      );
    }
    const res = await fetch(
      `${baseUrl}/movie/${id}?append_to_response=videos,credits&api_key=${apiKey}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from TMDb" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const newData = [];
    const genres = findKeysInNestedData(data?.genres, "name");
    const castId = findKeysInNestedData(data?.credits?.cast, "id");
    const character = findKeysInNestedData(data?.credits?.cast, "character");
    const actor = findKeysInNestedData(data?.credits?.cast, "name");
    const director = data?.credits?.crew
      .filter((crews: any) => crews?.job === "Director")
      .map((crew: any) => crew);

    const profile_path = findKeysInNestedData(
      data?.credits?.cast,
      "profile_path",
    );
    const known_for_department = findKeysInNestedData(
      data?.credits?.cast,
      "known_for_department",
    );
    const popularity = findKeysInNestedData(data?.credits?.cast, "popularity");

    for (let i = 0; i < character.length; i++) {
      newData.push({
        character: character[i],
        actor: actor[i],
        profile_path: profile_path[i],
        known_for_department: known_for_department[i],
        popularity: popularity[i],
        id: castId[i],
      });
    }

    return NextResponse.json({
      genres: genres,
      imdb_id: data.imdb_id,
      id: data.id,
      movie_img: data.belongs_to_collection,
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      origin_country: data.origin_country[0],
      original_language: data.original_language,
      title: data.title,
      description: data.overview,
      production_companies: data.production_companies,
      production_countries: data.production_countries[0],
      release_date: data.release_date,
      spoken_languages: data.spoken_languages[0],
      tagline: data.tagline,
      status: data.status,
      runtime: data.runtime,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      videos: data.videos.results ? data.videos.results : null,
      cast: newData ? newData : null,
      director: director ? director : null,
    });
    // return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
