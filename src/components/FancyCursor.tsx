"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type CursorMode = "default" | "hover" | "down";

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
  const modeRef = useRef<CursorMode>("default");

  const dotEl = useRef<HTMLDivElement | null>(null);
  const ringEl = useRef<HTMLDivElement | null>(null);
  const textEl = useRef<HTMLSpanElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const shouldEnable = hasFinePointer() && !prefersReducedMotion();
    if (!shouldEnable) return;

    const root = document.documentElement;
    root.classList.add("has-fancy-cursor");

    const updateMode = (next: CursorMode) => {
      if (modeRef.current === next) return;
      modeRef.current = next;
      root.setAttribute("data-cursor-mode", next);

      // Animate ring on mode change
      if (next === "hover") {
        gsap.to(ringEl.current, {
          width: 80,
          height: 80,
          borderColor: "rgba(255,255,255,0.6)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dotEl.current, {
          scale: 0,
          duration: 0.3,
          ease: "power3.out",
        });
        if (textEl.current) {
          gsap.to(textEl.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });
        }
      } else if (next === "down") {
        gsap.to(ringEl.current, {
          width: 30,
          height: 30,
          borderColor: "rgba(255,255,255,0.9)",
          duration: 0.2,
          ease: "power3.out",
        });
        gsap.to(dotEl.current, {
          scale: 1.5,
          duration: 0.2,
          ease: "power3.out",
        });
        if (textEl.current) {
          gsap.to(textEl.current, { opacity: 0, scale: 0.5, duration: 0.2 });
        }
      } else {
        gsap.to(ringEl.current, {
          width: 40,
          height: 40,
          borderColor: "rgba(255,255,255,0.3)",
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
        gsap.to(dotEl.current, {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.5)",
        });
        if (textEl.current) {
          gsap.to(textEl.current, { opacity: 0, scale: 0.5, duration: 0.3 });
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      // Track velocity for stretch effect
      velocity.current.x = e.clientX - mouse.current.x;
      velocity.current.y = e.clientY - mouse.current.y;

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Dot follows instantly
      if (dotEl.current) {
        dotEl.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      if (target.closest('[data-cursor="default"]')) return false;
      if (target.closest('[data-cursor="hover"]')) return true;
      return Boolean(
        target.closest(
          'a, button, [role="button"], input, textarea, select, summary, label'
        )
      );
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) updateMode("hover");
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget;
      if (isInteractive(related)) return;
      updateMode("default");
    };

    const onDown = () => updateMode("down");
    const isInteractiveAtPointer = () =>
      isInteractive(document.elementFromPoint(mouse.current.x, mouse.current.y));
    const onUp = () => updateMode(isInteractiveAtPointer() ? "hover" : "default");

    // Start ring from current position
    ring.current.x = mouse.current.x;
    ring.current.y = mouse.current.y;

    const tick = () => {
      // Smooth spring-like follow for ring
      const stiffness = modeRef.current === "hover" ? 0.08 : modeRef.current === "down" ? 0.2 : 0.12;
      ring.current.x += (mouse.current.x - ring.current.x) * stiffness;
      ring.current.y += (mouse.current.y - ring.current.y) * stiffness;

      if (ringEl.current) {
        // Calculate slight rotation based on movement direction
        const angle = Math.atan2(
          mouse.current.y - ring.current.y,
          mouse.current.x - ring.current.x
        ) * (180 / Math.PI);

        const distance = Math.hypot(
          mouse.current.x - ring.current.x,
          mouse.current.y - ring.current.y
        );

        // Slight stretch based on speed
        const stretch = Math.min(distance * 0.015, 0.3);
        const scaleX = 1 + stretch;
        const scaleY = 1 - stretch * 0.5;

        ringEl.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      rafId.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    rafId.current = window.requestAnimationFrame(tick);

    return () => {
      root.classList.remove("has-fancy-cursor");
      root.removeAttribute("data-cursor-mode");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot — follows instantly */}
      <div
        ref={dotEl}
        className="fancy-cursor fancy-cursor-dot"
        data-visible={visible ? "true" : "false"}
        aria-hidden="true"
      />
      {/* Outer ring — follows with spring physics + stretches */}
      <div
        ref={ringEl}
        className="fancy-cursor fancy-cursor-ring"
        data-visible={visible ? "true" : "false"}
        aria-hidden="true"
      >
        <span
          ref={textEl}
          className="cursor-label"
        >
          View
        </span>
      </div>
    </>
  );
}
