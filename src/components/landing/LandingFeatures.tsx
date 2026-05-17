import { Icon } from "../app/Icons";

const FEATURES = [
  {
    fg: "fg-forest",
    icon: "sprout",
    title: "Six biological templates, day one",
    body: "Mason-jar sprouting, wheat fodder, egg incubation, seedling fertigation, rabbit breeding, sweet potato slips. Every stage transition, counter, and observation window is encoded — you just pick and start.",
  },
  {
    fg: "fg-vine",
    icon: "calendar",
    title: "Native phone reminders, no app to install",
    body: "Subscribe once to the calendar feed. Sub-daily tasks fire at your chosen morning, midday, and evening windows. Scheduled tasks land as silent all-day events. Observation windows show as multi-day ranges.",
  },
  {
    fg: "fg-bloom",
    icon: "eye",
    title: "Observations re-anchor the schedule",
    body: "Record germination, palpation, or kindling and downstream events shift to match. Events anchored to batch-start stay put. Drift handling matches the biology of each event — not a generic offset.",
  },
] as const;

const WORDMARKS = ["Heron Hollow", "Field & Coop", "Maple Run", "Big Lick", "Northstar Farm", "Stillwood"];

export function LandingFeatures() {
  return (
    <section className="features surface-cream" id="features">
      <div className="container">
        <div className="head">
          <div className="eyebrow"><span className="dot" />How it works</div>
          <h2 className="h-section">
            Designed to <span className="pixel">meet</span> the biology, not bend it.
          </h2>
        </div>

        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className={"feature-card " + feature.fg}>
              <span className="swatch"><Icon name={feature.icon} size={26} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          ))}
        </div>

        <div className="logos">
          {WORDMARKS.map((wordmark) => <span key={wordmark} className="word">{wordmark}</span>)}
        </div>
      </div>
    </section>
  );
}
