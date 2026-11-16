import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import OmnichannelHero from "@/components/Section/OmnichannelPage/OmnichannelHero";
import OmnichannelShowcase from "@/components/Section/OmnichannelPage/OmnichannelShowcase";
import OmnichannelVideo from "@/components/Section/OmnichannelPage/OmnichannelVideo";
import OmnichannelCards from "@/components/Section/OmnichannelPage/OmnichannelCards";
import OmnichannelAccordion from "@/components/Section/OmnichannelPage/OmnichannelAccordion";
import OmnichannelCta from "@/components/Section/OmnichannelPage/OmnichannelCta";
import FeaturesArticles from "@/components/Section/FeaturesPage/FeaturesArticles";

export const metadata = {
  title: "Omnichannel Inbox Feature",
  description:
    "Manage every reader conversation from one inbox with AuthorBot across every channel and platform.",
};

export default function OmnichannelInboxFeaturePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <OmnichannelHero />
      <FeaturesTrust />
      <OmnichannelShowcase />
      <OmnichannelVideo />
      <OmnichannelCards />
      <OmnichannelAccordion />
      <FeaturesArticles />
      <OmnichannelCta />
    </main>
  );
}
