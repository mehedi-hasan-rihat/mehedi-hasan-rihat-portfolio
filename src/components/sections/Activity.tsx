import { site } from "@/lib/site";

export function Activity() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="p-6 border border-white/10 bg-white/5 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm font-medium text-zinc-200">
          Activity feed coming soon —{" "}
          <a
            href={site.socials.find((s) => s.label === "GitHub")?.href ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            View GitHub
          </a>
        </div>
        <a
          href="#projects"
          className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest text-center"
        >
          Explore Work
        </a>
      </div>
    </div>
  );
}

