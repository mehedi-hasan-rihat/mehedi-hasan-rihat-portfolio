import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-black relative overflow-hidden scroll-mt-28"
    >
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeading kicker="Inventory" title="Tech" emphasize="Stack" />

        <div className="flex flex-wrap justify-center gap-4">
          {site.skills.map((skill) => (
            <div
              key={skill}
              className={[
                "group relative px-6 py-3 bg-zinc-950 border border-white/10 rounded-xl",
                "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.02)]",
                "hover:border-white hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
                "transition-all duration-300 ease-out flex items-center justify-center",
              ].join(" ")}
            >
              <span className="text-[13px] font-bold tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                {skill}
              </span>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white scale-0 group-hover:scale-100 transition-transform duration-300 rounded-bl-md" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

