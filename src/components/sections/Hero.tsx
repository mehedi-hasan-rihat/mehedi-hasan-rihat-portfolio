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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to(nameRef.current, {
        y: 150,
        opacity: 0.2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(roleRef.current, {
        y: 100,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Initial animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(nameRef.current?.children || [], {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        delay: 0.3,
      }).from(
        roleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12"
    >
      <div className="relative z-10 max-w-7xl w-full">
        {/* Name */}
        <div ref={nameRef} className="mb-8">
          <div className="flex flex-col">
            {site.name.split(" ").map((word, i) => (
              <h1
                key={i}
                className="text-[80px] md:text-[140px] lg:text-[200px] font-black uppercase leading-[0.9] tracking-tighter text-white"
              >
                {word}
              </h1>
            ))}
          </div>
        </div>

        {/* Role */}
        <div ref={roleRef} className="mb-16">
          <h2 className="text-xl md:text-2xl text-zinc-400 uppercase tracking-[0.3em] font-light">
            {site.role}
          </h2>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-0 flex items-center gap-4">
          <div className="w-[1px] h-24 bg-zinc-700" />
          <span className="text-zinc-500 text-sm uppercase tracking-widest -rotate-90 origin-left">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
