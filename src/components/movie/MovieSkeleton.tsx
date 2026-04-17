import React from "react";

export const MovieSkeleton = () => (
  <div className="min-h-screen bg-[#0a0505] overflow-hidden">
    <div className="h-[80vh] bg-zinc-900/40 relative animate-pulse">
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0505] via-transparent" />
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-64 relative z-10">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
        <div className="lg:col-span-4 hidden lg:block aspect-2/3 bg-zinc-800 rounded-[60px] animate-pulse shadow-2xl" />
        <div className="lg:col-span-8 space-y-10 pb-4">
          <div className="space-y-6">
            <div className="h-8 w-32 bg-zinc-800 rounded-full animate-pulse" />
            <div className="space-y-4">
              <div className="h-24 w-full bg-zinc-800 rounded-3xl animate-pulse" />
              <div className="h-24 w-2/3 bg-zinc-800/50 rounded-3xl animate-pulse" />
            </div>
            <div className="flex gap-8 py-6 border-y border-white/5">
              <div className="h-12 w-24 bg-zinc-800 rounded-2xl animate-pulse" />
              <div className="h-12 w-24 bg-zinc-800 rounded-2xl animate-pulse" />
              <div className="h-12 w-24 bg-zinc-800 rounded-2xl animate-pulse" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-16 w-48 bg-zinc-800 rounded-2xl animate-pulse" />
            <div className="h-16 w-16 bg-zinc-800 rounded-2xl animate-pulse" />
            <div className="h-16 w-16 bg-zinc-800 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>

      <div className="py-40 grid lg:grid-cols-12 gap-24">
        <div className="lg:col-span-8 space-y-20">
          <div className="space-y-8">
            <div className="h-10 w-48 bg-zinc-800 rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-zinc-800/40 rounded animate-pulse" />
              <div className="h-4 w-full bg-zinc-800/40 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-zinc-800/40 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-zinc-800 rounded-[32px] animate-pulse" />
                <div className="h-3 w-2/3 bg-zinc-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 lg:pl-12">
          <div className="h-96 w-full bg-zinc-800/30 rounded-[48px] animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);
