import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import AiChatBotHero from "@/components/Section/AiChatBotPage/AiChatBotHero";
import AiChatBotShowcase from "@/components/Section/AiChatBotPage/AiChatBotShowcase";
import AiChatBotVideo from "@/components/Section/AiChatBotPage/AiChatBotVideo";
import AiChatBotCards from "@/components/Section/AiChatBotPage/AiChatBotCards";
import AiChatBotAccordion from "@/components/Section/AiChatBotPage/AiChatBotAccordion";
import AiChatBotCta from "@/components/Section/AiChatBotPage/AiChatBotCta";
import FeaturesArticles from "@/components/Section/FeaturesPage/FeaturesArticles";

export const metadata = {
  title: "AI Chat Bot Feature",
  description:
    "Turn your books into a 24/7 AI sales assistant that answers reader questions and recommends the right titles.",
};

export default function AiChatBotFeaturePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <AiChatBotHero />
      <FeaturesTrust />
      <AiChatBotShowcase />
      <AiChatBotVideo />
      <AiChatBotCards />
      <AiChatBotAccordion />
      <FeaturesArticles />
      <AiChatBotCta />
    </main>
  );
}
