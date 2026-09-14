import type { Resume } from "./types";

export const resumeEn: Resume = {
  name: "Dmitrii Cherviakov",
  title: "Senior iOS Developer",
  location: "Barcelona, Spain",
  summary: [
    "Senior iOS Developer with 9+ years of experience building scalable, high-performance mobile applications. Strong expertise in Swift and SwiftUI, with a focus on architecture, stability and developer productivity.",
    "Led a sub-team of 10 engineers within large-scale products, achieving 99% crash-free sessions for apps with 400K MAU. Currently focused on AI-driven development workflows that multiply engineering velocity without compromising quality.",
  ],
  experience: [
    {
      company: "GrowDiaries",
      location: "Remote",
      roles: [{ title: "Senior iOS Developer", start: "2025-05" }],
      projectSlug: "growdiaries",
      summary: "A social network for growers: diaries, media, questions, chat, contests and brand pages — built in pure SwiftUI and TCA.",
      highlights: [
        "Built a social-network iOS app from the ground up as the sole iOS developer — pure SwiftUI and The Composable Architecture (TCA): 86K lines of Swift, 90 features shipped, live in the App Store",
        "Engineered an AI-driven development workflow — agentic coding pipelines with automated verification loops and testing guardrails — that lifted every measured productivity metric year-over-year: +81% code output, +48% delivery cadence and +38% feature throughput",
      ],
      tech: ["Swift", "SwiftUI", "TCA", "Swift Concurrency", "Xcode Cloud", "Firebase", "Claude Code"],
    },
    {
      company: "Alfa-Bank",
      location: "Remote",
      roles: [
        { title: "Lead iOS Developer", start: "2024-06", end: "2025-05" },
        { title: "Senior iOS Developer", start: "2021-10", end: "2024-06" },
      ],
      projectSlug: "alfa-bank",
      summary: "Trading & investing app rated the best on the market by Digital Investment Rank 2024 (Markswebb). Feature team owning IPOs, SPOs and other offerings; technical area — in-app navigation and deep links.",
      highlights: [
        "Led a sub-team of 10 developers within a 35-engineer iOS organization, fostering collaboration, mentorship and technical growth; owned crash-free rate, performance and project health",
        "Owned application stability and performance, maintaining 99% crash-free sessions at 400K MAU",
        "Refactored all navigation in the app, significantly improving deep-linking reliability and overall usability; wrote the documentation and presented the approach to the team",
        "Led the rapid rollout of trading in new currencies, which brought significant additional income during a period of high market volatility",
        "Introduced SwiftUI to the project by building an MVP app for employees within a week",
      ],
      tech: ["Swift", "SwiftUI", "MVVM", "SnapKit", "Design system", "DDD"],
    },
    {
      company: "J'JO",
      location: "Remote",
      roles: [{ title: "Lead iOS Developer", start: "2021-08", end: "2021-10" }],
      summary: "An iOS app for investing in cryptocurrency. The MVP was built by an outsourcing company in Kotlin Multiplatform and handed over to the in-house team.",
      highlights: [
        "Prepared the roadmap for migrating from Kotlin Multiplatform to a native Swift codebase and started the migration; the startup was disbanded by its owner three months later",
      ],
      tech: ["Swift", "Kotlin Multiplatform"],
    },
    {
      company: "FBS Inc.",
      location: "St Petersburg, Russia",
      roles: [
        { title: "Lead iOS Developer", start: "2021-03", end: "2021-08" },
        { title: "Senior iOS Developer", start: "2020-08", end: "2021-03" },
      ],
      summary: "FBS Broker — a trading app for forex, metals, indices and energies. Promoted to iOS team lead after delivering two key features and improving the department's development process.",
      highlights: [
        "Ran task estimation and load balancing for a team of 6 iOS developers; communicated with managers and other development teams",
        "Updated the processes between developers, QA and management to keep releases stable and avoid overtime",
        "Coached a junior developer who passed the middle-level assessment after 3 months",
        "Led interviews and hired 3 iOS developers",
      ],
      tech: ["Swift", "RxSwift", "MVVM", "SnapKit", "gRPC"],
    },
    {
      company: "EPAM Systems",
      location: "St Petersburg, Russia",
      roles: [{ title: "iOS Developer", start: "2019-05", end: "2020-08" }],
      summary: "A large project for telecom operators in the EU.",
      highlights: [
        "Created an FAQ module with complex navigation and 90% unit test coverage",
        "Implemented a server-driven banner that lets marketing launch campaigns without releasing a new app version",
      ],
      tech: ["Swift", "VIPER", "RxSwift", "TDD", "Charles", "Fastlane", "CI/CD"],
    },
    {
      company: "Samara IT Community",
      location: "Samara, Russia",
      type: "Part-time",
      roles: [{ title: "Community Lead", start: "2018-05", end: "2021-03" }],
      highlights: [
        "Managed the local IT community: organised and took part in meetups and hackathons, including GrindConf",
      ],
    },
    {
      company: "Haulmont Technology",
      location: "Samara, Russia",
      url: "https://sherlocktaxi.com/case-studies/",
      roles: [{ title: "iOS Developer", start: "2017-04", end: "2019-04" }],
      summary: "A white-label mobile app for taxi companies around the world, mainly in the UK (Sherlock Taxi).",
      highlights: [
        "Learned Objective-C in two weeks to start on the project; later led the app's redesign",
        "Completed an R&D task on credit-card recognition and selected the best framework for the app",
        "Communicated with customers and negotiated requirements for the apps",
      ],
      tech: ["Objective-C", "Alamofire", "Moya", "MVC", "VIPER", "Sketch", "TeamCity"],
    },
  ],
  skills: [
    { group: "Languages", items: ["Swift", "Objective-C"] },
    { group: "UI", items: ["SwiftUI", "UIKit", "SnapKit"] },
    { group: "Architecture", items: ["TCA", "MVVM", "VIPER", "MVC"] },
    { group: "Networking", items: ["Alamofire", "Moya", "gRPC", "Charles / Proxyman"] },
    { group: "Practices", items: ["TDD", "DDD", "CI/CD", "AI-driven workflows", "Code review"] },
    { group: "Tools", items: ["Xcode Cloud", "Fastlane", "TeamCity", "Sketch / Figma", "Claude Code"] },
  ],
  education: [
    { school: "Volga State University of Telecommunications and Informatics", degree: "Master", field: "Computer Science, honors degree", year: "2017", place: "Samara, Russia" },
    { school: "Samara State Aerospace University", degree: "Bachelor", field: "Mechatronics, Robotics and Automation Engineering", year: "2015", place: "Samara, Russia" },
  ],
  languages: [
    { name: "English", level: "C1" },
    { name: "Russian", level: "native" },
    { name: "Spanish", level: "A2" },
  ],
};
