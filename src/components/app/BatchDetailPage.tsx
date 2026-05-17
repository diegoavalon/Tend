import { useState } from "react";
import { AppShell } from "./AppShell";
import { CounterRow } from "./CounterRow";
import { Icon } from "./Icons";
import { ObservationRow } from "./ObservationRow";
import { TaskRow } from "./TaskRow";
import { TEND_DATA } from "./data";

type CounterState = "done" | "open" | "missed";

type DetailRow =
  | { kind: "task"; id: string; title: string; sub: string; done: boolean }
  | { kind: "counter"; id: string; title: string; sub: string; counters: { when: string; state: CounterState }[] }
  | { kind: "observation"; id: string; title: string; sub: string; recorded: boolean };

const STAGES = [
  { name: "Bred", day: "Day 0", status: "done" },
  { name: "Gestation", day: "Day 1 → 14", status: "done" },
  { name: "Palpation", day: "Day 10 → 14", status: "current" },
  { name: "Late gest.", day: "Day 15 → 28", status: "upcoming" },
  { name: "Nest box", day: "Day 28", status: "upcoming" },
  { name: "Kindling", day: "Day 31", status: "upcoming" },
] as const;

const OBSERVATIONS = [
  { title: "Doe bred to buck #1", when: "May 04 · 09:12", note: "Two mounts observed" },
  { title: "Doe receptive", when: "May 04 · 09:10", note: "Lordosis confirmed" },
];

const HISTORY = [
  { kind: "done", title: "Top up water bottle", when: "Today 07:42" },
  { kind: "done", title: "Top up water bottle", when: "Yesterday 07:38" },
  { kind: "observation", title: "Doe weight noted (4.6 kg)", when: "May 12 · 11:20" },
  { kind: "skipped", title: "Cage clean (deliberate — wet weather)", when: "May 10 · 16:55" },
  { kind: "done", title: "Top up water bottle", when: "May 10 · 07:35" },
  { kind: "observation", title: "Doe bred to buck #1", when: "May 04 · 09:12" },
] as const;

const PARAMETERS = {
  doe: "#4 — Fawn",
  gestation_days: 31,
  palpation_window: "Day 10 → 14",
  kindling_target: "May 21",
} as const;

function cloneRows(rows: readonly typeof TEND_DATA.batches[number]["rows"][number][]): DetailRow[] {
  return rows.map((row) => {
    if (row.kind === "counter") {
      return {
        kind: "counter",
        id: row.id,
        title: row.title,
        sub: row.sub,
        counters: row.counters.map((counter) => ({ ...counter })),
      };
    }

    if (row.kind === "observation") {
      return { ...row };
    }

    return { ...row };
  });
}

