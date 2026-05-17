import { Icon } from "./Icons";

interface Row {
  id: string;
  title: string;
  sub: string;
  recorded: boolean;
}

interface Props {
  row: Row;
  onRecord: (id: string) => void;
}

export function ObservationRow({ row, onRecord }: Props) {
  return (
    <div className={"row-base" + (row.recorded ? " done" : "")}>
      <span className="row-icon is-observation">
        <Icon name="eye" size={15} />
      </span>
      <div className="row-body">
        <div className="row-title">{row.title}</div>
        <div className="row-sub">{row.sub}</div>
      </div>
      <button
        className={"row-action observe" + (row.recorded ? " done" : "")}
        onClick={() => onRecord(row.id)}
      >
        {row.recorded ? "Recorded" : "Record"}
      </button>
    </div>
  );
}
