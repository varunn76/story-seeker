"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MovieBackgroundPattern from "./MovieBackgroundPattern";
import HeroSectionSlider from "./HeroSectionSlider";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" },
    )
      .fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      );
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <MovieBackgroundPattern />

      <div className="relative z-10 flex flex-col items-center text-center pt-24 sm:pt-32 pb-12 sm:pb-10 px-6 sm:px-10 max-w-[1200px] mx-auto w-full">
        <h1
          ref={headlineRef}
          className="text-[2.25rem] sm:text-[3.2rem] md:text-[3.8rem] font-semibold leading-[1.05] max-w-4xl tracking-tight"
        >
          That movie you can&apos;t remember? Find it with{" "}
          <span className="text-primary font-bold">StorySeeker</span>
        </h1>

        <p
          ref={subheadlineRef}
          className="mt-6 text-base sm:text-lg md:text-[20px] text-white/50 italic max-w-2xl leading-normal px-4 sm:px-0"
        >
          Describe anything you recall — we’ll help you find it.
        </p>

        <div
          ref={buttonsRef}
          className="mt-4 mb-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <button 
            onClick={() => router.push("/discover")}
            className="w-full sm:w-auto px-10 sm:px-12 cursor-pointer py-4 flex items-center bg-primary text-white font-bold rounded-full text-[16px] sm:text-[18px] shadow-[0_10px_30px_-10px_rgba(201,68,54,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            Get started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          {/* <button 
            onClick={() => router.push("/#trending")}
            className="w-full sm:w-auto px-10 sm:px-12 py-4 border border-white/20 text-white/90 font-medium rounded-full text-[16px] sm:text-[18px] hover:bg-white/10 active:scale-95 transition-all"
          >
            Live TV
          </button> */}
        </div>
      </div>
      <HeroSectionSlider />
    </section>
  );
};
