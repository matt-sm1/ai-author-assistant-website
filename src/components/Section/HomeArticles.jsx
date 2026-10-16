import SectionInfo from "@/components/SectionInfo/SectionInfo";
import ArticleCard from "@/components/Card/ArticleCard";
import { articlesContent } from "@/content/home/articles";
import { createPostService } from "@/backend/factories/post.factory";
import { toPublicPostList } from "@/backend/lib/to-public-post";
import { fmtArticleDate } from "@/frontend/lib/format";
import { toNestedHostingerMediaUrl } from "@/frontend/lib/hostinger-media-url";

export const revalidate = 120;

export default async function HomeArticles() {
  let articles = [];

  try {
    const { posts } = await createPostService().listPublishedPosts({
      page: 1,
      limit: 3,
    });
    articles = posts.map(toPublicPostList).map((post) => ({
      title: post.title,
      date: fmtArticleDate(post.published_at),
      image:
        toNestedHostingerMediaUrl(post.featured_image ?? "") ||
        post.featured_image ||
        undefined,
      imageAlt: post.title,
      href: post.slug ? `/blogs/${post.slug}` : undefined,
    }));
  } catch {
    articles = [];
  }

  return (
    <section id="articles" className="section">
      <div className="container">
        <SectionInfo
          badge={articlesContent.badge}
          heading={articlesContent.heading}
          headingClassName={articlesContent.headingClassName}
          description={articlesContent.description}
        />

        {articles.length === 0 ? (
          <p className="mt-10 text-center font-sans text-[16px] text-copy sm:mt-12">
            No published articles yet.{" "}
            <a href="/blogs" className="text-[var(--theme-accent)] underline">
              Visit the blog
            </a>
            .
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.href || article.title} {...article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
