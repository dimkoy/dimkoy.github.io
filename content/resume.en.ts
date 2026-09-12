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
      location: "Barcelona, Spain",
      roles: [{ title: "Senior iOS Developer", start: "2025-05" }],
      projectSlug: "growdiaries",
      highlights: [
        "Built a social-network iOS app from the ground up as the sole iOS developer — pure SwiftUI and The Composable Architecture (TCA): 86K lines of Swift, 90 features shipped, currently in App Store review",
        "Engineered an AI-driven development workflow — agentic coding pipelines with automated verification loops and testing guardrails — that lifted every measured productivity metric year-over-year: +81% code output, +47% delivery cadence and +38% feature throughput",
      ],
      tech: ["Swift", "SwiftUI", "TCA", "Xcode Cloud", "Firebase"],
    },
    {
      company: "Alfa-Bank",
      location: "Remote",
      roles: [
        { title: "Lead iOS Developer", start: "2024", end: "2025" },
        { title: "Senior iOS Developer", start: "2021", end: "2024" },
      ],
      projectSlug: "alfa-bank",
      highlights: [
        "Led a sub-team of 10 developers within a 35-engineer iOS organization, fostering collaboration, mentorship and technical growth",
        "Owned application stability and performance, maintaining 99% crash-free sessions at 400K MAU",
        "Revamped navigation by introducing the Coordinator pattern, significantly improving deep-linking reliability and overall usability. Delivered comprehensive documentation and led multiple presentations to ensure adoption across teams",
      ],
      tech: ["Swift", "UIKit", "SwiftUI", "Coordinators", "gRPC", "TeamCity"],
    },
    {
      company: "FBS Inc.",
      location: "St Petersburg, Russia",
      roles: [{ title: "Lead iOS Developer", start: "2020", end: "2021" }],
      highlights: [
        "Improved collaboration between developers, QA and management, stabilizing the release process and reducing overtime",
        "Conducted interviews and doubled the size of the iOS team",
      ],
    },
    {
      company: "EPAM Systems",
      location: "St Petersburg, Russia",
      roles: [{ title: "iOS Developer", start: "2019", end: "2020" }],
      highlights: ["Developed an FAQ module with advanced navigation and achieved 90% unit test coverage"],
    },
    {
      company: "Haulmont Technology",
      location: "Samara, Russia",
      roles: [{ title: "iOS Developer", start: "2017", end: "2019" }],
      highlights: [
        "Conducted a redesign of a white-label application for taxi companies",
        "Communicated with customers and negotiated requirements for the apps",
      ],
    },
  ],
  skills: [
    { group: "Languages", items: ["Swift", "Objective-C"] },
    { group: "UI", items: ["SwiftUI", "UIKit", "SnapKit"] },
    { group: "Architecture", items: ["TCA", "MVVM + Coordinators", "VIPER", "DDD"] },
    { group: "Networking", items: ["Alamofire", "gRPC", "Charles / Proxyman"] },
    { group: "Practices", items: ["TDD", "CI/CD", "AI-driven workflows", "Code review"] },
    { group: "Tools", items: ["Xcode Cloud", "TeamCity", "Sketch / Figma", "Claude Code"] },
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
