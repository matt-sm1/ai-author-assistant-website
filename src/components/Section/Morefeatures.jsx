// components/MoreFeatures.jsx
// Next.js (JavaScript) + Tailwind CSS
// FeatureSplit component (pichla wala) is section mein 3 baar use hota hai,
// aur har dusra card `reverse` hota hai (image left, text right).

import FeatureSplit from "../Card/Featuresplit";
import SectionInfo from "../SectionInfo/SectionInfo";
import feature1 from "../../assests/m_feature_1.webp"
import feature2 from "../../assests/m_feature_2.webp"
import feature3 from "../../assests/m_feature_3.webp"
// Images baad mein lagane ke liye import karke `image` mein de dein, e.g.
// import more1 from "../../assests/more_1.webp";
// ... phir image: more1
const defaultFeatures = [
{
  id: "book-expert",
  title: (
    <>
      AI Book Expert That 
      <br className="hidden md:block" />
      Knows Your Catalog
    </>
  ),
  description:
    "AuthorBot uses your uploaded book information and custom knowledge to give readers relevant, book-focused answers whenever they have questions.",
  points: [
    "Answer questions about individual books",
    "Handle multiple titles from one author catalog",
    "Add custom Q&A for important information",
  ],
  image: feature1,
  imageAlt: "AuthorBot answering questions about a book catalog",
},
  {
    id: "recommendations",
    title: (
  <>
    Smart Recommendations  <br className="hidden md:block" />
    That Turn Interest Into Action
  </>
),
    description:
      "Help readers move from curiosity to the right book with personalized recommendations and natural paths toward previews and purchase links.",
    points: [
      "Recommend books based on reader interests",
      "Guide readers across your entire collection",
      "Keep engaging readers 24/7, even when you're offline",
    ],
    image: feature2,
    imageAlt: "AuthorBot recommending a book",
  },
  {
    id: "brand-experience",
    title: "Your AI. Your Voice. Your Reader Experience.",
    description:
      "Shape how AuthorBot looks, communicates, and represents your brand while keeping visibility into how readers are interacting with it.",
    points: [
      "Customize the bot's tone and personality",
      "Monitor readers, chats, clicks, and engagement",
      "Use analytics to understand what readers care about",
    ],
    image: feature3,
    imageAlt: "AuthorBot customization panel",
  },
];

export default function MoreFeatures({ features = defaultFeatures }) {
  return (
    <section id="more-features" className="section">
      <div className="container">
        <SectionInfo
          badge="More Features"
          heading={
            <>
              Explore the Power of AuthorBot to Engage
               Readers and Sell More Books
            </>
          }
          description="Give readers smarter answers, personalized book recommendations, and a seamless way to discover your entire catalog."
        />

        <div className="mt-10 flex flex-col gap-8 sm:mt-12 md:gap-16">
          {features.map((feature, i) => (
            <FeatureSplit key={feature.id ?? i} {...feature} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
