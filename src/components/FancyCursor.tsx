"use client";

import { useEffect, useRef, useState } from "react";

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

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
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
    };

    const onMove = (e: MouseEvent) => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

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

    // Start ring from current mouse pos to avoid a jump.
    ring.current.x = mouse.current.x;
    ring.current.y = mouse.current.y;

    const tick = () => {
      const stiffness = modeRef.current === "down" ? 0.22 : 0.16;
      ring.current.x += (mouse.current.x - ring.current.x) * stiffness;
      ring.current.y += (mouse.current.y - ring.current.y) * stiffness;

      if (ringEl.current) {
        ringEl.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
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
      <div
        ref={dotEl}
        className="fancy-cursor fancy-cursor-dot"
        data-visible={visible ? "true" : "false"}
        aria-hidden="true"
      />
      <div
        ref={ringEl}
        className="fancy-cursor fancy-cursor-ring"
        data-visible={visible ? "true" : "false"}
        aria-hidden="true"
      />
    </>
  );
}
