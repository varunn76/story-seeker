"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Film, Sparkles, Search } from "lucide-react";
import { MacWindow } from "./ChatPreview/MacWindow";
import { ChatFeature } from "./ChatPreview/ChatFeature";
import { UserMessage, AIMessage } from "./ChatPreview/ChatMessages";

const FEATURES = [
  {
    icon: Search,
    title: "Understands Partial Memories",
    desc: "Works with incomplete scenes, characters, or ideas",
  },
  {
    icon: Bot,
    title: "Guided Discovery",
    desc: "Asks the right questions to narrow it down",
  },
  {
    icon: Film,
    title: "Accurate Matches",
    desc: "Finds the closest results, not just guesses",
  },
];

const SUGGESTED_MOVIES = [
  {
    id: 157336,
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi/Drama",
    rating: "8.4",
    image: `${process.env.NEXT_PUBLIC_IMAGE_URI}/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg`,
  },
  {
    id: 329,
    title: "Shutter Island",
    year: "2010",
    genre: "Mystery/Thriller",
    rating: "8.2",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
  },
];

export const ChatPreview = () => {
  return (
    <section className="py-12 px-6 relative overflow-visible bg-[#151010] isolate">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10 lg:pr-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
              Talk to AI <br />
              <span className="text-primary relative italic">
                Like a Friend
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1.5 bg-primary/30 rounded-full"
                />
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xl leading-relaxed max-w-lg font-medium">
            Just describe what you remember — a scene, a feeling, or a fragment
            of the story. The system pieces it together and surfaces the closest
            matches in seconds.
          </p>

          <div className="grid grid-cols-1 gap-6 pt-4">
            {FEATURES.map((feature, i) => (
              <ChatFeature key={i} {...feature} index={i} />
            ))}
          </div>
        </div>

        <div className="relative group/window">
          <MacWindow>
            <UserMessage content="I'm looking for a film where people enter dreams within dreams to steal secrets from the subconscious." />

            <AIMessage
              content={
                <p>
                  That&apos;s definitely{" "}
                  <span className="text-white font-black underline decoration-primary underline-offset-4 decoration-2">
                    Inception (2010)
                  </span>
                  , a masterpiece by Christopher Nolan. If you enjoy
                  mind-bending reality, check these out:
                </p>
              }
              movies={SUGGESTED_MOVIES}
            />
          </MacWindow>

          {/* Exterior Orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 blur-[120px] rounded-full -z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-purple-600/10 blur-[150px] rounded-full -z-10"
          />
        </div>
      </div>
    </section>
  );
};
