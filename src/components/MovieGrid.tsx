"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Play, Info } from "lucide-react";

/* We'll use local images or external ones later, for now we show titles */

import { useState } from "react";
import { useTrendingMovies, TrendingMovie } from "@/hooks/useTrendingMovies";
import { ChevronDown, ChevronUp } from "lucide-react";
import MovieBackgroundPattern from "./MovieBackgroundPattern";
import Link from "next/link";

const MovieSkeleton = () => (
  <div className="relative aspect-2/3 bg-surface animate-pulse rounded-2xl border border-white/5 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
    <div className="absolute bottom-4 left-4 right-4 space-y-2">
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-1/2" />
    </div>
  </div>
);

export const MovieCard = ({ movie }: { movie: TrendingMovie }) => {
  return (
    <Link href={`/${movie.media_type || "movie"}/${movie.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -10 }}
        className="group relative cursor-pointer bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="relative aspect-2/3 w-full bg-zinc-800">
          <img
            src={movie.image}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-black/90 via-black/20 to-transparent">
            <div className="text-white text-center p-6 w-full transform transition-transform duration-300 group-hover:translate-y-[-10px]">
              <h4 className="font-bold text-lg mb-1 line-clamp-1">
                {movie.title}
              </h4>
              <p className="text-xs text-zinc-400">{movie.year}</p>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[2px]">
            <p className="text-white text-xs mb-6 line-clamp-4 font-medium leading-relaxed">
              {movie.description}
            </p>
            <div className="flex flex-col gap-2 w-full">
              {/* <div className="flex items-center justify-center gap-2 bg-white text-primary px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-zinc-100 transition-colors">
                <Play className="w-4 h-4 fill-current" /> Watch Now
              </div> */}
              <div className="flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-2.5 rounded-xl font-bold text-sm backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                <Info className="w-4 h-4" /> Details
              </div>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-1.5">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-white text-[10px] font-bold tracking-wider">
              {movie.rating}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const MovieGrid = () => {
  const { data: movies = [], isLoading: loading, error } = useTrendingMovies();
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-red-500/80 font-medium bg-red-500/10 px-6 py-3 rounded-full border border-red-500/20">
          Failed to load trending movies: {error instanceof Error ? error.message : "Undefined error"}
        </p>
      </div>
    );
  }

  const displayedMovies: TrendingMovie[] = isExpanded ? movies : movies.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* <MovieBackgroundPattern /> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {movies.length > 4 && (
        <div className="flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="text-white font-bold tracking-wide uppercase text-sm">
              {isExpanded ? "Show less" : "View all trending"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-primary animate-bounce-slow" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary group-hover:translate-y-1 transition-transform" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
