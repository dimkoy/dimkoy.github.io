import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResume } from "@/content/resume";
import { featuredProjects } from "@/content/projects";
import { Education } from "@/components/resume/Education";
import { Experience } from "@/components/resume/Experience";
import { Hero } from "@/components/resume/Hero";
import { Section } from "@/components/resume/Section";
import { Skills } from "@/components/resume/Skills";
import { YoyTiles } from "@/components/resume/YoyTiles";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PostList } from "@/components/blog/PostList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog";
import { formatMonth } from "@/lib/format";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/t";
import { graph, profilePageJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { buildMetadata, homeTitle } from "@/lib/seo";
import { site } from "@/lib/site";
import { YOY_WINDOWS } from "@/content/stats/growdiaries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const resume = getResume(locale);
  return {
    ...buildMetadata({ locale, path: "/", description: resume.seoDescription, imageAlt: resume.photoAlt }),
    title: { absolute: homeTitle(locale) },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const resume = getResume(locale);
  const posts = (await getAllPosts(locale)).slice(0, 3);
  const win = (w: { from: string; to: string }) => `${formatMonth(w.from, locale)} — ${formatMonth(w.to, locale)}`;

  return (
    <main>
      <JsonLd data={graph(profilePageJsonLd(locale), websiteJsonLd(locale))} />
      <Hero resume={resume} dict={dict} />

      <Section id="productivity" title={dict.home.productivity}>
        <p className="mb-4 max-w-2xl text-sm text-ink2">
          {t(dict.home.productivityNote, { base: win(YOY_WINDOWS.base), last: win(YOY_WINDOWS.last) })}
        </p>
        <YoyTiles locale={locale} dict={dict} />
        <p className="mt-3 text-sm">
          <Link href={localePath(locale, "/stats")} className="text-accent hover:underline">{dict.actions.seeStats} →</Link>
        </p>
      </Section>

      <Section id="experience" title={dict.home.experience}>
        <Experience items={resume.experience} locale={locale} dict={dict} />
      </Section>

      <Section id="projects" title={dict.home.featuredProjects}>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((p) => <ProjectCard key={p.slug} project={p} locale={locale} dict={dict} />)}
        </div>
        <p className="mt-3 text-sm">
          <Link href={localePath(locale, "/projects")} className="text-accent hover:underline">{dict.actions.allProjects} →</Link>
        </p>
      </Section>

      <Section id="skills" title={dict.home.skills}>
        <Skills groups={resume.skills} />
      </Section>

      <Section id="education" title={dict.home.education}>
        <Education items={resume.education} languages={resume.languages} languagesTitle={dict.home.languages} />
      </Section>

      {posts.length > 0 && (
        <Section id="blog" title={dict.home.latestPosts}>
          <PostList posts={posts} locale={locale} dict={dict} />
          <p className="mt-3 text-sm">
            <Link href={localePath(locale, "/blog")} className="text-accent hover:underline">{dict.actions.allPosts} →</Link>
          </p>
        </Section>
      )}

      <Section id="contacts" title={dict.home.contacts}>
        <address className="not-italic">
          <ul className="space-y-1 text-[15px]">
            <li><a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a></li>
            <li><a href={site.linkedin} target="_blank" rel="me noopener" className="text-accent hover:underline">linkedin.com/in/dmitrii-cherviakov</a></li>
            <li><a href={site.github} target="_blank" rel="me noopener" className="text-accent hover:underline">github.com/dimkoy</a></li>
            <li className="text-ink2">{resume.location}</li>
          </ul>
        </address>
      </Section>
    </main>
  );
}
