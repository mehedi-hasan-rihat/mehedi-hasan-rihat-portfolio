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
        "fixed bottom-8 right-6 p-4 bg-white text-black rounded-full shadow-2xl transition-all duration-500 z-50 md:hidden",
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50 pointer-events-none",
      ].join(" ")}
      aria-label="Back to top"
    >
      <IconArrowUp width={20} height={20} />
    </button>
  );
}
