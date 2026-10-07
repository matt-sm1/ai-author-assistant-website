import SectionInfo from "../SectionInfo/SectionInfo";
import article1 from "../../assests/article_1.webp"
import article2 from "../../assests/article_2.webp"
import article3 from "../../assests/article_3.webp"
import ArticleCard from "../Card/ArticleCard"
const defaultArticles = [
  {
    title: "How AI Can Help Authors Engage Readers 24/7",
    date: "September 28, 2026",
    image: article1,
    imageAlt: "",
  },
  {
    title: "5 Ways to Turn Your Author Website Into a Book Sales Engine",
    date: "September 28, 2026",
    image: article2,
    imageAlt: "",
  },
  {
    title: "Why Reader Insights Matter More Than Ever for Authors",
    date: "September 28, 2026",
    image: article3,
    imageAlt: "",
  },
];


export default function Articles({ articles = defaultArticles }) {
  return (
    <section id="articles" className="section">
      <div className="container">
        <SectionInfo
          badge="Articles"
          heading={<>Latest Insights for Modern Authors</>}
          headingClassName="max-w-[900px]"
          description="Explore practical ideas on AI, reader engagement, book marketing, and smarter ways to turn more visitors into loyal readers."
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
