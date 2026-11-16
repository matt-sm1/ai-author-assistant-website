import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import AnalyticsHero from "@/components/Section/AnalyticsPage/AnalyticsHero";
import AnalyticsShowcase from "@/components/Section/AnalyticsPage/AnalyticsShowcase";
import AnalyticsVideo from "@/components/Section/AnalyticsPage/AnalyticsVideo";
import AnalyticsCards from "@/components/Section/AnalyticsPage/AnalyticsCards";
import AnalyticsAccordion from "@/components/Section/AnalyticsPage/AnalyticsAccordion";
import AnalyticsCta from "@/components/Section/AnalyticsPage/AnalyticsCta";
import FeaturesArticles from "@/components/Section/FeaturesPage/FeaturesArticles";

export const metadata = {
  title: "Analytics Feature",
  description:
    "Track performance, engagement, and reader insights for your author website with AuthorBot analytics.",
};

export default function AnalyticsFeaturePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <AnalyticsHero />
      <FeaturesTrust />
      <AnalyticsShowcase />
      <AnalyticsVideo />
      <AnalyticsCards />
      <AnalyticsAccordion />
      <FeaturesArticles />
      <AnalyticsCta />
    </main>
  );
}
