"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = "normal",
  reverse = false,
  className = "",
}: MarqueeProps) {
  const speedClass =
    speed === "fast"
      ? "marquee-fast"
      : speed === "slow"
        ? "marquee-slow"
        : "";
  const directionClass = reverse ? "marquee-reverse" : "";

  return (
    <div className={`marquee ${speedClass} ${directionClass} ${className}`}>
      <div className="marquee-content">{children}</div>
      <div className="marquee-content" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
