import { Inter, Host_Grotesk } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-host-grotesk",
});
