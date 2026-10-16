import { inter, hostGrotesk } from "@/lib/fonts";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import "./globals.css";

export const metadata = {
  title: "AuthorBot | AI Sales Assistant for Authors",
  description:
    "Help readers discover your books with AuthorBot, your 24/7 AI sales assistant.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${hostGrotesk.variable}`}>
      <body className="font-sans text-copy antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--theme-heading)] focus:shadow-md focus:outline-2 focus:outline-offset-2 focus:outline-[var(--theme-copy)]"
        >
          Skip to main content
        </a>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
