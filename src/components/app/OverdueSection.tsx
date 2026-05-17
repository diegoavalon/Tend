import { Icon } from "./Icons";

interface Item {
  id: string;
  icon: string;
  title: string;
  batch: string;
  age: string;
}

interface Props {
  items: readonly Item[];
  onAct: (id: string) => void;
}

export function OverdueSection({ items, onAct }: Props) {
  if (!items || items.length === 0) return null;
  return (
    <section className="section">
      <div className="section-head">
        <Icon name="alert-triangle" size={14} />
        <span className="label danger">Overdue</span>
        <span className="rule" />
        <span className="count">{items.length}</span>
      </div>
      <div className="overdue-list">
        {items.map((it) => (
          <div key={it.id} className="overdue-row" onClick={() => onAct(it.id)}>
            <span className="icon"><Icon name={it.icon} size={16} /></span>
            <span className="title">{it.title}</span>
            <span className="batch-chip">{it.batch}</span>
            <span className="age">{it.age}</span>
            <Icon name="chevron-right" size={16} />
          </div>
        ))}
      </div>
    </section>
  );
}
