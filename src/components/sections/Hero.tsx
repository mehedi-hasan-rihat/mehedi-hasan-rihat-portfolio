"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const roleLineRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameWords = nameRef.current?.querySelectorAll(".hero-word") ?? [];

      /* ─── Initial states ─── */
      gsap.set(nameWords, { yPercent: 110, opacity: 0 });
      gsap.set(cursorRef.current, { opacity: 0 });
      gsap.set(badgeRef.current, { yPercent: 30, opacity: 0 });
      gsap.set(roleLineRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(taglineRef.current, { yPercent: 18, opacity: 0 });
      gsap.set(ctaRef.current, { yPercent: 20, opacity: 0 });
      gsap.set(scrollRef.current, { opacity: 0, yPercent: 20 });
      gsap.set(cornerRef.current, { opacity: 0 });
      gsap.set(accentLineRef.current, { scaleX: 0, transformOrigin: "left center" });

      /* ─── Master timeline ─── */
      const tl = gsap.timeline({ delay: 5.5, defaults: { ease: "expo.out" } });

      tl.to(badgeRef.current, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" });

      tl.to(accentLineRef.current, { scaleX: 1, duration: 0.8, ease: "power4.inOut" }, "-=0.4");

      tl.to(nameWords, { yPercent: 0, opacity: 1, stagger: 0.1, duration: 1.4, ease: "expo.out" }, "-=0.5");

      tl.to(cursorRef.current, { opacity: 1, duration: 0.01 }, "-=0.05");
      tl.to(cursorRef.current, { opacity: 0, duration: 0.55, ease: "steps(1)", repeat: -1, yoyo: true }, "<+=0.3");

      tl.to(roleLineRef.current, { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power4.inOut" }, "-=0.9");

      tl.to(dividerRef.current, { scaleX: 1, duration: 0.6, ease: "power3.out" }, "-=0.4");

      tl.to(taglineRef.current, { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.4");

      tl.to(ctaRef.current, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.5");

      tl.to(cornerRef.current, { opacity: 1, duration: 0.6 }, "-=0.4");

      tl.to(scrollRef.current, { opacity: 1, yPercent: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameWords = site.name.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-16 lg:px-24 pt-20 pb-20 overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Status line */}
        <div ref={badgeRef} className="mb-10 opacity-0">
          <p className="text-[11px] text-zinc-500 uppercase tracking-[0.3em] font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            {site.availability}
          </p>
        </div>

        {/* Accent line */}
        <div
          ref={accentLineRef}
          className="h-px w-full bg-zinc-800 mb-8"
          style={{ transformOrigin: "left center" }}
        />

        {/* Name */}
        <div ref={nameRef} className="mb-5 select-none">
          <div className="flex flex-wrap justify-center items-end gap-x-6 gap-y-0">
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
            <span
              ref={cursorRef}
              className="inline-block w-[0.12em] bg-white self-end mb-[0.1em]"
              style={{ height: "clamp(2.4rem, 7.5vw, 7.2rem)" }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Role */}
        <div
          ref={roleLineRef}
          className="mb-4"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <h2 className="text-base md:text-lg text-zinc-400 uppercase tracking-[0.3em] font-light">
            {site.role}
          </h2>
        </div>

        {/* Divider */}
        <div ref={dividerRef} className="h-px w-24 bg-zinc-800 mb-8 mx-auto" />

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="max-w-xl text-base md:text-lg text-zinc-500 leading-relaxed mb-10 opacity-0"
        >
          {site.tagline}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap justify-center items-center gap-4 mb-10 opacity-0">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black text-sm font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors duration-300"
          >
            <span>View Work</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href={site.resumePdfHref ?? "/resume"}
            download={!!site.resumePdfHref}
            className="group inline-flex items-center gap-3 px-7 py-3.5 border border-zinc-700 text-white text-sm font-semibold uppercase tracking-wider hover:border-zinc-400 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-[10px] text-zinc-600 uppercase tracking-[0.35em] font-mono">Scroll</span>
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              className="w-3.5 h-3.5 text-zinc-600"
              style={{ animation: `chevronFade 1.6s ease-in-out ${i * 0.2}s infinite` }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes chevronFade {
          0%, 100% { opacity: 0.15; transform: translateY(-3px); }
          50%       { opacity: 0.7;  transform: translateY(3px); }
        }
      `}</style>
    </section>
  );
}
