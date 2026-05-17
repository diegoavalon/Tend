export function LandingFinalCTA() {
  return (
    <section className="final" id="get-started">
      <div className="container">
        <div className="eyebrow eyebrow-primary"><span className="dot" />Get started</div>
        <h2 className="h-section">
          One screen for everything <span className="pixel">growing</span> on your land.
        </h2>
        <p>Sign up with your email. We&apos;ll send a magic link — no password to remember while your hands are muddy.</p>

        <form className="final-form" action="/app" method="get">
          <input type="email" name="email" placeholder="you@homestead.com" aria-label="Email" />
          <button type="submit" className="btn btn-primary">Send link →</button>
        </form>
      </div>
    </section>
  );
}
