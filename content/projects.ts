import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "nuclear-wars",
    kind: "product",
    featured: true,
    period: { start: "2026-06" },
    released: "2026-09-08",
    platform: "visionOS",
    applicationCategory: "GameApplication",
    price: "9.99",
    tech: ["Swift", "SwiftUI", "RealityKit", "visionOS", "GameKit", "Swift Concurrency", "Claude Code", "Remotion"],
    links: [
      { kind: "appstore", url: "https://apps.apple.com/us/app/nuclear-wars/id6787667058" },
      { kind: "web", url: "https://www.youtube.com/watch?v=I-g6ItBY7aM", label: { en: "Watch the trailer", ru: "Смотреть трейлер", es: "Ver el tráiler" } },
    ],
    media: [
      { type: "youtube", id: "I-g6ItBY7aM", uploadDate: "2026-09-16", language: "en", alt: { en: "Nuclear Wars trailer", ru: "Трейлер Nuclear Wars", es: "Tráiler de Nuclear Wars" } },
      { type: "image", src: "/media/nuclear-wars/03-full-exchange.jpg", width: 1200, height: 982, alt: { en: "Phase 3, full exchange: missile trails cross the globe between two sectors while radar domes track the strikes", ru: "Фаза 3, обмен ударами: следы ракет пересекают глобус между двумя секторами, купола радаров ведут удары", es: "Fase 3, intercambio total: estelas de misiles cruzan el globo entre dos sectores mientras las cúpulas de radar siguen los ataques" } },
      { type: "image", src: "/media/nuclear-wars/02-preparation.jpg", width: 1200, height: 982, alt: { en: "Phase 1, preparation: placing silos, radars, ABM batteries and submarines on a continent of the globe", ru: "Фаза 1, подготовка: расстановка шахт, радаров, батарей ПРО и подлодок на континенте глобуса", es: "Fase 1, preparación: colocando silos, radares, baterías ABM y submarinos en un continente del globo" } },
      { type: "image", src: "/media/nuclear-wars/04-impact.jpg", width: 1200, height: 982, alt: { en: "Warheads detonating over enemy cities; burning cities and interceptor launches in 3D", ru: "Боеголовки взрываются над городами противника; горящие города и пуски перехватчиков в 3D", es: "Ojivas detonando sobre ciudades enemigas; ciudades en llamas y lanzamientos de interceptores en 3D" } },
      { type: "image", src: "/media/nuclear-wars/05-debrief.jpg", width: 1200, height: 982, alt: { en: "Match debrief: surviving population per side decides who lost less", ru: "Разбор матча: выжившее население каждой стороны решает, кто проиграл меньше", es: "Informe final: la población superviviente de cada bando decide quién perdió menos" } },
      { type: "image", src: "/media/nuclear-wars/01-lobby.jpg", width: 1200, height: 982, alt: { en: "Lobby: the globe floating in a living room next to the floating command HUD", ru: "Лобби: глобус парит в гостиной рядом с командным HUD", es: "Lobby: el globo flotando en un salón junto al HUD de mando" } },
    ],
    metrics: [
      { value: "3", label: { en: "months solo, from idea to App Store", ru: "месяца соло от идеи до App Store", es: "meses en solitario, de la idea a la App Store" } },
      { value: "6", label: { en: "players per match via Game Center", ru: "игроков в матче через Game Center", es: "jugadores por partida vía Game Center" } },
      { value: "10", label: { en: "App Store languages", ru: "языков в App Store", es: "idiomas en la App Store" } },
      { value: "0", label: { en: "game engines — native RealityKit", ru: "игровых движков — нативный RealityKit", es: "motores de juego: RealityKit nativo" } },
    ],
    i18n: {
      en: {
        title: "Nuclear Wars",
        role: "Solo developer",
        tagline: "A Cold War strategy game for Apple Vision Pro where the whole planet floats in your room. Built solo in Swift, SwiftUI and RealityKit, no game engine.",
        description: [
          "Nuclear Wars turns a room into a Cold War command center. A living 3D globe floats in front of the player: drag to rotate, pinch to zoom, walk around it, lean in to inspect a silo. Every match escalates through three phases — preparation, cold war, full exchange — and there is no winner: when the clock runs out, whoever keeps more of their population alive loses less. Firing reveals a unit's position permanently, and you only see what your radars see, so every launch is a trade-off between striking power and staying hidden.",
          "Under the hood it is Swift, SwiftUI and RealityKit with no game engine. The simulation lives in a pure Swift package with fixed ticks; the render layer only interpolates what it is told. Multiplayer is deterministic lockstep over Game Center: the host is authoritative, clients step only on received tick frames, and an FNV-1a checksum of the game state every 100 ticks catches desync. The same package runs the tests — a full host plus two clients and a bot, played through a loopback transport with jitter.",
          "Released on the App Store on September 8, 2026 after about three months of solo work and four rounds of App Review: solo play against 1–5 AI commanders, party codes and automatch for up to 6 players with AI filling empty seats, ten store languages, no ads, no accounts, no data collection. It is my second visionOS project, and the hard-won knowledge from both — RealityKit quirks, spatial UI patterns, what App Review asks a game to change and why — became a reusable skill for building visionOS apps with AI agents.",
        ],
        highlights: [
          "Spatial 3D globe in RealityKit: territory, fog of war and radar coverage are equirectangular textures on thin concentric spheres instead of overlapping meshes — no z-fighting, recomputed off the main actor",
          "Deterministic lockstep multiplayer over Game Center (GKMatch): authoritative host, tick frames, FNV-1a state checksums every 100 ticks to catch desync",
          "Simulation in a pure Swift package with fixed ticks, tested end to end: host + 2 clients + bot through a loopback transport with jitter",
          "Five unit types with real trade-offs — silos (strike or air-defense mode), radars, ABM batteries, submarines, airbases — and a permanent reveal on every launch",
          "Solo against 1–5 AI commanders, Game Center party codes and automatch for up to 6 players, AI fills empty seats",
          "Passed App Review with a procedurally generated planet — six fictional continents, synthetic cities, no real countries; 12+ rating, ten store languages, no IAP, no ads, no data collection",
          "Trailer and App Store preview rendered programmatically with Remotion from visionOS simulator footage",
        ],
      },
      ru: {
        title: "Nuclear Wars",
        role: "Соло-разработчик",
        tagline: "Стратегия про холодную войну для Apple Vision Pro, где целая планета парит у вас в комнате. Сделана в одиночку на Swift, SwiftUI и RealityKit, без игрового движка.",
        description: [
          "Nuclear Wars превращает комнату в командный центр холодной войны. Живой трёхмерный глобус парит перед игроком: вращайте его перетаскиванием, приближайте щипком, обходите вокруг, наклонитесь к шахте. Каждый матч проходит три фазы эскалации — подготовка, холодная война, обмен ударами — и победителя нет: когда таймер истекает, кто сохранил больше населения, тот проиграл меньше. Стрельба навсегда раскрывает позицию юнита, а видите вы только то, что видят ваши радары, поэтому каждый пуск — размен между силой удара и скрытностью.",
          "Внутри — Swift, SwiftUI и RealityKit, без игрового движка. Симуляция живёт в отдельном Swift-пакете с фиксированным тиком; рендер только интерполирует то, что ему отдали. Мультиплеер — детерминированный lockstep поверх Game Center: хост авторитетен, клиенты шагают только по полученным тик-кадрам, а FNV-1a-контрольная сумма состояния игры каждые 100 тиков ловит рассинхрон. Тот же пакет гоняет тесты: полный матч хост + два клиента + бот через loopback-транспорт с джиттером.",
          "Вышла в App Store 8 сентября 2026 года после примерно трёх месяцев соло-работы и четырёх раундов App Review: соло против 1–5 ИИ-командующих, коды группы и автоподбор до 6 игроков, свободные места добирает ИИ, десять языков в сторе, без рекламы, аккаунтов и сбора данных. Это мой второй проект под visionOS, и набитые на двух проектах шишки — особенности RealityKit, паттерны пространственного UI, что и почему просит поменять App Review — стали переиспользуемым скиллом для разработки visionOS-приложений с AI-агентами.",
        ],
        highlights: [
          "Пространственный 3D-глобус в RealityKit: территории, туман войны и покрытие радаров — эквиректангулярные текстуры на тонких концентрических сферах вместо пересекающихся мешей; никакого z-fighting, пересчёт вне main actor",
          "Детерминированный lockstep-мультиплеер поверх Game Center (GKMatch): авторитетный хост, тик-кадры, контрольные суммы состояния FNV-1a каждые 100 тиков",
          "Симуляция в чистом Swift-пакете с фиксированным тиком, протестирована целиком: хост + 2 клиента + бот через loopback-транспорт с джиттером",
          "Пять типов юнитов с реальными компромиссами — шахты (удар или режим ПВО), радары, батареи ПРО, подлодки, авиабазы — и необратимое раскрытие при каждом пуске",
          "Соло против 1–5 ИИ-командующих, коды группы и автоподбор Game Center до 6 игроков, пустые места занимает ИИ",
          "Прошла App Review с процедурно сгенерированной планетой — шесть вымышленных континентов, синтетические города, никаких реальных стран; рейтинг 12+, десять языков в сторе, без IAP, рекламы и сбора данных",
          "Трейлер и превью для App Store собраны программно в Remotion из записей симулятора visionOS",
        ],
      },
      es: {
        title: "Nuclear Wars",
        role: "Desarrollador en solitario",
        tagline: "Un juego de estrategia de la Guerra Fría para Apple Vision Pro en el que el planeta entero flota en tu habitación. Construido en solitario con Swift, SwiftUI y RealityKit, sin motor de juego.",
        description: [
          "Nuclear Wars convierte una habitación en un centro de mando de la Guerra Fría. Un globo 3D vivo flota delante del jugador: arrástralo para girarlo, pellizca para acercarlo, camina a su alrededor, inclínate para inspeccionar un silo. Cada partida escala en tres fases — preparación, guerra fría, intercambio total — y no hay ganador: cuando se agota el reloj, quien conserva más población pierde menos. Disparar revela la posición de una unidad para siempre, y solo ves lo que ven tus radares, así que cada lanzamiento es un intercambio entre potencia de ataque y sigilo.",
          "Por dentro es Swift, SwiftUI y RealityKit, sin motor de juego. La simulación vive en un paquete Swift puro con ticks fijos; la capa de render solo interpola lo que recibe. El multijugador es lockstep determinista sobre Game Center: el anfitrión es autoritativo, los clientes solo avanzan con los tick frames recibidos y un checksum FNV-1a del estado del juego cada 100 ticks detecta desincronizaciones. El mismo paquete ejecuta los tests: una partida completa con anfitrión, dos clientes y un bot a través de un transporte loopback con jitter.",
          "Publicado en la App Store el 8 de septiembre de 2026 tras unos tres meses de trabajo en solitario y cuatro rondas de App Review: modo solo contra 1–5 comandantes IA, códigos de grupo y emparejamiento automático para hasta 6 jugadores con IA ocupando los asientos libres, diez idiomas en la tienda, sin anuncios, sin cuentas, sin recogida de datos. Es mi segundo proyecto para visionOS, y lo aprendido a golpes en ambos — peculiaridades de RealityKit, patrones de UI espacial, qué pide cambiar App Review a un juego y por qué — se convirtió en una skill reutilizable para construir apps de visionOS con agentes de IA.",
        ],
        highlights: [
          "Globo 3D espacial en RealityKit: territorio, niebla de guerra y cobertura de radar son texturas equirectangulares sobre finas esferas concéntricas en lugar de mallas superpuestas; sin z-fighting, recalculadas fuera del main actor",
          "Multijugador lockstep determinista sobre Game Center (GKMatch): anfitrión autoritativo, tick frames, checksums FNV-1a del estado cada 100 ticks",
          "Simulación en un paquete Swift puro con ticks fijos, probada de extremo a extremo: anfitrión + 2 clientes + bot a través de un transporte loopback con jitter",
          "Cinco tipos de unidad con compromisos reales — silos (ataque o modo antiaéreo), radares, baterías ABM, submarinos, bases aéreas — y revelado permanente en cada lanzamiento",
          "Solo contra 1–5 comandantes IA, códigos de grupo y emparejamiento automático de Game Center para hasta 6 jugadores, la IA ocupa los asientos libres",
          "Superó App Review con un planeta generado proceduralmente — seis continentes ficticios, ciudades sintéticas, ningún país real; clasificación 12+, diez idiomas en la tienda, sin IAP, sin anuncios, sin recogida de datos",
          "Tráiler y vista previa de la App Store renderizados programáticamente con Remotion a partir de grabaciones del simulador de visionOS",
        ],
      },
    },
  },
  {
    slug: "growdiaries",
    kind: "product",
    featured: true,
    period: { start: "2025-05" },
    tech: ["Swift", "SwiftUI", "TCA", "Swift Concurrency", "Xcode Cloud", "Firebase", "Claude Code"],
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/growdiary/id6739211123" },
      { kind: "stats", url: "/stats" },
    ],
    media: [],
    metrics: [
      { value: "86K", label: { en: "lines of Swift", ru: "строк Swift", es: "líneas de Swift" } },
      { value: "90", label: { en: "features shipped", ru: "выпущенных фич", es: "funcionalidades publicadas" } },
      { value: "321", label: { en: "shippable builds", ru: "shippable builds", es: "builds entregables" } },
      { value: "15", label: { en: "months to App Store", ru: "месяцев до App Store", es: "meses hasta la App Store" } },
    ],
    i18n: {
      en: {
        title: "GrowDiaries",
        role: "Senior iOS Developer",
        tagline: "A social network for growers, built from scratch in pure SwiftUI + TCA.",
        description: [
          "GrowDiaries is a community where growers keep diaries of their plants week by week, share photos and videos, follow each other, ask questions, chat and join contests. The iOS app went from the first screen to the App Store in roughly 15 months.",
          "The codebase is pure SwiftUI on top of The Composable Architecture: 90 features, from the diary editor and media manager to chat, notifications, deep links, dark mode, ads, brand pages and in-app content translation.",
          "Halfway through the project I rebuilt my workflow around AI agents: agentic coding pipelines with automated verification loops and testing guardrails. Comparing two identical six-month windows, code output grew by 81%, delivery cadence by 48% and feature throughput by 38%.",
        ],
        highlights: [
          "Diary flow: germination, vegetation, flowering and harvest weeks with per-week validation, unit presets and nutrient tracking",
          "Media pipeline: camera capture, background uploads with progress, fullscreen viewer with pinch-zoom and landscape",
          "Chat: real-time messaging with delivery status, message notifications and a guest prompt for signed-out users",
          "Social layer: feed, following, comments with media, questions with tags, push notifications via a Notification Service Extension",
          "Growth features: contests, brand pages, ads, deep links, social sign-in, GDPR flows, content translation",
          "Quality: Xcode Cloud CI with BrowserStack autotests on every build, unit tests, trunk-based development",
        ],
      },
      ru: {
        title: "GrowDiaries",
        role: "Senior iOS Developer",
        tagline: "Социальная сеть для гроверов, написанная с нуля на pure SwiftUI + TCA.",
        description: [
          "GrowDiaries — сообщество, где гроверы ведут дневники растений неделя за неделей, делятся фото и видео, подписываются друг на друга, задают вопросы, общаются в чате и участвуют в конкурсах. iOS-приложение прошло путь от первого экрана до App Store примерно за 15 месяцев.",
          "Кодовая база — pure SwiftUI поверх The Composable Architecture: 90 фич, от редактора дневника и медиа-менеджера до чата, уведомлений, диплинков, тёмной темы, рекламы, страниц брендов и перевода контента.",
          "В середине проекта я перестроил рабочий процесс вокруг AI-агентов: agentic coding pipelines с автоматическими циклами верификации и тестовыми guardrails. При сравнении двух одинаковых шестимесячных окон code output вырос на 81%, delivery cadence — на 48%, feature throughput — на 38%.",
        ],
        highlights: [
          "Дневник: недели проращивания, вегетации, цветения и урожая с валидацией по неделям, пресетами единиц и учётом удобрений",
          "Медиа: съёмка с камеры, фоновые загрузки с прогрессом, полноэкранный просмотр с pinch-zoom и ландшафтом",
          "Чат: сообщения в реальном времени со статусами доставки, уведомления о сообщениях и приглашение войти для гостей",
          "Социальный слой: лента, подписки, комментарии с медиа, вопросы с тегами, пуши через Notification Service Extension",
          "Рост: конкурсы, страницы брендов, реклама, диплинки, социальный вход, GDPR-сценарии, перевод контента",
          "Качество: Xcode Cloud CI с автотестами BrowserStack на каждой сборке, unit-тесты, trunk-based development",
        ],
      },
      es: {
        title: "GrowDiaries",
        role: "Senior iOS Developer",
        tagline: "Una red social para cultivadores, construida desde cero en SwiftUI puro + TCA.",
        description: [
          "GrowDiaries es una comunidad donde los cultivadores llevan diarios de sus plantas semana a semana, comparten fotos y vídeos, se siguen entre sí, hacen preguntas, chatean y participan en concursos. La app iOS pasó de la primera pantalla a la App Store en unos 15 meses.",
          "La base de código es SwiftUI puro sobre The Composable Architecture: 90 funcionalidades, desde el editor de diarios y el gestor multimedia hasta chat, notificaciones, deep links, modo oscuro, anuncios, páginas de marcas y traducción de contenido dentro de la app.",
          "A mitad del proyecto reconstruí mi flujo de trabajo en torno a agentes de IA: pipelines de codificación agéntica con ciclos de verificación automática y guardarraíles de testing. Comparando dos ventanas idénticas de seis meses, el code output creció un 81 %, la delivery cadence un 48 % y el feature throughput un 38 %.",
        ],
        highlights: [
          "Flujo del diario: semanas de germinación, vegetación, floración y cosecha con validación por semana, presets de unidades y seguimiento de nutrientes",
          "Pipeline multimedia: captura con cámara, subidas en segundo plano con progreso, visor a pantalla completa con pinch-zoom y modo horizontal",
          "Chat: mensajería en tiempo real con estado de entrega, notificaciones de mensajes y aviso de registro para invitados",
          "Capa social: feed, seguidores, comentarios con multimedia, preguntas con etiquetas, notificaciones push mediante una Notification Service Extension",
          "Crecimiento: concursos, páginas de marcas, anuncios, deep links, inicio de sesión social, flujos GDPR, traducción de contenido",
          "Calidad: CI en Xcode Cloud con autotests de BrowserStack en cada build, tests unitarios, trunk-based development",
        ],
      },
    },
  },
  {
    slug: "alfa-bank",
    kind: "product",
    featured: true,
    period: { start: "2021-10", end: "2025-05" },
    tech: ["Swift", "SwiftUI", "UIKit", "MVVM", "SnapKit", "Design system", "DDD"],
    links: [],
    media: [],
    ownership: "contributor",
    awards: ["#1 investment app — Digital Investment Rank 2024 by Markswebb"],
    metrics: [
      { value: "400K", label: { en: "monthly active users", ru: "активных пользователей в месяц", es: "usuarios activos mensuales" } },
      { value: "99%", label: { en: "crash-free sessions", ru: "crash-free сессий", es: "sesiones sin crashes" } },
      { value: "10 / 35", label: { en: "sub-team / iOS org", ru: "под-команда / iOS-орг.", es: "subequipo / org. iOS" } },
      { value: "#1", label: { en: "investment app, Markswebb 2024", ru: "инвест-приложение, Markswebb 2024", es: "app de inversión, Markswebb 2024" } },
    ],
    i18n: {
      en: {
        title: "Alfa-Bank trading & investing",
        role: "Senior → Lead iOS Developer",
        tagline: "Stability, navigation and a sub-team of 10 in a 35-engineer iOS organization behind the best investment app of 2024.",
        description: [
          "Alfa-Bank is one of the largest private banks in Russia. Its trading & investing app was rated the best on the market by Digital Investment Rank 2024 (Markswebb) and serves hundreds of thousands of people every month. I joined as a Senior iOS Developer in 2021 in the feature team responsible for IPOs, SPOs and other offerings, and led a sub-team of 10 engineers from mid-2024.",
          "My technical area was in-app navigation and deep links: I refactored all navigation in the app, fixed a long tail of deep-linking issues, and wrote the documentation and presentations that got the approach adopted across teams. As a lead I owned stability, performance and project health — we kept 99% crash-free sessions at 400K MAU while dozens of teams shipped into the same app.",
        ],
        highlights: [
          "Led a sub-team of 10 developers inside a 35-engineer iOS organization: planning, mentorship, code review, hiring",
          "Owned stability and performance — 99% crash-free sessions at 400K MAU",
          "Refactored all in-app navigation and deep links; wrote the docs and presented the approach to the team",
          "Led the rapid rollout of trading in new currencies — significant additional income during high market volatility",
          "Introduced SwiftUI to the project with an MVP app for employees built within a week",
        ],
      },
      ru: {
        title: "Альфа-Банк: трейдинг и инвестиции",
        role: "Senior → Lead iOS Developer",
        tagline: "Стабильность, навигация и под-команда из 10 человек в iOS-организации из 35 инженеров за лучшим инвест-приложением 2024 года.",
        description: [
          "Альфа-Банк — один из крупнейших частных банков России. Его приложение для трейдинга и инвестиций признано лучшим на рынке по Digital Investment Rank 2024 (Markswebb), им ежемесячно пользуются сотни тысяч человек. Я пришёл Senior iOS-разработчиком в 2021 году в фича-команду, отвечающую за IPO, SPO и другие размещения, а с середины 2024-го руководил под-командой из 10 инженеров.",
          "Моя техническая зона — навигация и диплинки: я переработал всю навигацию приложения, закрыл длинный хвост проблем с диплинками, написал документацию и провёл презентации, благодаря которым подход приняли все команды. Как лид отвечал за стабильность, производительность и здоровье проекта: мы удерживали 99% crash-free сессий при 400K MAU, пока десятки команд выпускали фичи в одно и то же приложение.",
        ],
        highlights: [
          "Руководил под-командой из 10 разработчиков в iOS-организации из 35 инженеров: планирование, менторство, код-ревью, найм",
          "Отвечал за стабильность и производительность — 99% crash-free сессий при 400K MAU",
          "Переработал всю навигацию и диплинки приложения; написал документацию и представил подход команде",
          "Возглавил быстрый запуск торговли в новых валютах — значительный дополнительный доход в период высокой волатильности",
          "Внедрил SwiftUI в проект через MVP-приложение для сотрудников, собранное за неделю",
        ],
      },
      es: {
        title: "Alfa-Bank: trading e inversión",
        role: "Senior → Lead iOS Developer",
        tagline: "Estabilidad, navegación y un subequipo de 10 personas en una organización iOS de 35 ingenieros detrás de la mejor app de inversión de 2024.",
        description: [
          "Alfa-Bank es uno de los mayores bancos privados de Rusia. Su app de trading e inversión fue valorada como la mejor del mercado por Digital Investment Rank 2024 (Markswebb) y la usan cientos de miles de personas cada mes. Me incorporé como Senior iOS Developer en 2021 al equipo responsable de IPO, SPO y otras colocaciones, y desde mediados de 2024 lideré un subequipo de 10 ingenieros.",
          "Mi área técnica era la navegación y los deep links: refactoricé toda la navegación de la app, resolví una larga lista de problemas de deep linking y escribí la documentación y las presentaciones con las que el enfoque se adoptó en todos los equipos. Como líder fui responsable de la estabilidad, el rendimiento y la salud del proyecto: mantuvimos un 99 % de sesiones sin crashes con 400K MAU mientras decenas de equipos publicaban en la misma app.",
        ],
        highlights: [
          "Lideré un subequipo de 10 desarrolladores dentro de una organización iOS de 35 ingenieros: planificación, mentoría, code review, contratación",
          "Responsable de la estabilidad y el rendimiento: 99 % de sesiones sin crashes con 400K MAU",
          "Refactoricé toda la navegación y los deep links de la app; escribí la documentación y presenté el enfoque al equipo",
          "Lideré el lanzamiento acelerado del trading en nuevas divisas: ingresos adicionales significativos en un periodo de alta volatilidad",
          "Introduje SwiftUI en el proyecto con una app MVP para empleados construida en una semana",
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
      es: {
        title: "TCA App Demo",
        role: "Autor",
        tagline: "Una app iOS de referencia con The Composable Architecture y estructura de pestañas, iOS 16.6+.",
        description: [
          "Un pequeño punto de partida open source para apps con TCA: navegación por pestañas, composición de funcionalidades, inyección de dependencias y tests, para iOS 16.6 o superior. Lo uso para mostrar cómo estructuro proyectos TCA reales sin el peso de una base de código de producción.",
        ],
        highlights: ["Estructura de pestañas con reducers compuestos", "Compatibilidad con iOS 16.6+", "Dependencias testeables"],
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
      es: {
        title: "stableDiff",
        role: "Autor",
        tagline: "Generación de imágenes en el dispositivo con Stable Diffusion y CoreML en Apple Silicon.",
        description: [
          "Un proyecto personal de principios de 2023: ejecutar Stable Diffusion en local a través del pipeline CoreML de Apple, envuelto en una app nativa en Swift. Fue mi primer trabajo práctico con modelos generativos en hardware de Apple, mucho antes de que los agentes de IA formaran parte de mi flujo diario.",
        ],
        highlights: ["Interfaz nativa en Swift sobre el pipeline CoreML de Stable Diffusion", "Se ejecuta por completo en el dispositivo en Apple Silicon"],
      },
    },
  },
  {
    slug: "grindconf-2019",
    kind: "talk",
    featured: false,
    period: { start: "2019-02", end: "2019-02" },
    tech: ["iOS architecture", "MVC", "MVVM", "VIPER"],
    links: [
      { kind: "web", url: "https://www.youtube.com/watch?v=ZTHEfcFS0LY", label: { en: "Watch on YouTube", ru: "Смотреть на YouTube", es: "Ver en YouTube" } },
      { kind: "talk", url: "https://samara-it-community.timepad.ru/event/884210/" },
    ],
    media: [{ type: "youtube", id: "ZTHEfcFS0LY", uploadDate: "2019-02-03", alt: { en: "Talk recording", ru: "Запись доклада", es: "Grabación de la charla" } }],
    i18n: {
      en: {
        title: "iOS Application Architectures — GrindConf 2019",
        role: "Speaker",
        tagline: "A conference talk on choosing an architecture for an iOS app: MVC, MVVM and VIPER.",
        description: [
          "At GrindConf (Samara, February 2019) I gave a talk comparing iOS application architectures — what each one costs, what it buys you, and how to pick one for a real team and a real deadline.",
        ],
        highlights: ["Trade-offs of MVC, MVVM and VIPER", "Practical selection criteria for teams"],
      },
      ru: {
        title: "Архитектуры iOS-приложений — GrindConf 2019",
        role: "Спикер",
        tagline: "Доклад о выборе архитектуры для iOS-приложения: MVC, MVVM и VIPER.",
        description: [
          "На GrindConf (Самара, февраль 2019) я выступил с докладом, сравнивающим архитектуры iOS-приложений: что каждая стоит, что даёт и как выбирать под реальную команду и реальный дедлайн.",
        ],
        highlights: ["Компромиссы MVC, MVVM и VIPER", "Практические критерии выбора для команд"],
      },
      es: {
        title: "Arquitecturas de aplicaciones iOS — GrindConf 2019",
        role: "Ponente",
        tagline: "Una charla sobre cómo elegir la arquitectura de una app iOS: MVC, MVVM y VIPER.",
        description: [
          "En GrindConf (Samara, febrero de 2019) di una charla comparando arquitecturas de aplicaciones iOS: qué cuesta cada una, qué aporta y cómo elegir para un equipo real con una fecha límite real.",
        ],
        highlights: ["Compromisos de MVC, MVVM y VIPER", "Criterios prácticos de selección para equipos"],
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
