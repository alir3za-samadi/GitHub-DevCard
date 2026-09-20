import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AppProviders from "@/app/app-providers";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevCard | GitHub Profile Viewer",
  description: "DevCard | GitHub Profile Viewer Made by Alir3za Samadi",
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${geistSans.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.className} min-h-full flex flex-col`}
        suppressHydrationWarning
      >
        <AppProviders>
          <Navbar />
          <main className="flex flex-1 w-full flex-col items-center justify-between py-2 sm:items-start mx-auto md:px-24 md:py-8">
            {children}
          </main>
          <Footer />
        </AppProviders>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { supportsMono: true };`,
          }}
        />
      </body>
    </html>
  );
}
