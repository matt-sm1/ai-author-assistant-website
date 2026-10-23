import IntegrationsHero from "@/components/Section/IntegrationsPage/IntegrationsHero";
import TrustedBy from "@/components/Section/TrustedBy";
import { dynamicSection } from "@/lib/dynamicSection";

const IntegrationsHub = dynamicSection(
  () => import("@/components/Section/IntegrationsPage/IntegrationsHub")
);
const IntegrationsPlatforms = dynamicSection(
  () => import("@/components/Section/IntegrationsPage/IntegrationsPlatforms")
);
const IntegrationsFaq = dynamicSection(
  () => import("@/components/Section/IntegrationsPage/IntegrationsFaq")
);
const IntegrationsCta = dynamicSection(
  () => import("@/components/Section/IntegrationsPage/IntegrationsCta")
);

export const metadata = {
  title: "Integrations",
  description:
    "Connect AuthorBot to Messenger, Instagram, WhatsApp, Telegram, Discord, Slack, Gmail, and your website — meet readers on every channel.",
};

export default function IntegrationsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <IntegrationsHero />
      <TrustedBy />
      <IntegrationsHub />
      <IntegrationsPlatforms />
      <IntegrationsFaq />
      <IntegrationsCta />
    </main>
  );
}
