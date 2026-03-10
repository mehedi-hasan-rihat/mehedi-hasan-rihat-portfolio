import { site } from "@/lib/site";
import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">
          Resume
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-white">
          {site.name}
        </h1>
        <p className="mt-4 text-zinc-300 leading-relaxed">
          Add your resume PDF to <span className="font-mono">public/</span> (for
          example <span className="font-mono">public/resume.pdf</span>) and set{" "}
          <span className="font-mono">resumePdfHref</span> in{" "}
          <span className="font-mono">src/lib/site.ts</span>.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          {site.resumePdfHref ? (
            <a
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-7 py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors"
              href={site.resumePdfHref}
            >
              Download resume (PDF)
            </a>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
              Resume download is not set yet.
            </div>
          )}
          <Link
            className="inline-flex items-center justify-center rounded-full border border-white px-7 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-colors"
            href="/"
          >
            Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
