export function SectionHeading({
  kicker,
  title,
  emphasize,
}: {
  kicker: string;
  title: string;
  emphasize?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 md:mb-16 gap-6 md:gap-8">
      <div className="max-w-xl">
        <h2 className="text-[10px] md:text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase mb-2 md:mb-3 flex items-center gap-2">
          <span className="w-6 md:w-8 h-[1px] bg-white/20" />
          {kicker}
        </h2>
        <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white">
          {title}{" "}
          {emphasize ? (
            <span className="text-zinc-400 font-bold">{emphasize}</span>
          ) : null}
        </h3>
      </div>
    </div>
  );
}

