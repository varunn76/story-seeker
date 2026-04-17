import React from "react";
import { Bot, ArrowRight } from "lucide-react";
import Link from "next/link";

interface MovieDiscoveryPromptProps {
  title: string;
}

export const MovieDiscoveryPrompt = ({ title }: MovieDiscoveryPromptProps) => {
  return (
    <section className="px-6 md:px-12 pb-32">
      <div className="max-w-7xl mx-auto py-24 border-t border-white/5 text-center">
        <Bot className="w-12 h-12 text-primary mx-auto mb-8 animate-bounce-slow" />
        <h4 className="text-xl font-black italic uppercase tracking-tighter text-white mb-4">
          Want something similar?
        </h4>
        <p className="text-zinc-300 mb-10 max-w-sm mx-auto font-medium">
          Talk to StorySeeker AI to find films that match the mood and
          architecture of {title}.
        </p>
        <Link
          href={`/discover?title=${encodeURIComponent(title)}`}
          className="inline-flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 rounded-full text-white font-black uppercase text-xs hover:bg-white/10 transition-all group"
        >
          Start AI Discovery
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </section>
  );
};
