"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, Check, Heart } from "lucide-react";
import Link from "next/link";

import { TERMS_POINTS } from "@/constants";

const TermsContent = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none -z-10" />

      <div className="pt-28 pb-16 px-6 text-center max-w-4xl">
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
        >
          <Scale className="w-4 h-4 text-blue-500" />
          <span className="text-[10px] sm:text-xs font-black text-blue-500 tracking-widest uppercase italic">
            Platform Guidelines
          </span>
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8"
        >
          The Rules of <br className="hidden sm:block" />
          <span className="text-zinc-600 font-outline-2 text-[2.5rem] sm:text-[3.5rem] md:text-6xl italic">
            Engagement
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto"
        >
          These terms outline how StorySeeker works and what you can expect when
          using the platform. By using the service, you agree to these
          guidelines.
        </motion.p>
      </div>

      <div className="container mx-auto px-6 pb-24 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TERMS_POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] relative group overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/[0.03] to-transparent pointer-events-none" />

              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Check className="w-5 h-5 text-green-500" />
              </div>

              <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                {point.title}
              </h3>

              <p className="text-zinc-500 text-sm leading-relaxed font-medium flex-1">
                {point.desc}
              </p>

              <div className="mt-6 h-[2px] w-12 bg-white/10 group-hover:w-full group-hover:bg-primary/50 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
        <p className="text-[11px] text-zinc-500 text-center mt-10 max-w-xl mx-auto">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <p className="text-[11px] text-zinc-500 text-center mt-4 max-w-xl mx-auto">
          AI-generated responses are based on patterns and may not always be
          accurate or complete. Users should verify critical information
          independently.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-10 sm:p-14 bg-zinc-900/60 border border-white/5 rounded-[50px] relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-colors" />

          <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center border border-primary/30 rotate-12 group-hover:rotate-0 transition-transform duration-500 shrink-0">
              <Heart className="w-10 h-10 text-primary fill-primary/30" />
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 relative z-10">
                Respect for the Story
              </h2>
              <p className="text-zinc-400 font-medium leading-relaxed relative z-10">
                StorySeeker is built to make discovering stories easier and more
                intuitive. We ask users to respect the platform, the data, and
                the experience for everyone.
              </p>
            </div>

            <Link
              href="/"
              className="px-10 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-transform active:scale-95 shadow-2xl whitespace-nowrap relative z-10"
            >
              Accept & Start Seeking
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default TermsContent;
