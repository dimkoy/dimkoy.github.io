import type { Resume } from "@/content/types";

export function Education({ items, languages, languagesTitle }: { items: Resume["education"]; languages: Resume["languages"]; languagesTitle: string }) {
  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {items.map((e) => (
          <li key={e.school} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
            <div className="text-sm text-muted tnum">{e.year}</div>
            <div>
              <div className="font-medium">{e.school}</div>
              <div className="text-sm text-ink2">{e.degree} · {e.field}</div>
              <div className="text-sm text-muted">{e.place}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
        <div className="text-sm text-muted">{languagesTitle}</div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {languages.map((l) => <li key={l.name}>{l.name} <span className="text-muted">— {l.level}</span></li>)}
        </ul>
      </div>
    </div>
  );
}
