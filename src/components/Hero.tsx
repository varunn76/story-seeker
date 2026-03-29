"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MovieBackgroundPattern from "./MovieBackgroundPattern";
import HeroSectionSlider from "./HeroSectionSlider";
import { useRouter } from "next/navigation";

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

      <div className="relative z-10 flex flex-col items-center text-center pt-32 pb-16 px-10 max-w-[1200px] mx-auto w-full">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-[3.6rem] font-semibold leading-[1.1] max-w-4xl tracking-tight"
        >
          That movie you can’t remember? Find it with{" "}
          <span className="text-primary font-bold">StorySeeker</span>
        </h1>

        <p
          ref={subheadlineRef}
          className="mt-6 text-lg md:text-[20px] text-white/50 italic max-w-2xl leading-normal"
        >
          Describe anything you recall — we’ll help you find it.
        </p>

        <div
          ref={buttonsRef}
          onClick={() => router.push("/discover")}
          className="my-6 flex items-center gap-6"
        >
          <button className="px-12 py-4 bg-primary text-white font-bold rounded-full text-[18px] shadow-[0_10px_30px_-10px_rgba(201,68,54,0.4)] hover:scale-105 transition-transform">
            Get started
          </button>
          <button className="px-12 py-4 border border-white text-white font-medium rounded-full text-[18px] hover:bg-white/10 transition-colors">
            Live TV
          </button>
        </div>
      </div>
      <HeroSectionSlider />
    </section>
  );
};
