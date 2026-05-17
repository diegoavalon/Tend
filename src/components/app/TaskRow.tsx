import { Icon } from "./Icons";

interface Row {
  id: string;
  title: string;
  sub: string;
  done: boolean;
}

interface Props {
  row: Row;
  onToggle: (id: string) => void;
}

export function TaskRow({ row, onToggle }: Props) {
  return (
    <div className={"row-base" + (row.done ? " done" : "")}>
      <span className="row-icon is-task">
        <Icon name="circle-dot" size={16} />
      </span>
      <div className="row-body">
        <div className="row-title">{row.title}</div>
        <div className="row-sub">{row.sub}</div>
      </div>
      <button
        className={"row-action" + (row.done ? " done" : "")}
        onClick={() => onToggle(row.id)}
        aria-label={row.done ? "Mark not done" : "Mark done"}
      >
        {row.done && <Icon name="check" size={14} strokeWidth={3} />}
      </button>
    </div>
  );
}
