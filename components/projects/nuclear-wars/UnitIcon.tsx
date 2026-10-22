import type { UnitKind } from "@/content/landings/nuclear-wars";

/** Line icons of the five unit types, drawn in the accent color. */
export function UnitIcon({ kind }: { kind: UnitKind }) {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === "silo" && <><path d="M16 4l3 6v12h-6V10z" /><path d="M13 18l-3 4h3M19 18l3 4h-3" /><path d="M6 28h20" /></>}
      {kind === "radar" && <><path d="M7 21a10 10 0 0 1 12-12" /><path d="M7 21l12-12" /><path d="M13 15l5 5" /><path d="M14 28l4-8 4 8M10 28h16" /><path d="M22 6a7 7 0 0 1 4 4M23 2a11 11 0 0 1 7 7" /></>}
      {kind === "abm" && <><path d="M10 26V12l2-4 2 4v14M18 26V12l2-4 2 4v14" /><path d="M6 28h20" /><path d="M24 4l-3 3M8 4l3 3" /></>}
      {kind === "submarine" && <><path d="M4 19c0-3 4-5 12-5s12 2 12 5-4 5-12 5S4 22 4 19z" /><path d="M13 14v-4h5l1 4" /><path d="M16 10V6" /><path d="M2 28c3-2 5-2 7 0s5 2 7 0 5-2 7 0 5 2 7 0" /></>}
      {kind === "airbase" && <><path d="M16 3l2 8 9 5v3l-9-2-1 6 3 3v2l-4-1-4 1v-2l3-3-1-6-9 2v-3l9-5z" /></>}
    </svg>
  );
}
