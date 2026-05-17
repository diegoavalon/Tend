import { useMemo, useState } from "react";
import { AppShell } from "./AppShell";
import { Icon } from "./Icons";

const TEMPLATE_LIBRARY = [
  {
    id: "sprouting",
    fg: "fg-1",
    icon: "sprout",
    name: "Mason-jar sprouting",
    blurb: "3 rinses/day, harvest day 5–6.",
    stages: ["Soak", "Sprout", "Harvest"],
    events: [
      { icon: "repeat", label: "3× daily rinse (counter)" },
      { icon: "circle-dot", label: "Check sprout length on day 4 (task)" },
      { icon: "eye", label: "Germination observed (re-anchors harvest)" },
    ],
    params: { variety: "Mung beans", days: 5 },
  },
  {
    id: "fodder",
    fg: "fg-2",
    icon: "wheat",
    name: "Wheat fodder",
    blurb: "Daily water, harvest day 8.",
    stages: ["Soak", "Sprout", "Greens"],
    events: [
      { icon: "droplet", label: "Water tray daily (counter ×1)" },
      { icon: "circle-dot", label: "Lift cover on day 3 (task)" },
      { icon: "flag", label: "Harvest day 8 (milestone)" },
    ],
    params: { trays: 1, days: 8 },
  },
  {
    id: "incubation",
    fg: "fg-3",
    icon: "egg",
    name: "Egg incubation",
    blurb: "Turn 3×/day, candle day 7 & 14, hatch day 21.",
    stages: ["Set", "Incubate", "Lockdown", "Hatch"],
    events: [
      { icon: "repeat", label: "Turn eggs 3× daily until day 18" },
      { icon: "eye", label: "Candle day 7 (mark infertile)" },
      { icon: "eye", label: "Candle day 14" },
      { icon: "flag", label: "Hatch day 21 (milestone)" },
    ],
    params: { eggs: 12, incubation_days: 21 },
  },
  {
    id: "seedlings",
    fg: "fg-4",
    icon: "leaf",
    name: "Seedling fertigation",
    blurb: "Daily check, transplant ~day 14.",
    stages: ["Cotyledon", "True leaves", "Harden", "Transplant"],
    events: [
      { icon: "droplet", label: "Fertigate 1/4 strength daily (counter ×1)" },
      { icon: "eye", label: "Note height day 7 → 10 (observation)" },
      { icon: "flag", label: "Transplant day 14" },
    ],
    params: { variety: "Basil", days_to_transplant: 14 },
  },
  {
    id: "rabbit",
    fg: "fg-5",
    icon: "rabbit",
    name: "Rabbit breeding",
    blurb: "Palpate day 10–14, kindle day 31.",
    stages: ["Bred", "Gestation", "Palpation", "Late", "Nest", "Kindle"],
    events: [
      { icon: "circle-dot", label: "Top up water daily (anchored to batch-start)" },
      { icon: "eye", label: "Palpate doe day 10 → 14 (observation, re-anchors)" },
      { icon: "circle-dot", label: "Place nest box day 28" },
      { icon: "flag", label: "Kindling day 31" },
    ],
    params: { doe: "#1", gestation_days: 31 },
  },
  {
    id: "slips",
    fg: "fg-6",
    icon: "sprout",
    name: "Sweet potato slips",
    blurb: "Daily mist, slip at 5–6 inches.",
    stages: ["Mother", "Sprouting", "Slipping"],
    events: [
      { icon: "droplet", label: "Mist daily (counter ×1)" },
      { icon: "eye", label: "Slips at 5 inches (observation)" },
      { icon: "flag", label: "Slip taken — child batch begins" },
    ],
    params: { mother_count: 2 },
  },
] as const;

export function TemplatesPage() {
  const [pickedId, setPickedId] = useState<string>(TEMPLATE_LIBRARY[0].id);

  const picked = useMemo(
    () => TEMPLATE_LIBRARY.find((item) => item.id === pickedId) ?? TEMPLATE_LIBRARY[0],
    [pickedId],
  );

  return (
    <AppShell active="templates">
      <main className="main">
        <header className="screen-head">
          <div className="left">
            <div className="crumbs">Library · Templates</div>
            <h1>Templates</h1>
            <div className="meta">Authored as JSON in the codebase. Editing them ships via deploy — running batches keep the snapshot they were created against.</div>
          </div>
          <div className="actions">
            <button type="button" className="btn-secondary"><Icon name="external-link" size={14} /> View JSON</button>
          </div>
        </header>

        <div className="col-pair col-pair-top">
          <div className="tpl-grid">
            {TEMPLATE_LIBRARY.map((template) => (
              <button
                key={template.id}
                type="button"
                className={"tpl-card " + template.fg + (pickedId === template.id ? " selected" : "")}
                onClick={() => setPickedId(template.id)}
              >
                <div className="top">
                  <span className="swatch"><Icon name={template.icon} size={20} /></span>
                  <div className="text-left">
                    <div className="name">{template.name}</div>
                    <div className="blurb">{template.blurb}</div>
                  </div>
                </div>
                <div className="stages">
                  {template.stages.map((stage, index) => <span key={index} className="s">{stage}</span>)}
                </div>
              </button>
            ))}
          </div>

          <aside>
            <div className="panel">
              <h2><Icon name="book-open" size={16} />{picked.name}</h2>
              <div className="panel-sub">{picked.blurb}</div>

              <div className="stack-gap-sm">
                <div className="archive-month-head section-kicker">Stages</div>
                <div className="stage-timeline">
                  {picked.stages.map((stage, index) => (
                    <div key={stage} className={"stage-pill " + (index === 0 ? "current" : "")}>
                      <span className="stage-name">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="stack-gap-md">
                <div className="archive-month-head section-kicker">Events</div>
                <ul className="event-list">
                  {picked.events.map((event, index) => (
                    <li key={index} className="event-item">
                      <span className="event-icon"><Icon name={event.icon} size={14} /></span>
                      <span>{event.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="stack-gap-md">
                <div className="archive-month-head section-kicker">Default parameters</div>
                {Object.entries(picked.params).map(([key, value]) => (
                  <div key={key} className="kv-row">
                    <span className="k">{key.replace(/_/g, " ")}</span>
                    <span className="v">{value}</span>
                  </div>
                ))}
              </div>

              <button type="button" className="btn-primary btn-align-start btn-offset-top">
                Start a batch with this template →
              </button>
            </div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
