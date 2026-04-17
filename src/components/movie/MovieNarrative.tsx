"use client";

import React from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface MovieNarrativeProps {
  movie: any;
}

export const MovieNarrative = ({ movie }: MovieNarrativeProps) => {
  return (
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

      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary">
            Key Contributors
          </h3>
          <div className="h-px w-full max-w-[400px] bg-white/5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {movie.cast
            .slice(0, 8)
            .map((person: any, i: number) => (
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
  );
};
