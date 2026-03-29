"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Cpu, Film } from "lucide-react";

const steps = [
  {
    title: "Describe",
    text: "Briefly describe what you remember about the movie.",
    icon: MessageSquare,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Analyze",
    text: "Our AI analyzes millions of movies to find a match.",
    icon: Cpu,
    color: "from-primary to-purple-500",
  },
  {
    title: "Discover",
    text: "Get the exact movie and similar recommendations.",
    icon: Film,
    color: "from-emerald-500 to-teal-500",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden isolate bg-[#151010]">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
          >
            <Cpu size={14} className="text-primary fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Simple Workflow
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
            How it Works
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            From a vague memory to the full movie title in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 md:gap-12 items-start">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 200, damping: 25 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[65%] w-[70%] h-[1px] bg-linear-to-r from-primary/30 via-primary/10 to-transparent" />
              )}

              <div
                className={`w-28 h-28 rounded-[2rem] bg-linear-to-br ${step.color} p-[1px] mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl`}
              >
                <div className="w-full h-full bg-[#1a1515] rounded-[31px] flex items-center justify-center group-hover:bg-transparent transition-all duration-500">
                  <step.icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">
                  Step 0{i + 1}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors italic">
                  {step.title}
                </h3>
                <p className="text-zinc-400 max-w-[260px] mx-auto text-sm leading-relaxed font-medium">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
