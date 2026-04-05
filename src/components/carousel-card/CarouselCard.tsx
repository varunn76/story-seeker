import React from "react";
import { Clock, Calendar, Globe } from "lucide-react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { CarouselCardProps } from "./types";
import { ClipPathDefinitions } from "./ClipPathDefinitions";
import { CarouselCardBorder } from "./CarouselCardBorder";

const CarouselCard = ({
  id,
  title,
  image,
  isFeatured,
  metadata,
  media_type,
}: CarouselCardProps) => {
  return (
    <>
      <ClipPathDefinitions />
      <Link
        href={`/${media_type || "movie"}/${id}`}
        className={cn(
          "block relative group cursor-pointer transform-gpu isolate",
          "w-[85vw] sm:w-[500px] md:w-[550px] aspect-[4/3] sm:aspect-[3/2] transition-all duration-700",
          isFeatured
            ? "filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] sm:drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]"
            : "filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]",
        )}
        style={{
          clipPath: isFeatured ? "url(#cardClipFeatured)" : "url(#cardClipNormal)",
          WebkitClipPath: isFeatured ? "url(#cardClipFeatured)" : "url(#cardClipNormal)",
        }}
      >
        <div
          className={cn(
            "absolute inset-0 overflow-hidden transition-all duration-700",
            isFeatured ? "bg-surface" : "",
          )}
        >
          <CarouselCardBorder
            isFeatured={isFeatured}
            className={isFeatured ? "text-primary sm:text-primary" : "text-white/5"}
          />
          <img
            src={image}
            alt={title}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 transform-gpu",
              isFeatured ? "group-hover:scale-105" : "scale-110 grayscale-30",
            )}
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-90 z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-background/40 via-transparent to-background/40 z-10" />

          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700",
              isFeatured ? "opacity-100 scale-100" : "opacity-0 scale-50",
            )}
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 flex items-center justify-center shadow-2xl group/play hover:scale-110 hover:bg-white/20 transition-all">
              <div className="w-0 h-0 border-t-8 sm:border-t-12 border-t-transparent border-l-14 sm:border-l-20 border-l-white border-b-8 sm:border-b-12 border-b-transparent ml-1 sm:ml-2" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
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
                    ? "text-[28px] sm:text-[42px] leading-[0.9] mb-3 sm:mb-4"
                    : "text-[20px] sm:text-[28px] leading-tight opacity-40 uppercase italic",
                )}
              >
                {title}
              </h3>

              {metadata && (
                <div
                  className={cn(
                    "flex items-center gap-3 sm:gap-6 transition-all duration-700 overflow-hidden",
                    isFeatured ? "max-h-20 opacity-100 mt-2 sm:mt-4" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10">
                    <Clock size={12} className="text-primary/80" />
                    <span className="text-white/80 text-[10px] sm:text-[12px] font-bold tracking-tight">
                      {metadata.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10">
                    <Calendar size={12} className="text-primary/80" />
                    <span className="text-white/80 text-[10px] sm:text-[12px] font-bold tracking-tight">
                      {metadata.year}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <Globe size={12} className="text-primary/80" />
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
    </>
  );
};

export default CarouselCard;
