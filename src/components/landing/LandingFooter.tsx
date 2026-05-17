export function LandingFooter() {
  return (
    <section className="footer">
      <div className="container row">
        <a className="brand" href="#top">Tend<span className="dot">.</span></a>
        <ul className="links">
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="/app/templates">Templates</a></li>
          <li><a href="/app">Log in</a></li>
          <li><a href="#get-started">Get started</a></li>
        </ul>
        <span className="copy">© {new Date().getFullYear()} Tend</span>
      </div>
    </section>
  );
}
