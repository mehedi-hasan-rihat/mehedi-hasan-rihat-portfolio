"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const fromVars: gsap.TweenVars = {
      clipPath:
        direction === "left"
          ? "inset(0 100% 0 0)"
          : direction === "right"
            ? "inset(0 0 0 100%)"
            : "inset(100% 0 0 0)",
      xPercent: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      yPercent: direction === "up" ? 20 : 0,
    };

    const toVars: gsap.TweenVars = {
      clipPath: "inset(0% 0% 0% 0%)",
      xPercent: 0,
      yPercent: 0,
      duration: 1.2,
      ease: "power3.out",
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
      },
    };

    gsap.set(ref.current, fromVars);
    const tween = gsap.to(ref.current, toVars);

    return () => {
      tween.kill();
    };
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
