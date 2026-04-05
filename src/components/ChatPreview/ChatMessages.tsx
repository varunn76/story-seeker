"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MovieResultCard } from "./MovieResultCard";

export const UserMessage = ({ content }: { content: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="flex justify-end pr-0 sm:pr-4 pl-4 sm:pl-10"
  >
    <div className="bg-primary text-white p-4 sm:p-5 rounded-3xl sm:rounded-[40px] rounded-tr-lg sm:rounded-tr-xl shadow-[0_20px_40px_-10px_rgba(201,68,54,0.3)] font-bold text-sm sm:text-base leading-relaxed relative isolate overflow-hidden group/bubble">
      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent -z-10" />
      &quot;{content}&quot;
    </div>
  </motion.div>
);

export const AIMessage = ({
  content,
  movies,
}: {
  content: React.ReactNode;
  movies: any[];
}) => (
  <div className="flex gap-2 sm:gap-6 items-start">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl sm:rounded-3xl bg-linear-to-br from-[#c084fc] to-[#a855f7] flex items-center justify-center shrink-0 shadow-[0_15px_30px_-5px_rgba(168,85,247,0.4)] relative group/avatar overflow-hidden mt-1">
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover/avatar:rotate-12 transition-transform duration-500" />
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
    </div>

    <div className="flex-1 space-y-6 sm:space-y-10 group/response min-w-0">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900 shadow-2xl p-4 sm:p-6 rounded-3xl sm:rounded-[40px] rounded-tl-lg sm:rounded-tl-xl max-w-full sm:max-w-[90%] relative isolate overflow-hidden border border-white/5 leading-relaxed text-sm sm:text-lg"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent -z-10" />
        <div className="text-zinc-300 font-medium">{content}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4 sm:gap-6 overflow-x-auto pt-4 pb-8 -mx-4 px-4 sm:mx-0 sm:px-2 no-scrollbar relative overflow-visible"
      >
        {movies.map((movie, i) => (
          <MovieResultCard key={i} {...movie} />
        ))}
      </motion.div>
    </div>
  </div>
);
