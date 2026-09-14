export function Section({ id, title, children, aside }: { id: string; title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-20 py-8 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-8 border-t border-line first:border-t-0">
      <h2 id={headingId} className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted sm:mb-0 sm:pt-1">{title}</h2>
      <div className="min-w-0">
        {children}
        {aside}
      </div>
    </section>
  );
}
