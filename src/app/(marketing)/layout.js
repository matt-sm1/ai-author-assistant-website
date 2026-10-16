import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";

export default function MarketingLayout({ children }) {
  return (
    <>
      <ScrollReveal />
      <Header />
      {children}
      <Footer />
    </>
  );
}
