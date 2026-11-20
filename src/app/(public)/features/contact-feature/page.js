import FeaturesTrust from "@/components/Section/FeaturesPage/FeaturesTrust";
import ContactHero from "@/components/Section/ContactPage/ContactHero";
import ContactCards from "@/components/Section/ContactPage/ContactCards";
import ContactForm from "@/components/Section/ContactPage/ContactForm";
import ContactFaq from "@/components/Section/ContactPage/ContactFaq";
import ContactCta from "@/components/Section/ContactPage/ContactCta";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the AuthorBot team with any general query about setting up AuthorBot, connecting your books, or engaging readers with AI.",
};

export default function ContactFeaturePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ContactHero />
      <FeaturesTrust />
      <ContactCards />
      <ContactForm />
      <ContactFaq />
      <ContactCta />
    </main>
  );
}
