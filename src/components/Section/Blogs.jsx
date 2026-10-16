import SectionInfo from "@/components/SectionInfo/SectionInfo";
import ArticleCard from "@/components/Card/ArticleCard";
import { blogsContent } from "@/content/blogs/posts";

export default function Blogs({
  badge = blogsContent.badge,
  heading = blogsContent.heading,
  headingClassName = blogsContent.headingClassName,
  description = blogsContent.description,
  posts = blogsContent.posts,
} = {}) {
  return (
    <section id="blogs" className="section">
      <div className="container pt-24 sm:pt-28">
        <SectionInfo
          badge={badge}
          heading={heading}
          headingClassName={headingClassName}
          description={description}
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.title} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
