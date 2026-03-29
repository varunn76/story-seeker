'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, LayoutGrid, BrainCircuit } from 'lucide-react';
import MovieBackgroundPattern from './MovieBackgroundPattern';

const features = [
  {
    title: "Smart AI Search",
    description: "Understands vague descriptions, plot twists, and specific scenes with unprecedented accuracy.",
    icon: Search,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  },
  {
    title: "Multi-Model Support",
    description: "Powered by the world's most capable models including GPT-4, Claude 3.5, and Gemini 1.5 Pro.",
    icon: BrainCircuit,
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    title: "Instant Results",
    description: "Get lightning-fast movie suggestions complete with posters, ratings, and where to watch.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  },
  {
    title: "Memory-Based Discovery",
    description: "Specifically tuned for those 'I remember a movie where...' moments that regular search fails.",
    icon: LayoutGrid,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  }
];

export const Features = () => {
  return (
    <section id="features" className="relative py-32 px-6 bg-[#120a0a] overflow-hidden isolate">
      <MovieBackgroundPattern />

      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
          >
            <Zap size={14} className="text-primary fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Core Capabilities
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
            Designed for <br />
            <span className="text-primary italic relative">
              Movie Lovers
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-1.5 bg-primary/30 rounded-full"
              />
            </span>
          </h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto font-medium pt-4">
            Experience a new way of discovering cinema through natural conversation and advanced AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                boxShadow: "0 20px 40px -10px rgba(229, 62, 62, 0.15)",
              }}
              className="p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] group relative overflow-hidden transition-colors hover:border-primary/40"
            >
              {/* Card Glint */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${feature.color.replace('bg-', 'bg-').replace('text-', 'text-')}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed font-medium group-hover:text-zinc-200 transition-colors">
                {feature.description}
              </p>

              {/* Hover Inner Glow */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
