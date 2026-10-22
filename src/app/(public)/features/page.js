import FeaturesHero from "@/components/Section/FeaturesPage/FeaturesHero";
import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import { dynamicSection } from "@/lib/dynamicSection";
import FeaturesArticles from "@/components/Section/FeaturesPage/FeaturesArticles";

const FeaturesAnalytics = dynamicSection(
  () => import("@/components/Section/FeaturesPage/FeaturesAnalytics")
);
const FeaturesCards = dynamicSection(
  () => import("@/components/Section/FeaturesPage/FeaturesCards")
);
const FeaturesProfiles = dynamicSection(
  () => import("@/components/Section/FeaturesPage/FeaturesProfiles")
);
const FeaturesIntegrations = dynamicSection(
  () => import("@/components/Section/FeaturesPage/FeaturesIntegrations")
);
const FeaturesDetails = dynamicSection(
  () => import("@/components/Section/FeaturesPage/FeaturesDetails")
);
const FeaturesFaq = dynamicSection(
  () => import("@/components/Section/FeaturesPage/FeaturesFaq")
);
const FeaturesCta = dynamicSection(
  () => import("@/components/Section/FeaturesPage/FeaturesCta")
);

export const metadata = {
  title: "Features",
  description:
    "Explore AuthorBot product features — reader analytics, profiles, integrations, and tools that turn books into a 24/7 AI sales assistant.",
};

export default function FeaturesPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <FeaturesHero />
      <FeaturesTrust />
      <FeaturesAnalytics />
      <FeaturesCards />
      <FeaturesProfiles />
      <FeaturesIntegrations />
      <FeaturesDetails />
      <FeaturesFaq />
      <FeaturesArticles />
      <FeaturesCta />
    </main>
  );
}
