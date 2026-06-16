"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = lettersRef.current?.querySelectorAll(".loader-letter") || [];
      const tl = gsap.timeline();

      // ── Phase 1: letters drop in one by one ──────────────────────────
      gsap.set(letters, { yPercent: 110, opacity: 0 });
      gsap.set(roleRef.current, { opacity: 0, yPercent: 30 });
      gsap.set(barTrackRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(counterRef.current, { opacity: 0 });

      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.7,
        ease: "expo.out",
      });

      // ── Phase 2: role text fades in ───────────────────────────────────
      tl.to(
        roleRef.current,
        { opacity: 1, yPercent: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      // ── Phase 3: bar track and counter appear ─────────────────────────
      tl.to(
        [barTrackRef.current, counterRef.current],
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );

      // ── Phase 4: progress bar fills + counter ticks ───────────────────
      const obj = { val: 0 };
      tl.to(
        barRef.current,
        { scaleX: 1, duration: 1.4, ease: "power1.inOut" },
        "+=0.1"
      );
      tl.to(
        obj,
        {
          val: 100,
          duration: 1.4,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(obj.val)).padStart(3, "0");
            }
          },
        },
        "<"
      );

      // ── Phase 5: letters scatter / glitch out ─────────────────────────
      tl.to(
        letters,
        {
          yPercent: -110,
          opacity: 0,
          stagger: { amount: 0.25, from: "random" },
          duration: 0.5,
          ease: "power3.in",
        },
        "+=0.15"
      );
      tl.to(
        [roleRef.current, barTrackRef.current, counterRef.current],
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "<"
      );

      // ── Phase 6: split panels wipe off screen ─────────────────────────
      tl.to(
        topPanelRef.current,
        { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
        "-=0.05"
      );
      tl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            setVisible(false);
            onComplete?.();
          },
        },
        "<"
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  const nameLetters = "MEHEDI".split("");

  return (
    <div ref={loaderRef} className="fixed inset-0 z-99999 pointer-events-none">
      {/* Top half panel */}
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a] flex flex-col items-center justify-end pb-6"
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Name letters */}
        <div
          ref={lettersRef}
          className="flex items-end gap-1 md:gap-2 overflow-hidden"
          style={{ clipPath: "inset(-20% 0 -20% 0)" }}
        >
          {nameLetters.map((letter, i) => (
            <span
              key={i}
              className="loader-letter text-[clamp(3.5rem,12vw,9rem)] font-black uppercase leading-none tracking-[-0.04em] text-white select-none"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom half panel */}
      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a] flex flex-col items-center justify-start pt-6"
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Role */}
        <div ref={roleRef} className="mb-8 mt-1">
          <span className="text-[11px] text-zinc-500 uppercase tracking-[0.5em] font-mono">
            Software Developer
          </span>
        </div>

        {/* Progress bar */}
        <div
          ref={barTrackRef}
          className="relative w-48 md:w-72 h-px bg-zinc-800 overflow-hidden"
        >
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 w-full bg-white origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Counter */}
        <span
          ref={counterRef}
          className="mt-4 text-[11px] text-zinc-600 font-mono tracking-[0.3em]"
        >
          000
        </span>
      </div>

      {/* Center divider line that splits the two panels */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800 -translate-y-px pointer-events-none" />
    </div>
  );
}
