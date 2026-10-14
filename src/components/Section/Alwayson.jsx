

import SectionInfo from "@/components/SectionInfo/SectionInfo";
import FeatureRow from "@/components/Card/FeatureRow";
export default function AlwaysOn({ badge, headingLines, description, rows = [] }) {
  return (
    <section id="always-on" className="section white">
      <div className="container">
        <SectionInfo
          badge={badge}
          heading={
            <>
              {headingLines[0]}
              <br className="hidden md:block" /> {headingLines[1]}
            </>
          }
          description={description}
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
