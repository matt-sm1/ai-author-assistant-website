import Advantages from "@/components/Section/Advantages";
import FeaturesSection from "@/components/Section/FeaturesSection";
import MoreFeatures from "@/components/Section/MoreFeatures";
import SocialMedia from "@/components/Section/SocialMedia";
import Testimonials from "@/components/Section/Testimonials";
import Faq from "@/components/Section/Faq";
import Articles from "@/components/Section/Articles";
import HeroSection from "@/components/Section/HeroSection";
import Cta from "@/components/Section/Cta";
import AlwaysOn from "@/components/Section/AlwaysOn";

import {
  articlesContent,
  advantagesContent,
  alwaysOnContent,
  ctaContent,
  faqContent,
  featuresContent,
  heroContent,
  moreFeaturesContent,
  socialMediaContent,
  testimonialsContent,
} from "@/content/home";

export default function HomePage() {
  return (
    <main className="min-h-screen ">
      <HeroSection heroContent={heroContent} />
       <FeaturesSection {...featuresContent} />
      <SocialMedia {...socialMediaContent} />
      <Advantages {...advantagesContent} />
      <AlwaysOn {...alwaysOnContent} />
      <MoreFeatures {...moreFeaturesContent} />
      <Testimonials {...testimonialsContent} />
      <Faq {...faqContent} />
      <Articles {...articlesContent} />
      <Cta {...ctaContent} />
    </main>
  );
}
