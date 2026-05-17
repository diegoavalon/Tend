import { LandingNav } from "./LandingNav";

export function LandingHero() {
  return (
    <section className="hero" id="top">
      <LandingNav />
      <div className="container hero-inner">
        <div className="eyebrow"><span className="dot" />For homesteaders running 5+ batches at once</div>
        <h1 className="h-display">
          Stop forgetting what to <span className="pixel">rinse</span>,{" "}
          <span className="green-word">palpate</span>, or transplant today.
        </h1>
        <p>
          Tend tracks every batch on your homestead — sprouts, eggs,
          seedlings, kits — and tells you what&apos;s due, what&apos;s overdue, and
          what&apos;s coming up. One screen. One email a day.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="/app">Start free for 14 days →</a>
          <a className="btn btn-ghost-dark" href="/app">See a sample dashboard</a>
        </div>

        <div className="hero-mockup" aria-label="Today dashboard preview">
          <span className="label">Today · Sat May 16</span>
          <span className="ph" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
