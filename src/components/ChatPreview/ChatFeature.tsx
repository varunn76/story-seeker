"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ChatFeatureProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}

export const ChatFeature = ({
  icon: Icon,
  title,
  desc,
  index,
}: ChatFeatureProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center gap-5 group"
  >
    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500 shrink-0">
      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
    </div>
    <div>
      <h4 className="text-white font-bold text-lg leading-none mb-1">
        {title}
      </h4>
      <p className="text-zinc-500 text-sm font-medium">{desc}</p>
    </div>
  </motion.div>
);
