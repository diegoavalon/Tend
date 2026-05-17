import { useEffect, useRef, useState } from "react";
import "../../styles/app.css";
import { TEND_DATA } from "./data";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { OverdueSection } from "./OverdueSection";
import { BatchCard } from "./BatchCard";
import { ComingUpSection } from "./ComingUpSection";
import { EmptyState } from "./EmptyState";
import { NewBatchModal } from "./NewBatchModal";
import { Icon } from "./Icons";
import { TweaksPanel } from "./TweaksPanel";

type Palette = "dark" | "cream";
type Density = "compact" | "regular" | "comfy";

type CounterState = "done" | "open" | "missed";

type TaskRow = {
  kind: "task";
  id: string;
  title: string;
  sub: string;
  done: boolean;
};

type ObservationRow = {
  kind: "observation";
  id: string;
  title: string;
  sub: string;
  recorded: boolean;
};

type CounterRow = {
  kind: "counter";
  id: string;
  title: string;
  sub: string;
  counters: { when: string; state: CounterState }[];
};

type BatchRow = TaskRow | ObservationRow | CounterRow;

type BatchState = {
  id: string;
  name: string;
  template: string;
  stage: string;
  dayInfo: string;
  progress: number;
  rows: BatchRow[];
};

type OverdueItem = {
  id: string;
  icon: string;
  title: string;
  batch: string;
  age: string;
};

type NewBatchData = {
  template: string;
  name: string;
  start: string;
  params: Record<string, string | number>;
};

function cloneBatches(): BatchState[] {
  return TEND_DATA.batches.map((batch) => ({
    ...batch,
    rows: batch.rows.map((row) => {
      if (row.kind === "counter") {
        return {
          ...row,
          counters: row.counters.map((counter) => ({ ...counter })),
        };
      }

      return { ...row };
    }),
  }));
}

function cloneOverdue(): OverdueItem[] {
  return TEND_DATA.overdue.map((item) => ({ ...item }));
}

export function TodayApp() {
  const [palette, setPalette] = useState<Palette>("dark");
  const [density, setDensity] = useState<Density>("regular");
  const [showProgress, setShowProgress] = useState(true);
  const [batches, setBatches] = useState<BatchState[]>(cloneBatches);
  const [overdue, setOverdue] = useState<OverdueItem[]>(cloneOverdue);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.className = "surface-" + palette;
    return () => { document.body.className = ""; };
  }, [palette]);

  useEffect(() => () => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
  }, []);

  const flash = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2400);
  };

  const toggleTask = (rowId: string) => {
    setBatches((bs) => bs.map((b) => ({
      ...b,
      rows: b.rows.map((r) => r.id === rowId && r.kind === "task" ? { ...r, done: !r.done } : r),
    })));
  };

  const tickCounter = (rowId: string, idx: number) => {
    setBatches((bs) => bs.map((b) => ({
      ...b,
      rows: b.rows.map((r) => {
        if (r.id !== rowId || r.kind !== "counter") return r;
        const counters = r.counters.map((c, i) =>
          i === idx ? { ...c, state: c.state === "done" ? "open" : "done" } : c
        );
        return { ...r, counters };
      }),
    })));
  };

  const recordObservation = (rowId: string) => {
    setBatches((bs) => bs.map((b) => ({
      ...b,
      rows: b.rows.map((r) => r.id === rowId && r.kind === "observation" ? { ...r, recorded: true } : r),
    })));
    flash("Observation recorded. Downstream events re-anchored.");
  };

  const clearOverdue = (id: string) => {
    setOverdue((o) => o.filter((x) => x.id !== id));
    flash("Marked done. Removed from overdue.");
  };

  const handleCreate = (data: NewBatchData) => {
    const tpl = TEND_DATA.templates.find((t) => t.id === data.template);
    const id = `new-${Date.now()}`;
    const blank: BatchState = {
      id,
      name: data.name,
      template: tpl?.name ?? data.template,
      stage: "Day 1",
      dayInfo: "Day 1",
      progress: 0.02,
      rows: [
        { kind: "task", id: `${id}-init`, title: "Initial setup", sub: "Anchored to batch-start", done: false },
      ],
    };
    setBatches((bs) => [blank, ...bs]);
    setModalOpen(false);
    flash(`Batch "${data.name}" started.`);
  };

  const totalToday = batches.reduce(
    (batchTotal, batch) => batchTotal + batch.rows.reduce((rowTotal, row) => {
      if (row.kind === "task" && !row.done) return rowTotal + 1;
      if (row.kind === "observation" && !row.recorded) return rowTotal + 1;
      if (row.kind === "counter") return rowTotal + row.counters.filter((counter) => counter.state !== "done").length;
      return rowTotal;
    }, 0),
    0,
  );

  return (
    <div className={`app surface-${palette} density-${density}`}>
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
              {batches.map((b) => (
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

      <TweaksPanel
        palette={palette}
        density={density}
        showProgress={showProgress}
        onPaletteChange={setPalette}
        onDensityChange={setDensity}
        onShowProgressChange={setShowProgress}
      />
    </div>
  );
}
