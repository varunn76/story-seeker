import { useQuery } from "@tanstack/react-query";
import { internalHeaders } from "@/utils/internalHeaders";

export const useMovieDetail = (id: string | string[]) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await fetch(`/api/movie?id=${id}`, {
        headers: internalHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch movie details");
      return response.json();
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};

export const useTVDetail = (id: string | string[]) => {
  return useQuery({
    queryKey: ["tv", id],
    queryFn: async () => {
      const response = await fetch(`/api/tv?id=${id}`, {
        headers: internalHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch TV details");
      return response.json();
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};

export const usePersonDetail = (id: string | string[]) => {
  return useQuery({
    queryKey: ["person", id],
    queryFn: async () => {
      const response = await fetch(`/api/person?castId=${id}`, {
        headers: internalHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch person details");
      const json = await response.json();
      return json.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};

export const useWatchProviders = (id: string | string[], type: "movie" | "tv") => {
  return useQuery({
    queryKey: ["watch-providers", type, id],
    queryFn: async () => {
      const response = await fetch(`/api/watch-providers?id=${id}&type=${type}`, {
        headers: internalHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch providers");
      const providerData = await response.json();
      return providerData.data.US || {};
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 12,
  });
};
