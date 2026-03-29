'use client';

import { Film, Mail, Globe, Video } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-lg">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              AI<span className="text-primary">Movie</span>Finder
            </span>
          </div>
          <p className="text-text-secondary text-sm max-w-[200px]">
            The smarter way to find your next favorite movie.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <Link href="#" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">Privacy</Link>
          <Link href="#" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">Terms</Link>
          <Link href="#" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">API</Link>
          <Link href="#" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">Contact</Link>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex items-center gap-4">
            <Link href="https://github.com" className="p-2 bg-surface border border-white/5 rounded-full hover:border-primary/50 transition-colors">
              <Mail className="w-5 h-5 text-text-secondary" />
            </Link>
            <Link href="#" className="p-2 bg-surface border border-white/5 rounded-full hover:border-primary/50 transition-colors">
              <Globe className="w-5 h-5 text-text-secondary" />
            </Link>
            <Link href="#" className="p-2 bg-surface border border-white/5 rounded-full hover:border-primary/50 transition-colors">
              <Video className="w-5 h-5 text-text-secondary" />
            </Link>
          </div>
          <p className="text-[10px] text-text-secondary font-medium tracking-wider uppercase">
            Powered by TMDB + AI
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/[0.02] text-center">
        <p className="text-[11px] text-zinc-600">
          © {new Date().getFullYear()} AI Movie Finder. All rights reserved. Built with passion for cinema.
        </p>
      </div>
    </footer>
  );
};
