import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import FeaturesCta from "@/components/Section/FeaturesPage/FeaturesCta";
import WidgetHero from "@/components/Section/WidgetPage/WidgetHero";
import WidgetPersonalize from "@/components/Section/WidgetPage/WidgetPersonalize";
import WidgetFeatureCards from "@/components/Section/WidgetPage/WidgetFeatureCards";
import WidgetShowcase from "@/components/Section/WidgetPage/WidgetShowcase";
import WidgetVideo from "@/components/Section/WidgetPage/WidgetVideo";
import FeaturesArticles from "@/components/Section/FeaturesPage/FeaturesArticles";
import { widgetCtaContent } from "@/content/widget/cta";

export const metadata = {
  title: "Widget Feature",
  description:
    "Add an AI chat widget to your author website that answers reader questions, recommends books, and captures leads around the clock.",
};

export default function WidgetFeaturePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <WidgetHero />
      <FeaturesTrust />
      <WidgetShowcase />
      <WidgetVideo />
      <WidgetFeatureCards />
      <WidgetPersonalize />
      <FeaturesArticles />
      <FeaturesCta content={widgetCtaContent} badgeClassName="text-black" />
    </main>
  );
}
