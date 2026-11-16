import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import SupportHero from "@/components/Section/SupportPage/SupportHero";
import SupportAccordion from "@/components/Section/SupportPage/SupportAccordion";
import SupportCards from "@/components/Section/SupportPage/SupportCards";
import SupportShowcase from "@/components/Section/SupportPage/SupportShowcase";
import SupportVideo from "@/components/Section/SupportPage/SupportVideo";
import SupportCta from "@/components/Section/SupportPage/SupportCta";
import FeaturesArticles from "@/components/Section/FeaturesPage/FeaturesArticles";

export const metadata = {
  title: "Dedicated Support Feature",
  description:
    "Get dedicated AI support for your author website, with setup guidance, technical help, and account support when you need it.",
};

export default function DedicatedSupportFeaturePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <SupportHero />
      <FeaturesTrust />
      <SupportShowcase />
      <SupportVideo />
      <SupportCards />
      <SupportAccordion />
      <FeaturesArticles />
      <SupportCta />
    </main>
  );
}
