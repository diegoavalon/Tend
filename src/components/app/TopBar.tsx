interface Props {
  dueToday?: number;
  overdue?: number;
  palette: "dark" | "cream";
  onPaletteChange: (palette: "dark" | "cream") => void;
}

export function TopBar({ dueToday = 0, overdue = 0, palette, onPaletteChange }: Props) {
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
        <div className="summary-top">
          <div><strong>{overdue}</strong> overdue · <strong>{dueToday}</strong> today</div>
          <div className="theme-switch" role="group" aria-label="Color theme">
            <button
              type="button"
              className={palette === "dark" ? "is-active" : undefined}
              aria-pressed={palette === "dark"}
              onClick={() => onPaletteChange("dark")}
            >
              Dark
            </button>
            <button
              type="button"
              className={palette === "cream" ? "is-active" : undefined}
              aria-pressed={palette === "cream"}
              onClick={() => onPaletteChange("cream")}
            >
              Light
            </button>
          </div>
        </div>
        <div className="summary-note">Digest sent 07:30</div>
      </div>
    </header>
  );
}
