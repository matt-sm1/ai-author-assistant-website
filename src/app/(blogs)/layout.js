import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function BlogsLayout({ children }) {
  return (
    <>
      <Header />
      {/* Header uses -mb-20 for marketing hero overlap; offset so blog body clears it. */}
      <main id="main-content" className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
