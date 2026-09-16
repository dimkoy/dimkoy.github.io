import type { Resume } from "./types";

export const resumeEs: Resume = {
  name: "Dmitrii Cherviakov",
  title: "Senior iOS Developer",
  headline: "Desarrollador iOS sénior · Swift, SwiftUI · Barcelona",
  seoDescription: "Desarrollador iOS sénior en Barcelona con más de 9 años en Swift, SwiftUI y TCA. Apps fintech para 400K MAU con un 99 % sin crashes, la app de inversión n.º 1 (Markswebb 2024) y GrowDiaries, una red social construida en solitario de cero a la App Store.",
  location: "Barcelona, España",
  photoAlt: "Dmitrii Cherviakov, desarrollador iOS sénior",
  summary: [
    "Desarrollador iOS sénior con más de 9 años de experiencia creando aplicaciones móviles escalables y de alto rendimiento. Amplia experiencia en Swift y SwiftUI, con foco en arquitectura, estabilidad y productividad del equipo.",
    "Lideré un subequipo de 10 ingenieros en productos a gran escala, logrando un 99 % de sesiones sin crashes en apps con 400K usuarios activos mensuales. Actualmente centrado en flujos de desarrollo impulsados por IA que multiplican la velocidad de ingeniería sin sacrificar calidad.",
  ],
  facts: [
    { value: "9+ años", label: "de ingeniería iOS, desde 2017" },
    { value: "400K MAU", label: "apps fintech en Alfa-Bank" },
    { value: "99 %", label: "sesiones sin crashes a gran escala" },
    { value: "#1", label: "app de inversión — Digital Investment Rank 2024, Markswebb" },
    { value: "86K líneas · 90 funcionalidades", label: "GrowDiaries, construida en solitario, en la App Store" },
    { value: "+48 %", label: "delivery cadence con un flujo impulsado por IA" },
  ],
  experience: [
    {
      company: "GrowDiaries",
      location: "Remoto",
      roles: [{ title: "Senior iOS Developer", start: "2025-05" }],
      projectSlug: "growdiaries",
      summary: "Una red social para cultivadores: diarios, contenido multimedia, preguntas, chat, concursos y páginas de marcas — construida en SwiftUI puro y TCA.",
      highlights: [
        "Construí desde cero una app iOS de red social como único desarrollador iOS — SwiftUI puro y The Composable Architecture (TCA): 86K líneas de Swift, 90 funcionalidades publicadas, disponible en la App Store",
        "Diseñé un flujo de desarrollo impulsado por IA — pipelines de codificación agéntica con ciclos de verificación automática y guardarraíles de testing — que elevó todas las métricas de productividad medidas año tras año: +81 % de code output, +48 % de delivery cadence y +38 % de feature throughput",
      ],
      tech: ["Swift", "SwiftUI", "TCA", "Swift Concurrency", "Xcode Cloud", "Firebase", "Claude Code"],
    },
    {
      company: "Alfa-Bank",
      location: "Remoto",
      roles: [
        { title: "Lead iOS Developer", start: "2024-06", end: "2025-05" },
        { title: "Senior iOS Developer", start: "2021-10", end: "2024-06" },
      ],
      projectSlug: "alfa-bank",
      summary: "App de trading e inversión valorada como la mejor del mercado por Digital Investment Rank 2024 (Markswebb). Equipo de producto responsable de IPO, SPO y otras colocaciones; mi área técnica: navegación y deep links.",
      highlights: [
        "Lideré un subequipo de 10 desarrolladores dentro de una organización iOS de 35 ingenieros, fomentando la colaboración, la mentoría y el crecimiento técnico; responsable del crash-free, el rendimiento y la salud del proyecto",
        "Responsable de la estabilidad y el rendimiento de la app, manteniendo un 99 % de sesiones sin crashes con 400K MAU",
        "Refactoricé toda la navegación de la app, mejorando notablemente la fiabilidad de los deep links y la usabilidad; escribí la documentación y presenté el enfoque al equipo",
        "Lideré el lanzamiento acelerado del trading en nuevas divisas, que generó ingresos adicionales significativos en un periodo de alta volatilidad",
        "Introduje SwiftUI en el proyecto construyendo una app MVP para empleados en una semana",
      ],
      tech: ["Swift", "SwiftUI", "MVVM", "SnapKit", "Design system", "DDD"],
    },
    {
      company: "J'JO",
      location: "Remoto",
      roles: [{ title: "Lead iOS Developer", start: "2021-08", end: "2021-10" }],
      summary: "App iOS para invertir en criptomonedas. El MVP lo desarrolló una empresa externa en Kotlin Multiplatform y se transfirió al equipo interno.",
      highlights: [
        "Preparé la hoja de ruta para migrar de Kotlin Multiplatform a una base de código nativa en Swift e inicié la migración; tres meses después el propietario disolvió la startup",
      ],
      tech: ["Swift", "Kotlin Multiplatform"],
    },
    {
      company: "FBS Inc.",
      location: "San Petersburgo, Rusia",
      roles: [
        { title: "Lead iOS Developer", start: "2021-03", end: "2021-08" },
        { title: "Senior iOS Developer", start: "2020-08", end: "2021-03" },
      ],
      summary: "FBS Broker: app de trading de forex, metales, índices y energía. Ascendido a líder del equipo iOS tras entregar dos funcionalidades clave y mejorar el proceso de desarrollo del departamento.",
      highlights: [
        "Estimación de tareas y reparto de carga para un equipo de 6 desarrolladores iOS; comunicación con managers y otros equipos de desarrollo",
        "Actualicé los procesos entre desarrollo, QA y gestión para mantener releases estables y evitar horas extra",
        "Mentoricé a un desarrollador junior que superó la evaluación de nivel medio en 3 meses",
        "Dirigí entrevistas y contraté a 3 desarrolladores iOS",
      ],
      tech: ["Swift", "RxSwift", "MVVM", "SnapKit", "gRPC"],
    },
    {
      company: "EPAM Systems",
      location: "San Petersburgo, Rusia",
      roles: [{ title: "iOS Developer", start: "2019-05", end: "2020-08" }],
      summary: "Un gran proyecto para operadores de telecomunicaciones de la UE.",
      highlights: [
        "Creé un módulo de FAQ con navegación compleja y un 90 % de cobertura de tests unitarios",
        "Implementé un banner server-driven que permite lanzar campañas de marketing sin publicar una nueva versión de la app",
      ],
      tech: ["Swift", "VIPER", "RxSwift", "TDD", "Charles", "Fastlane", "CI/CD"],
    },
    {
      company: "Samara IT Community",
      location: "Samara, Rusia",
      type: "Tiempo parcial",
      roles: [{ title: "Community Lead", start: "2018-05", end: "2021-03" }],
      highlights: [
        "Gestioné la comunidad IT local: organicé y participé en meetups y hackatones, incluido GrindConf",
      ],
    },
    {
      company: "Haulmont Technology",
      location: "Samara, Rusia",
      url: "https://sherlocktaxi.com/case-studies/",
      roles: [{ title: "iOS Developer", start: "2017-04", end: "2019-04" }],
      summary: "App móvil white-label para compañías de taxi de todo el mundo, principalmente del Reino Unido (Sherlock Taxi).",
      highlights: [
        "Aprendí Objective-C en dos semanas para incorporarme al proyecto; más tarde lideré el rediseño de la app",
        "Completé una tarea de I+D sobre reconocimiento de tarjetas de crédito y elegí el mejor framework para la app",
        "Me comuniqué con los clientes y negocié los requisitos de las apps",
      ],
      tech: ["Objective-C", "Alamofire", "Moya", "MVC", "VIPER", "Sketch", "TeamCity"],
    },
  ],
  skills: [
    { group: "Lenguajes", items: ["Swift", "Objective-C"] },
    { group: "UI", items: ["SwiftUI", "UIKit", "SnapKit"] },
    { group: "Plataformas", items: ["iOS", "visionOS", "RealityKit", "GameKit"] },
    { group: "Arquitectura", items: ["TCA", "MVVM", "VIPER", "MVC"] },
    { group: "Redes", items: ["Alamofire", "Moya", "gRPC", "Charles / Proxyman"] },
    { group: "Prácticas", items: ["TDD", "DDD", "CI/CD", "Flujos impulsados por IA", "Code review"] },
    { group: "Herramientas", items: ["Xcode Cloud", "Fastlane", "TeamCity", "Sketch / Figma", "Claude Code"] },
  ],
  education: [
    { school: "Universidad Estatal de Telecomunicaciones e Informática del Volga", degree: "Máster", field: "Informática, título con honores", year: "2017", place: "Samara, Rusia" },
    { school: "Universidad Estatal Aeroespacial de Samara", degree: "Grado", field: "Mecatrónica, robótica y automatización", year: "2015", place: "Samara, Rusia" },
  ],
  languages: [
    { name: "Inglés", level: "C1" },
    { name: "Ruso", level: "nativo" },
    { name: "Español", level: "A2" },
  ],
};
