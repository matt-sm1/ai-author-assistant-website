import { FaBolt, FaCommentDots, FaPalette, FaBullseye, FaShapes } from "react-icons/fa";
import SectionInfo from "../SectionInfo/SectionInfo";
import AdvantageCard from "../Card/AdvantageCard"
import CtaCard from "../Card/CtaCard"
const defaultItems = [
  {
    Icon: FaBolt,
    title: "Add Books in Minutes",
    description: "Import book details using a URL so you can get your AI assistant ready without complicated setup.",
  },
  {
    Icon: FaCommentDots,
    title: "Smarter Reader Conversations",
    description:
      "Give relevant answers about your books while using custom Q&A settings to keep conversations aligned.",
  },
  {
    Icon: FaPalette,
    title: "Match Your Author Brand",
    description:
      "Customize the chatbot's appearance and welcome experience so it feels like a natural part of your website.",
  },
  {
    Icon: FaBullseye,
    title: "See What Readers Care About",
    description:
      "Track chatbot activity, reader conversations, and performance to better understand how people interact.",
  },
  {
    Icon: FaShapes,
    title: "Connect Across Channels",
    description:
      "Bring AuthorBot to your website and supported communication platforms so readers can engage.",
  },
];

const defaultCta = {
  title: "Need Help Getting Started?",
  description:
    "Our support team is ready to help with setup, configuration, and questions whenever you need assistance.",
  buttonLabel: "Contact Us",
  href: "#contact",
};




export default function Advantages({ items = defaultItems, cta = defaultCta }) {
  return (
    <section id="advantages" className="section">
      <div className="container">
        <SectionInfo
          badge="AuthorBot Advantages"
          heading={
            <>
              Small Details.
              <br />
              Smarter Reader Experiences.
            </>
          }
          description="We offer a wide range of benefits designed to help you solve clients issue faster & make more profit."
        />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <AdvantageCard key={item.title} {...item} />
          ))}
          {cta && <CtaCard {...cta} />}
        </div>
      </div>
    </section>
  );
}
