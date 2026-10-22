import type { Localized } from "@/content/types";

/** Copy of the Nuclear Wars landing (components/projects/nuclear-wars), on top of the project entry in content/projects.ts. */

export type UnitKind = "silo" | "radar" | "abm" | "submarine" | "airbase";

export const nuclearWarsLanding = {
  slogan: { en: "THE WORLD IS YOUR WAR ROOM", ru: "ВЕСЬ МИР — ВАШ ШТАБ", es: "EL MUNDO ES TU SALA DE GUERRA" } satisfies Localized,
  eyebrow: {
    en: "Global RTS for Apple Vision Pro",
    ru: "Глобальная RTS для Apple Vision Pro",
    es: "RTS global para Apple Vision Pro",
  } satisfies Localized,
  skyHint: {
    en: "Click the sky to launch",
    ru: "Кликните по небу — будет пуск",
    es: "Haz clic en el cielo para lanzar",
  } satisfies Localized,
  scroll: { en: "Scroll", ru: "Листайте", es: "Desliza" } satisfies Localized,
  ticker: {
    en: ["Apple Vision Pro", "Up to 6 players", "Game Center", "1–5 AI commanders", "No ads", "No accounts", "No data collection", "10 languages", "Native RealityKit"],
    ru: ["Apple Vision Pro", "До 6 игроков", "Game Center", "1–5 ИИ-командующих", "Без рекламы", "Без аккаунтов", "Без сбора данных", "10 языков", "Нативный RealityKit"],
    es: ["Apple Vision Pro", "Hasta 6 jugadores", "Game Center", "1–5 comandantes IA", "Sin anuncios", "Sin cuentas", "Sin recogida de datos", "10 idiomas", "RealityKit nativo"],
  } satisfies Localized<string[]>,
  phasesTitle: {
    en: "Three phases. One clock.",
    ru: "Три фазы. Один таймер.",
    es: "Tres fases. Un reloj.",
  } satisfies Localized,
  phasesLead: {
    en: "A living 3D globe floats in your room. Every match escalates — and you decide how far.",
    ru: "Живой 3D-глобус парит у вас в комнате. Каждый матч идёт по нарастающей — а насколько далеко зайти, решаете вы.",
    es: "Un globo 3D vivo flota en tu habitación. Cada partida escala, y tú decides hasta dónde.",
  } satisfies Localized,
  phaseLabel: { en: "Phase", ru: "Фаза", es: "Fase" } satisfies Localized,
  phases: [
    {
      clip: "/media/nuclear-wars/clip-deploy.mp4",
      name: { en: "Preparation", ru: "Подготовка", es: "Preparación" },
      title: { en: "Deploy your units.", ru: "Расставьте юнитов.", es: "Despliega tus unidades." },
      text: {
        en: "Place silos, radars, ABM batteries, submarines and airbases across your sector. Pinch to place, drag to spin the planet, walk around it to see every side.",
        ru: "Шахты, радары, батареи ПРО, подлодки и авиабазы — по всему своему сектору. Щипок — поставить, перетаскивание — повернуть планету; обойдите её, чтобы увидеть со всех сторон.",
        es: "Coloca silos, radares, baterías ABM, submarinos y bases aéreas en tu sector. Pellizca para colocar, arrastra para girar el planeta, camina a su alrededor para verlo por todos lados.",
      },
    },
    {
      clip: "/media/nuclear-wars/clip-targets.mp4",
      name: { en: "Cold War", ru: "Холодная война", es: "Guerra Fría" },
      title: { en: "Pick your targets.", ru: "Выберите цели.", es: "Elige tus objetivos." },
      text: {
        en: "You only see what your radars see. Draw strike arcs to enemy sectors — but firing reveals a launcher's position for good. Every launch trades striking power for staying hidden.",
        ru: "Вы видите только то, что видят ваши радары. Тяните дуги ударов к вражеским секторам — но выстрел навсегда раскрывает позицию пусковой. Каждый пуск — размен силы удара на скрытность.",
        es: "Solo ves lo que ven tus radares. Traza arcos de ataque hacia sectores enemigos, pero disparar revela la posición del lanzador para siempre. Cada lanzamiento cambia potencia por sigilo.",
      },
    },
    {
      clip: "/media/nuclear-wars/clip-air-defence.mp4",
      name: { en: "Full exchange", ru: "Обмен ударами", es: "Intercambio total" },
      title: { en: "Hold the sky.", ru: "Удержите небо.", es: "Defiende el cielo." },
      text: {
        en: "Missiles cross the globe. Silos switch to air-defense mode and knock warheads out of the sky; whatever gets through rises as a mushroom cloud over a city.",
        ru: "Ракеты пересекают глобус. Шахты переходят в режим ПВО и сбивают боеголовки; всё, что прорвалось, встаёт ядерным грибом над городом.",
        es: "Los misiles cruzan el globo. Los silos pasan a modo antiaéreo y derriban ojivas; lo que pasa se alza como un hongo nuclear sobre una ciudad.",
      },
    },
  ] satisfies { clip: string; name: Localized; title: Localized; text: Localized }[],
  noWinners: {
    kicker: { en: "Endgame", ru: "Финал", es: "Final" },
    title: { en: "There are no winners.", ru: "Победителей нет.", es: "No hay ganadores." },
    text: {
      en: "When the clock runs out, whoever keeps more of their population alive loses less.",
      ru: "Когда таймер истекает, кто сохранил больше населения, тот проиграл меньше.",
      es: "Cuando se agota el reloj, quien conserva más población pierde menos.",
    },
  } satisfies Record<string, Localized>,
  unitsTitle: { en: "Five units. Real trade-offs.", ru: "Пять юнитов. Настоящие компромиссы.", es: "Cinco unidades. Compromisos reales." } satisfies Localized,
  units: [
    {
      kind: "silo",
      name: { en: "Silo", ru: "Шахта", es: "Silo" },
      text: { en: "Strike — or switch to air-defense mode.", ru: "Удар — или режим ПВО.", es: "Ataca o pasa a modo antiaéreo." },
    },
    {
      kind: "radar",
      name: { en: "Radar", ru: "Радар", es: "Radar" },
      text: { en: "Your only eyes. Beyond its coverage — fog of war.", ru: "Ваши единственные глаза. За зоной покрытия — туман войны.", es: "Tus únicos ojos. Fuera de su alcance, niebla de guerra." },
    },
    {
      kind: "abm",
      name: { en: "ABM battery", ru: "Батарея ПРО", es: "Batería ABM" },
      text: { en: "Intercepts incoming missiles.", ru: "Перехватывает летящие ракеты.", es: "Intercepta los misiles entrantes." },
    },
    {
      kind: "submarine",
      name: { en: "Submarine", ru: "Подлодка", es: "Submarino" },
      text: { en: "Plot its course by hand, strike from the sea.", ru: "Проложите курс рукой и бейте с моря.", es: "Traza su rumbo a mano y ataca desde el mar." },
    },
    {
      kind: "airbase",
      name: { en: "Airbase", ru: "Авиабаза", es: "Base aérea" },
      text: { en: "Puts aircraft over the globe.", ru: "Поднимает авиацию над глобусом.", es: "Pone aviones sobre el globo." },
    },
  ] satisfies { kind: UnitKind; name: Localized; text: Localized }[],
  metricsTitle: { en: "By the numbers", ru: "В цифрах", es: "En cifras" } satisfies Localized,
  buildTitle: { en: "How it’s built", ru: "Как это сделано", es: "Cómo está hecho" } satisfies Localized,
  cta: {
    title: { en: "Take command.", ru: "Примите командование.", es: "Toma el mando." },
    button: { en: "Download on the App Store", ru: "Скачать в App Store", es: "Descargar en la App Store" },
    note: { en: "Apple Vision Pro · No ads · No accounts", ru: "Apple Vision Pro · Без рекламы · Без аккаунтов", es: "Apple Vision Pro · Sin anuncios · Sin cuentas" },
  } satisfies Record<string, Localized>,
};
