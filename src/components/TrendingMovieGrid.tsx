import React from "react";
import { MovieGrid } from "./MovieGrid";
import MovieBackgroundPattern from "./MovieBackgroundPattern";

const TrendingMovieGrid = () => {
  return (
    <section id="trending" className="py-24 px-6 relative overflow-hidden isolate bg-[#0f0a0a]">
      <MovieBackgroundPattern />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">
              Trending Searches
            </h2>
            <p className="text-zinc-400 font-medium">
              Based on what others are remembering today.
            </p>
          </div>
        </div>

        <MovieGrid />
      </div>
    </section>
  );
};

export default TrendingMovieGrid;
