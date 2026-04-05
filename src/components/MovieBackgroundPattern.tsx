import React from "react";
import { Camera, Clapperboard, FilmReel, Popcorn } from "./icons";

const MovieBackgroundPattern = () => {
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="movie-pattern"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            {/* LARGE icons */}
            <Clapperboard transform="translate(40, 40) rotate(-15) scale(1.4)" />
            <Popcorn transform="translate(280, 60) rotate(10) scale(1.6)" />
            <FilmReel transform="translate(180, 240) rotate(5) scale(1.5)" />
            <Camera transform="translate(320, 300) rotate(-10) scale(1.4)" />

            {/* MEDIUM icons */}
            <Clapperboard transform="translate(240, 160) rotate(20) scale(0.9)" />
            <Popcorn transform="translate(60, 200) rotate(-5) scale(0.8)" />
            <FilmReel transform="translate(340, 120) rotate(25) scale(0.7)" />
            <Camera transform="translate(120, 320) rotate(-20) scale(0.9)" />

            {/* SMALL icons */}
            <Clapperboard transform="translate(160, 100) rotate(-40) scale(0.5)" />
            <Popcorn transform="translate(220, 340) rotate(45) scale(0.4)" />
            <FilmReel transform="translate(40, 340) rotate(-15) scale(0.5)" />
            <Camera transform="translate(200, 20) rotate(15) scale(0.4)" />
            
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#movie-pattern)" className="text-white/10" />
      </svg>
      <div className="absolute inset-0 bg-radial-at-t from-transparent via-background/70 to-background" />
    </div>
  );
};

export default MovieBackgroundPattern;



