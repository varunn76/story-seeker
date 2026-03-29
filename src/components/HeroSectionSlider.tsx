"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

import gsap from "gsap";
import CarouselCard, { CarouselCardSkeleton } from "./CarouselCard";
import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";

const HeroSectionSlider = () => {
  const { data: movies = [], isLoading: loading } = useDiscoverMovies();
  const showSkeletons = loading || movies.length === 0;
  // Use a fixed array for skeletons or the actual movies
  const displayItems = showSkeletons ? [1, 2, 3] : movies;
  
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the second card as featured
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    const length = displayItems.length;
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    const length = displayItems.length;
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  useEffect(() => {
    if (containerRef.current && displayItems.length > 0) {
      const cards = containerRef.current.querySelectorAll(
        ".carousel-card-wrapper",
      );
      cards.forEach((card, index) => {
        const diff = index - currentIndex;
        const absDiff = Math.abs(diff);

        let opacity = 0;
        let x = 0;
        let z = 0;
        let rotateY = 0;
        let scale = 0.8;
        let zIndex = 0;

        if (diff === 0) {
          opacity = 1;
          x = 0;
          z = 200;
          rotateY = 0;
          scale = 0.9;
          zIndex = 40;
        } else if (
          diff === -1 ||
          (currentIndex === 0 && index === displayItems.length - 1)
        ) {
          opacity = 0.7;
          x = -450;
          z = -100;
          rotateY = 35;
          scale = 0.65;
          zIndex = 20;
        } else if (
          diff === 1 ||
          (currentIndex === displayItems.length - 1 && index === 0)
        ) {
          opacity = 0.7;
          x = 450;
          z = -100;
          rotateY = -35;
          scale = 0.65;
          zIndex = 20;
        } else {
          opacity = 0;
          x = diff > 0 ? 800 : -800;
          z = -400;
          rotateY = diff > 0 ? -60 : 60;
          scale = 0.4;
          zIndex = 10;
        }

        gsap.to(card, {
          x,
          z,
          rotateY,
          scale,
          opacity,
          duration: 0.6,
          ease: "expo.out",
          overwrite: "auto",
        });

        (card as HTMLElement).style.zIndex = zIndex.toString();
      });
    }
  }, [currentIndex, displayItems]);

  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-4 pb-20 mt-[-70px]">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center h-[500px] perspective-[2000px]"
        style={{ perspectiveOrigin: "center center" }}
      >
        {displayItems.map((card: any, index: number) => (
          <div
            key={showSkeletons ? `skeleton-${index}` : card.id || index}
            className="carousel-card-wrapper absolute transform-gpu will-change-transform will-change-opacity"
          >
            {showSkeletons ? (
              <CarouselCardSkeleton isFeatured={index === currentIndex} />
            ) : (
              <CarouselCard
                id={card.id}
                title={card.title}
                image={card.image}
                isFeatured={index === currentIndex}
                metadata={
                  index === currentIndex ? (card as any).metadata : undefined
                }
              />
            )}
          </div>
        ))}

        {/* Unified Navigation Controls from Image Ref */}
        <div className="absolute right-[5%] bottom-[15%] z-50">
          <div className="relative group/nav flex items-center justify-center w-28 h-28 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl transition-all hover:bg-white/10">
            <button
              onClick={prevSlide}
              className="absolute left-6 text-white/50 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>
            <div className="w-px h-6 bg-white/20" />
            <button
              onClick={nextSlide}
              className="absolute right-6 text-white/50 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSlider;
