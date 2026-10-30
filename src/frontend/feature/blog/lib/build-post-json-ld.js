import { extractFaqFromHtml } from "./extract-faq-from-html";
import { mergeFaqItems } from "./merge-faq-items";
import { parseManualJsonLd } from "./parse-manual-json-ld";

function isoDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function buildBlogPosting(post, { postUrl, marketingSiteUrl, publisherLogoUrl }) {
  const headline = String(post.seo_title || post.title || "").trim();
  if (!headline) return null;

  const description = String(
    post.meta_description || post.excerpt || "",
  ).trim();

  const datePublished = isoDate(post.published_at);
  const dateModified = isoDate(post.updated_at) || datePublished;

  const node = {
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline,
    description,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "AuthorBot",
      url: marketingSiteUrl,
      logo: {
        "@type": "ImageObject",
        url: publisherLogoUrl,
      },
    },
  };

  if (post.featured_image) {
    node.image = post.featured_image;
  }
  if (datePublished) node.datePublished = datePublished;
  if (dateModified) node.dateModified = dateModified;

  const authorName = post.author?.name?.trim();
  if (authorName) {
    const author = { "@type": "Person", name: authorName };
    if (post.author?.avatarUrl) {
      author.image = post.author.avatarUrl;
    }
    node.author = author;
  }

  if (post.category_name) {
    node.articleSection = post.category_name;
  }

  const keywords = (Array.isArray(post.tags) ? post.tags : [])
    .map((tag) => tag?.name)
    .filter(Boolean);
  if (keywords.length) {
    node.keywords = keywords;
  }

  return node;
}

function buildBreadcrumbList(post, { postUrl, marketingSiteUrl, siteUrl }, headline) {
  const crumbTitle = String(post.title || "").trim() || headline;
  return {
    "@type": "BreadcrumbList",
    "@id": `${postUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: marketingSiteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: crumbTitle,
        item: postUrl,
      },
    ],
  };
}

function buildFaqPage(postUrl, faqItems) {
  if (!faqItems.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${postUrl}#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Build schema.org @graph for a public post.
 * @param {object} post - toPublicPost shape
 * @param {{ postUrl: string, marketingSiteUrl: string, siteUrl: string, publisherLogoUrl: string }} ctx
 */
export function buildPostJsonLd(post, ctx) {
  if (!post || !ctx?.postUrl) return null;

  const blogPosting = buildBlogPosting(post, ctx);
  if (!blogPosting) return null;

  const graph = [
    blogPosting,
    buildBreadcrumbList(post, ctx, blogPosting.headline),
  ];

  const mergedFaq = mergeFaqItems(
    post.faq_items,
    extractFaqFromHtml(post.content),
  );
  const faqPage = buildFaqPage(ctx.postUrl, mergedFaq);
  if (faqPage) graph.push(faqPage);

  graph.push(...parseManualJsonLd(post.schema_json_ld));

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function stringifyJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
