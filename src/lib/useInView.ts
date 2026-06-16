import { useEffect, useRef } from "react";

/**
 * Calls `onEnter` once every time the element enters the viewport.
 * Works correctly on route changes / re-mounts unlike ScrollTrigger.
 */
export function useInView(
  ref: React.RefObject<Element | null>,
  onEnter: () => void,
  options: IntersectionObserverInit = { threshold: 0.15 }
) {
  const cbRef = useRef(onEnter);
  cbRef.current = onEnter;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        cbRef.current();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