export function BatchDetailPage() {
  const batch = TEND_DATA.batches.find((item) => item.id === "doe-4");

  if (!batch) return null;

  const [rows, setRows] = useState<DetailRow[]>(() => cloneRows(batch.rows));

  const toggleTask = (id: string) => {
    setRows((current) =>
      current.map((row) => (row.kind === "task" && row.id === id ? { ...row, done: !row.done } : row)),
    );
  };

  const tickCounter = (id: string, index: number) => {
    setRows((current) =>
      current.map((row) => {
        if (row.kind !== "counter" || row.id !== id) return row;

        return {
          ...row,
          counters: row.counters.map((counter, counterIndex) =>
            counterIndex === index
              ? { ...counter, state: counter.state === "done" ? "open" : "done" }
              : counter,
          ),
        };
      }),
    );
  };

  const recordObservation = (id: string) => {
    setRows((current) =>
      current.map((row) => (row.kind === "observation" && row.id === id ? { ...row, recorded: true } : row)),
    );
  };

  return (
    <AppShell active="batches">
      <main className="main">
        <header className="screen-head">
          <div className="left">
            <div className="crumbs">
              <a href="/">Today</a>
              <Icon name="chevron-right" size={11} />
              <span style={{ color: "var(--tend-fg-3)" }}>Batches</span>
              <Icon name="chevron-right" size={11} />
              <span>{batch.name}</span>
            </div>
            <h1>{batch.name}</h1>
            <div className="meta">
              <span style={{ color: "var(--tend-primary)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: 12 }}>
                {batch.stage}
              </span>
              <span> · {batch.template} · {batch.dayInfo}</span>
            </div>
          </div>
          <div className="actions">
            <button type="button" className="btn-secondary"><Icon name="edit-3" size={14} /> Edit params</button>
            <button type="button" className="btn-secondary"><Icon name="archive" size={14} /> Archive</button>
          </div>
        </header>

        <section className="section">
          <div className="section-head">
            <Icon name="map" size={14} />
            <span className="label">Stage timeline</span>
            <span className="rule" />
            <span className="count">{STAGES.length} stages</span>
          </div>
          <div className="stage-timeline">
            {STAGES.map((stage) => (
              <div key={stage.name} className={"stage-pill " + stage.status}>
                <span className="stage-name">{stage.name}</span>
                <span className="stage-day">{stage.day}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="col-pair">
          <div>
            <section className="section" style={{ marginTop: 0 }}>
              <div className="section-head">
                <Icon name="sun" size={14} />
                <span className="label">Today on this batch</span>
                <span className="rule" />
                <span className="count">{rows.length}</span>
              </div>
              <article className="batch-card">
                <div className="rows">
                  {rows.map((row) => {
                    if (row.kind === "task") return <TaskRow key={row.id} row={row} onToggle={toggleTask} />;
                    if (row.kind === "counter") return <CounterRow key={row.id} row={row} onTick={tickCounter} />;
                    return <ObservationRow key={row.id} row={row} onRecord={recordObservation} />;
                  })}
                </div>
              </article>
            </section>

            <section className="section">
              <div className="section-head">
                <Icon name="history" size={14} />
                <span className="label">History</span>
                <span className="rule" />
                <span className="count">{HISTORY.length}</span>
              </div>
              <div className="panel">
                <div className="history-feed">
                  {HISTORY.map((item, index) => (
                    <div key={index} className={"history-item is-" + item.kind}>
                      <span className="icon">
                        <Icon
                          name={item.kind === "observation" ? "eye" : item.kind === "skipped" ? "x" : "check"}
                          size={14}
                          strokeWidth={2.4}
                        />
                      </span>
                      <div>
                        <div className="title">{item.title}</div>
                      </div>
                      <span className="when">{item.when}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside>
            <div className="panel">
              <h2><Icon name="settings-2" size={16} />Parameters</h2>
              <div className="panel-sub">Template version 1 · snapshotted at batch creation.</div>
              {Object.entries(PARAMETERS).map(([key, value]) => (
                <div key={key} className="kv-row">
                  <span className="k">{key.replace(/_/g, " ")}</span>
                  <span className="v">{value}</span>
                </div>
              ))}
            </div>

            <div className="panel">
              <h2><Icon name="eye" size={16} />Observations</h2>
              <div className="panel-sub">Recorded events the schedule re-anchors against.</div>
              {OBSERVATIONS.map((item, index) => (
                <div
                  key={index}
                  className="history-item is-observation"
                  style={{ borderTop: index > 0 ? "1px solid var(--tend-tint-soft)" : "none" }}
                >
                  <span className="icon"><Icon name="eye" size={14} /></span>
                  <div>
                    <div className="title">{item.title}</div>
                    <div className="meta">{item.note}</div>
                  </div>
                  <span className="when">{item.when}</span>
                </div>
              ))}
            </div>

            <div className="panel">
              <h2><Icon name="calendar" size={16} />In your calendar</h2>
              <div className="panel-sub">
                Palpation window is currently showing as a multi-day all-day event
                (May 14 → 18 with tolerance). Cleared from feed once recorded.
              </div>
            </div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
