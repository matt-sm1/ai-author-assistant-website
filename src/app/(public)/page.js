import HeroSection from "@/components/Section/HeroSection";
import FeaturesSection from "@/components/Section/FeaturesSection";
import { dynamicSection } from "@/lib/dynamicSection";

const SocialMedia = dynamicSection(() => import("@/components/Section/SocialMedia"));
const Advantages = dynamicSection(() => import("@/components/Section/Advantages"));
const AlwaysOn = dynamicSection(() => import("@/components/Section/AlwaysOn"));
const MoreFeatures = dynamicSection(() => import("@/components/Section/MoreFeatures"));
const Pricing = dynamicSection(() => import("@/components/Section/Pricing"));
const Testimonials = dynamicSection(() => import("@/components/Section/Testimonials"));
const Faq = dynamicSection(() => import("@/components/Section/Faq"));
import HomeArticles from "@/components/Section/HomeArticles";

const Cta = dynamicSection(() => import("@/components/Section/Cta"));

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SocialMedia />
      <Advantages />
      <AlwaysOn />
      <MoreFeatures />
      <Pricing />
      <Testimonials />
      <Faq />
      <HomeArticles />
      <Cta />
    </main>
  );
}
