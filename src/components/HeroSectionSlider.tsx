"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

import gsap from "gsap";
import { CarouselCard, CarouselCardSkeleton } from "./carousel-card";
import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";

const HeroSectionSlider = () => {
  const { data: movies = [], isLoading: loading } = useDiscoverMovies();
  const showSkeletons = loading || movies.length === 0;
  const displayItems = showSkeletons ? [1, 2, 3] : movies;
  
  const [currentIndex, setCurrentIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const length = displayItems.length;
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    const length = displayItems.length;
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  useEffect(() => {
    if (containerRef.current && displayItems.length > 0) {
      const cards = containerRef.current.querySelectorAll(
        ".carousel-card-wrapper",
      );
      
      const xOffset = isMobile ? windowWidth * 0.65 : isTablet ? 300 : 450;
      const baseScale = isMobile ? 0.7 : 0.8;
      const featuredScale = isMobile ? 0.85 : 0.9;

      cards.forEach((card, index) => {
        const diff = index - currentIndex;
        const length = displayItems.length;
        
        let normalizedDiff = diff;
        if (diff > length / 2) normalizedDiff -= length;
        if (diff < -length / 2) normalizedDiff += length;

        let opacity = 0;
        let x = 0;
        let z = 0;
        let rotateY = 0;
        let scale = baseScale;
        let zIndex = 0;

        if (normalizedDiff === 0) {
          opacity = 1;
          x = 0;
          z = 200;
          rotateY = 0;
          scale = featuredScale;
          zIndex = 40;
        } else if (normalizedDiff === -1) {
          opacity = isMobile ? 0.3 : 0.7;
          x = -xOffset;
          z = -100;
          rotateY = isMobile ? 20 : 35;
          scale = isMobile ? 0.5 : 0.65;
          zIndex = 20;
        } else if (normalizedDiff === 1) {
          opacity = isMobile ? 0.3 : 0.7;
          x = xOffset;
          z = -100;
          rotateY = isMobile ? -20 : -35;
          scale = isMobile ? 0.5 : 0.65;
          zIndex = 20;
        } else {
          opacity = 0;
          x = normalizedDiff > 0 ? xOffset * 1.5 : -xOffset * 1.5;
          z = -400;
          rotateY = normalizedDiff > 0 ? -60 : 60;
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
  }, [currentIndex, displayItems, windowWidth]);

  return (
    <div className="relative w-full max-w-[1400px] mx-auto px-4 pb-12 sm:pb-20 mt-[-40px] sm:mt-[-70px]">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center h-[350px] sm:h-[450px] md:h-[400px] perspective-[1500px] sm:perspective-[2000px] overflow-hidden sm:overflow-visible"
        style={{ perspectiveOrigin: "center center" }}
      >
        {displayItems.map((card: any, index: number) => (
          <div
            key={showSkeletons ? `skeleton-${index}` : card.id || index}
            className="carousel-card-wrapper  absolute transform-gpu will-change-transform will-change-opacity"
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

        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 sm:bottom-[10%] md:bottom-[15%] sm:left-auto sm:translate-x-0 sm:right-[5%] z-50">
          <div className="relative group/nav flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl transition-all hover:bg-white/10">
            <button
              onClick={prevSlide}
              className="absolute left-4 sm:left-6 text-white/50 hover:text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={isMobile ? 24 : 28} />
            </button>
            <div className="w-px h-4 sm:h-6 bg-white/20" />
            <button
              onClick={nextSlide}
              className="absolute right-4 sm:right-6 text-white/50 hover:text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={isMobile ? 24 : 28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSlider;
