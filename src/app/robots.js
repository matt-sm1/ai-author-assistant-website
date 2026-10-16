/**
 * Domain-level robots.txt (www.authoraiassistant.com/robots.txt).
 * Must allow /blogs so the CMS rewrite can be crawled; marketing pages
 * still use meta noindex until you choose to index the marketing site.
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.authoraiassistant.com/blogs/sitemap.xml",
  };
}
