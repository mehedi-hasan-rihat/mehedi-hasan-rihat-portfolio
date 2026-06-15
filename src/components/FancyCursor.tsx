"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function FancyCursor() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const hoverRef = useRef(false);
  const pressRef = useRef(false);

  const dotEl = useRef<HTMLDivElement | null>(null);
  const ringEl = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const shouldEnable = hasFinePointer() && !prefersReducedMotion();
    if (!shouldEnable) return;

    const root = document.documentElement;
    root.classList.add("has-fancy-cursor");

    const onMove = (e: MouseEvent) => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Dot follows mouse exactly — no lag
      if (dotEl.current) {
        dotEl.current.style.left = `${e.clientX}px`;
        dotEl.current.style.top = `${e.clientY}px`;
      }
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      if (target.closest('[data-cursor="default"]')) return false;
      if (target.closest('[data-cursor="hover"]')) return true;
      return Boolean(
        target.closest('a, button, [role="button"], input, textarea, select, summary, label')
      );
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        hoverRef.current = true;
        ringEl.current?.classList.add("is-hover");
        dotEl.current?.classList.add("is-hover");
      }
    };

    const onOut = (e: MouseEvent) => {
      if (!isInteractive(e.relatedTarget)) {
        hoverRef.current = false;
        ringEl.current?.classList.remove("is-hover");
        dotEl.current?.classList.remove("is-hover");
      }
    };

    const onDown = () => {
      pressRef.current = true;
      ringEl.current?.classList.add("is-press");
    };

    const onUp = () => {
      pressRef.current = false;
      ringEl.current?.classList.remove("is-press");
    };

    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const onEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    // Ring position — smooth spring follow
    ring.current.x = mouse.current.x;
    ring.current.y = mouse.current.y;

    const tick = () => {
      const ease = hoverRef.current ? 0.08 : 0.15;
      ring.current.x += (mouse.current.x - ring.current.x) * ease;
      ring.current.y += (mouse.current.y - ring.current.y) * ease;

      if (ringEl.current) {
        ringEl.current.style.left = `${ring.current.x}px`;
        ringEl.current.style.top = `${ring.current.y}px`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      root.classList.remove("has-fancy-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotEl}
        className={`cursor-dot ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={ringEl}
        className={`cursor-ring ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
