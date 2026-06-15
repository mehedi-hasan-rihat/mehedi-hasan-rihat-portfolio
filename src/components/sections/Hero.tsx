"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/site";
import Image from "next/image";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.5,
      });

      // Availability badge
      const metaItems = metaRef.current?.querySelectorAll(".meta-item") || [];
      gsap.set(metaItems, { yPercent: 100 });
      tl.to(metaItems, {
        yPercent: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });

      // Name words — slide up from below overflow clip
      const nameWords = nameRef.current?.querySelectorAll(".hero-word") || [];
      gsap.set(nameWords, { yPercent: 120 });
      tl.to(
        nameWords,
        {
          yPercent: 0,
          stagger: 0.12,
          duration: 1.6,
          ease: "expo.out",
        },
        "-=0.6"
      );

      // Role wipes in
      gsap.set(roleRef.current, { clipPath: "inset(0 100% 0 0)" });
      tl.to(
        roleRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.inOut" },
        "-=1"
      );

      // Tagline
      gsap.set(taglineRef.current, { yPercent: 20, clipPath: "inset(30% 0 0 0)" });
      tl.to(
        taglineRef.current,
        { yPercent: 0, clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );

      // CTA
      gsap.set(ctaRef.current, { clipPath: "inset(0 0 100% 0)" });
      tl.to(
        ctaRef.current,
        { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      // Profile image
      if (imageRef.current) {
        gsap.set(imageRef.current, { clipPath: "circle(0% at 50% 50%)", scale: 1.1 });
        tl.to(
          imageRef.current,
          { clipPath: "circle(75% at 50% 50%)", scale: 1, duration: 1.4, ease: "power3.out" },
          "-=0.8"
        );
      }

      // Scroll indicator
      gsap.set(scrollRef.current, { clipPath: "inset(100% 0 0 0)" });
      tl.to(
        scrollRef.current,
        { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // Decorative corner
      if (decorRef.current) {
        gsap.set(decorRef.current, { clipPath: "inset(0 0 100% 0)" });
        tl.to(
          decorRef.current,
          { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-32"
    >
      <div className="relative z-10 max-w-7xl w-full">
        {/* Availability badge */}
        <div ref={metaRef} className="mb-10">
          <div className="overflow-hidden">
            <div className="meta-item inline-flex items-center gap-3 border border-zinc-800 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
                {site.availability}
              </span>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Text content */}
          <div className="lg:col-span-8">
            {/* Name */}
            <div ref={nameRef} className="mb-6">
              {site.name.split(" ").map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <h1 className="hero-word text-[clamp(3.5rem,11vw,10rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white will-change-transform">
                    {word}
                  </h1>
                </div>
              ))}
            </div>

            {/* Role */}
            <div ref={roleRef} className="mb-8">
              <h2 className="text-lg md:text-xl text-zinc-400 uppercase tracking-[0.25em] font-light">
                {site.role}
              </h2>
            </div>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="max-w-xl text-lg md:text-xl text-zinc-500 leading-relaxed mb-12"
            >
              {site.tagline}
            </p>

            {/* CTA buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors duration-300"
              >
                <span>View Work</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#connect"
                className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-700 text-white font-semibold text-sm uppercase tracking-wider hover:border-zinc-400 transition-colors duration-300"
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>

          {/* Right — Profile image */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div
              ref={imageRef}
              className="relative w-64 h-80 overflow-hidden"
            >
              <Image
                src={site.avatar}
                alt={site.name}
                fill
                className="object-cover object-top grayscale-20 hover:grayscale-0 transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 border border-zinc-700/40" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-px h-12 bg-zinc-700" />
        <svg
          className="w-4 h-4 text-zinc-600 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Decorative corner */}
      <div ref={decorRef} className="absolute top-32 right-6 md:right-16 lg:right-24 hidden lg:block">
        <div className="text-right space-y-1">
          <div className="text-[10px] text-zinc-600 uppercase tracking-wider font-mono">
            Portfolio © {new Date().getFullYear()}
          </div>
          <div className="text-[10px] text-zinc-700 uppercase tracking-wider font-mono">
            {site.location}
          </div>
        </div>
      </div>
    </section>
  );
}
