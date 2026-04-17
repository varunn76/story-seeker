"use client";

import React from "react";
import { Info, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface MovieErrorProps {
  error: string | null;
}

export const MovieError = ({ error }: MovieErrorProps) => {
  const router = useRouter();
  
  return (
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
  );
};
