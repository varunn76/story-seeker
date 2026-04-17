"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  if (pathname?.startsWith("/discover")) return null;

  const links = [
    { label: "Discover", href: "/discover" },
    { label: "Trending", href: "/#trending" },
    { label: "Library", href: "/discover" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="relative flex items-center justify-between px-4 sm:px-8 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg transition-all duration-300">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-lg sm:text-xl font-black cursor-pointer tracking-tighter text-primary uppercase italic"
          >
            StorySeeker
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/discover"
            className="inline-flex items-center gap-1 sm:gap-3 px-1 sm:px-1.5 py-1 text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-full border border-white/5 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <span className="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-white shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </span>
            <span className="hidden sm:inline-block pr-3">Start Searching</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-4 p-4 bg-black/60 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {links.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex px-6 py-4 text-lg font-bold text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all active:bg-white/10"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
