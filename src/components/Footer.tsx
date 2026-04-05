'use client';

import { Film, Mail, Globe, Video } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-zinc-950">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              STORY<span className="text-primary">SEEKER</span>
            </span>
          </div>

          <p className="text-text-secondary text-sm max-w-[240px] leading-relaxed">
            Find movies, shows, and stories from memory — not by name. 
            Describe what you recall, and discover it instantly.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <Link href="#" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">
            Privacy
          </Link>
          <Link href="#" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">
            Terms
          </Link>
          {/* <Link href="#" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">
            API
          </Link> */}
          <Link href="#" className="text-text-secondary hover:text-white transition-colors text-sm font-medium">
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex items-center gap-3">
            <Link href="#" className="p-2 bg-surface border border-white/5 rounded-full hover:border-primary/50 hover:bg-surface-hover transition-all">
              <Mail className="w-5 h-5 text-text-secondary" />
            </Link>
            <Link href="#" className="p-2 bg-surface border border-white/5 rounded-full hover:border-primary/50 hover:bg-surface-hover transition-all">
              <Globe className="w-5 h-5 text-text-secondary" />
            </Link>
            <Link href="#" className="p-2 bg-surface border border-white/5 rounded-full hover:border-primary/50 hover:bg-surface-hover transition-all">
              <Video className="w-5 h-5 text-text-secondary" />
            </Link>
          </div>

          <p className="text-[11px] text-text-secondary font-medium tracking-wide uppercase">
            Powered by TMDB • AI-assisted discovery
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/[0.03] text-center">
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          © {new Date().getFullYear()} StorySeeker. All rights reserved.  
          <span className="block mt-1 text-zinc-600">
            Built for people who remember stories — not titles.
          </span>
        </p>
      </div>
    </footer>
  );
};