import "../../styles/landing.css";
import { LandingFeatures } from "./LandingFeatures";
import { LandingFinalCTA } from "./LandingFinalCTA";
import { LandingFooter } from "./LandingFooter";
import { LandingHero } from "./LandingHero";
import { LandingPricing } from "./LandingPricing";

export function LandingPage() {
  return (
    <div className="page">
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingFinalCTA />
      <LandingFooter />
    </div>
  );
}
