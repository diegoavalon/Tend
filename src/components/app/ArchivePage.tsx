import { useState } from "react";
import { AppShell } from "./AppShell";
import { Icon } from "./Icons";

const MONTHS = [
  {
    label: "May 2026",
    rows: [
      { name: "Mung jar D", template: "Mason-jar sprouting", status: "completed", range: "May 1 → May 6", yield: "560 g harvested" },
      { name: "Incubator Friday", template: "Egg incubation", status: "completed", range: "Apr 18 → May 9", yield: "10 of 12 hatched" },
      { name: "Doe #3", template: "Rabbit breeding", status: "failed", range: "Apr 9 → Apr 24", yield: "Negative palpation — restart" },
    ],
  },
  {
    label: "April 2026",
    rows: [
      { name: "Wheat tray 4", template: "Wheat fodder", status: "completed", range: "Apr 12 → Apr 20", yield: "1 tray harvested" },
      { name: "Tray 2 — tomato", template: "Seedling fertigation", status: "archived", range: "Apr 2 → Apr 18", yield: "Hardened off, transplanted" },
      { name: "Slips #1", template: "Sweet potato slips", status: "completed", range: "Mar 28 → Apr 22", yield: "24 slips taken" },
    ],
  },
  {
    label: "March 2026",
    rows: [
      { name: "Mung jar C", template: "Mason-jar sprouting", status: "completed", range: "Mar 22 → Mar 27", yield: "470 g harvested" },
      { name: "Doe #2", template: "Rabbit breeding", status: "completed", range: "Feb 18 → Mar 22", yield: "6 kits weaned" },
    ],
  },
] as const;

const FILTERS = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "failed", label: "Failed" },
  { id: "archived", label: "Archived" },
] as const;

type Filter = (typeof FILTERS)[number]["id"];

export function ArchivePage() {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <AppShell active="archive">
      <main className="main">
        <header className="screen-head">
          <div className="left">
            <div className="crumbs">Library · Archive</div>
            <h1>Archive</h1>
            <div className="meta">Past batches. Click any to see its observations, history, and yield notes.</div>
          </div>
          <div className="actions">
            <button type="button" className="btn-secondary"><Icon name="download" size={14} /> Export CSV</button>
          </div>
        </header>

        <div className="chip-row">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={"chip " + (filter === item.id ? "active" : "")}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {MONTHS.map((month) => {
          const visibleRows = month.rows.filter((row) => filter === "all" || row.status === filter);
          if (visibleRows.length === 0) return null;

          return (
            <section key={month.label} className="archive-month">
              <div className="archive-month-head">{month.label}</div>
              {visibleRows.map((row) => (
                <a key={row.name} className="archive-row" href="/app/batches">
                  <div>
                    <div className="name">{row.name}<small>{row.template}</small></div>
                  </div>
                  <div className="range">
                    {row.range}
                    <div style={{ color: "var(--tend-fg-3)", marginTop: 2 }}>{row.yield}</div>
                  </div>
                  <span className={"status-pill " + row.status}>{row.status}</span>
                  <Icon name="chevron-right" size={16} />
                </a>
              ))}
            </section>
          );
        })}
      </main>
    </AppShell>
  );
}
