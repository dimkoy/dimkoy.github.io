import type { Resume } from "./types";

export const resumeRu: Resume = {
  name: "Дмитрий Червяков",
  title: "Senior iOS Developer",
  headline: "Senior iOS-разработчик · Swift, SwiftUI · Барселона",
  seoDescription: "Senior iOS-разработчик в Барселоне, 9+ лет в Swift, SwiftUI и TCA. Финтех-приложения на 400K MAU с 99% crash-free, инвест-приложение #1 по Digital Investment Rank 2024 (Markswebb) и GrowDiaries — соцсеть, написанная в одиночку с нуля до App Store.",
  location: "Барселона, Испания",
  photoAlt: "Дмитрий Червяков, Senior iOS-разработчик",
  summary: [
    "Senior iOS-разработчик с опытом 9+ лет в создании масштабируемых и производительных мобильных приложений. Глубокая экспертиза в Swift и SwiftUI, фокус на архитектуре, стабильности и продуктивности разработки.",
    "Руководил под-командой из 10 инженеров в крупных продуктах, обеспечив 99% crash-free сессий для приложений с 400K MAU. Сейчас сосредоточен на AI-driven процессах разработки, которые кратно ускоряют инженерную работу без потери качества.",
  ],
  facts: [
    { value: "9+ лет", label: "в iOS-разработке, с 2017 года" },
    { value: "400K MAU", label: "финтех-приложения Альфа-Банка" },
    { value: "99%", label: "crash-free сессий на большом масштабе" },
    { value: "#1", label: "инвест-приложение — Digital Investment Rank 2024, Markswebb" },
    { value: "86 тыс. строк · 90 фич", label: "GrowDiaries, написано в одиночку, в App Store" },
    { value: "+48%", label: "delivery cadence с AI-driven workflow" },
  ],
  experience: [
    {
      company: "GrowDiaries",
      location: "Удалённо",
      roles: [{ title: "Senior iOS Developer", start: "2025-05" }],
      projectSlug: "growdiaries",
      summary: "Социальная сеть для гроверов: дневники, медиа, вопросы, чат, конкурсы и страницы брендов — на pure SwiftUI и TCA.",
      highlights: [
        "В одиночку построил iOS-приложение социальной сети с нуля — pure SwiftUI и The Composable Architecture (TCA): 86 тыс. строк Swift, 90 выпущенных фич, приложение в App Store",
        "Выстроил AI-driven процесс разработки — agentic coding pipelines с автоматическими циклами верификации и тестовыми guardrails — который поднял каждую измеряемую метрику продуктивности год к году: +81% code output, +48% delivery cadence и +38% feature throughput",
      ],
      tech: ["Swift", "SwiftUI", "TCA", "Swift Concurrency", "Xcode Cloud", "Firebase", "Claude Code"],
    },
    {
      company: "Альфа-Банк",
      location: "Удалённо",
      roles: [
        { title: "Lead iOS Developer", start: "2024-06", end: "2025-05" },
        { title: "Senior iOS Developer", start: "2021-10", end: "2024-06" },
      ],
      projectSlug: "alfa-bank",
      summary: "Приложение для трейдинга и инвестиций — лучшее на рынке по Digital Investment Rank 2024 (Markswebb). Фича-команда отвечала за IPO, SPO и другие размещения; моя техническая зона — навигация и диплинки.",
      highlights: [
        "Руководил под-командой из 10 разработчиков внутри iOS-организации из 35 инженеров: сотрудничество, менторство и технический рост; отвечал за crash-free, производительность и здоровье проекта",
        "Отвечал за стабильность и производительность приложения — 99% crash-free сессий при 400K MAU",
        "Переработал всю навигацию приложения, заметно повысив надёжность диплинков и удобство; написал документацию и представил подход команде",
        "Возглавил быстрый запуск торговли в новых валютах, что принесло значительный дополнительный доход в период высокой волатильности рынка",
        "Внедрил SwiftUI в проект, собрав MVP-приложение для сотрудников за неделю",
      ],
      tech: ["Swift", "SwiftUI", "MVVM", "SnapKit", "Design system", "DDD"],
    },
    {
      company: "J'JO",
      location: "Удалённо",
      roles: [{ title: "Lead iOS Developer", start: "2021-08", end: "2021-10" }],
      summary: "iOS-приложение для инвестиций в криптовалюту. MVP был написан аутсорс-компанией на Kotlin Multiplatform и передан внутренней команде.",
      highlights: [
        "Подготовил roadmap перехода с Kotlin Multiplatform на нативный Swift и начал миграцию; через три месяца владелец расформировал стартап",
      ],
      tech: ["Swift", "Kotlin Multiplatform"],
    },
    {
      company: "FBS Inc.",
      location: "Санкт-Петербург, Россия",
      roles: [
        { title: "Lead iOS Developer", start: "2021-03", end: "2021-08" },
        { title: "Senior iOS Developer", start: "2020-08", end: "2021-03" },
      ],
      summary: "FBS Broker — приложение для торговли на форексе, металлах, индексах и энергоносителях. Повышен до iOS team lead после двух ключевых фич и улучшения процессов разработки в отделе.",
      highlights: [
        "Оценка задач и балансировка нагрузки команды из 6 iOS-разработчиков; коммуникация с менеджерами и другими командами",
        "Обновил процессы между разработкой, QA и менеджментом: стабильные релизы без переработок",
        "Наставник junior-разработчика, который через 3 месяца прошёл аттестацию на middle",
        "Проводил собеседования и нанял 3 iOS-разработчиков",
      ],
      tech: ["Swift", "RxSwift", "MVVM", "SnapKit", "gRPC"],
    },
    {
      company: "EPAM Systems",
      location: "Санкт-Петербург, Россия",
      roles: [{ title: "iOS Developer", start: "2019-05", end: "2020-08" }],
      summary: "Крупный проект для телеком-операторов в ЕС.",
      highlights: [
        "Разработал FAQ-модуль со сложной навигацией и покрытием unit-тестами 90%",
        "Реализовал server-driven баннер, позволяющий запускать маркетинговые кампании без выпуска новой версии приложения",
      ],
      tech: ["Swift", "VIPER", "RxSwift", "TDD", "Charles", "Fastlane", "CI/CD"],
    },
    {
      company: "Samara IT Community",
      location: "Самара, Россия",
      type: "Part-time",
      roles: [{ title: "Community Lead", start: "2018-05", end: "2021-03" }],
      highlights: [
        "Руководил локальным IT-сообществом: организовывал митапы и хакатоны, включая GrindConf, и сам в них участвовал",
      ],
    },
    {
      company: "Haulmont Technology",
      location: "Самара, Россия",
      url: "https://sherlocktaxi.com/case-studies/",
      roles: [{ title: "iOS Developer", start: "2017-04", end: "2019-04" }],
      summary: "White-label мобильное приложение для служб такси по всему миру, в основном из Великобритании (Sherlock Taxi).",
      highlights: [
        "Выучил Objective-C за две недели, чтобы включиться в проект; позже провёл редизайн приложения",
        "Выполнил R&D по распознаванию банковских карт и выбрал лучший фреймворк для приложения",
        "Общался с заказчиками и согласовывал требования к приложениям",
      ],
      tech: ["Objective-C", "Alamofire", "Moya", "MVC", "VIPER", "Sketch", "TeamCity"],
    },
  ],
  skills: [
    { group: "Языки", items: ["Swift", "Objective-C"] },
    { group: "UI", items: ["SwiftUI", "UIKit", "SnapKit"] },
    { group: "Платформы", items: ["iOS", "visionOS", "RealityKit", "GameKit"] },
    { group: "Архитектура", items: ["TCA", "MVVM", "VIPER", "MVC"] },
    { group: "Сеть", items: ["Alamofire", "Moya", "gRPC", "Charles / Proxyman"] },
    { group: "Практики", items: ["TDD", "DDD", "CI/CD", "AI-driven workflows", "Код-ревью"] },
    { group: "Инструменты", items: ["Xcode Cloud", "Fastlane", "TeamCity", "Sketch / Figma", "Claude Code"] },
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
