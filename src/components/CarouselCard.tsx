import React from "react";
import { Clock, Calendar, Globe } from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface CarouselCardProps {
  id: number | string;
  title: string;
  image: string;
  isFeatured?: boolean;
  metadata?: {
    duration: string;
    year: string;
    language: string;
  };
  media_type?: string;
}

export const CarouselCardSkeleton = ({
  isFeatured,
}: {
  isFeatured?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative w-[600px] h-[400px] transition-all duration-700 isolate",
        isFeatured
          ? "filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]"
          : "filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]",
      )}
      style={{
        clipPath: isFeatured
          ? 'path("M 40 0 Q 300 -15 560 0 A 40 40 0 0 1 600 40 L 600 360 A 40 40 0 0 1 560 400 Q 300 415 40 400 A 40 40 0 0 1 0 360 L 0 40 A 40 40 0 0 1 40 0 Z")'
          : 'path("M 40 0 Q 300 -40 560 0 A 40 40 0 0 1 600 40 L 600 360 A 40 40 0 0 1 560 400 Q 300 440 40 400 A 40 40 0 0 1 0 360 L 0 40 A 40 40 0 0 1 40 0 Z")',
        WebkitClipPath: isFeatured
          ? 'path("M 40 0 Q 300 -15 560 0 A 40 40 0 0 1 600 40 L 600 360 A 40 40 0 0 1 560 400 Q 300 415 40 400 A 40 40 0 0 1 0 360 L 0 40 A 40 40 0 0 1 40 0 Z")'
          : 'path("M 40 0 Q 300 -40 560 0 A 40 40 0 0 1 600 40 L 600 360 A 40 40 0 0 1 560 400 Q 300 440 40 400 A 40 40 0 0 1 0 360 L 0 40 A 40 40 0 0 1 40 0 Z")',
      }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[40px] overflow-hidden transition-all duration-700 bg-white/5 animate-pulse",
          isFeatured ? "border border-white/20" : "border border-white/5",
        )}
      >
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-white/5 opacity-30" />

        {/* Content Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
          <div
            className={cn(
              "transition-all duration-700 transform",
              isFeatured ? "translate-y-0" : "translate-y-4",
            )}
          >
            <div
              className={cn(
                "bg-white/10 rounded-lg animate-pulse mb-4",
                isFeatured ? "h-[42px] w-[70%]" : "h-[28px] w-[50%]",
              )}
            />

            {isFeatured && (
              <div className="flex items-center gap-6 mt-4">
                <div className="h-8 w-24 bg-white/10 rounded-full animate-pulse" />
                <div className="h-8 w-16 bg-white/10 rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-white/10 rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CarouselCard = ({
  id,
  title,
  image,
  isFeatured,
  metadata,
  media_type,
}: CarouselCardProps) => {
  return (
    <Link
      href={`/${media_type || "movie"}/${id}`}
      className={cn(
        "block relative group cursor-pointer transform-gpu isolate",
        "w-[600px] h-[400px] transition-all duration-700",
        isFeatured
          ? "filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]"
          : "filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]",
      )}
      style={{
        // Updated clip-path with rounded corners (40px radius) and the cinematic bulge
        clipPath: isFeatured
          ? 'path("M 40 0 Q 300 -15 560 0 A 40 40 0 0 1 600 40 L 600 360 A 40 40 0 0 1 560 400 Q 300 415 40 400 A 40 40 0 0 1 0 360 L 0 40 A 40 40 0 0 1 40 0 Z")'
          : 'path("M 40 0 Q 300 -40 560 0 A 40 40 0 0 1 600 40 L 600 360 A 40 40 0 0 1 560 400 Q 300 440 40 400 A 40 40 0 0 1 0 360 L 0 40 A 40 40 0 0 1 40 0 Z")',
        WebkitClipPath: isFeatured
          ? 'path("M 40 0 Q 300 -15 560 0 A 40 40 0 0 1 600 40 L 600 360 A 40 40 0 0 1 560 400 Q 300 415 40 400 A 40 40 0 0 1 0 360 L 0 40 A 40 40 0 0 1 40 0 Z")'
          : 'path("M 40 0 Q 300 -40 560 0 A 40 40 0 0 1 600 40 L 600 360 A 40 40 0 0 1 560 400 Q 300 440 40 400 A 40 40 0 0 1 0 360 L 0 40 A 40 40 0 0 1 40 0 Z")',
      }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[40px] overflow-hidden transition-all duration-700",
          isFeatured
            ? "border border-white/20 bg-surface"
            : "border border-white/5",
        )}
      >
        {/* Background Image with Parallax-like scale */}
        <img
          src={image}
          alt={title}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 transform-gpu",
            isFeatured ? "group-hover:scale-105" : "scale-110 grayscale-30",
          )}
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-80 z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-background/40 via-transparent to-background/40 z-10" />

        {/* Play Button for featured */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700",
            isFeatured ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}
        >
          <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 flex items-center justify-center shadow-2xl group/play hover:scale-110 hover:bg-white/20 transition-all">
            <div className="w-0 h-0 border-t-12 border-t-transparent border-l-20 border-l-white border-b-12 border-b-transparent ml-2" />
          </div>
        </div>

        {/* Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
          <div
            className={cn(
              "transition-all duration-700 transform",
              isFeatured ? "translate-y-0" : "translate-y-4",
            )}
          >
            <h3
              className={cn(
                "font-black text-white tracking-tighter transition-all duration-700 drop-shadow-2xl",
                isFeatured
                  ? "text-[42px] leading-[0.9] mb-4"
                  : "text-[28px] leading-tight opacity-40 uppercase italic",
              )}
            >
              {title}
            </h3>

            {metadata && (
              <div
                className={cn(
                  "flex items-center gap-6 transition-all duration-700 overflow-hidden",
                  isFeatured
                    ? "max-h-20 opacity-100 mt-4"
                    : "max-h-0 opacity-0",
                )}
              >
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Clock size={14} className="text-primary/80" />
                  <span className="text-white/80 text-[12px] font-bold tracking-tight">
                    {metadata.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Calendar size={14} className="text-primary/80" />
                  <span className="text-white/80 text-[12px] font-bold tracking-tight">
                    {metadata.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Globe size={14} className="text-primary/80" />
                  <span className="text-white/80 text-[12px] font-bold tracking-tight uppercase">
                    {metadata.language}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarouselCard;
