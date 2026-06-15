"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.set(headingRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.to(headingRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Each project card animates individually
      const cards = sectionRef.current?.querySelectorAll(".project-card") || [];
      cards.forEach((card) => {
        const image = card.querySelector(".project-image-wrap");
        const content = card.querySelector(".project-content");
        const number = card.querySelector(".project-number");

        // Image: diagonal wipe
        gsap.set(image, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
        gsap.to(image, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: card, start: "top 75%" },
        });

        // Content slides up
        gsap.set(content, { yPercent: 30, clipPath: "inset(20% 0 0 0)" });
        gsap.to(content, {
          yPercent: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 70%" },
        });

        // Number scales in
        gsap.set(number, { scale: 0, rotateZ: -10 });
        gsap.to(number, {
          scale: 1,
          rotateZ: 0,
          duration: 0.8,
          ease: "back.out(2)",
          scrollTrigger: { trigger: card, start: "top 75%" },
        });
      });

      // Parallax on images
      gsap.utils.toArray<HTMLElement>(".project-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -10,
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 2 },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-6 md:px-16 lg:px-24 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-4">
          <span className="text-[11px] text-zinc-600 uppercase tracking-[0.3em] font-mono">
            03 / Work
          </span>
        </div>

        <div className="overflow-hidden mb-20">
          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]"
          >
            Selected
            <br />
            <span className="text-zinc-500">Projects</span>
          </h2>
        </div>

        {/* Project list */}
        <div className="space-y-32">
          {site.projects.map((project, index) => (
            <div
              key={index}
              className={`project-card grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:col-start-7 lg:col-span-6" : "lg:col-span-7"}`}>
                <div className="project-image-wrap relative aspect-[16/10] overflow-hidden bg-zinc-900 group">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="project-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute inset-0 border border-zinc-800/50 group-hover:border-zinc-600/50 transition-colors duration-500" />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:col-span-5 lg:row-start-1" : "lg:col-span-5"}`}>
                <div className="project-content space-y-5">
                  {/* Number + Type */}
                  <div className="flex items-center gap-4">
                    <span className="project-number text-7xl font-black text-zinc-800/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
                      {project.type}
                    </span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-[11px] text-zinc-600 font-mono">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-base text-zinc-500 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs text-zinc-500 border border-zinc-800 px-3 py-1.5 hover:border-zinc-600 hover:text-zinc-300 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={project.href}
                    className="inline-flex items-center gap-3 text-white pt-4 group/link hover-line"
                  >
                    <span className="text-sm uppercase tracking-wider font-medium">
                      View Project
                    </span>
                    <svg
                      className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
