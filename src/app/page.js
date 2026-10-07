import Advantages from "@/components/Section/Advantages";
import FeaturesSection from "@/components/Section/FeaturesSection";
import MoreFeatures from "@/components/Section/Morefeatures";
import SocailMedia from "@/components/Section/SocailMedia";
import Testimonials from "@/components/Section/Testimonials";
import Fag from "@/components/Section/Faq";
import Articles from "@/components/Section/Articles";
import HeroSection from "@/components/Section/HeroSection";
import Cta from "@/components/Section/Cta";
import AlwaysOn from "@/components/Section/Alwayson";

export default function HomePage() {
  return (
    <main className="min-h-screen ">
      <HeroSection/>
       <FeaturesSection /> 
      <SocailMedia/> 
      <Advantages/> 
      <AlwaysOn/>
      <MoreFeatures/> 
      <Testimonials/> 
      <Fag/> 
      <Articles/> 
      <Cta/>
    </main>
  );
}
