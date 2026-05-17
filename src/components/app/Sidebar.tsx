import { Icon } from "./Icons";

const NAV_GROUPS = [
  {
    label: null,
    items: [
      { id: "today", label: "Today", icon: "sun", href: "/app" },
      {
        id: "batches",
        label: "All batches",
        icon: "layers",
        href: "/app/batches",
        count: 5,
      },
      {
        id: "calendar",
        label: "Calendar feed",
        icon: "calendar",
        href: "/app/settings#feed",
      },
    ],
  },
  {
    label: "Library",
    items: [
      {
        id: "templates",
        label: "Templates",
        icon: "book-open",
        href: "/app/templates",
        count: 6,
      },
      {
        id: "archive",
        label: "Archive",
        icon: "archive",
        href: "/app/archive",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: "settings-2",
        href: "/app/settings",
      },
    ],
  },
];

interface Props {
  active?: string;
  overdueCount?: number;
  onNew: () => void;
}

export function Sidebar({ active = "today", overdueCount = 0, onNew }: Props) {
  return (
    <aside className="sidebar">
      <a className="brand" href="/app">
        <Icon name="sprout" size={22} />
        <span>
          Amparado<span className="dot">.</span>
        </span>
      </a>

      <button className="nbtn" onClick={onNew}>
        <Icon name="plus" size={16} strokeWidth={2.4} />
        New batch
      </button>

      {NAV_GROUPS.map((g, gi) => (
        <div key={gi} className="nav-group">
          {g.label && <div className="nav-eyebrow">{g.label}</div>}
          {g.items.map((it) => (
            <a
              key={it.id}
              href={it.href}
              className={"nav-item" + (active === it.id ? " active" : "")}
            >
              <Icon name={it.icon} size={16} />
              <span>{it.label}</span>
              {it.id === "today" && overdueCount > 0 && (
                <span className="count alert">{overdueCount} OVERDUE</span>
              )}
              {it.count && it.id !== "today" && (
                <span className="count">{it.count}</span>
              )}
            </a>
          ))}
        </div>
      ))}

      <div className="who">
        <span className="avatar">D</span>
        <div>
          <div className="profile-name">Diego</div>
          <div className="profile-meta">America/New_York</div>
        </div>
      </div>
    </aside>
  );
}
