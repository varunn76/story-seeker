"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Star, Calendar, User, Film, Tv, MapPin, Heart, ArrowRight, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PersonDetail {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  birthday: string;
  place_of_birth: string;
  known_for_department: string;
  combined_credits: {
    cast: {
      id: number;
      title?: string;
      name?: string;
      media_type: "movie" | "tv";
      poster_path: string | null;
      release_date?: string;
      first_air_date?: string;
      vote_average: number;
      character: string;
    }[];
  };
}

const PersonSkeleton = () => (
  <div className="min-h-screen bg-[#0a0505] overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-24 py-32 space-y-32">
       <div className="grid md:grid-cols-12 gap-16 items-start pb-32 border-b border-white/5">
          <div className="md:col-span-4 aspect-2/3 bg-zinc-800 rounded-[60px] animate-pulse shadow-2xl" />
          <div className="md:col-span-8 space-y-12 pt-10">
             <div className="h-4 w-24 bg-zinc-800 rounded-full animate-pulse" />
             <div className="space-y-6">
                <div className="h-10 w-48 bg-zinc-800 rounded-xl animate-pulse" />
                <div className="h-32 w-full bg-zinc-800/40 rounded-[32px] animate-pulse" />
             </div>
             <div className="flex gap-10">
                <div className="h-6 w-32 bg-zinc-800/50 rounded-lg animate-pulse" />
                <div className="h-6 w-32 bg-zinc-800/50 rounded-lg animate-pulse" />
             </div>
             <div className="space-y-8">
                <div className="h-10 w-64 bg-zinc-800 rounded-xl animate-pulse" />
                <div className="space-y-4">
                   <div className="h-4 w-full bg-zinc-800/30 rounded animate-pulse" />
                   <div className="h-4 w-full bg-zinc-800/30 rounded animate-pulse" />
                   <div className="h-4 w-2/3 bg-zinc-800/30 rounded animate-pulse" />
                </div>
             </div>
          </div>
       </div>

       <div className="space-y-16">
          <div className="h-10 w-72 bg-zinc-800 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
             {[1, 2, 3, 4, 5, 6].map(i => (
               <div key={i} className="aspect-2/3 bg-zinc-800/40 rounded-3xl animate-pulse" />
             ))}
          </div>
       </div>
    </div>
  </div>
);

import { usePersonDetail } from "@/hooks/useContentDetail";

export default function PersonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: person, isLoading: loading, error: personError } = usePersonDetail(id);
  const error = personError ? (personError instanceof Error ? personError.message : "Error loading person") : null;

  const sortedCredits = person?.combined_credits.cast
    .filter((c: any) => c.poster_path)
    .sort((a: any, b: any) => (b.vote_average || 0) - (a.vote_average || 0))
    .slice(0, 24) || [];

  return (
    <main className="min-h-screen bg-[#0a0505] text-foreground selection:bg-primary/30">

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PersonSkeleton />
          </motion.div>
        ) : error || !person ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6"
          >
            <div className="p-12 bg-white/5 border border-white/10 rounded-[40px] max-w-md">
              <User className="w-16 h-16 text-primary mx-auto mb-6 opacity-30" />
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-6">
                {error || "Subject Identity Unknown"}
              </h2>
              <button
                onClick={() => router.back()}
                className="px-10 py-4 bg-primary text-white font-black uppercase text-xs rounded-2xl hover:scale-105 active:scale-95 transition-all"
              >
                Go Back
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
            <section className="px-6 md:px-24 py-32 space-y-32 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-12 gap-16 items-start border-b border-white/5 pb-32">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="md:col-span-4 relative group"
                >
                  <div className="absolute -inset-10 bg-primary/20 blur-[100px] opacity-40 transition-opacity" />
                  <div className="aspect-2/3 md:aspect-auto w-full bg-zinc-900 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] rounded-[60px] overflow-hidden relative z-10 transition-transform duration-1000 transform-gpu group-hover:scale-[1.03] group-hover:rotate-1">
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/h632${person.profile_path}`}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        alt={person.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-800 py-32">
                        <User size={120} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  </div>
                </motion.div>

                <div className="md:col-span-8 space-y-12 pt-10">
                  <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-black text-[10px] uppercase tracking-[0.3em] mb-4 group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                    Return
                  </button>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-[0_0_20px_rgba(201,68,54,0.3)]">
                        {person.known_for_department}
                      </span>
                    </div>
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] bg-linear-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
                    >
                      {person.name}
                    </motion.h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
                    {person.birthday && (
                      <div className="flex items-center gap-3 group">
                        <Calendar className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-white transition-colors">
                          Originated: {new Date(person.birthday).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {person.place_of_birth && (
                      <div className="flex items-center gap-3 group">
                        <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="group-hover:text-white transition-colors">
                          {person.place_of_birth}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Identity Dossier</h3>
                      <div className="h-px w-20 bg-white/5" />
                    </div>
                    <p className="text-zinc-400 text-xl leading-relaxed font-medium max-w-3xl selection:bg-primary/20">
                      {person.biography || "Subject narrative archived but inaccessible for the current session."}
                    </p>

                    <div className="flex gap-4 pt-4">
                      <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-white font-black uppercase text-[10px] hover:bg-white/10 hover:scale-105 active:scale-95 transition-all">
                        <Heart size={14} /> Follow Talent
                      </button>
                      <button className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 hover:text-white transition-all">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-16">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-1.5 h-10 bg-primary rounded-full" />
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter">Iconic Contributions</h3>
                  </div>
                  <div className="hidden md:flex gap-6 text-[10px] font-black text-white/20 uppercase tracking-widest">
                    <span className="text-primary">All Works</span>
                    <span>Film</span>
                    <span>Legacy</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  <AnimatePresence>
                    {sortedCredits.map((credit: any, i: number) => (
                      <motion.div
                        key={`${credit.id}-${credit.media_type}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -10 }}
                        transition={{ delay: i * 0.03 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <Link href={`/${credit.media_type}/${credit.id}`}>
                          <div className="space-y-4 cursor-pointer">
                            <div className="aspect-2/3 rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 relative isolate transition-all duration-700 shadow-2xl group-hover:shadow-primary/20">
                              <img
                                src={`https://image.tmdb.org/t/p/w342${credit.poster_path}`}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt={credit.title || credit.name}
                              />
                              <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-1.5 group-hover:scale-110 transition-transform">
                                {credit.media_type === "movie" ? (
                                  <Film size={12} className="text-primary" />
                                ) : (
                                  <Tv size={12} className="text-blue-400" />
                                )}
                                <span className="text-[9px] font-black text-white uppercase tracking-tighter">
                                  {credit.media_type}
                                </span>
                              </div>
                              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                            </div>
                            <div className="pl-1">
                              <p className="text-white font-black uppercase text-[12px] tracking-tight truncate group-hover:text-primary transition-colors">
                                {credit.title || credit.name}
                              </p>
                              <p className="text-zinc-600 font-bold text-[10px] uppercase truncate tracking-widest">
                                {credit.character || "Protagonist"}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            <div className="fixed bottom-0 left-0 w-full h-64 bg-linear-to-t from-black to-transparent pointer-events-none opacity-40 z-0" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="fixed -bottom-40 -right-40 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
