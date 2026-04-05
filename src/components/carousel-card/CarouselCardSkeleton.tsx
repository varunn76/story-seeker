import React from "react";
import { cn } from "@/utils/cn";
import { ClipPathDefinitions } from "./ClipPathDefinitions";
import { CarouselCardBorder } from "./CarouselCardBorder";

export const CarouselCardSkeleton = ({
  isFeatured,
}: {
  isFeatured?: boolean;
}) => {
  return (
    <>
      <ClipPathDefinitions />
      <div
        className={cn(
          "relative transition-all duration-700 isolate",
          "w-[85vw] sm:w-[500px] md:w-[600px] aspect-[4/3] sm:aspect-[3/2]",
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
            "absolute inset-0 overflow-hidden transition-all duration-700 bg-white/5 animate-pulse",
          )}
        >
          <CarouselCardBorder
            isFeatured={isFeatured}
            className={isFeatured ? "text-white/20" : "text-white/5"}
          />
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-white/5 opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
            <div
              className={cn(
                "transition-all duration-700 transform",
                isFeatured ? "translate-y-0" : "translate-y-4",
              )}
            >
              <div
                className={cn(
                  "bg-white/10 rounded-lg animate-pulse mb-4",
                  isFeatured ? "h-[30px] sm:h-[42px] w-[70%]" : "h-[20px] sm:h-[28px] w-[50%]",
                )}
              />
              {isFeatured && (
                <div className="flex items-center gap-4 sm:gap-6 mt-4">
                  <div className="h-6 sm:h-8 w-20 sm:w-24 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-6 sm:h-8 w-12 sm:w-16 bg-white/10 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
