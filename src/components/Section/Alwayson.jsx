

import SectionInfo from "../SectionInfo/SectionInfo";
import FeatureRow from "../Card/FeatureRow";
import always_1 from "../../assests/always_1.webp"
import always_2 from "../../assests/always_2.webp"
const defaultRows = [
  {
    id: "always-on-assistant",
    title: "Your AI Book Assistant Works 24/7",
    description:
      "Readers don't have to wait for you to be online. AuthorBot can answer questions about your books, recommend titles, and guide readers toward the right next step at any time.",
    buttonLabel: "Learn More",
    href: "#more-features",
    image: always_1,
    imageAlt: "AuthorBot assistant active 24/7",
  },
  {
    id: "reader-activity",
    title: "Stay Updated on Reader Activity",
    description:
      "Manage browser and email notifications so you can stay aware of important activity and respond when personal attention is needed.",
    buttonLabel: "Learn More",
    href: "#more-features",
    image: always_2,
    imageAlt: "Reader activity notifications",
  },
];



export default function AlwaysOn({ rows = defaultRows }) {
  return (
    <section id="always-on" className="section white">
      <div className="container">
        <SectionInfo
          badge="Always-On Experience"
          heading={
            <>
              Keep Readers Engaged 
              <br className="hidden md:block" /> Even When You&apos;re Offline
            </>
          }
          description="AuthorBot keeps conversations moving around the clock while helping you stay connected to the reader activity that matters."
        />

        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:gap-24">
          {rows.map((row, i) => (
            <FeatureRow key={row.id ?? row.title ?? i} {...row} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
