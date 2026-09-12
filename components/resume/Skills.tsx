import type { Resume } from "@/content/types";

export function Skills({ groups }: { groups: Resume["skills"] }) {
  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.group}>
          <dt className="text-sm text-muted">{g.group}</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {g.items.map((i) => <span key={i} className="rounded-md border border-line bg-surface px-2 py-0.5 text-sm">{i}</span>)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
