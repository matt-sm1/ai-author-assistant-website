import SectionInfo from "@/components/SectionInfo/SectionInfo";
import ArticleCard from "@/components/Card/ArticleCard";
import FeaturesPanel from "@/components/Section/FeaturesPage/FeaturesPanel";
import { featuresArticlesContent } from "@/content/features/articles";
import { createPostService } from "@/backend/factories/post.factory";
import { toPublicPostList } from "@/backend/lib/to-public-post";
import { fmtArticleDate } from "@/frontend/lib/format";
import { toNestedHostingerMediaUrl } from "@/frontend/lib/hostinger-media-url";

export const revalidate = 120;

export default async function FeaturesArticles() {
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
    <section id="articles" className="section !border-b-0">
      <div className="container !border-x-0 !py-3 sm:!py-4">
        <FeaturesPanel>
          <SectionInfo
            badge={featuresArticlesContent.badge}
            heading={featuresArticlesContent.heading}
            headingClassName={featuresArticlesContent.headingClassName}
            description={featuresArticlesContent.description}
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
        </FeaturesPanel>
      </div>
    </section>
  );
}
