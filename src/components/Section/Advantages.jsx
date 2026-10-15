import { FaBolt, FaCommentDots, FaPalette, FaBullseye, FaShapes } from "react-icons/fa";
import SectionInfo from "@/components/SectionInfo/SectionInfo";
import AdvantageCard from "@/components/Card/AdvantageCard";
import CtaCard from "@/components/Card/CtaCard";
import { advantagesContent } from "@/content/home/advantages";

const iconMap = {
  bolt: FaBolt,
  conversations: FaCommentDots,
  brand: FaPalette,
  insights: FaBullseye,
  channels: FaShapes,
};

export default function Advantages({
  badge = advantagesContent.badge,
  headingLines = advantagesContent.headingLines,
  description = advantagesContent.description,
  items = advantagesContent.items,
  cta = advantagesContent.cta,
} = {}) {
  return (
    <section id="advantages" className="section">
      <div className="container">
        <SectionInfo
          badge={badge}
          heading={
            <>
              {headingLines[0]}
              <br />
              {headingLines[1]}
            </>
          }
          description={description}
        />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon, ...item }) => (
            <AdvantageCard key={item.title} Icon={iconMap[icon]} {...item} />
          ))}
          {cta && <CtaCard {...cta} />}
        </div>
      </div>
    </section>
  );
}
