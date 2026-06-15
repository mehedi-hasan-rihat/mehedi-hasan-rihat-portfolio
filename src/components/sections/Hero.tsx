"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.6,
      });

      // Name words clip in from below with slight rotation
      const nameWords = nameRef.current?.querySelectorAll(".hero-word") || [];
      gsap.set(nameWords, { yPercent: 130, rotateZ: 3 });
      tl.to(nameWords, {
        yPercent: 0,
        rotateZ: 0,
        stagger: 0.1,
        duration: 1.8,
        ease: "expo.out",
      });

      // Role wipes in
      gsap.set(roleRef.current, { clipPath: "inset(0 100% 0 0)" });
      tl.to(
        roleRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.inOut" },
        "-=1.2"
      );

      // Tagline slides up
      gsap.set(taglineRef.current, { yPercent: 40, clipPath: "inset(50% 0 0 0)" });
      tl.to(
        taglineRef.current,
        { yPercent: 0, clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );

      // CTA fades in with scale
      gsap.set(ctaRef.current, { scale: 0.9, clipPath: "inset(10%)" });
      tl.to(
        ctaRef.current,
        { scale: 1, clipPath: "inset(0%)", duration: 1, ease: "power3.out" },
        "-=0.6"
      );

      // Meta info slides up
      const metaItems = metaRef.current?.querySelectorAll(".meta-item") || [];
      gsap.set(metaItems, { yPercent: 100 });
      tl.to(
        metaItems,
        { yPercent: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Scroll line draws
      gsap.set(scrollLineRef.current, { scaleY: 0, transformOrigin: "top" });
      tl.to(
        scrollLineRef.current,
        { scaleY: 1, duration: 1.2, ease: "power2.out" },
        "-=0.4"
      );

      // --- Scroll parallax ---
      gsap.to(nameRef.current, {
        yPercent: 30,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(roleRef.current, {
        yPercent: 50,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(taglineRef.current, {
        yPercent: 20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl w-full">
        {/* Availability badge */}
        <div ref={metaRef} className="mb-12">
          <div className="meta-item overflow-hidden inline-flex items-center gap-3 border border-zinc-800 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
              {site.availability}
            </span>
          </div>
        </div>

        {/* Name */}
        <div ref={nameRef} className="mb-6">
          <div className="flex flex-col">
            {site.name.split(" ").map((word, i) => (
              <div key={i} className="overflow-hidden">
                <h1 className="hero-word text-[clamp(3.5rem,12vw,11rem)] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white will-change-transform">
                  {word}
                </h1>
              </div>
            ))}
          </div>
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
        <div ref={ctaRef} className="flex flex-wrap items-center gap-6">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 flex items-end gap-4">
        <div ref={scrollLineRef} className="w-[1px] h-20 bg-zinc-700" />
        <span className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] pb-1">
          Scroll
        </span>
      </div>

      {/* Profile image — floating right side on desktop */}
      <div className="absolute bottom-16 right-6 md:right-16 lg:right-24 hidden lg:block">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-800 hover:border-zinc-600 transition-colors duration-500 hover:scale-105 transform transition-transform">
          <img
            src={site.avatar}
            alt={site.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-32 right-6 md:right-16 lg:right-24 hidden lg:block">
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
