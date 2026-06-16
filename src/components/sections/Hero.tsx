"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/site";
import Image from "next/image";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Grouped refs for clean targeting
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const roleLineRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ─── 1. Set everything invisible before any paint ─── */
      const nameWords = nameRef.current?.querySelectorAll(".hero-word") ?? [];

      gsap.set(nameWords, { yPercent: 110, opacity: 0 });
      gsap.set(cursorRef.current, { opacity: 0 });
      gsap.set(badgeRef.current, { yPercent: 30, opacity: 0 });
      gsap.set(roleLineRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(taglineRef.current, { yPercent: 18, opacity: 0 });
      gsap.set(ctaRef.current, { yPercent: 20, opacity: 0 });
      gsap.set(imageCardRef.current, { clipPath: "inset(100% 0 0 0)", opacity: 1 });
      gsap.set(scrollRef.current, { opacity: 0, yPercent: 20 });
      gsap.set(cornerRef.current, { opacity: 0 });
      gsap.set(accentLineRef.current, { scaleX: 0, transformOrigin: "left center" });

      /* ─── 2. Master timeline (starts after PageLoader: ~5.5s) ─── */
      const tl = gsap.timeline({
        delay: 5.5,
        defaults: { ease: "expo.out" },
      });

      // Badge floats in
      tl.to(badgeRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      });

      // Accent line sweeps across
      tl.to(
        accentLineRef.current,
        { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
        "-=0.4"
      );

      // Name words stagger up from overflow clip
      tl.to(
        nameWords,
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.4,
          ease: "expo.out",
        },
        "-=0.5"
      );

      // Cursor appears exactly when last name word lands, then blinks
      tl.to(
        cursorRef.current,
        { opacity: 1, duration: 0.01 },
        "-=0.05"  // just before last word finishes
      );
      tl.to(
        cursorRef.current,
        {
          opacity: 0,
          duration: 0.55,
          ease: "steps(1)",
          repeat: -1,
          yoyo: true,
        },
        "<+=0.3"  // start blinking 0.3s after cursor appears
      );

      // Role wipes in left-to-right
      tl.to(
        roleLineRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power4.inOut" },
        "-=0.9"
      );

      // Divider stretches
      tl.to(
        dividerRef.current,
        { scaleX: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // Tagline rises
      tl.to(
        taglineRef.current,
        { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      );

      // Image card rises from bottom
      tl.to(
        imageCardRef.current,
        { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "expo.out" },
        "-=0.9"
      );

      // CTA row rises
      tl.to(
        ctaRef.current,
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );

      // Corner label
      tl.to(
        cornerRef.current,
        { opacity: 1, duration: 0.6 },
        "-=0.4"
      );

      // Scroll indicator
      tl.to(
        scrollRef.current,
        { opacity: 1, yPercent: 0, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );

      /* ─── 3. Ambient idle animation (after entry) ─── */
      // Subtle image float — added to timeline so it starts after entry completes
      if (imageCardRef.current) {
        tl.to(
          imageCardRef.current,
          {
            y: -12,
            duration: 3.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameWords = site.name.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-10 pb-20 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 30% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full">
        {/* ── Status line ───────────────────────────────────────── */}
        <div ref={badgeRef} className="mb-10 opacity-0">
          <p className="text-[11px] text-zinc-500 uppercase tracking-[0.3em] font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            {site.availability}
          </p>
        </div>

        {/* ── Top accent line ────────────────────────────────────── */}
        <div
          ref={accentLineRef}
          className="h-px w-full bg-zinc-800 mb-8"
          style={{ transformOrigin: "left center" }}
        />

        {/* ── Main grid ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-8 items-center">

          {/* LEFT — Text block */}
          <div className="lg:col-span-7 xl:col-span-8">

            {/* Name */}
            <div ref={nameRef} className="mb-5 select-none">
              <div className="flex flex-wrap items-end gap-x-6 gap-y-0">
                {nameWords.map((word, i) => (
                  <div key={i} className="overflow-hidden">
                    <h1
                      className="hero-word font-black uppercase leading-[0.85] tracking-[-0.04em] text-white will-change-transform"
                      style={{ fontSize: "clamp(3rem, 9.5vw, 9rem)" }}
                    >
                      {word}
                    </h1>
                  </div>
                ))}
                {/* Blinking cursor */}
                <span
                  ref={cursorRef}
                  className="inline-block w-[0.12em] bg-white self-end mb-[0.1em]"
                  style={{ height: "clamp(2.4rem, 7.5vw, 7.2rem)" }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Role + divider */}
            <div
              ref={roleLineRef}
              className="mb-4"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <h2 className="text-base md:text-lg text-zinc-400 uppercase tracking-[0.3em] font-light">
                {site.role}
              </h2>
            </div>

            <div
              ref={dividerRef}
              className="h-px w-48 bg-zinc-800 mb-8"
            />

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="max-w-lg text-base md:text-lg text-zinc-500 leading-relaxed mb-10 opacity-0"
            >
              {site.tagline}
            </p>

            {/* CTA row */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-10 opacity-0">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black text-sm font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors duration-300"
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
                href={site.resumePdfHref ?? "/resume"}
                download={!!site.resumePdfHref}
                className="group inline-flex items-center gap-3 px-7 py-3.5 border border-zinc-700 text-white text-sm font-semibold uppercase tracking-wider hover:border-zinc-400 transition-colors duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download CV</span>
              </a>
            </div>

            {/* Meta footnote */}
            <div ref={cornerRef} className="flex items-center gap-4 opacity-0">
              <span className="text-[10px] text-zinc-700 uppercase tracking-widest font-mono">
                {site.location}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-800 inline-block" />
              <span className="text-[10px] text-zinc-800 uppercase tracking-widest font-mono">
                © {new Date().getFullYear()}
              </span>
            </div>

          </div>

          {/* RIGHT — Profile image card */}
          <div className="lg:col-span-5 xl:col-span-4 hidden lg:flex justify-end items-center">
            <div
              ref={imageCardRef}
              className="relative w-72 h-[360px] overflow-hidden group"
              style={{
                clipPath: "inset(100% 0 0 0)",
                borderRadius: "4px",
              }}
            >
              <Image
                src={site.avatar}
                alt={site.name}
                fill
                className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                priority
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent opacity-70" />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-zinc-800/60">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-mono leading-none mb-1">
                      {site.role}
                    </div>
                    <div className="text-[10px] text-zinc-600 uppercase tracking-[0.15em] font-mono leading-none">
                      {site.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Top-right corner decoration */}
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 border-t border-r border-zinc-600" />
              </div>
              {/* Bottom-left corner decoration */}
              <div className="absolute bottom-16 left-4">
                <div className="w-6 h-6 border-b border-l border-zinc-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-[10px] text-zinc-600 uppercase tracking-[0.35em] font-mono">
          Scroll
        </span>
        {/* Animated chevron stack */}
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5 text-zinc-600"
              style={{
                animation: `chevronFade 1.6s ease-in-out ${i * 0.2}s infinite`,
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ))}
        </div>
      </div>

      {/* Scroll chevron animation keyframes */}
      <style>{`
        @keyframes chevronFade {
          0%, 100% { opacity: 0.15; transform: translateY(-3px); }
          50%       { opacity: 0.7;  transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
}
