import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import type { Locale } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, ru: ru as Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
