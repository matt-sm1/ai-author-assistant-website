import SectionInfo from "@/components/SectionInfo/SectionInfo";
import ArticleCard from "@/components/Card/ArticleCard";
import { articlesContent } from "@/content/home/articles";

export default function Articles({
  badge = articlesContent.badge,
  heading = articlesContent.heading,
  headingClassName = articlesContent.headingClassName,
  description = articlesContent.description,
  articles = articlesContent.articles,
} = {}) {
  return (
    <section id="articles" className="section">
      <div className="container">
        <SectionInfo
          badge={badge}
          heading={heading}
          headingClassName={headingClassName}
          description={description}
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
