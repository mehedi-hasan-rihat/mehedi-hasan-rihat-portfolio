"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on project images
      gsap.utils.toArray<HTMLElement>(".project-image").forEach((image) => {
        gsap.to(image, {
          y: -100,
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen px-6 md:px-12 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Sticky */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">
              Projects
            </h2>
            <div className="w-24 h-[2px] bg-white" />
            <p className="text-lg text-zinc-500 mt-8">
              Selected works and case studies
            </p>
          </div>

          {/* Right side - Scrolling projects */}
          <div className="space-y-24">
            {site.projects.map((project, index) => (
              <div key={index} className="group">
                {/* Image */}
                <div className="relative aspect-video mb-6 overflow-hidden bg-zinc-900">
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className="project-image w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 border border-zinc-800 group-hover:border-zinc-600 transition-colors" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500 uppercase tracking-wider">
                      {project.type}
                    </span>
                    <span className="text-zinc-600 font-mono text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-zinc-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-lg text-zinc-500 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-sm text-zinc-600 border border-zinc-800 px-3 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <a
                    href={project.href}
                    className="inline-flex items-center gap-2 text-white hover:text-zinc-400 transition-colors pt-4 group/link"
                  >
                    <span className="text-sm uppercase tracking-wider">View Project</span>
                    <svg
                      className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
