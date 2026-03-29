"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  ChevronLeft,
  Play,
  Star,
  Calendar,
  Clock,
  Globe,
  User,
  Info,
  Share2,
  Plus,
  ArrowRight,
  Heart,
  Bot,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

interface MovieDetail {
  tagline: string;
  title: string;
  description: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: string[];
  original_language: string;
  cast: {
    id: number;
    actor: string;
    character: string;
    profile_path: string | null;
  }[];
  director: { name: string }[];
  videos: { key: string; site: string; type: string }[];
}

const MovieSkeleton = () => (
  <div className="min-h-screen bg-[#0a0505] overflow-hidden">
    <div className="h-[80vh] bg-zinc-900/40 relative animate-pulse">
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0505] via-transparent" />
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-64 relative z-10">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
        <div className="lg:col-span-4 hidden lg:block aspect-2/3 bg-zinc-800 rounded-[60px] animate-pulse shadow-2xl" />
        <div className="lg:col-span-8 space-y-10 pb-4">
          <div className="space-y-6">
            <div className="h-8 w-32 bg-zinc-800 rounded-full animate-pulse" />
            <div className="space-y-4">
              <div className="h-24 w-full bg-zinc-800 rounded-3xl animate-pulse" />
              <div className="h-24 w-2/3 bg-zinc-800/50 rounded-3xl animate-pulse" />
            </div>
            <div className="flex gap-8 py-6 border-y border-white/5">
              <div className="h-12 w-24 bg-zinc-800 rounded-2xl animate-pulse" />
              <div className="h-12 w-24 bg-zinc-800 rounded-2xl animate-pulse" />
              <div className="h-12 w-24 bg-zinc-800 rounded-2xl animate-pulse" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-16 w-48 bg-zinc-800 rounded-2xl animate-pulse" />
            <div className="h-16 w-16 bg-zinc-800 rounded-2xl animate-pulse" />
            <div className="h-16 w-16 bg-zinc-800 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>

      <div className="py-40 grid lg:grid-cols-12 gap-24">
        <div className="lg:col-span-8 space-y-20">
          <div className="space-y-8">
            <div className="h-10 w-48 bg-zinc-800 rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-zinc-800/40 rounded animate-pulse" />
              <div className="h-4 w-full bg-zinc-800/40 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-zinc-800/40 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-zinc-800 rounded-[32px] animate-pulse" />
                <div className="h-3 w-2/3 bg-zinc-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 lg:pl-12">
          <div className="h-96 w-full bg-zinc-800/30 rounded-[48px] animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

