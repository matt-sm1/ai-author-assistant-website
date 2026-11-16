import { uploadBookImages } from "@/content/media";

const sharedDescription =
  "Understand campaign impact and uncover improvement opportunities through powerful analytics.";

export const uploadBookShowcaseContent = {
  cards: [
    {
      id: "manual-upload",
      title: "Manual Book Upload",
      description: sharedDescription,
      image: uploadBookImages.showcaseManualUpload,
      imageAlt: "AuthorBot chat showing the manual book upload form",
    },
    {
      id: "import-by-url",
      title: "Import By URL",
      description: sharedDescription,
      image: uploadBookImages.showcaseImportUrl,
      imageAlt: "AuthorBot chat showing a book imported by URL",
    },
    {
      id: "distribution-insights",
      title: "Distribution Insights",
      description: sharedDescription,
      image: uploadBookImages.showcaseDistribution,
      imageAlt: "AuthorBot chat showing book distribution insights",
    },
  ],
};
