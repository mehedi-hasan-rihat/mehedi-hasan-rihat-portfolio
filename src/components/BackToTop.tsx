"use client";

import * as React from "react";
import { gsap } from "gsap";
import { IconArrowUp } from "./icons";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const wasVisible = React.useRef(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!buttonRef.current) return;

    if (visible && !wasVisible.current) {
      gsap.fromTo(
        buttonRef.current,
        { yPercent: 100, scale: 0.7, pointerEvents: "none" },
        {
          yPercent: 0,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.6,
          ease: "back.out(2)",
        }
      );
    } else if (!visible && wasVisible.current) {
      gsap.to(buttonRef.current, {
        yPercent: 100,
        scale: 0.7,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.in",
      });
    }

    wasVisible.current = visible;
  }, [visible]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 p-4 bg-white text-black z-50 hover:-translate-y-1 transition-transform duration-200 shadow-lg"
      style={{ transform: "translateY(100%) scale(0.7)", pointerEvents: "none" }}
      aria-label="Back to top"
    >
      <IconArrowUp width={20} height={20} />
    </button>
  );
}
