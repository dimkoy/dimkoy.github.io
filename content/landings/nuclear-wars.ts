import type { Localized } from "@/content/types";

/** Copy of the Nuclear Wars landing (components/projects/nuclear-wars), on top of the project entry in content/projects.ts. */

export type UnitKind = "silo" | "radar" | "abm" | "submarine" | "airbase";

export const nuclearWarsLanding = {
  slogan: { en: "THE WORLD IS YOUR WAR ROOM", ru: "ВЕСЬ МИР — ВАШ ШТАБ", es: "EL MUNDO ES TU SALA DE GUERRA" } satisfies Localized,
  eyebrow: {
    en: "Global RTS for Apple Vision Pro, iPhone and iPad",
    ru: "Глобальная RTS для Apple Vision Pro, iPhone и iPad",
    es: "RTS global para Apple Vision Pro, iPhone y iPad",
  } satisfies Localized,
  skyHint: {
    en: "Click the sky to launch",
    ru: "Кликните по небу — будет пуск",
    es: "Haz clic en el cielo para lanzar",
  } satisfies Localized,
  scroll: { en: "Scroll", ru: "Листайте", es: "Desliza" } satisfies Localized,
  ticker: {
    en: ["Apple Vision Pro", "iPhone & iPad", "Cross-play", "Up to 6 players", "Game Center", "1–5 AI commanders", "No ads", "No accounts", "No data collection", "10 languages", "Native RealityKit"],
    ru: ["Apple Vision Pro", "iPhone и iPad", "Кросс-плей", "До 6 игроков", "Game Center", "1–5 ИИ-командующих", "Без рекламы", "Без аккаунтов", "Без сбора данных", "10 языков", "Нативный RealityKit"],
    es: ["Apple Vision Pro", "iPhone y iPad", "Juego cruzado", "Hasta 6 jugadores", "Game Center", "1–5 comandantes IA", "Sin anuncios", "Sin cuentas", "Sin recogida de datos", "10 idiomas", "RealityKit nativo"],
  } satisfies Localized<string[]>,
  update: {
    kicker: { en: "Version 1.7", ru: "Версия 1.7", es: "Versión 1.7" } satisfies Localized,
    title: { en: "Intercepts you can watch.", ru: "Перехват, который видно.", es: "Intercepciones que se ven." } satisfies Localized,
    lead: {
      en: "Version 1.7 rebuilt the intercepts and all of the sound, on Apple Vision Pro, iPhone and iPad.",
      ru: "В версии 1.7 переделаны перехваты и весь звук — на Apple Vision Pro, iPhone и iPad.",
      es: "La versión 1.7 rehace las intercepciones y todo el sonido, en Apple Vision Pro, iPhone y iPad.",
    } satisfies Localized,
    video: {
      id: "hlTb57c13Dw",
      title: {
        en: "What’s new in Nuclear Wars 1.7 (Apple Vision Pro, iPhone, iPad)",
        ru: "Что нового в Nuclear Wars 1.7 (Apple Vision Pro, iPhone, iPad)",
        es: "Novedades de Nuclear Wars 1.7 (Apple Vision Pro, iPhone, iPad)",
      } satisfies Localized,
      caption: {
        en: "What’s new in 1.7 in under a minute, on Apple Vision Pro, iPhone and iPad.",
        ru: "Что нового в 1.7 — меньше чем за минуту, на Apple Vision Pro, iPhone и iPad.",
        es: "Las novedades de la 1.7 en menos de un minuto, en Apple Vision Pro, iPhone y iPad.",
      } satisfies Localized,
    },
    items: [
      {
        name: { en: "Interceptors chase missiles down", ru: "Перехватчик догоняет ракету", es: "El interceptor persigue al misil" },
        text: {
          en: "A shot-down missile no longer vanishes in a flash: it keeps flying until an interceptor catches it and destroys it in mid-air.",
          ru: "Сбитая ракета больше не исчезает во вспышке: она летит дальше, перехватчик догоняет её и уничтожает взрывом в воздухе.",
          es: "Un misil derribado ya no desaparece en un destello: sigue volando hasta que un interceptor lo alcanza y lo destruye en el aire.",
        },
      },
      {
        name: { en: "Its own soundtrack", ru: "Свой саундтрек", es: "Banda sonora propia" },
        text: {
          en: "A driving techno track for matches and a new menu theme. Music switches on and off in the menu and mid-match.",
          ru: "Напористый техно-трек для матчей и новая тема меню. Музыку можно включить или выключить в меню и прямо в матче.",
          es: "Un tema techno enérgico para las partidas y un nuevo tema de menú. La música se activa o desactiva en el menú y durante la partida.",
        },
      },
      {
        name: { en: "Reworked sound effects", ru: "Новые звуковые эффекты", es: "Efectos de sonido renovados" },
        text: {
          en: "Launches, intercepts, alerts, radar pings and unit placement all got new sounds.",
          ru: "Пуски, перехваты, тревоги, сигналы радаров и расстановка юнитов звучат по-новому.",
          es: "Lanzamientos, intercepciones, alertas, señales de radar y despliegue de unidades suenan de nuevo.",
        },
      },
      {
        name: { en: "Phases voiced in 10 languages", ru: "Фазы озвучены на 10 языках", es: "Fases con voz en 10 idiomas" },
        text: {
          en: "Every phase change is now announced by voice, in all 10 of the game’s languages.",
          ru: "Смена фазы теперь объявляется голосом — на всех 10 языках игры.",
          es: "Cada cambio de fase se anuncia ahora con voz, en los 10 idiomas del juego.",
        },
      },
      {
        name: { en: "Quick unit switching", ru: "Быстрая смена юнитов", es: "Cambio rápido de unidad" },
        text: {
          en: "Quickly switch between units of the same type, with a sound on every switch and haptic feedback on iPhone and iPad.",
          ru: "Быстро переключайтесь между юнитами одного типа: у переключения есть звук, а на iPhone и iPad — тактильный отклик.",
          es: "Cambia rápido entre unidades del mismo tipo, con sonido en cada cambio y respuesta háptica en iPhone y iPad.",
        },
      },
      {
        name: { en: "3D globe first", ru: "Сразу на 3D-глобусе", es: "Primero, el globo 3D" },
        text: {
          en: "On iPhone and iPad every match now opens on the 3D globe; the 2D map is one tap away.",
          ru: "На iPhone и iPad каждый матч теперь открывается на 3D-глобусе, а 2D-карта — в одном касании.",
          es: "En iPhone y iPad cada partida empieza ahora en el globo 3D; el mapa 2D está a un toque.",
        },
      },
    ] satisfies { name: Localized; text: Localized }[],
  },
  mobile: {
    kicker: { en: "Cross-play", ru: "Кросс-плей", es: "Juego cruzado" } satisfies Localized,
    title: { en: "Now on iPhone and iPad.", ru: "Теперь на iPhone и iPad.", es: "Ahora en iPhone y iPad." } satisfies Localized,
    lead: {
      en: "The same war, built for touch — and cross-play puts iPhone, iPad and Apple Vision Pro commanders in the same match.",
      ru: "Та же война, только под пальцы — а кросс-плей сводит командующих с iPhone, iPad и Apple Vision Pro в одном матче.",
      es: "La misma guerra, pensada para el tacto, y el juego cruzado reúne a comandantes de iPhone, iPad y Apple Vision Pro en la misma partida.",
    } satisfies Localized,
    modes: [
      {
        name: { en: "3D globe", ru: "3D-глобус", es: "Globo 3D" },
        text: {
          en: "Every match opens on the same RealityKit globe as on Apple Vision Pro.",
          ru: "Каждый матч открывается на том же RealityKit-глобусе, что и на Apple Vision Pro.",
          es: "Cada partida empieza en el mismo globo de RealityKit que en Apple Vision Pro.",
        },
      },
      {
        name: { en: "2D map", ru: "2D-карта", es: "Mapa 2D" },
        text: {
          en: "One tap flattens the globe into a seamless world map. Tap a unit to command it, tap the map to set a target.",
          ru: "Одно касание — и глобус разворачивается в бесшовную карту мира. Касание юнита — приказ, касание карты — цель.",
          es: "Un toque despliega el globo en un mapa del mundo continuo. Toca una unidad para darle órdenes y el mapa para fijar un objetivo.",
        },
      },
      {
        name: { en: "AR", ru: "AR", es: "RA" },
        text: {
          en: "Put the battle globe on any real table and walk around it.",
          ru: "Поставьте боевой глобус на любой настоящий стол и обойдите его.",
          es: "Pon el globo de batalla sobre cualquier mesa real y camina a su alrededor.",
        },
      },
    ] satisfies { name: Localized; text: Localized }[],
    screenshots: [
      {
        src: "/media/nuclear-wars/ios-globe-war.webp",
        width: 2400,
        height: 1104,
        alt: {
          en: "iPhone, 3D globe in the full exchange: explosions over your sector, radar rings and incoming missile trails, with the unit column and the match HUD",
          ru: "iPhone, 3D-глобус во время обмена ударами: взрывы над вашим сектором, кольца радаров и следы летящих ракет, слева колонка юнитов, сверху HUD матча",
          es: "iPhone, globo 3D en el intercambio total: explosiones sobre tu sector, anillos de radar y estelas de misiles entrantes, con la columna de unidades y el HUD de la partida",
        },
      },
      {
        src: "/media/nuclear-wars/ios-explosion.webp",
        width: 2400,
        height: 1104,
        alt: {
          en: "iPhone, 3D globe up close: a mushroom cloud rises over your territory as damage numbers pop up next to an airbase and radars",
          ru: "iPhone, 3D-глобус крупно: ядерный гриб встаёт над вашей территорией, рядом с авиабазой и радарами всплывают цифры потерь",
          es: "iPhone, globo 3D de cerca: un hongo nuclear se alza sobre tu territorio mientras aparecen las cifras de daños junto a una base aérea y radares",
        },
      },
      {
        src: "/media/nuclear-wars/ios-globe-deploy.webp",
        width: 2400,
        height: 1104,
        alt: {
          en: "iPhone, preparation phase on the 3D globe: silos, radars and ABM batteries placed across your sector, with the unit column on the left",
          ru: "iPhone, фаза подготовки на 3D-глобусе: шахты, радары и батареи ПРО расставлены по вашему сектору, слева колонка юнитов",
          es: "iPhone, fase de preparación en el globo 3D: silos, radares y baterías ABM desplegados en tu sector, con la columna de unidades a la izquierda",
        },
      },
      {
        src: "/media/nuclear-wars/ios-ar-table.webp",
        width: 2400,
        height: 1104,
        alt: {
          en: "iPhone in AR: the battle globe stands in a real room during the full exchange, with missile tracks crossing over it",
          ru: "iPhone в AR: боевой глобус стоит в настоящей комнате во время обмена ударами, над ним пересекаются траектории ракет",
          es: "iPhone en RA: el globo de batalla está en una habitación real durante el intercambio total, con trayectorias de misiles cruzándolo",
        },
      },
      {
        src: "/media/nuclear-wars/ios-map-war.webp",
        width: 2400,
        height: 1104,
        alt: {
          en: "iPhone, 2D map: missile arcs from six sides cross the whole world map in the full exchange",
          ru: "iPhone, 2D-карта: дуги ракет шести сторон пересекают всю карту мира во время обмена ударами",
          es: "iPhone, mapa 2D: arcos de misiles de seis bandos cruzan todo el mapa del mundo en el intercambio total",
        },
      },
      {
        src: "/media/nuclear-wars/ios-map-strikes.webp",
        width: 2400,
        height: 1104,
        alt: {
          en: "iPhone, 2D map up close: a salvo hits an enemy continent as damage numbers pop up",
          ru: "iPhone, 2D-карта крупно: залп накрывает вражеский континент, всплывают цифры потерь",
          es: "iPhone, mapa 2D de cerca: una salva impacta en un continente enemigo mientras aparecen las cifras de daños",
        },
      },
    ] satisfies { src: string; width: number; height: number; alt: Localized }[],
  },
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
    note: { en: "Apple Vision Pro · iPhone · iPad · No ads · No accounts", ru: "Apple Vision Pro · iPhone · iPad · Без рекламы · Без аккаунтов", es: "Apple Vision Pro · iPhone · iPad · Sin anuncios · Sin cuentas" },
  } satisfies Record<string, Localized>,
};
