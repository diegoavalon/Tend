export const TEND_DATA = {
  user: {
    name: "Diego",
    timezone: "America/New_York",
    windows: { morning: "07:30", midday: "12:30", evening: "18:30" },
  },

  templates: [
    { id: "sprouting",  name: "Mason-jar sprouting",  blurb: "3 rinses/day, harvest day 5",       defaultParams: { variety: "Mung beans", days: 5 } },
    { id: "fodder",     name: "Wheat fodder",          blurb: "Daily water, harvest day 8",        defaultParams: { trays: 1, days: 8 } },
    { id: "incubation", name: "Egg incubation",        blurb: "Turn 3×/day, candle day 7 & 14, hatch day 21", defaultParams: { eggs: 12, incubation_days: 21 } },
    { id: "seedlings",  name: "Seedling fertigation",  blurb: "Daily check, transplant ~day 14",   defaultParams: { variety: "Basil", days_to_transplant: 14 } },
    { id: "rabbit",     name: "Rabbit breeding",       blurb: "Palpate day 10–14, kindle ~day 31", defaultParams: { doe: "#1", gestation_days: 31 } },
    { id: "slips",      name: "Sweet potato slips",    blurb: "Daily mist, slip at 5–6 inches",    defaultParams: { mother_count: 2 } },
  ],

  overdue: [
    { id: "o1", icon: "alert-triangle", title: "Palpate doe",           batch: "Doe #2 · rabbit",     age: "1 day late"  },
    { id: "o2", icon: "droplet",        title: "Water tray",            batch: "Wheat tray 5",         age: "yesterday"   },
    { id: "o3", icon: "eye",            title: "Candle eggs (day 7)",   batch: "Incubator Sunday",     age: "2 days late" },
  ],

  batches: [
    {
      id: "mung-a",
      name: "Mung jar A",
      template: "Mason-jar sprouting",
      stage: "Soak → sprout",
      dayInfo: "Day 3 of 5",
      progress: 0.6,
      rows: [
        { kind: "counter" as const, id: "mung-a-rinse", title: "Rinse jar", sub: "3× daily — silently resets at midnight",
          counters: [{ when: "07:30", state: "done" as const }, { when: "12:30", state: "done" as const }, { when: "18:30", state: "open" as const }] },
        { kind: "task" as const, id: "mung-a-check", title: "Check sprout length", sub: "Tolerance ±1 day", done: false },
      ],
    },
    {
      id: "incubator-tuesday",
      name: "Incubator Tuesday",
      template: "Egg incubation",
      stage: "Incubating",
      dayInfo: "Day 14 of 21",
      progress: 14 / 21,
      rows: [
        { kind: "task" as const, id: "incu-tue-candle", title: "Candle eggs (day 14)", sub: "Mark infertile; remove. Anchored to batch-start.", done: false },
        { kind: "counter" as const, id: "incu-tue-turn", title: "Turn eggs", sub: "3× daily until day 18 lockdown",
          counters: [{ when: "07:30", state: "done" as const }, { when: "12:30", state: "open" as const }, { when: "18:30", state: "open" as const }] },
      ],
    },
    {
      id: "doe-4",
      name: "Doe #4",
      template: "Rabbit breeding",
      stage: "Gestation",
      dayInfo: "Day 12 of ~31",
      progress: 12 / 31,
      rows: [
        { kind: "observation" as const, id: "doe-4-palp", title: "Palpate doe", sub: "Window: day 10 → 14 (2 days left)", recorded: false },
        { kind: "task" as const, id: "doe-4-water", title: "Top up water bottle", sub: "Daily, anchored to batch-start", done: true },
      ],
    },
    {
      id: "basil-3",
      name: "Tray 3 — basil",
      template: "Seedling fertigation",
      stage: "True leaves",
      dayInfo: "Day 8 of ~14",
      progress: 8 / 14,
      rows: [
        { kind: "task" as const, id: "basil-3-fert", title: "Fertigate (1/4 strength)", sub: "Daily during true-leaf stage", done: false },
        { kind: "observation" as const, id: "basil-3-height", title: "Note height", sub: "Window: day 7 → 10", recorded: false },
      ],
    },
  ],

  comingUp: [
    { when: "Tomorrow",  dateLabel: "Sun May 17", items: [
      { title: "Candle eggs (day 14)", batch: "Incubator Sunday", tag: "task" },
      { title: "Rinse Mung jar A — 3×", batch: "Mung jar A",       tag: "counter" },
    ]},
    { when: "+ 2 days",  dateLabel: "Mon May 18", items: [
      { title: "Palpate doe (day 10–14 window opens)", batch: "Doe #5", tag: "observation" },
    ]},
    { when: "+ 3 days",  dateLabel: "Tue May 19", items: [
      { title: "Kindle expected",            batch: "Doe #1",          tag: "milestone" },
      { title: "Transplant tray 3 — basil",  batch: "Tray 3 — basil",  tag: "task" },
    ]},
    { when: "+ 5 days",  dateLabel: "Thu May 21", items: [
      { title: "Harvest Mung jar A", batch: "Mung jar A", tag: "milestone" },
    ]},
    { when: "+ 6 days",  dateLabel: "Fri May 22", items: [
      { title: "Start sweet potato slips batch 2", batch: "Slips #2", tag: "milestone" },
    ]},
  ],
} as const;

export type Template  = typeof TEND_DATA.templates[number];
export type Overdue   = typeof TEND_DATA.overdue[number];
export type Batch     = (typeof TEND_DATA.batches)[number];
export type BatchRow  = Batch["rows"][number];
