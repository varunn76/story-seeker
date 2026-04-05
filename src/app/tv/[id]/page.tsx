"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, Play, Star, Calendar, Globe, User, 
  List, Monitor, Share2, Plus, ArrowRight, Heart
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface TVDetail {
  tagline: string;
  name: string;
  description: string;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: { season_number: number; air_date: string }[] | number;
  number_of_episodes: number;
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
  seasons: {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    episode_count: number;
  }[];
}

const TVSkeleton = () => (
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
          </div>
          <div className="flex gap-4">
             <div className="h-16 w-48 bg-zinc-800 rounded-2xl animate-pulse" />
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
                  <div className="h-4 w-2/3 bg-zinc-800/40 rounded animate-pulse" />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
               {[1, 2].map(i => (
                 <div key={i} className="h-32 w-full bg-zinc-800/30 rounded-[32px] animate-pulse" />
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

import { useTVDetail, useWatchProviders } from "@/hooks/useContentDetail";

export default function TVDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const backdropOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.4]);
  const backdropScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);

  const { data: tv, isLoading: tvLoading, error: tvError } = useTVDetail(id);
  const { data: providers, isLoading: providersLoading } = useWatchProviders(id, "tv");

  const loading = tvLoading;
  const error = tvError ? (tvError instanceof Error ? tvError.message : "Error loading TV details") : null;

  const releaseYear = tv?.first_air_date?.split("-")[0] || "N/A";
  const trailer = tv?.videos?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
  const seasonCount = tv ? (Array.isArray(tv.number_of_seasons) ? tv.number_of_seasons.length : tv.number_of_seasons) : 0;

  return (
    <main ref={scrollRef} className="min-h-screen bg-[#0a0505] text-foreground selection:bg-primary/30 relative">

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TVSkeleton />
          </motion.div>
        ) : error || !tv ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6"
          >
            <div className="p-12 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-3xl">
              <Monitor className="w-16 h-16 text-primary mx-auto mb-6 opacity-40" />
              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-6">
                Broadcast Signal Lost
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
            <div className="fixed inset-0 w-full h-[110vh] -top-[10vh] pointer-events-none z-0 overflow-hidden">
              <motion.img
                style={{ opacity: backdropOpacity, scale: backdropScale }}
                src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
                className="w-full h-full object-cover grayscale-30 opacity-60"
                alt={tv.name}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0505] via-[#0a0505]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-linear-to-t from-[#0a0505] to-transparent" />

              <motion.div
                animate={{ x: [0, -100, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 12, repeat: Infinity, delay: 2 }}
                className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen"
              />
            </div>

            <div className="relative z-10 pt-32 space-y-24">
              <section className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
                  <div className="lg:col-span-4 hidden lg:block">
                    <div className="relative group">
                      <div className="absolute -inset-8 bg-blue-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="aspect-2/3 w-full bg-zinc-900 border border-white/10 rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative z-10 transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:-rotate-1">
                        <img 
                          src={`https://image.tmdb.org/t/p/w780${tv.poster_path}`} 
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
                        <span className="px-5 py-2 bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                          Series
                        </span>
                        <div className="flex gap-2">
                          {tv.genres.map((genre: string) => (
                            <span key={genre} className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/50">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="text-7xl md:text-[8rem] lg:text-[10rem] font-black italic uppercase tracking-tighter leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-linear-to-b from-white via-white to-white/30 bg-clip-text text-transparent"
                      >
                        {tv.name}
                      </motion.h1>

                      <div className="flex flex-wrap items-center gap-8 py-4 border-y border-white/5">
                        <div className="flex items-center gap-3 group">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-blue-500/20 group-hover:border-blue-500/30">
                            <Star className="w-5 h-5 text-blue-400 fill-blue-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 truncate">User Score</p>
                            <p className="text-2xl font-black italic tracking-tighter text-white">{tv.vote_average.toFixed(1)}</p>
                          </div>
                        </div>
                        <div className="w-px h-10 bg-white/5" />
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Premiered</p>
                          <p className="text-xl font-black italic text-white/80">{releaseYear}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Volume</p>
                          <p className="text-xl font-black italic text-white/80">{seasonCount} Seasons</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Source</p>
                          <p className="text-xl font-black italic text-white/80">{tv.original_language?.toUpperCase()}</p>
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

              <section className="bg-linear-to-b from-transparent via-[#0a0505] to-[#0a0505] relative z-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-40 space-y-32">
                  <div className="grid lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-8 space-y-12">
                      <div className="flex items-center gap-6">
                        <div className="w-2 h-12 bg-blue-500 rounded-full" />
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter">Season Synopsis</h3>
                      </div>
                      
                      {tv.tagline && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="text-4xl md:text-5xl font-black italic tracking-tighter leading-tight bg-linear-to-r from-white via-white/40 to-white/10 bg-clip-text text-transparent opacity-80"
                        >
                          &quot;{tv.tagline}&quot;
                        </motion.p>
                      )}

                      <p className="text-zinc-400 text-xl leading-relaxed font-medium max-w-4xl">
                        {tv.description}
                      </p>

                      <div className="pt-12 space-y-12">
                         <div className="flex items-center gap-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">Archived Chapters</h3>
                            <div className="h-px flex-1 bg-white/5" />
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {tv.seasons?.filter((s: any) => s.season_number > 0).map((season: any) => (
                             <motion.div 
                               key={season.id} 
                               whileHover={{ y: -5 }}
                               className="flex gap-6 bg-white/5 rounded-[32px] border border-white/10 p-6 backdrop-blur-3xl hover:border-blue-500/30 transition-all group"
                             >
                               <div className="w-28 aspect-2/3 shrink-0 rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl">
                                  {season.poster_path ? (
                                     <img 
                                       src={`https://image.tmdb.org/t/p/w185${season.poster_path}`} 
                                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                       alt={season.name} 
                                     />
                                  ) : (
                                     <div className="w-full h-full flex items-center justify-center text-zinc-800">
                                       <Monitor size={30} />
                                     </div>
                                  )}
                               </div>
                               <div className="space-y-3 py-1">
                                  <h4 className="text-white font-black uppercase italic tracking-tighter text-xl group-hover:text-blue-400 transition-colors">{season.name}</h4>
                                  <div className="flex items-center gap-3">
                                     <span className="text-blue-400/80 font-black text-[9px] uppercase tracking-widest px-2 py-0.5 bg-blue-400/10 rounded-md">{season.episode_count} Episodes</span>
                                     <span className="text-white/20 text-[9px] font-black uppercase tracking-widest">S{season.season_number} Archive</span>
                                  </div>
                                  <p className="text-zinc-500 text-sm line-clamp-2 leading-tight font-medium">{season.overview || "Narrative archive incomplete for this volume."}</p>
                               </div>
                             </motion.div>
                           ))}
                         </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 lg:pl-12 space-y-20">
                       <div className="p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] space-y-10 sticky top-32">
                          <div className="space-y-6">
                             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 text-center lg:text-left">Key Ensembles</h4>
                             <div className="space-y-6">
                                {tv.cast?.slice(0, 5).map((person: any) => (
                                   <Link href={`/person/${person.id}`} key={person.id} className="flex items-center gap-4 group">
                                      <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                                         <img 
                                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} 
                                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                                            alt={person.actor}
                                         />
                                      </div>
                                      <div>
                                         <p className="text-white font-black italic uppercase text-[12px] tracking-tight group-hover:text-blue-400 transition-colors">{person.actor}</p>
                                         <p className="text-zinc-500 font-bold text-[9px] uppercase tracking-widest truncate">{person.character}</p>
                                      </div>
                                   </Link>
                                ))}
                             </div>
                          </div>

                          <div className="pt-6 border-t border-white/5 space-y-8 text-center lg:text-left">
                             <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Available On</h4>
                                
                                {providers && (providers.flatrate || providers.rent || providers.buy) ? (
                                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                    {(providers.flatrate || []).map((p: any) => (
                                      <div key={p.provider_id} className="group relative">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:scale-110 active:scale-95 transition-all shadow-xl hover:shadow-blue-500/20">
                                          <img src={`https://image.tmdb.org/t/p/original${p.logo_path}`} alt={p.provider_name} className="w-full h-full object-cover" />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-[10px] font-bold text-white/10 italic">No region-specific stream data</p>
                                )}
                             </div>

                             <div className="pt-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Episode Inventory</h4>
                                <p className="text-3xl font-black italic tracking-tighter text-white">{tv.number_of_episodes}</p>
                             </div>
                             
                             <button className="w-full py-4 bg-white text-black font-black uppercase text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Stream Pilot
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="px-6 md:px-12 pb-32">
                <div className="max-w-7xl mx-auto py-24 border-t border-white/5 text-center">
                   <Monitor className="w-12 h-12 text-blue-400 mx-auto mb-8 animate-pulse" />
                   <h4 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">Continue the Marathon?</h4>
                   <p className="text-zinc-500 mb-10 max-w-sm mx-auto font-medium">Use StorySeeker AI to find series that match the world-building and character arcs of {tv.name}.</p>
                   <Link 
                     href={`/discover?title=${encodeURIComponent(tv.name)}`}
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
