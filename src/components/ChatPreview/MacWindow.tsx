"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export const MacWindow = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className="w-full max-w-2xl bg-zinc-950/40 backdrop-blur-3xl rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col mx-auto relative group isolate hover:border-white/20 transition-colors duration-500"
  >
    {/* Window Header */}
    <div className="h-10 bg-white/5 flex items-center px-6 gap-3 border-b border-white/5">
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-inner" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-inner" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-inner" />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 flex items-center gap-1.5">
          <Bot size={10} className="text-primary" />
          <span className="text-[9px] font-black text-zinc-400 font-mono tracking-[0.2em] uppercase">
            Story-Seeker-v1.0.core
          </span>
        </div>
      </div>
      <div className="w-12" /> {/* Spacer for balance */}
    </div>
 
    {/* Window Body */}
    <div className="flex-1 relative overflow-visible p-5 md:p-7 flex flex-col gap-5 md:gap-7">
      {children}
    </div>

    {/* Background Glows */}
    <div className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
    <div className="absolute -bottom-[20%] -left-[20%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
  </motion.div>
);
