"use client";
import React, { useRef } from "react";
import { useParams } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import { useMovieDetail, useWatchProviders } from "@/hooks/useContentDetail";
import {
  MovieSkeleton,
  MovieHero,
  MovieNarrative,
  MovieSidebar,
  MovieDiscoveryPrompt,
  MovieError,
} from "../../../components/movie";

export default function MovieDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const backdropOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.4]);
  const backdropScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  const {
    data: movie,
    isLoading: movieLoading,
    error: movieError,
  } = useMovieDetail(id);
  const { data: providers } = useWatchProviders(id, "movie");

  const loading = movieLoading;
  const error = movieError
    ? movieError instanceof Error
      ? movieError.message
      : "Error loading movie"
    : null;

  const releaseYear = movie?.release_date?.split("-")[0] || "N/A";
  const formattedRuntime = movie?.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";
  const trailer = movie?.videos?.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube",
  );

  return (
    <main
      ref={scrollRef}
      className="min-h-screen bg-[#0a0505] text-foreground selection:bg-primary/30 relative"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MovieSkeleton />
          </motion.div>
        ) : error || !movie ? (
          <MovieError error={error} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="fixed inset-0 w-full h-[140vh] -top-[10vh] pointer-events-none z-0 overflow-hidden">
              <motion.img
                style={{ opacity: backdropOpacity, scale: backdropScale }}
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="w-full h-full object-cover grayscale-20 sepia-10 opacity-60"
                alt={movie.title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0505] via-[#0a0505]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-linear-to-t from-[#0a0505] to-transparent" />

              <motion.div
                animate={{ x: [0, 100, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/15 blur-[150px] rounded-full mix-blend-screen"
              />
            </div>

            <div className="relative z-10 pt-32 space-y-24">
              <MovieHero
                movie={movie}
                releaseYear={releaseYear}
                formattedRuntime={formattedRuntime}
                trailer={trailer}
              />

              <section className="bg-linear-to-b from-transparent via-[#0a0505] to-[#0a0505] relative z-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-40 grid lg:grid-cols-12 gap-24">
                  <MovieNarrative movie={movie} />
                  <MovieSidebar movie={movie} providers={providers} />
                </div>
              </section>

              <MovieDiscoveryPrompt title={movie.title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
