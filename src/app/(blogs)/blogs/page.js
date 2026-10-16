import BlogListing from "@/frontend/feature/blog/components/BlogListing";
import { createPostService } from "@/backend/factories/post.factory";
import { toPublicPostList } from "@/backend/lib/to-public-post";
import { assertSafePagination } from "@/backend/lib/pagination";

export const metadata = {
  title: "Blogs | AuthorBot",
  description:
    "Latest insights for modern authors on AI, reader engagement, and book marketing.",
};

export const revalidate = 120;

export default async function BlogHomePage({ searchParams }) {
  const sp = await searchParams;
  const { page, limit } = assertSafePagination(
    Number(sp?.page ?? 1),
    Number(sp?.limit ?? 24),
    { maxLimit: 48 }
  );

  let posts = [];
  let pagination = { page, limit, total: 0, totalPages: 0 };

  try {
    const result = await createPostService().listPublishedPosts({
      page,
      limit,
    });
    posts = result.posts.map(toPublicPostList);
    pagination = result.pagination;
  } catch {
    // DB unavailable — empty listing
  }

  return <BlogListing posts={posts} pagination={pagination} />;
}
