import React from "react";

export const ClipPathDefinitions = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <clipPath id="cardClipFeatured" clipPathUnits="objectBoundingBox">
        <path d="M 0.066 0 Q 0.5 -0.0375 0.933 0 A 0.066 0.1 0 0 1 1 0.1 L 1 0.9 A 0.066 0.1 0 0 1 0.933 1 Q 0.5 1.0375 0.066 1 A 0.066 0.1 0 0 1 0 0.9 L 0 0.1 A 0.066 0.1 0 0 1 0.066 0 Z" />
      </clipPath>
      <clipPath id="cardClipNormal" clipPathUnits="objectBoundingBox">
        <path d="M 0.066 0 Q 0.5 -0.1 0.933 0 A 0.066 0.1 0 0 1 1 0.1 L 1 0.9 A 0.066 0.1 0 0 1 0.933 1 Q 0.5 1.1 0.066 1 A 0.066 0.1 0 0 1 0 0.9 L 0 0.1 A 0.066 0.1 0 0 1 0.066 0 Z" />
      </clipPath>
    </defs>
  </svg>
);
