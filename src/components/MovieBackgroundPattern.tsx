import React from "react";

const MovieBackgroundPattern = () => {
  // Define the shapes as reusable paths/groups
  const Clapperboard = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
      <rect x="0" y="8" width="40" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 8 L40 0 L40 8 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 6 L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 4 L20 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 2 L30 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );

  const Popcorn = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
      <path d="M5 30 L35 30 L38 10 L2 10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10 Q10 2 15 5 Q20 0 25 5 Q30 2 30 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="10" x2="14" y2="30" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="1" />
      <line x1="28" y1="10" x2="26" y2="30" stroke="currentColor" strokeWidth="1" />
    </g>
  );

  const FilmReel = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="32" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </g>
  );

  const Camera = ({ transform }: { transform?: string }) => (
    <g transform={transform}>
      <rect x="5" y="10" width="20" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="5" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="5" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25 12 L32 8 L32 22 L25 18 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </g>
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Use a larger pattern tile to allow more "random" placement */}
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
      {/* Radial Gradient overlay for extreme depth - almost entirely masking edges */}
      <div className="absolute inset-0 bg-radial-at-t from-transparent via-background/70 to-background" />
    </div>
  );
};

export default MovieBackgroundPattern;



