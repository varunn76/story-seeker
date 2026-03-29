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
    // console.log('id------------------------->', id);

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
      `${baseUrl}/tv/${id}?append_to_response=videos,credits&api_key=${apiKey}`,
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
    const seasons = [];
    const newData = [];
    const genres = findKeysInNestedData(data?.genres, "name");
    const seasonsNumber = findKeysInNestedData(data?.seasons, "season_number");
    const seasonsAirDate = findKeysInNestedData(data?.seasons, "air_date");
    const castId = findKeysInNestedData(data?.credits?.cast, "id");
    const character = findKeysInNestedData(data?.credits?.cast, "character");
    const actor = findKeysInNestedData(data?.credits?.cast, "name");
    const createdBy = data?.created_by;

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

    for (let i = 0; i < seasonsNumber.length; i++) {
      seasons.push({
        season_number: seasonsNumber[i],
        air_date: seasonsAirDate[i],
      });
    }

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
      backdrop_path: data.backdrop_path,
      description: data.overview,
      first_air_date: data.first_air_date,
      genres: genres,
      imdb_id: data.imdb_id,
      id: data.id,
      in_production: data.in_production,
      last_air_date: data.last_air_date,
      last_episode_to_air: data.last_episode_to_air,
      name: data.name,
      number_of_episodes: data.number_of_episodes,
      number_of_seasons: seasons,
      movie_img: data.belongs_to_collection,
      origin_country: data.origin_country[0],
      original_language: data.original_language,
      poster_path: data.poster_path,
      production_companies: data.production_companies,
      production_countries: data.production_countries[0],
      release_date: data.release_date,
      runtime: data.runtime,
      status: data.status,
      seasons: data.seasons,
      spoken_languages: data.spoken_languages[0],
      title: data.title,
      tagline: data.tagline,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
      videos: data.videos.results,
      cast: newData ? newData : null,
      director: (createdBy && createdBy.length > 0) ? createdBy : director,
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
