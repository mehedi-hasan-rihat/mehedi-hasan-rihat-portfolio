"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const labelLeftRef = useRef<HTMLSpanElement>(null);
  const labelRightRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = lettersRef.current?.querySelectorAll(".loader-letter") || [];
      const tl = gsap.timeline();

      // ── Phase 1: name letters drop in ────────────────────────────────
      gsap.set(letters, { yPercent: 115 });
      gsap.set(roleRef.current, { yPercent: 20 });
      gsap.set(barTrackRef.current, { scaleX: 0.4 });
      gsap.set(barFillRef.current, { scaleX: 0 });
      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.65,
        ease: "expo.out",
      });

      // ── Phase 2: role + bar + counter appear ──────────────────────────
      tl.to(
        roleRef.current,
        { opacity: 1, yPercent: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
      tl.to(
        barTrackRef.current,
        { opacity: 1, scaleX: 1, duration: 0.5, ease: "expo.out" },
        "-=0.3"
      );
      tl.to(
        [counterRef.current, labelLeftRef.current, labelRightRef.current],
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );

      // ── Phase 3: progress bar fills + counter ticks ───────────────────
      const obj = { val: 0 };
      tl.to(
        barFillRef.current,
        { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
        "+=0.05"
      );
      tl.to(
        obj,
        {
          val: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(obj.val)}%`;
            }
          },
        },
        "<"
      );

      // ── Phase 4: letters scatter out randomly ─────────────────────────
      tl.to(
        letters,
        {
          yPercent: -115,
          opacity: 0,
          stagger: { amount: 0.3, from: "random" },
          duration: 0.5,
          ease: "power3.in",
        },
        "+=0.2"
      );
      tl.to(
        [roleRef.current, barTrackRef.current, counterRef.current,
          labelLeftRef.current, labelRightRef.current],
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "<"
      );

      // ── Phase 5: split panels exit ────────────────────────────────────
      tl.to(topPanelRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      });
      tl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 0.85,
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
    <div className="fixed inset-0 z-99999 pointer-events-none select-none">

      {/* ── Top panel — name ─────────────────────────────────────────── */}
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a] flex flex-col items-center justify-end pb-8"
      >
        <Grain />

        {/* Letters */}
        <div
          ref={lettersRef}
          className="flex items-end gap-0.5 md:gap-1"
          style={{ clipPath: "inset(-30% 0 -30% 0)" }}
        >
          {nameLetters.map((letter, i) => (
            <span
              key={i}
              className="loader-letter font-black uppercase text-white leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(4rem, 14vw, 11rem)", opacity: 0 }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom panel — role + bar + counter ──────────────────────── */}
      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a] flex flex-col items-center justify-start pt-8 gap-6"
      >
        <Grain />

        {/* Role */}
        <span
          ref={roleRef}
          className="text-[11px] text-zinc-500 uppercase tracking-[0.45em] font-mono"
          style={{ opacity: 0 }}
        >
          Software Developer
        </span>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-3 w-64 md:w-80">
          <div
            ref={barTrackRef}
            className="relative w-full h-px bg-zinc-800 overflow-hidden origin-center"
            style={{ opacity: 0 }}
          >
            <div
              ref={barFillRef}
              className="absolute inset-y-0 left-0 w-full bg-white origin-left"
            />
          </div>

          {/* Labels + counter row */}
          <div className="flex items-center justify-between w-full">
            <span
              ref={labelLeftRef}
              className="text-[10px] text-zinc-700 uppercase tracking-[0.35em] font-mono"
              style={{ opacity: 0 }}
            >
              Loading
            </span>

            {/* Big counter */}
            <div
              ref={counterRef}
              className="font-black text-white tabular-nums leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)", opacity: 0 }}
            >
              0%
            </div>

            <span
              ref={labelRightRef}
              className="text-[10px] text-zinc-700 uppercase tracking-[0.35em] font-mono"
              style={{ opacity: 0 }}
            >
              Portfolio
            </span>
          </div>
        </div>
      </div>

      {/* Center seam */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800 -translate-y-px" />
    </div>
  );
}

function Grain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
