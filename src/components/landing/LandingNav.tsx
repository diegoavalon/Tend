export function LandingNav() {
  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <a className="nav-brand" href="#top">Tend<span className="dot">.</span></a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="/app/templates">Templates</a>
          <a href="/app">Log in</a>
        </div>
        <a className="nav-cta" href="/app">Get started →</a>
      </nav>
    </div>
  );
}
