import { Heading, Paragraph } from "../ui";
import Badge from "../ui/Badge/Badge";

export default function SectionInfo({
  badge,
  heading,
  description,
  headingClassName = "",
  descriptionClassName = "",
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      <Badge data-reveal-step="badge">{badge}</Badge>

      <Heading data-reveal-step="heading" className={headingClassName}>
        {heading}
      </Heading>

      <Paragraph data-reveal-step="paragraph" className={descriptionClassName}>
        {description}
      </Paragraph>
    </div>
  );
}
