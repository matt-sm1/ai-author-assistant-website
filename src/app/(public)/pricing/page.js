import ContactHero from "@/components/Section/ContactPage/ContactHero";
import ContactCta from "@/components/Section/ContactPage/ContactCta";
import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import Faq from "@/components/Section/Faq";
import Pricing from "@/components/Section/Pricing";
import PricingComparison from "@/components/Section/PricingComparison";
import { contactHeroContent } from "@/content/contact/hero";
import { contactCtaContent } from "@/content/contact/cta";

export const metadata = {
  title: "Pricing",
  description: "Compare AuthorBot plans and find the right fit for your readers.",
};

const hero = {
  ...contactHeroContent,
  badge: "✨ Pricing",
  headingLine1: "Find the right plan",
  headingLine2: "for your readership",
  description: "Choose the AuthorBot plan that helps you connect with readers and grow your audience.",
  buttonLabel: "Compare Plans",
  buttonHref: "#pricing",
};

export default function PricingPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ContactHero content={hero} />
      <FeaturesTrust />
      <Pricing />
      <PricingComparison />
      <Faq />
      <ContactCta content={{ ...contactCtaContent, buttonHref: "/contact#contact-form" }} />
    </main>
  );
}
