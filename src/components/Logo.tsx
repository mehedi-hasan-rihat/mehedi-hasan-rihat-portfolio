"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const paths = logoRef.current.querySelectorAll("path");

    // Animate logo on mount
    gsap.fromTo(
      paths,
      {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        opacity: 0,
      },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2,
        stagger: 0.2,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <svg
      ref={logoRef}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer square frame */}
      <rect
        x="20"
        y="20"
        width="160"
        height="160"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {/* M */}
      <path
        d="M 50 140 L 50 60 L 75 90 L 100 60 L 100 140"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* H */}
      <path
        d="M 120 60 L 120 140 M 120 100 L 150 100 M 150 60 L 150 140"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Accent dot */}
      <circle cx="100" cy="100" r="3" fill="white" />
    </svg>
  );
}

// Minimal version for navbar
export function LogoMinimal({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <text
        x="50"
        y="65"
        textAnchor="middle"
        fill="white"
        fontSize="40"
        fontWeight="bold"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        M
      </text>
    </svg>
  );
}

// Animated version with hover effect
export function LogoAnimated({ className = "" }: LogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    if (!logoRef.current) return;
    const paths = logoRef.current.querySelectorAll("path, rect");
    
    gsap.to(paths, {
      stroke: "#ffffff",
      strokeWidth: 4,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!logoRef.current) return;
    const paths = logoRef.current.querySelectorAll("path, rect");
    
    gsap.to(paths, {
      stroke: "#ffffff",
      strokeWidth: 2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <svg
      ref={logoRef}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer frame */}
      <rect
        x="20"
        y="20"
        width="160"
        height="160"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />

      {/* MHR monogram */}
      <path
        d="M 50 140 L 50 60 L 75 90 L 100 60 L 100 140"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <path
        d="M 120 60 L 120 140 M 120 100 L 150 100 M 150 60 L 150 140"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Center accent */}
      <circle cx="100" cy="100" r="2" fill="white" />
    </svg>
  );
}
