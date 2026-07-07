export default function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-2 mb-12">
      <div className="font-mono text-bull text-sm uppercase tracking-[0.2em] flex items-center gap-2.5">
        <span
          className="inline-block w-2 h-2 rounded-sm bg-bull shadow-neon-green"
          aria-hidden="true"
        ></span>
        {label}
      </div>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-terminal-highlight uppercase tracking-tight flex items-center gap-4">
        {title}
        <span className="h-px flex-grow bg-gradient-to-r from-bull/40 via-terminal-border to-transparent"></span>
      </h2>
    </div>
  );
}
