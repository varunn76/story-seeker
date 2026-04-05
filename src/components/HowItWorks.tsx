"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { steps } from "@/constants";
import { Cpu } from "lucide-react";



export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 px-6 relative overflow-hidden isolate bg-[#151010]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-[0_5px_15px_-5px_rgba(201,68,54,0.3)]"
          >
            <Cpu size={14} className="text-primary fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
              Simple Workflow
            </span>
          </motion.div>
          <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-5xl font-black text-white tracking-tighter leading-[0.95] sm:leading-[1.1]">
            How it Works
          </h2>
          <p className="text-zinc-500 text-lg sm:text-xl max-w-2xl mx-auto font-medium px-4 sm:px-0">
            From a vague memory to the full movie title in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 md:gap-12 items-start">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 25 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[65%] w-[70%] h-[px] bg-linear-to-r from-primary/30 via-primary/10 to-transparent" />
              )}

              <div
                className={cn("w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-linear-to-br p-[1px] mb-8 sm:mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl overflow-hidden", step.color)}
              >
                <div className="w-full h-full bg-[#1a1515] rounded-[31px] flex items-center justify-center group-hover:bg-transparent transition-all duration-500 group-active:scale-90 overflow-hidden">
                  <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>

              <div className="space-y-3 px-4 sm:px-0">
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">
                  Step 0{i + 1}
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-primary transition-colors italic">
                  {step.title}
                </h3>
                <p className="text-zinc-500 max-w-[260px] mx-auto text-sm leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">
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
