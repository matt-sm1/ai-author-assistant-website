import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function BlogsLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
