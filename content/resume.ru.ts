import type { Resume } from "./types";

export const resumeRu: Resume = {
  name: "Дмитрий Червяков",
  title: "Senior iOS Developer",
  location: "Барселона, Испания",
  summary: [
    "Senior iOS-разработчик с опытом 9+ лет в создании масштабируемых и производительных мобильных приложений. Глубокая экспертиза в Swift и SwiftUI, фокус на архитектуре, стабильности и продуктивности разработки.",
    "Руководил под-командой из 10 инженеров в крупных продуктах, обеспечив 99% crash-free сессий для приложений с 400K MAU. Сейчас сосредоточен на AI-driven процессах разработки, которые кратно ускоряют инженерную работу без потери качества.",
  ],
  experience: [
    {
      company: "GrowDiaries",
      location: "Барселона, Испания",
      roles: [{ title: "Senior iOS Developer", start: "2025-05" }],
      projectSlug: "growdiaries",
      highlights: [
        "В одиночку построил iOS-приложение социальной сети с нуля — pure SwiftUI и The Composable Architecture (TCA): 86 тыс. строк Swift, 90 выпущенных фич, сейчас на ревью в App Store",
        "Выстроил AI-driven процесс разработки — agentic coding pipelines с автоматическими циклами верификации и тестовыми guardrails — который поднял каждую измеряемую метрику продуктивности год к году: +81% code output, +47% delivery cadence и +38% feature throughput",
      ],
      tech: ["Swift", "SwiftUI", "TCA", "Xcode Cloud", "Firebase"],
    },
    {
      company: "Альфа-Банк",
      location: "Удалённо",
      roles: [
        { title: "Lead iOS Developer", start: "2024", end: "2025" },
        { title: "Senior iOS Developer", start: "2021", end: "2024" },
      ],
      projectSlug: "alfa-bank",
      highlights: [
        "Руководил под-командой из 10 разработчиков внутри iOS-организации из 35 инженеров: сотрудничество, менторство и технический рост",
        "Отвечал за стабильность и производительность приложения — 99% crash-free сессий при 400K MAU",
        "Переработал навигацию, внедрив паттерн Coordinator: заметно повысил надёжность диплинков и удобство приложения. Подготовил документацию и провёл серию презентаций, чтобы подход приняли все команды",
      ],
      tech: ["Swift", "UIKit", "SwiftUI", "Coordinators", "gRPC", "TeamCity"],
    },
    {
      company: "FBS Inc.",
      location: "Санкт-Петербург, Россия",
      roles: [{ title: "Lead iOS Developer", start: "2020", end: "2021" }],
      highlights: [
        "Наладил взаимодействие разработчиков, QA и менеджмента: стабилизировал релизный процесс и сократил переработки",
        "Проводил собеседования и удвоил размер iOS-команды",
      ],
    },
    {
      company: "EPAM Systems",
      location: "Санкт-Петербург, Россия",
      roles: [{ title: "iOS Developer", start: "2019", end: "2020" }],
      highlights: ["Разработал FAQ-модуль со сложной навигацией и довёл покрытие unit-тестами до 90%"],
    },
    {
      company: "Haulmont Technology",
      location: "Самара, Россия",
      roles: [{ title: "iOS Developer", start: "2017", end: "2019" }],
      highlights: [
        "Провёл редизайн white-label приложения для служб такси",
        "Общался с заказчиками и согласовывал требования к приложениям",
      ],
    },
  ],
  skills: [
    { group: "Языки", items: ["Swift", "Objective-C"] },
    { group: "UI", items: ["SwiftUI", "UIKit", "SnapKit"] },
    { group: "Архитектура", items: ["TCA", "MVVM + Coordinators", "VIPER", "DDD"] },
    { group: "Сеть", items: ["Alamofire", "gRPC", "Charles / Proxyman"] },
    { group: "Практики", items: ["TDD", "CI/CD", "AI-driven workflows", "Код-ревью"] },
    { group: "Инструменты", items: ["Xcode Cloud", "TeamCity", "Sketch / Figma", "Claude Code"] },
  ],
  education: [
    { school: "Поволжский государственный университет телекоммуникаций и информатики", degree: "Магистр", field: "Информатика и вычислительная техника, диплом с отличием", year: "2017", place: "Самара" },
    { school: "Самарский государственный аэрокосмический университет", degree: "Бакалавр", field: "Мехатроника, робототехника и автоматизация", year: "2015", place: "Самара" },
  ],
  languages: [
    { name: "Английский", level: "C1" },
    { name: "Русский", level: "родной" },
    { name: "Испанский", level: "A2" },
  ],
};
