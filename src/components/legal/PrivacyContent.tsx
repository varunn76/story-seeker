"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Server,
  RefreshCw,
  Smartphone,
  Film,
} from "lucide-react";
import Link from "next/link";
import { PRIVACY_SECTION } from "@/constants";

const PrivacyContent = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none -z-10" />
      <div className="pt-28 pb-12 px-6 text-center max-w-4xl">
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8"
        >
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-[10px] sm:text-xs font-black text-primary tracking-widest uppercase italic">
            Privacy First Architecture
          </span>
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8"
        >
          Your Privacy at <br className="hidden sm:block" />
          <span className="text-zinc-600 font-outline-2 text-[2.5rem] sm:text-[3.5rem] md:text-6xl italic">
            StorySeeker
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto"
        >
          StorySeeker is designed to work without collecting personal
          information. We don&apos;t store your data because we never ask for
          it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 inline-flex items-center gap-3 px-6 py-3 bg-green-500/5 border border-green-500/20 rounded-2xl"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs sm:text-sm text-green-400 font-bold uppercase tracking-tight">
            No server-side data storage identified
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 pb-24 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRIVACY_SECTION.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 sm:p-10 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] relative group overflow-hidden h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/[0.03] to-transparent pointer-events-none" />

              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <section.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                {section.title}
              </h3>

              <p className="text-zinc-400 leading-relaxed font-medium text-sm sm:text-base flex-1">
                {section.content}
              </p>

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 sm:p-12 bg-zinc-900/60 border border-white/5 rounded-[40px] text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Questions?
          </h2>

          <p className="text-zinc-500 max-w-xl mx-auto mb-6">
            We keep things simple — no data storage, no tracking. For details on
            external services, see{" "}
            <Link
              href="https://www.themoviedb.org/privacy-policy"
              target="_blank"
              className="text-primary hover:underline"
            >
              TMDB’s privacy policy
            </Link>
            .
          </p>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            Contact us
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default PrivacyContent;
