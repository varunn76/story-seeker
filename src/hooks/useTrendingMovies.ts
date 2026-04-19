import { useQuery } from "@tanstack/react-query";
import { internalHeaders } from "@/utils/internalHeaders";

export interface TrendingMovie {
  id: number;
  title: string;
  year: string;
  rating: string;
  image: string;
  description: string;
  media_type?: string;
  poster_path?: string;
}

export const useTrendingMovies = (
  version: string = "movie",
  trendingTime: string = "day",
  page: number = 1,
) => {
  return useQuery({
    queryKey: ["trending", version, trendingTime, page],
    queryFn: async () => {
      const response = await fetch(
        `/api/trending?version=${version}&trendingTime=${trendingTime}&page=${page}`,
        { headers: internalHeaders() },
      );
      if (!response.ok) throw new Error("Failed to fetch trending content");

      const data = await response.json();

      if (!data.data?.results) return [];

      return data.data.results.map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        year:
          (item.release_date || item.first_air_date)?.split("-")[0] || "N/A",
        rating: item.vote_average?.toFixed(1) || "0.0",
        image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        poster_path: item.poster_path,
        description: item.overview || "No description available.",
        media_type:
          item.media_type || (version === "all" ? undefined : version),
      }));
    },
    staleTime: 1000 * 60 * 60,
  });
};
