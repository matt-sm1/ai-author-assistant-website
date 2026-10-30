import { stringifyJsonLd } from "@/frontend/feature/blog/lib/build-post-json-ld";

export default function JsonLdScript({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}
