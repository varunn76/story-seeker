"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";

interface MovieResultCardProps {
  id: number | string;
  title: string;
  year: string;
  genre: string;
  rating: string;
  image: string;
  media_type?: string;
}

export const MovieResultCard = ({
  id,
  title,
  year,
  genre,
  rating,
  image,
  media_type,
}: MovieResultCardProps) => (
  <Link href={`/${media_type || "movie"}/${id}`}>
    <motion.div
    whileHover={{
      y: -8,
      scale: 1.02,
      zIndex: 50,
      boxShadow: "0 10px 10px -10px rgba(201, 68, 54, 0.4)",
    }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className="shrink-0 w-[160px] sm:w-[208px] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer relative isolate hover:border-primary/50 transition-colors duration-500 shadow-xl"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10">
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </div>

    <div className="relative aspect-3/4 w-full bg-zinc-900 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115 group-hover:rotate-1"
      />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

      <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-black/60 backdrop-blur-xl rounded-lg sm:rounded-xl border border-white/10 flex items-center gap-1 sm:gap-1.5 scale-90 sm:scale-100 transition-transform duration-500">
        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500 fill-yellow-500" />
        <span className="text-[9px] sm:text-[11px] font-black text-white font-mono">
          {rating}
        </span>
      </div>
    </div>

    <div className="p-3 sm:p-5 bg-zinc-950/40 relative">
      <h4 className="text-xs sm:text-sm font-black text-white truncate mb-1 sm:mb-1.5 tracking-tight group-hover:text-primary transition-colors">
        {title}
      </h4>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <span className="text-[8px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none">
          {year}
        </span>
        <div className="w-1 h-1 rounded-full bg-zinc-700 sm:block hidden" />
        <span className="text-[8px] sm:text-[10px] text-zinc-500 font-medium uppercase truncate leading-none">
          {genre}
        </span>
      </div>
      <div className="h-0.5 sm:h-1 w-10 sm:w-12 bg-primary/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-primary shadow-[0_0_10px_rgba(229,62,62,0.5)]"
        />
      </div>
    </div>

    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
  </motion.div>
</Link>
);
