import localFont from "next/font/local";

/**
 * Self-hosted via next/font/local so Vercel builds don't fetch Google Fonts.
 * next/font/google intermittently fails on Turbopack when Google returns
 * extensionless /l/font?kit=…&skey=… URLs (vercel/next.js#99114).
 */
export const inter = localFont({
  src: [
    {
      path: "../fonts/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/inter-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
});

export const hostGrotesk = localFont({
  src: [
    {
      path: "../fonts/host-grotesk-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/host-grotesk-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-host-grotesk",
});
