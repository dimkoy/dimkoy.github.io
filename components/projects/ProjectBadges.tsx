import type { Badge } from "@/content/types";

/** External "Featured on …" badges next to the project links. */
export function ProjectBadges({ badges }: { badges?: Badge[] }) {
  return badges?.map((b) => (
    <a key={b.href} href={b.href} target="_blank" rel="noopener" className="inline-flex">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-[34px] w-auto" />
    </a>
  ));
}
