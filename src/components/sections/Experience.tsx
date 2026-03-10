import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-black scroll-mt-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading kicker="Experience" title="Work" emphasize="Impact" />

        <div className="flex flex-col gap-6">
          {site.experience.map((exp) => (
            <div
              key={`${exp.company}-${exp.role}`}
              className="group relative border border-white/10 p-6 md:p-8 hover:border-white transition-all duration-300 bg-zinc-950"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-bold text-white">
                      {exp.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      Location
                    </p>
                    <p className="text-sm font-bold text-zinc-300">
                      {exp.location}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-9 border-l border-white/10 md:pl-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-white leading-tight">
                        {exp.company}
                      </h3>
                      <p className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest mt-1">
                        {exp.role}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-[13px] md:text-sm text-zinc-300 leading-relaxed flex items-start gap-3"
                      >
                        <span className="text-white font-black mt-0.5">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">
                      TOOLS:
                    </span>
                    <p className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                      {exp.tools.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