import { useMovieDetail, useWatchProviders } from "@/hooks/useContentDetail";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const backdropOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.4]);
  const backdropScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  const { data: movie, isLoading: movieLoading, error: movieError } = useMovieDetail(id);
  const { data: providers, isLoading: providersLoading } = useWatchProviders(id, "movie");

  const loading = movieLoading;
  const error = movieError ? (movieError instanceof Error ? movieError.message : "Error loading movie") : null;

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
      <Navbar />

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
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6"
          >
            <div className="p-12 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-3xl">
              <Info className="w-16 h-16 text-primary mx-auto mb-6 opacity-40" />
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6">
                {error || "Project Abandoned"}
              </h2>
              <button
                onClick={() => router.back()}
                className="group flex items-center gap-3 px-10 py-4 bg-primary text-white font-black uppercase text-sm rounded-2xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Return to Discovery
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Cinematic Backdrop with Parallax */}
            <div className="fixed inset-0 w-full h-[140vh] -top-[10vh] pointer-events-none z-0 overflow-hidden">
              <motion.img
                style={{ opacity: backdropOpacity, scale: backdropScale }}
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                className="w-full h-full object-cover grayscale-20 sepia-10 opacity-60"
                alt={movie.title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0505] via-[#0a0505]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-linear-to-t from-[#0a0505] to-transparent" />

              {/* Animated Light Leaks */}
              <motion.div
                animate={{ x: [0, 100, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/15 blur-[150px] rounded-full mix-blend-screen"
              />
            </div>

            <div className="relative z-10 pt-32 space-y-24">
              {/* Main Content Layout */}
              <section className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
                  {/* Poster Corner */}
                  <div className="lg:col-span-4 hidden lg:block">
                    <div className="relative group">
                      <div className="absolute -inset-8 bg-primary/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="aspect-2/3 w-full bg-zinc-900 border border-white/10 rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative z-10 transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:rotate-1">
                        <img
                          src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          alt="Poster"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/0 via-transparent to-white/10 opacity-60 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Title Block */}
                  <div className="lg:col-span-8 space-y-10 pb-4">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-4 items-center">
                        <span className="px-5 py-2 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-primary shadow-[0_0_30px_rgba(201,68,54,0.3)]">
                          Motion Picture
                        </span>
                        <div className="flex gap-2">
                          {movie.genres.map((genre: string) => (
                            <span
                              key={genre}
                              className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/50"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className="text-7xl line-clamp-3 md:text-[8rem] lg:text-[10rem] font-black italic uppercase tracking-tighter leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-linear-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
                      >
                        {movie.title}
                      </motion.h1>

                      <div className="flex flex-wrap items-center gap-8 py-4 border-y border-white/5">
                        <div className="flex items-center gap-3 group">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-primary/20 group-hover:border-primary/30">
                            <Star className="w-5 h-5 text-primary fill-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">
                              User Score
                            </p>
                            <p className="text-2xl font-black italic tracking-tighter text-white">
                              {movie.vote_average.toFixed(1)}
                            </p>
                          </div>
                        </div>
                        <div className="w-px h-10 bg-white/5" />
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                            Release
                          </p>
                          <p className="text-xl font-black italic text-white/80">
                            {releaseYear}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                            Duration
                          </p>
                          <p className="text-xl font-black italic text-white/80">
                            {formattedRuntime}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                            Language
                          </p>
                          <p className="text-xl font-black italic text-white/80">
                            {movie.original_language.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {trailer && (
                        <a
                          href={`https://www.youtube.com/watch?v=${trailer.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-12 py-5 bg-white text-black font-black uppercase text-sm rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                        >
                          <Play className="w-5 h-5 fill-current" />
                          Watch Trailer
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      )}
                      <button className="w-16 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90">
                        <Plus className="w-6 h-6" />
                      </button>
                      <button className="w-16 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-90 opacity-40 hover:opacity-100">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="group w-16 h-16 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all hover:scale-110 active:scale-90">
                        <Heart className="w-5 h-5 group-hover:fill-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cinematic Details Grid */}
              <section className="bg-linear-to-b from-transparent via-[#0a0505] to-[#0a0505] relative z-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-40 grid lg:grid-cols-12 gap-24">
                  {/* Story Side */}
                  <div className="lg:col-span-8 space-y-20">
                    <div className="space-y-12">
                      <div className="flex items-center gap-6">
                        <div className="w-2 h-12 bg-primary rounded-full" />
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter">
                          The Narrative
                        </h3>
                      </div>

                      {movie.tagline && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="text-4xl md:text-5xl font-black italic tracking-tighter leading-tight bg-linear-to-r from-white via-white/40 to-white/10 bg-clip-text text-transparent opacity-80"
                        >
                          &quot;{movie.tagline}&quot;
                        </motion.p>
                      )}

                      <p className="text-zinc-400 text-xl leading-relaxed font-medium max-w-4xl selection:bg-primary/20">
                        {movie.description}
                      </p>
                    </div>

                    {/* Cast & Crew Section */}
                    <div className="space-y-12">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary">
                          Key Contributors
                        </h3>
                        <div className="h-px w-full max-w-[400px] bg-white/5" />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {movie.cast.slice(0, 8).map((person: any, i: number) => (
                          <motion.div
                            key={person.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <Link
                              href={`/person/${person.id}`}
                              className="group block space-y-4"
                            >
                              <div className="aspect-square rounded-[32px] overflow-hidden bg-zinc-900 border border-white/5 relative isolate">
                                {person.profile_path ? (
                                  <img
                                    src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
                                    className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                    alt={person.actor}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-zinc-800 bg-zinc-900">
                                    <User size={40} />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity" />
                                <div className="absolute inset-x-0 bottom-0 py-4 px-2 bg-linear-to-t from-black to-transparent opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                                  <span className="text-[9px] font-black text-white uppercase text-center block tracking-widest">
                                    Profile Details
                                  </span>
                                </div>
                              </div>
                              <div className="pl-1">
                                <p className="text-white font-black italic uppercase text-[12px] tracking-tight group-hover:text-primary transition-colors">
                                  {person.actor}
                                </p>
                                <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest truncate">
                                  {person.character}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Details */}
                  <div className="lg:col-span-4 lg:pl-12">
                    <div className="p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] space-y-12 h-fit text-center lg:text-left sticky top-32">
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                          Architected By
                        </h4>
                        <p className="text-2xl font-black italic uppercase tracking-tighter text-white">
                          {movie.director?.[0]?.name || "Visionary Director"}
                        </p>
                      </div>



                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                          Global Origin
                        </h4>
                        <p className="text-lg font-bold text-white/80">
                          {movie.original_language.toUpperCase()} • Worldwide
                          Release
                        </p>
                      </div>

                      <div className="pt-8 space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-center lg:text-left">
                          Watch Now
                        </h4>
                        
                        {providers && (providers.flatrate || providers.rent || providers.buy) ? (
                          <div className="space-y-6">
                            {providers.flatrate && (
                              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                {providers.flatrate.map((provider: any) => (
                                  <div key={provider.provider_id} className="group relative">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:scale-110 active:scale-95 transition-all shadow-xl hover:shadow-primary/20">
                                      <img 
                                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                                        alt={provider.provider_name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-[8px] font-black uppercase px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                      {provider.provider_name}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {!providers.flatrate && (providers.rent || providers.buy) && (
                              <div className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center lg:text-left">
                                Available for {providers.rent ? "Rent" : "Buy Only"}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm font-bold text-white/20 italic">
                            Streaming data currently unavailable for your region.
                          </div>
                        )}

                        <div className="pt-8 border-t border-white/5">
                           <button className="w-full py-4 bg-white text-black font-black uppercase text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                              Start Streaming
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer Area */}
              <section className="px-6 md:px-12 pb-32">
                <div className="max-w-7xl mx-auto py-24 border-t border-white/5 text-center">
                  <Bot className="w-12 h-12 text-primary mx-auto mb-8 animate-bounce-slow" />
                  <h4 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">
                    Want something similar?
                  </h4>
                  <p className="text-zinc-500 mb-10 max-w-sm mx-auto font-medium">
                    Talk to StorySeeker AI to find films that match the mood and
                    architecture of {movie.title}.
                  </p>
                  <Link
                    href={`/discover?title=${encodeURIComponent(movie.title)}`}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 rounded-full text-white font-black uppercase text-xs hover:bg-white/10 transition-all group"
                  >
                    Start AI Discovery
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
