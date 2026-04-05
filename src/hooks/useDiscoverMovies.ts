import { useQuery } from "@tanstack/react-query";

export const useDiscoverMovies = (version: string = "movie", page: number = 1) => {
  return useQuery({
    queryKey: ["discover", version, page],
    queryFn: async () => {
      const response = await fetch(`/api/discover?version=${version}&page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch discovery content");
      
      const data = await response.json();
      
      if (!data.data?.results) return [];

      return data.data.results
        .slice(0, 8)
        .map((movie: any) => ({
          id: movie.id,
          title: movie.title || movie.name,
          image: `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`,
          metadata: {
            duration: "2h 15m", 
            year: (movie.release_date || movie.first_air_date)?.split("-")[0] || "2024", 
            language: movie.original_language?.toUpperCase() || "EN",
          },
        }));
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};
