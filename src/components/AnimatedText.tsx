"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  trigger?: boolean; // if true, animates on scroll; if false, animates on mount
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  trigger = false,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".anim-char");

    gsap.set(chars, { yPercent: 110, rotateX: -60 });

    const animationConfig: gsap.TweenVars = {
      yPercent: 0,
      rotateX: 0,
      stagger: staggerDelay,
      duration: 0.8,
      ease: "expo.out",
      delay,
    };

    if (trigger) {
      animationConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: "top 85%",
      };
    }

    const tween = gsap.to(chars, animationConfig);

    return () => {
      tween.kill();
    };
  }, [text, delay, staggerDelay, trigger]);

  return (
    <span ref={containerRef} className={`${className} inline-block`} style={{ perspective: "600px" }}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="anim-char inline-block will-change-transform"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
