"use client";

import * as React from "react";
import { IconArrowUp } from "./icons";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={[
        "fixed bottom-8 right-6 p-5 bg-white text-black border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all duration-300 z-50 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-50 pointer-events-none",
      ].join(" ")}
      aria-label="Back to top"
    >
      <IconArrowUp width={24} height={24} />
    </button>
  );
}
