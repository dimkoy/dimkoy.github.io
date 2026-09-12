import type { Locale } from "@/lib/i18n/config";
import { resumeEn } from "./resume.en";
import { resumeRu } from "./resume.ru";
import type { Resume } from "./types";

const resumes: Record<Locale, Resume> = { en: resumeEn, ru: resumeRu };

export function getResume(locale: Locale): Resume {
  return resumes[locale];
}
