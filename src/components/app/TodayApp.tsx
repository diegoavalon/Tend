import { useState, useEffect } from "react";
import { TEND_DATA } from "./data";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { OverdueSection } from "./OverdueSection";
import { BatchCard } from "./BatchCard";
import { ComingUpSection } from "./ComingUpSection";
import { EmptyState } from "./EmptyState";
import { NewBatchModal } from "./NewBatchModal";
import { Icon } from "./Icons";

type Palette = "dark" | "cream";

export function TodayApp() {
  const [palette, setPalette] = useState<Palette>("dark");
  const [showProgress, setShowProgress] = useState(true);
  const [batches, setBatches] = useState([...TEND_DATA.batches] as any[]);
  const [overdue, setOverdue] = useState([...TEND_DATA.overdue] as any[]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    document.body.className = "surface-" + palette;
    return () => { document.body.className = ""; };
  }, [palette]);

  const flash = (msg: string) => {
    setToast(msg);
    clearTimeout((window as any).__toast);
    (window as any).__toast = setTimeout(() => setToast(null), 2400);
  };

  const toggleTask = (rowId: string) => {
    setBatches((bs) => bs.map((b) => ({
      ...b,
      rows: b.rows.map((r: any) => r.id === rowId && r.kind === "task" ? { ...r, done: !r.done } : r),
    })));
  };

  const tickCounter = (rowId: string, idx: number) => {
    setBatches((bs) => bs.map((b) => ({
      ...b,
      rows: b.rows.map((r: any) => {
        if (r.id !== rowId || r.kind !== "counter") return r;
        const counters = r.counters.map((c: any, i: number) =>
          i === idx ? { ...c, state: c.state === "done" ? "open" : "done" } : c
        );
        return { ...r, counters };
      }),
    })));
  };

  const recordObservation = (rowId: string) => {
    setBatches((bs) => bs.map((b) => ({
      ...b,
      rows: b.rows.map((r: any) => r.id === rowId && r.kind === "observation" ? { ...r, recorded: true } : r),
    })));
    flash("Observation recorded. Downstream events re-anchored.");
  };

  const clearOverdue = (id: string) => {
    setOverdue((o) => o.filter((x) => x.id !== id));
    flash("Marked done. Removed from overdue.");
  };

  const handleCreate = (data: { template: string; name: string; start: string; params: any }) => {
    const tpl = TEND_DATA.templates.find((t) => t.id === data.template);
    const blank: any = {
      id: `new-${Date.now()}`,
      name: data.name,
      template: tpl?.name ?? data.template,
      stage: "Day 1",
      dayInfo: "Day 1",
      progress: 0.02,
      rows: [
        { kind: "task", id: `new-${Date.now()}-init`, title: "Initial setup", sub: "Anchored to batch-start", done: false },
      ],
    };
    setBatches((bs) => [blank, ...bs]);
    setModalOpen(false);
    flash(`Batch "${data.name}" started.`);
  };

  const totalToday = batches.reduce((n: number, b: any) =>
    n + b.rows.reduce((m: number, r: any) => {
      if (r.kind === "task" && !r.done) return m + 1;
      if (r.kind === "observation" && !r.recorded) return m + 1;
      if (r.kind === "counter") return m + r.counters.filter((c: any) => c.state !== "done").length;
      return m;
    }, 0), 0
  );

  return (
    <div className={"app surface-" + palette}>
      <Sidebar active="today" overdueCount={overdue.length} onNew={() => setModalOpen(true)} />

      <main className="main">
        <TopBar dueToday={totalToday} overdue={overdue.length} />

        <OverdueSection items={overdue} onAct={clearOverdue} />

        <section className="section">
          <div className="section-head">
            <Icon name="sun" size={14} />
            <span className="label">Today</span>
            <span className="rule" />
            <span className="count">{batches.length} batches</span>
          </div>
          {batches.length === 0 ? (
            <EmptyState next={{ title: "Kindling expected", batch: "Doe #1", in: "3 days" }} />
          ) : (
            <div className="batch-grid">
              {batches.map((b: any) => (
                <BatchCard
                  key={b.id}
                  batch={b}
                  showProgress={showProgress}
                  onToggleTask={toggleTask}
                  onTickCounter={tickCounter}
                  onRecord={recordObservation}
                />
              ))}
            </div>
          )}
        </section>

        <ComingUpSection days={TEND_DATA.comingUp} />
      </main>

      {modalOpen && (
        <NewBatchModal
          templates={TEND_DATA.templates}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <span className="dot" />
          {toast}
        </div>
      )}

      {/* Palette switcher — bottom-left corner */}
      <div style={{ position: "fixed", bottom: 20, left: 20, display: "flex", gap: 8, zIndex: 50 }}>
        {(["dark", "cream"] as Palette[]).map((p) => (
          <button
            key={p}
            onClick={() => setPalette(p)}
            style={{
              padding: "7px 14px",
              borderRadius: "var(--tend-radius-full)",
              border: "1px solid var(--tend-hairline-local-strong)",
              background: palette === p ? "var(--tend-primary)" : "transparent",
              color: palette === p ? "#fff" : "var(--tend-fg-2)",
              font: "700 11px/1 var(--tend-font-body)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 150ms ease, color 150ms ease",
            }}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setShowProgress((v) => !v)}
          style={{
            padding: "7px 14px",
            borderRadius: "var(--tend-radius-full)",
            border: "1px solid var(--tend-hairline-local-strong)",
            background: "transparent",
            color: "var(--tend-fg-2)",
            font: "700 11px/1 var(--tend-font-body)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          {showProgress ? "Hide progress" : "Show progress"}
        </button>
      </div>
    </div>
  );
}
