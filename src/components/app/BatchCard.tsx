import { TaskRow } from "./TaskRow";
import { ObservationRow } from "./ObservationRow";
import { CounterRow } from "./CounterRow";

interface Props {
  batch: {
    id: string;
    name: string;
    template: string;
    stage: string;
    dayInfo: string;
    progress: number;
    rows: readonly any[];
  };
  showProgress?: boolean;
  onToggleTask: (id: string) => void;
  onTickCounter: (id: string, idx: number) => void;
  onRecord: (id: string) => void;
}

export function BatchCard({ batch, showProgress = true, onToggleTask, onTickCounter, onRecord }: Props) {
  return (
    <article className="batch-card" data-batch-id={batch.id}>
      <div className="head">
        <div>
          <div className="name">{batch.name}</div>
          <div className="meta">
            <span className="stage">{batch.stage}</span>
            <span> · {batch.template}</span>
          </div>
        </div>
        <div className="right">
          <span className="pill-day">{batch.dayInfo}</span>
        </div>
      </div>

      {showProgress && (
        <div className="progress" aria-hidden="true">
          <div className="bar" style={{ width: `${Math.min(100, Math.round((batch.progress || 0) * 100))}%` }} />
        </div>
      )}

      <div className="rows">
        {batch.rows.map((row: any) => {
          if (row.kind === "task")        return <TaskRow        key={row.id} row={row} onToggle={onToggleTask} />;
          if (row.kind === "counter")     return <CounterRow     key={row.id} row={row} onTick={onTickCounter} />;
          if (row.kind === "observation") return <ObservationRow key={row.id} row={row} onRecord={onRecord} />;
          return null;
        })}
      </div>
    </article>
  );
}
