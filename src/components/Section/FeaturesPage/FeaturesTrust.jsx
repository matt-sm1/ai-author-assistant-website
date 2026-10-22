import TrustedBy from "@/components/Section/TrustedBy";
import { featuresTrustContent } from "@/content/features/trust";

export default function FeaturesTrust({
  content = featuresTrustContent,
} = {}) {
  return <TrustedBy heading={content.heading} headingAs="h2" />;
}
