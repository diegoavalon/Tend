import { Icon } from "./Icons";

interface Counter {
  when: string;
  state: "done" | "open" | "missed";
}

interface Row {
  id: string;
  title: string;
  sub: string;
  counters: readonly Counter[];
}

interface Props {
  row: Row;
  onTick: (id: string, idx: number) => void;
}

export function CounterRow({ row, onTick }: Props) {
  const done = row.counters.filter((c) => c.state === "done").length;
  const total = row.counters.length;
  return (
    <div className="row-base">
      <span className="row-icon is-counter">
        <Icon name="repeat" size={14} />
      </span>
      <div className="counter-wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="counter">
            {row.counters.map((c, i) => (
              <button
                key={i}
                className={"cell " + c.state}
                onClick={() => onTick(row.id, i)}
                title={`${c.when} — ${c.state}`}
                aria-label={`Window ${i + 1} of ${total} (${c.when})`}
              >
                {c.state === "done" && <Icon name="check" size={12} strokeWidth={3} />}
              </button>
            ))}
          </span>
          <span className="row-title">{row.title}</span>
          <span className="row-sub" style={{ marginLeft: "auto", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {done}/{total}
          </span>
        </div>
        <div className="row-sub" style={{ marginLeft: 0 }}>{row.sub}</div>
      </div>
    </div>
  );
}
