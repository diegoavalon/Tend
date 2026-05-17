import { Icon } from "../app/Icons";

const TIERS = [
  {
    name: "Homestead",
    price: "$0",
    cadence: "free forever",
    blurb: "For one operator running up to 3 active batches.",
    perks: ["3 active batches", "All 6 templates", "Calendar feed", "Daily digest email"],
    cta: "Start free",
    href: "/app",
  },
  {
    name: "Acre",
    price: "$8",
    cadence: "per month",
    featured: true,
    blurb: "For the working homestead. Unlimited batches.",
    perks: ["Unlimited active batches", "All 6 templates", "Calendar feed + digest", "Archive history", "Email support"],
    cta: "Pick Acre →",
    href: "/app",
  },
  {
    name: "Farm",
    price: "Talk",
    cadence: "",
    blurb: "Multi-operator accounts, custom templates, integrations.",
    perks: ["Shared accounts", "Custom templates on request", "Priority support", "Migration help"],
    cta: "Contact us",
    href: "#get-started",
  },
] as const;

export function LandingPricing() {
  return (
    <section className="pricing surface-green" id="pricing">
      <div className="container">
        <div className="head">
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.75)" }}><span className="dot" style={{ background: "#fff" }} />Pricing</div>
          <h2 className="h-section">
            One plan for the <span className="pixel">small</span> homestead, one for the rest.
          </h2>
        </div>

        <div className="tier-grid">
          {TIERS.map((tier) => (
            <div key={tier.name} className={"tier " + (tier.featured ? "featured" : "")}>
              <div className="name">{tier.name}</div>
              <div className="price">
                {tier.price}
                {tier.cadence && <small>{tier.cadence}</small>}
              </div>
              <div className="meta">{tier.blurb}</div>
              <ul className="feature-list">
                {tier.perks.map((perk) => (
                  <li key={perk}>
                    <span className="check"><Icon name="check" size={16} strokeWidth={2.6} /></span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <div className="price-cta">
                <a className={"btn " + (tier.featured ? "btn-primary" : "btn-ghost-dark")} href={tier.href}>
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
