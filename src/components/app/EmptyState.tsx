interface Props {
  next: { title: string; batch: string; in: string };
}

export function EmptyState({ next }: Props) {
  return (
    <section className="section">
      <div className="empty">
        <div className="h">All caught up.</div>
        <div className="next">
          Next up: <span className="accent">{next.title}</span> on {next.batch}, in {next.in}.
        </div>
      </div>
    </section>
  );
}
