import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

/**
 * Legal documents of a project (App Store privacy policy, terms), served at /<locale>/projects/<project>/<doc>/.
 * Source: content/legal/<project>/<doc>.md — English only; every locale renders the same text.
 */
const LEGAL_DIR = path.join(process.cwd(), "content", "legal");

const Frontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(20).max(220),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Label of the date line; the terms keep their original "Effective Date". */
  dateLabel: z.string().default("Last Updated"),
});

export type LegalDoc = z.infer<typeof Frontmatter> & {
  project: string;
  doc: string;
  /** Site path without locale, e.g. "/projects/nuclear-wars/privacy". */
  path: string;
  body: string;
};

function read(project: string, doc: string): LegalDoc {
  const file = path.join(LEGAL_DIR, project, `${doc}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const parsed = Frontmatter.safeParse(data);
  if (!parsed.success) throw new Error(`Invalid frontmatter in ${file}: ${parsed.error.message}`);
  return { ...parsed.data, project, doc, path: `/projects/${project}/${doc}`, body: content };
}

/** Legal documents of every project, or of one project when given; privacy before terms within a project. */
export function getLegalDocs(project?: string): LegalDoc[] {
  if (!fs.existsSync(LEGAL_DIR)) return [];
  return fs.readdirSync(LEGAL_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && (project === undefined || e.name === project))
    .flatMap((e) => fs.readdirSync(path.join(LEGAL_DIR, e.name)).filter((f) => f.endsWith(".md")).sort().map((f) => read(e.name, f.slice(0, -3))));
}
