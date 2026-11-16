import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import UploadBookHero from "@/components/Section/UploadBookPage/UploadBookHero";
import UploadBookShowcase from "@/components/Section/UploadBookPage/UploadBookShowcase";
import UploadBookVideo from "@/components/Section/UploadBookPage/UploadBookVideo";
import UploadBookCards from "@/components/Section/UploadBookPage/UploadBookCards";
import UploadBookAccordion from "@/components/Section/UploadBookPage/UploadBookAccordion";
import UploadBookCta from "@/components/Section/UploadBookPage/UploadBookCta";
import FeaturesArticles from "@/components/Section/FeaturesPage/FeaturesArticles";

export const metadata = {
  title: "Upload Book Feature",
  description:
    "Add your books manually or by URL and let AuthorBot recommend them to readers around the clock.",
};

export default function UploadBookFeaturePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <UploadBookHero />
      <FeaturesTrust />
      <UploadBookShowcase />
      <UploadBookVideo />
      <UploadBookCards />
      <UploadBookAccordion />
      <FeaturesArticles />
      <UploadBookCta />
    </main>
  );
}
