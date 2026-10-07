import Image from "next/image";
import card1 from "../../assests/feature_1.webp"
import card2 from "../../assests/feature_2.webp"
import card3 from "../../assests/feature_3.webp"
import card4 from "../../assests/feature_4.webp"
import SectionInfo from "../SectionInfo/SectionInfo";

const features = [
  {
    title: "AI That Knows Your Books",
    description:
      "Upload your titles and let AuthorBot answer questions, explain your books, and recommend the right title based on each reader's interests.",
    image: card1, // e.g. "/images/card-1.webp"
  },
  {
    title: "Understand Every Reader Better",
    description:
      "Track reader conversations, activity, and book interactions so you can create more personalised experiences and recognize buying intent.",
    image: card2, // e.g. "/images/card-2.webp"
  },
  {
    title: "One AI Across Every Channel",
    description:
      "Connect AuthorBot to your website and supported communication channels so readers can get the same intelligent assistance wherever they reach you.",
    image: card3, // e.g. "/images/card-3.webp"
  },
  {
    title: "Turn Reader Activity Into Insights",
    description:
      "See how readers interact with your AI, which books get attention, what readers are asking, and which conversations lead to book-link clicks.",
    image: card4, // e.g. "/images/card-4.webp"
  },
];

function FeatureCard({ title, description, image }) {
  return (
    <article className="h-auto w-full rounded-3xl bg-white p-3 shadow-[var(--shadow-card)] ring-1 ring-black/5 md:h-[533px]">
      <div className="relative w-full overflow-hidden rounded-2xl md:h-[370px]">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={700}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 60vw"
          className="h-auto w-full md:h-full md:object-cover"
        />
      </div>

      <div className="px-2 pb-3 pt-5 md:px-5">
        <h3 className="text-lg font-bold tracking-tight text-heading md:text-xl">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-copy">
          {description}
        </p>
      </div>
    </article>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="section">
      <div className="container">

        <SectionInfo
          badge="Core Features"
          heading={
            <>
              Everything You Need to Engage Readers & Sell More Books
            </>
          }
          description="AuthorBot brings book knowledge, reader conversations, sales insights, and omnichannel engagement into one intelligent platform built for authors."
          headingClassName="max-w-[900px]"
        />

        <div className="mt-5 sm:mt-16 grid grid-cols-1 gap-5 md:grid-cols-12">
          {features.map((f, index) => (
            <div
              key={f.title}
              className={
                index === 0
                  ? "md:col-span-5"
                  : index === 1
                    ? "md:col-span-7"
                    : index === 2
                      ? "md:col-span-7"
                      : "md:col-span-5"
              }
            >
              <FeatureCard {...f} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
