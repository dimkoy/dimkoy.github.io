import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "growdiaries",
    kind: "product",
    featured: true,
    period: { start: "2025-05" },
    tech: ["Swift", "SwiftUI", "TCA", "Swift Concurrency", "Xcode Cloud", "Firebase", "Claude Code"],
    links: [
      { kind: "appstore", pending: true },
      { kind: "stats", url: "/stats" },
    ],
    media: [],
    metrics: [
      { value: "86K", label: { en: "lines of Swift", ru: "строк Swift" } },
      { value: "90", label: { en: "features shipped", ru: "выпущенных фич" } },
      { value: "321", label: { en: "shippable builds", ru: "shippable builds" } },
      { value: "1", label: { en: "iOS developer", ru: "iOS-разработчик" } },
    ],
    i18n: {
      en: {
        title: "GrowDiaries",
        role: "Sole iOS developer",
        tagline: "A social network for growers, built from scratch in pure SwiftUI + TCA.",
        description: [
          "GrowDiaries is a community where growers keep diaries of their plants week by week, share photos and videos, follow each other, ask questions and join contests. I built the whole iOS app alone — from the first screen to App Store submission — over roughly 15 months.",
          "The codebase is pure SwiftUI on top of The Composable Architecture: 90 features, from the diary editor and media manager to chat, notifications, deep links, dark mode, ads, brand pages and in-app content translation. Every non-merge commit to main is a shippable build, so the git history doubles as a delivery log.",
          "Halfway through the project I rebuilt my workflow around AI agents: agentic coding pipelines with automated verification loops and testing guardrails. Comparing two identical six-month windows, code output grew by 81%, delivery cadence by 47% and feature throughput by 38% — with the same single developer.",
        ],
        highlights: [
          "Diary flow: germination, vegetation, flowering and harvest weeks with per-week validation, unit presets and nutrient tracking",
          "Media pipeline: camera capture, background uploads with progress, fullscreen viewer with pinch-zoom and landscape",
          "Social layer: feed, following, comments with media, questions with tags, chat with delivery status, push notifications via a Notification Service Extension",
          "Growth features: contests, brand pages, ads, deep links, social sign-in, GDPR flows, content translation",
          "Quality: Xcode Cloud CI with BrowserStack autotests on every build, unit tests, trunk-based development",
        ],
      },
      ru: {
        title: "GrowDiaries",
        role: "Единственный iOS-разработчик",
        tagline: "Социальная сеть для гроверов, написанная с нуля на pure SwiftUI + TCA.",
        description: [
          "GrowDiaries — сообщество, где гроверы ведут дневники растений неделя за неделей, делятся фото и видео, подписываются друг на друга, задают вопросы и участвуют в конкурсах. Всё iOS-приложение я написал один — от первого экрана до отправки в App Store — примерно за 15 месяцев.",
          "Кодовая база — pure SwiftUI поверх The Composable Architecture: 90 фич, от редактора дневника и медиа-менеджера до чата, уведомлений, диплинков, тёмной темы, рекламы, страниц брендов и перевода контента. Каждый non-merge коммит в main — shippable build, поэтому git-история одновременно служит журналом поставок.",
          "В середине проекта я перестроил рабочий процесс вокруг AI-агентов: agentic coding pipelines с автоматическими циклами верификации и тестовыми guardrails. При сравнении двух одинаковых шестимесячных окон code output вырос на 81%, delivery cadence — на 47%, feature throughput — на 38% — с тем же единственным разработчиком.",
        ],
        highlights: [
          "Дневник: недели проращивания, вегетации, цветения и урожая с валидацией по неделям, пресетами единиц и учётом удобрений",
          "Медиа: съёмка с камеры, фоновые загрузки с прогрессом, полноэкранный просмотр с pinch-zoom и ландшафтом",
          "Социальный слой: лента, подписки, комментарии с медиа, вопросы с тегами, чат со статусами доставки, пуши через Notification Service Extension",
          "Рост: конкурсы, страницы брендов, реклама, диплинки, социальный вход, GDPR-сценарии, перевод контента",
          "Качество: Xcode Cloud CI с автотестами BrowserStack на каждой сборке, unit-тесты, trunk-based development",
        ],
      },
    },
  },
  {
    slug: "alfa-bank",
    kind: "product",
    featured: true,
    period: { start: "2021", end: "2025" },
    tech: ["Swift", "UIKit", "SwiftUI", "Coordinators", "gRPC", "TeamCity"],
    links: [],
    media: [],
    metrics: [
      { value: "400K", label: { en: "monthly active users", ru: "активных пользователей в месяц" } },
      { value: "99%", label: { en: "crash-free sessions", ru: "crash-free сессий" } },
      { value: "10 / 35", label: { en: "sub-team / iOS org", ru: "под-команда / iOS-орг." } },
    ],
    i18n: {
      en: {
        title: "Alfa-Bank mobile banking",
        role: "Senior → Lead iOS Developer",
        tagline: "Stability, navigation architecture and a sub-team of 10 in a 35-engineer iOS organization.",
        description: [
          "Alfa-Bank is one of the largest private banks in Russia; its iOS app serves hundreds of thousands of people every month. I joined as a Senior iOS Developer in 2021 and led a sub-team of 10 engineers from 2024.",
          "My area was application stability and performance: we kept 99% crash-free sessions at 400K MAU while dozens of teams shipped into the same app. I also redesigned navigation around the Coordinator pattern, which fixed a long tail of deep-linking issues, and wrote the documentation and ran the presentations that got the pattern adopted across teams.",
        ],
        highlights: [
          "Led a sub-team of 10 developers inside a 35-engineer iOS organization: planning, mentorship, code review, hiring",
          "Owned stability and performance — 99% crash-free sessions at 400K MAU",
          "Introduced Coordinator-based navigation; wrote the docs and ran the presentations for adoption",
          "Improved deep-linking reliability and cross-team feature integration",
        ],
      },
      ru: {
        title: "Мобильный банк Альфа-Банка",
        role: "Senior → Lead iOS Developer",
        tagline: "Стабильность, архитектура навигации и под-команда из 10 человек в iOS-организации из 35 инженеров.",
        description: [
          "Альфа-Банк — один из крупнейших частных банков России; его iOS-приложением ежемесячно пользуются сотни тысяч человек. Я пришёл Senior iOS-разработчиком в 2021 году, а с 2024-го руководил под-командой из 10 инженеров.",
          "Моя зона — стабильность и производительность приложения: мы удерживали 99% crash-free сессий при 400K MAU, пока десятки команд выпускали фичи в одно и то же приложение. Также я переработал навигацию вокруг паттерна Coordinator, что закрыло длинный хвост проблем с диплинками, написал документацию и провёл презентации, благодаря которым подход приняли все команды.",
        ],
        highlights: [
          "Руководил под-командой из 10 разработчиков в iOS-организации из 35 инженеров: планирование, менторство, код-ревью, найм",
          "Отвечал за стабильность и производительность — 99% crash-free сессий при 400K MAU",
          "Внедрил навигацию на Coordinator; написал документацию и провёл презентации для внедрения",
          "Повысил надёжность диплинков и интеграцию фич между командами",
        ],
      },
    },
  },
  {
    slug: "tca-app-demo",
    kind: "opensource",
    featured: false,
    period: { start: "2025-10" },
    tech: ["Swift", "SwiftUI", "TCA"],
    links: [{ kind: "github", url: "https://github.com/dimkoy/TCA_App_Demo" }],
    media: [],
    i18n: {
      en: {
        title: "TCA App Demo",
        role: "Author",
        tagline: "A reference iOS app with The Composable Architecture and a tab-based structure, iOS 16.6+.",
        description: [
          "A small, open-source starting point for TCA apps: tab navigation, feature composition, dependency injection and tests, targeting iOS 16.6 and above. I use it to show how I structure real TCA projects without the weight of a production codebase.",
        ],
        highlights: ["Tab structure with composed feature reducers", "iOS 16.6+ support", "Testable dependencies"],
      },
      ru: {
        title: "TCA App Demo",
        role: "Автор",
        tagline: "Эталонное iOS-приложение на The Composable Architecture с табами, iOS 16.6+.",
        description: [
          "Небольшая open-source заготовка для TCA-приложений: навигация по табам, композиция фич, внедрение зависимостей и тесты, с поддержкой iOS 16.6+. Использую её, чтобы показать, как структурирую реальные TCA-проекты без тяжести продакшен-кода.",
        ],
        highlights: ["Табы с композицией редьюсеров фич", "Поддержка iOS 16.6+", "Тестируемые зависимости"],
      },
    },
  },
  {
    slug: "stablediff",
    kind: "opensource",
    featured: false,
    period: { start: "2023-01", end: "2023-05" },
    tech: ["Swift", "CoreML", "Stable Diffusion", "Apple Silicon"],
    links: [{ kind: "github", url: "https://github.com/dimkoy/stableDiff" }],
    media: [],
    i18n: {
      en: {
        title: "stableDiff",
        role: "Author",
        tagline: "On-device image generation with Stable Diffusion and CoreML on Apple Silicon.",
        description: [
          "A pet project from early 2023: running Stable Diffusion locally through Apple's CoreML pipeline, wrapped in a native Swift app. It was my first hands-on work with generative models on Apple hardware — long before AI agents became part of my daily workflow.",
        ],
        highlights: ["Native Swift UI around the CoreML Stable Diffusion pipeline", "Runs fully on-device on Apple Silicon"],
      },
      ru: {
        title: "stableDiff",
        role: "Автор",
        tagline: "Генерация изображений на устройстве: Stable Diffusion и CoreML на Apple Silicon.",
        description: [
          "Пет-проект начала 2023 года: запуск Stable Diffusion локально через CoreML-пайплайн Apple в нативном Swift-приложении. Это была моя первая практическая работа с генеративными моделями на железе Apple — задолго до того, как AI-агенты стали частью ежедневного процесса.",
        ],
        highlights: ["Нативный Swift-интерфейс поверх CoreML-пайплайна Stable Diffusion", "Работает полностью на устройстве на Apple Silicon"],
      },
    },
  },
  {
    slug: "grindconf-2019",
    kind: "talk",
    featured: false,
    period: { start: "2019-02", end: "2019-02" },
    tech: ["iOS architecture", "VIPER", "MVVM", "Coordinators"],
    links: [{ kind: "talk", url: "https://samara-it-community.timepad.ru/event/884210/" }],
    media: [],
    i18n: {
      en: {
        title: "iOS Application Architectures — GrindConf 2019",
        role: "Speaker",
        tagline: "A conference talk on choosing an architecture for an iOS app: VIPER, MVVM and friends.",
        description: [
          "At GrindConf (Samara, February 2019) I gave a talk comparing iOS application architectures — what each one costs, what it buys you, and how to pick one for a real team and a real deadline.",
        ],
        highlights: ["Trade-offs of VIPER, MVVM and Coordinator-based navigation", "Practical selection criteria for teams"],
      },
      ru: {
        title: "Архитектуры iOS-приложений — GrindConf 2019",
        role: "Спикер",
        tagline: "Доклад о выборе архитектуры для iOS-приложения: VIPER, MVVM и другие.",
        description: [
          "На GrindConf (Самара, февраль 2019) я выступил с докладом, сравнивающим архитектуры iOS-приложений: что каждая стоит, что даёт и как выбирать под реальную команду и реальный дедлайн.",
        ],
        highlights: ["Компромиссы VIPER, MVVM и навигации на Coordinator", "Практические критерии выбора для команд"],
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
