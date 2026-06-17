"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/site";

export function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const lineTopRef   = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLDivElement>(null);
  const cursorRef    = useRef<HTMLSpanElement>(null);
  const roleRef      = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const lineBotRef   = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameWords = nameRef.current?.querySelectorAll(".hero-word") ?? [];

      // If the page loader already ran in this session, animate immediately
      const alreadyLoaded = typeof sessionStorage !== "undefined"
        && sessionStorage.getItem("siteLoaded") === "1";
      const delay = alreadyLoaded ? 0.1 : 5.5;

      /* ── initial states ── */
      gsap.set(watermarkRef.current, { opacity: 0 });
      gsap.set(badgeRef.current,     { opacity: 0, yPercent: 20 });
      gsap.set(lineTopRef.current,   { scaleX: 0, transformOrigin: "left center" });
      gsap.set(nameWords,            { yPercent: 115, opacity: 0 });
      gsap.set(cursorRef.current,    { opacity: 0 });
      gsap.set(roleRef.current,      { clipPath: "inset(0 100% 0 0)" });
      gsap.set(taglineRef.current,   { opacity: 0, yPercent: 16 });
      gsap.set(ctaRef.current,       { opacity: 0, yPercent: 20 });
      gsap.set(lineBotRef.current,   { scaleX: 0, transformOrigin: "left center" });
      gsap.set(bottomBarRef.current, { opacity: 0, yPercent: 10 });
      gsap.set(scrollRef.current,    { opacity: 0, yPercent: 20 });

      /* ── master timeline ── */
      const tl = gsap.timeline({ delay, defaults: { ease: "expo.out" } });

      // watermark ghosts in
      tl.to(watermarkRef.current, { opacity: 1, duration: 1.4, ease: "power2.out" });

      // top line sweeps
      tl.to(lineTopRef.current, { scaleX: 1, duration: 0.7, ease: "power4.inOut" }, "-=0.9");

      // badge
      tl.to(badgeRef.current, { opacity: 1, yPercent: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");

      // name words stagger up
      tl.to(nameWords, {
        yPercent: 0, opacity: 1,
        stagger: 0.09, duration: 1.3, ease: "expo.out",
      }, "-=0.4");

      // cursor blink starts when last word lands
      tl.to(cursorRef.current, { opacity: 1, duration: 0.01 }, "-=0.08");
      tl.to(cursorRef.current, {
        opacity: 0, duration: 0.5, ease: "steps(1)", repeat: -1, yoyo: true,
      }, "<+=0.25");

      // role wipe
      tl.to(roleRef.current, {
        clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power4.inOut",
      }, "-=1");

      // tagline
      tl.to(taglineRef.current, { opacity: 1, yPercent: 0, duration: 0.9, ease: "power3.out" }, "-=0.4");

      // cta
      tl.to(ctaRef.current, { opacity: 1, yPercent: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");

      // bottom line + bar
      tl.to(lineBotRef.current,   { scaleX: 1, duration: 0.7, ease: "power4.inOut" }, "-=0.4");
      tl.to(bottomBarRef.current, { opacity: 1, yPercent: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");

      // scroll
      tl.to(scrollRef.current, { opacity: 1, yPercent: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 pb-24 overflow-hidden"
    >
      {/* ── Numeric watermark ───────────────────────────────────── */}
      <div
        ref={watermarkRef}
        className="absolute right-6 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <span
          className="font-black text-zinc-900 leading-none tracking-tighter"
          style={{ fontSize: "clamp(8rem, 22vw, 22rem)" }}
        >
          {new Date().getFullYear()}
        </span>
      </div>

      {/* ── Top rule ────────────────────────────────────────────── */}
      <div ref={lineTopRef} className="h-px w-full bg-zinc-800 mb-8" />

      <div className="relative z-10 w-full">

        {/* ── Status badge ────────────────────────────────────────── */}
        <div ref={badgeRef} className="mb-8" style={{ opacity: 0 }}>
          <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {site.availability}
          </span>
        </div>

        {/* ── Name ────────────────────────────────────────────────── */}
        <div ref={nameRef} className="mb-4 select-none">
          {/* First name — outlined */}
          <div className="overflow-hidden">
            <h1
              className="hero-word font-black uppercase leading-[0.82] tracking-[-0.04em] will-change-transform"
              style={{
                fontSize: "clamp(3.8rem, 12vw, 11rem)",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.15)",
                color: "transparent",
                opacity: 0,
              }}
            >
              {firstName}
            </h1>
          </div>
          {/* Last name — solid white */}
          <div className="overflow-hidden">
            <h1
              className="hero-word font-black uppercase leading-[0.82] tracking-[-0.04em] text-white will-change-transform"
              style={{ fontSize: "clamp(3.8rem, 12vw, 11rem)", opacity: 0 }}
            >
              {lastName}
              <span
                ref={cursorRef}
                className="inline-block align-baseline ml-2 w-[3px] bg-white"
                style={{ height: "clamp(3rem, 9.5vw, 8.8rem)", opacity: 0 }}
                aria-hidden="true"
              />
            </h1>
          </div>
        </div>

        {/* ── Role ────────────────────────────────────────────────── */}
        <div
          ref={roleRef}
          className="mb-5"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <p className="text-sm md:text-base text-zinc-400 uppercase tracking-[0.35em] font-light">
            {site.role}
          </p>
        </div>

        {/* ── Tagline ─────────────────────────────────────────────── */}
        <p
          ref={taglineRef}
          className="max-w-lg text-base md:text-lg text-zinc-500 leading-relaxed mb-10"
          style={{ opacity: 0 }}
        >
          {site.tagline}
        </p>

        {/* ── CTAs ────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
          <a
            href="#about"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black text-sm font-semibold uppercase tracking-wider hover:bg-zinc-100 transition-colors duration-300"
          >
            View Work
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href={site.resumePdfHref ?? "/resume"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-3.5 border border-zinc-700 text-zinc-300 text-sm font-semibold uppercase tracking-wider hover:border-zinc-400 hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </a>
        </div>
      </div>

      {/* ── Bottom rule ─────────────────────────────────────────── */}
      <div ref={lineBotRef} className="h-px w-full bg-zinc-800 mt-12" />

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div ref={bottomBarRef} className="mt-4 flex items-center justify-between" style={{ opacity: 0 }}>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-700">
          {site.location}
        </span>
        <div className="flex items-center gap-6">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 hover:text-zinc-400 transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-700">Scroll</span>
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              className="w-3 h-3 text-zinc-700"
              style={{ animation: `chevronFade 1.6s ease-in-out ${i * 0.18}s infinite` }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes chevronFade {
          0%, 100% { opacity: 0.12; transform: translateY(-2px); }
          50%       { opacity: 0.5;  transform: translateY(2px); }
        }
      `}</style>
    </section>
  );
}
