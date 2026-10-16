import Link from "next/link";
import ArticleCard from "@/frontend/feature/blog/components/ArticleCard";
import BlogSectionInfo from "@/frontend/feature/blog/components/BlogSectionInfo";
import { fmtArticleDate } from "@/frontend/lib/format";

export default function BlogListing({
  posts = [],
  pagination = { page: 1, totalPages: 1 },
}) {
  const page = Number(pagination.page) || 1;
  const totalPages = Number(pagination.totalPages) || 1;

  return (
    <section id="articles" className="section">
      <div className="container">
        <BlogSectionInfo
          badge="Articles"
          heading="Latest Insights for Modern Authors"
          headingClassName="max-w-[900px]"
          description="Explore practical ideas on AI, reader engagement, book marketing, and smarter ways to turn more visitors into loyal readers."
        />

        {posts.length === 0 ? (
          <p className="mt-10 text-center font-sans text-[16px] text-copy sm:mt-12">
            No published articles yet. Check back soon.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard
                key={post.id || post.slug}
                title={post.title}
                date={fmtArticleDate(post.published_at)}
                image={post.featured_image}
                imageAlt={post.title}
                href={post.slug ? `/blogs/${post.slug}` : undefined}
              />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            className="mt-12 flex items-center justify-center gap-4"
            aria-label="Blog pagination"
          >
            {page > 1 ? (
              <Link
                href={page === 2 ? "/blogs" : `/blogs?page=${page - 1}`}
                className="text-sm font-medium text-[var(--theme-heading)] hover:text-[var(--theme-accent)]"
              >
                Previous
              </Link>
            ) : (
              <span className="text-sm text-[var(--theme-copy)]/40">
                Previous
              </span>
            )}
            <span className="text-sm text-[var(--theme-copy)]">
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={`/blogs?page=${page + 1}`}
                className="text-sm font-medium text-[var(--theme-heading)] hover:text-[var(--theme-accent)]"
              >
                Next
              </Link>
            ) : (
              <span className="text-sm text-[var(--theme-copy)]/40">Next</span>
            )}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
