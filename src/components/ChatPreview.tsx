"use client";

import React from "react";
import { motion } from "framer-motion";
import { MacWindow } from "./ChatPreview/MacWindow";
import { ChatFeature } from "./ChatPreview/ChatFeature";
import { UserMessage, AIMessage } from "./ChatPreview/ChatMessages";
import { FEATURES, SUGGESTED_MOVIES } from "@/constants";

export const ChatPreview = () => {
  return (
    <section className="py-20 px-3 sm:px-6 relative overflow-visible bg-[#151010] isolate">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
        <div className="space-y-8 sm:space-y-10 lg:pr-10">
          <div className="space-y-4">
            <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-6xl font-black text-white tracking-tighter leading-[0.95] sm:leading-[0.9]">
              Talk to AI <br className="hidden sm:block" />
              <span className="text-primary relative italic">
                Like a Friend
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 sm:h-1.5 bg-primary/30 rounded-full"
                />
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-lg font-medium">
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

        <div className="relative group">
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
