/** Git-history statistics of the GrowDiaries iOS codebase (main branch, *.swift only). Data through 2026-08-21. */
export type StatsData = {
  months: string[];
  cum: number[];
  add: number[];
  del: number[];
  com: number[];
  files: number[];
  totals: { commits: number; added: number; deleted: number; avg_commit_size: number };
  loc: number;
  nfiles: number;
  streak: { days: number; end: string };
  first: string;
  last: string;
  partialLast: boolean;
};

export const STATS: StatsData = {
  months: ["2025-04","2025-05","2025-06","2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03","2026-04","2026-05","2026-06","2026-07","2026-08"],
  cum: [0,2419,6748,10516,16542,18385,20411,22319,23263,22594,26541,28249,31230,37972,48297,68333,76178],
  add: [0,6667,6498,5881,9920,4029,5894,4173,2898,2990,6060,3353,5960,8433,13105,29125,10133],
  del: [0,4248,2169,2113,3894,2186,3868,2265,1954,3659,2113,1645,2979,1691,2780,9089,2288],
  com: [0,14,12,11,21,14,25,20,15,25,31,20,25,26,24,26,12],
  files: [31,53,69,94,117,123,132,135,139,140,153,157,166,195,271,363,391],
  totals: { commits: 321, added: 125119, deleted: 48941, avg_commit_size: 390 },
  loc: 86061,
  nfiles: 391,
  streak: { days: 6, end: "2025-08-15" },
  first: "2025-05-02",
  last: "2026-08-21",
  partialLast: true,
};

/** Features per month: [name, lines added]. Index-aligned with STATS.months. */
export type Feature = [name: string, lines: number];
export const FEATS: Feature[][] = [
  [],
  [["Diary UI revamp",3093],["Custom products",2298],["Diary week picker",619]],
  [["Germination week",3606],["Custom lamp",754],["Veg week logic",552],["Week cover picker",305]],
  [["Harvest week UI",2794],["Media manager",322],["Veg unit selector",129]],
  [["Diary view",7048],["Diary feed & unfollow",2196],["Comments view",2147]],
  [["Unit presets",1881],["Inline week validation",499],["Nutrient errors",394],["Veg/flo autofill",221],["Germination strains rework",181],["Await media upload on save",159]],
  [["Search tab",979],["Login flow update",494],["Comments auto height",256],["Custom methods alert",239],["Week value rounding",194],["Diary name as title",165],["Screen class analytics",31]],
  [["Fullscreen mode",1672],["Contact form",960],["Diary setup rework",607],["Landscape & pinch zoom",422],["Lamp editing workflow",105],["Fullscreen video fit",4]],
  [["Following section",1223],["Main menu following",582],["User view on List",422],["Shared video player",293],["User view UI update",287],["Contact form media",114],["Harvest values update",85],["Fullscreen rotation",39],["Fullscreen analytics",27]],
  [["Comment media upload",905],["Comment email confirmation",201],["Official user status",158],["Search follow support",41]],
  [["Notifications tab",2952],["Notification settings",1285],["Context cells",421],["Visible bottom menu",376]],
  [["Social login & sign-up",1738],["Deeplink support",616]],
  [["Custom context menu",1351],["Camera capture upload",970],["Comments on List",644],["Custom brand/product editing",508],["Extended setup button",358],["Weeks sorting",114]],
  [["Chat",3375],["Question view",1242],["Question list",1015],["Question tags",735],["Button hierarchy & P3 colors",383],["Media upload progress",362],["Notification service extension",71],["Week nav centering",55],["Data model rename",7]],
  [["Contest join/withdraw",5271],["Contest view",3101],["Create/edit question",1808],["Questions integration",321],["Awards integration",198],["Message notifications",186],["Guest input prompt",115],["Chat delivery status",14],["Translation removal",7]],
  [["Brand view",13378],["Ads",5308],["Brand list",1534],["Dark mode",1036],["New skeletons",962],["Shipping address validation",804],["Scroll to harvest week",137],["Diary week navigation",131],["Shipping badge animation",114],["Contest diary model",90]],
  [["Content translation",2772],["New deeplinks",1592],["No-internet popup",613],["GDPR update",454],["Diaries section",197]],
];

/** Comparison windows used for the year-over-year claim. */
export const YOY_WINDOWS = {
  base: { from: "2025-06", to: "2025-11" },
  last: { from: "2026-02", to: "2026-07" },
} as const;
