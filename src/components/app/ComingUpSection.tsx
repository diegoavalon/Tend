import { Icon } from "./Icons";

interface Item {
  title: string;
  batch: string;
  tag: string;
}

interface Day {
  when: string;
  dateLabel: string;
  items: readonly Item[];
}

interface Props {
  days: readonly Day[];
}

export function ComingUpSection({ days }: Props) {
  const total = (days || []).reduce((n, d) => n + d.items.length, 0);
  return (
    <section className="section">
      <details className="coming">
        <summary>
          <Icon name="chevron-right" size={16} />
          <span className="title">Coming up · 7 days</span>
          <span className="summary-text">{total} items · {days.length} days</span>
        </summary>
        <div className="coming-body">
          {days.map((d, i) => (
            <div key={i} className="coming-day">
              <div className="when">
                <strong>{d.when}</strong>
                <div style={{ color: "var(--tend-fg-3)", fontWeight: 500, marginTop: 2, letterSpacing: 0, textTransform: "none" }}>{d.dateLabel}</div>
              </div>
              <div className="items">
                {d.items.map((it, j) => {
                  const icon = it.tag === "counter" ? "repeat"
                             : it.tag === "observation" ? "eye"
                             : it.tag === "milestone" ? "flag"
                             : "circle-dot";
                  return (
                    <div key={j} className="item">
                      <Icon name={icon} size={14} />
                      <span>{it.title}</span>
                      <span className="chip">{it.batch}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
