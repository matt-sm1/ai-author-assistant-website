import Blogs from "@/components/Section/Blogs";

export const metadata = {
  title: "Blogs | AuthorBot",
  description:
    "Insights on AI, reader engagement, and book marketing for modern authors.",
};

export default function BlogsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Blogs />
    </main>
  );
}
