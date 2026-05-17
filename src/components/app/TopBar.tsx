interface Props {
  dueToday?: number;
  overdue?: number;
}

export function TopBar({ dueToday = 0, overdue = 0 }: Props) {
  const today = new Date();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <header className="topbar">
      <div className="left">
        <div className="date-eyebrow">{weekday} · {date}</div>
        <h1>
          {dueToday > 0 ? (
            <>You have <span className="accent">{dueToday}</span> things due today.</>
          ) : (
            <>Quiet morning. <span className="accent">Nothing</span> due today.</>
          )}
        </h1>
      </div>
      <div className="summary">
        <div><strong>{overdue}</strong> overdue · <strong>{dueToday}</strong> today</div>
        <div className="summary-note">Digest sent 07:30</div>
      </div>
    </header>
  );
}
