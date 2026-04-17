"use client";

import React from "react";
import { Star, Play, Plus, Share2, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface MovieHeroProps {
  movie: any;
  releaseYear: string;
  formattedRuntime: string;
  trailer: any;
}

export const MovieHero = ({ movie, releaseYear, formattedRuntime, trailer }: MovieHeroProps) => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
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
  );
};
