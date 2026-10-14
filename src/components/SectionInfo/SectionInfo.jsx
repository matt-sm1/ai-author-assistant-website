import { Heading, Paragraph } from "@/components/ui";
import Badge from "@/components/ui/Badge/Badge";


export default function SectionInfo({
  badge,
  heading,
  description,
  headingClassName = "",
  descriptionClassName = "",
  className = "",
  align = "center",
}) {
  const alignment = align === "start"
    ? {
        container: "items-start text-left",
        heading: "!mx-0 w-full !text-left",
        description: "!mx-0 !text-left",
      }
    : {
        container: "items-center text-center",
        heading: "",
        description: "",
      };

  return (
    <div className={`flex flex-col gap-5 ${alignment.container} ${className}`}>
      <Badge data-reveal-step="badge">{badge}</Badge>

      <Heading
        as="h2"
        data-reveal-step="heading"
        className={`${alignment.heading} ${headingClassName}`}
      >
        {heading}
      </Heading>

      <Paragraph
        data-reveal-step="paragraph"
        className={`${alignment.description} ${descriptionClassName}`}
      >
        {description}
      </Paragraph>
    </div>
  );
}
