import { uploadBookImages } from "@/content/media";

export const uploadBookAccordionContent = {
  heading: "Turn Every Book Into An AI-Powered Sales Assistant",
  description:
    "Add your titles, set where they sell, and let AuthorBot guide every reader toward the right book.",
  image: uploadBookImages.accordionIllustration,
  imageAlt: "AuthorBot robot beside a chat widget on an author website",
  defaultOpenId: "add-books",
  items: [
    {
      id: "add-books",
      title: "Add Your Books Your Way",
      image: uploadBookImages.itemAddBooks,
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Add each book manually or import it from a link in just a few steps.",
    },
    {
      id: "book-availability",
      title: "Discover Where Your Books Are Available",
      image: uploadBookImages.itemAvailability,
      description:
        "Choose the widget's position on your website and set auto-open delay to engage visitors at the moment.",
    },
    {
      id: "guide-readers",
      title: "Let AI Guide Readers Toward The Right Book",
      image: uploadBookImages.itemGuideReaders,
      // Placeholder: the mockup collapses this item, so its copy is provisional.
      description: "Recommend the right title to each reader based on what they are looking for.",
    },
  ],
};
