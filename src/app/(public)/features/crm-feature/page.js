import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import CrmHero from "@/components/Section/CrmPage/CrmHero";
import CrmShowcase from "@/components/Section/CrmPage/CrmShowcase";
import CrmVideo from "@/components/Section/CrmPage/CrmVideo";
import CrmCards from "@/components/Section/CrmPage/CrmCards";
import CrmAccordion from "@/components/Section/CrmPage/CrmAccordion";
import CrmCta from "@/components/Section/CrmPage/CrmCta";
import FeaturesArticles from "@/components/Section/FeaturesPage/FeaturesArticles";

export const metadata = {
  title: "CRM Feature",
  description:
    "Turn your books into a 24/7 AI sales assistant that answers reader questions and guides them toward their next purchase.",
};

export default function CrmFeaturePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <CrmHero />
      <FeaturesTrust />
      <CrmShowcase />
      <CrmVideo />
      <CrmCards />
      <CrmAccordion />
      <FeaturesArticles />
      <CrmCta />
    </main>
  );
}
