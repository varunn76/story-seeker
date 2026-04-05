import React from "react";
import { cn } from "@/utils/cn";

export const CarouselCardBorder = ({
  isFeatured,
  className,
}: {
  isFeatured?: boolean;
  className?: string;
}) => {
  const path = isFeatured
    ? "M 66 0 Q 500 -37.5 933 0 A 66 100 0 0 1 1000 100 L 1000 900 A 66 100 0 0 1 933 1000 Q 500 1037.5 66 1000 A 66 100 0 0 1 0 900 L 0 100 A 66 100 0 0 1 66 0 Z"
    : "M 66 0 Q 500 -100 933 0 A 66 100 0 0 1 1000 100 L 1000 900 A 66 100 0 0 1 933 1000 Q 500 1100 66 1000 A 66 100 0 0 1 0 900 L 0 100 A 66 100 0 0 1 66 0 Z";

  return (
    <svg
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none z-50 transition-all duration-700",
        className
      )}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};
