import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/frontend/store/providers";
import { Toaster } from "@/frontend/components/ui/Sonner";
import "@/app/admin-globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata = {
  robots: { index: false, follow: false },
};

/** Shell for all `/admin/*` — Providers here so login + CMS share RTK without loading on marketing. */
export default function AdminRootLayout({ children }) {
  return (
    <div className={`${jakarta.variable} min-h-screen font-sans`}>
      <Providers>
        {children}
        <Toaster position="top-right" />
      </Providers>
    </div>
  );
}
