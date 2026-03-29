"use client";

import React from "react";
import Link from "next/link";
import { Search, User } from "lucide-react";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[95%] max-w-7xl px-8 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
      <div className="flex items-center">
        <Link
          href="/"
          className="text-xl font-black cursor-pointer tracking-tighter text-primary uppercase italic"
        >
          StorySeeker
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-10">
        <Link
          href="/discover"
          className="text-sm font-bold text-white/70 hover:text-white transition-colors"
        >
          Discover
        </Link>
        <Link
          href="/#trending"
          className="text-sm font-bold text-white/70 hover:text-white transition-colors"
        >
          Trending
        </Link>
        <Link
          href="/discover"
          className="text-sm font-bold text-white/70 hover:text-white transition-colors"
        >
          Library
        </Link>
      </div>

      <Link
        href="/discover"
        className="inline-flex items-center gap-3 px-2 py-1 text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-full border border-white/5 transition-all hover:scale-105"
      >
        <span className="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-white">
          <Search className="w-5 h-5" strokeWidth={2.5} />
        </span>
        <span>Start Searching</span>
      </Link>
    </nav>
  );
};

export default Navbar;
