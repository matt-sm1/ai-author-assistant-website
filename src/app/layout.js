import { inter, hostGrotesk } from "@/lib/fonts";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import "./globals.css";

export const metadata = {
  title: "AuthorBot | AI Sales Assistant for Authors",
  description: "Help readers discover your books with AuthorBot, your 24/7 AI sales assistant.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${hostGrotesk.variable}`}>
      <body className="font-sans text-copy antialiased">
        <ScrollReveal />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
