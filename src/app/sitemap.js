import { createPostService } from "@/backend/factories/post.factory";
import { getPublicSiteUrl } from "@/frontend/feature/blog/lib/site-urls";

const MARKETING_PATHS = ["/"];

export default async function sitemap() {
  const site = "https://www.authoraiassistant.com";
  const blogBase = getPublicSiteUrl() || `${site}/blogs`;

  const entries = [
    ...MARKETING_PATHS.map((path) => ({
      url: path === "/" ? site : `${site}${path}`,
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.7,
    })),
    {
      url: blogBase,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const service = createPostService();
    let page = 1;
    const limit = 100;

    for (;;) {
      const { posts, pagination } = await service.listPublishedPosts({
        page,
        limit,
      });

      for (const post of posts) {
        entries.push({
          url: `${blogBase}/${post.slug}`,
          lastModified: post.published_at || post.updated_at || undefined,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      if (page >= (pagination.totalPages || 1) || posts.length === 0) break;
      page += 1;
      if (page > 50) break;
    }
  } catch {
    // DB unavailable at build — marketing + listing entries remain
  }

  return entries;
}
