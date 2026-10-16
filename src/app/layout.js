import { inter, hostGrotesk } from "@/lib/fonts";
import "./globals.css";

export const metadata = {
  title: {
    default: "AuthorBot | AI Sales Assistant for Authors",
    template: "%s | AuthorBot",
  },
  description:
    "Help readers discover your books with AuthorBot, your 24/7 AI sales assistant.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
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
        {children}
      </body>
    </html>
  );
}
