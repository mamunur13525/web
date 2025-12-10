import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import AIChat from "@/components/ai/ai-chat";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mamundev-steel.vercel.app"),
  title: {
    default: "Mamun Dev | Full Stack Developer",
    template: "%s | Mamun Dev",
  },
  description:
    "Full Stack Developer specializing in building exceptional digital experiences. Expertise in Next.js, React, Node.js, and modern web technologies.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Full Stack Developer",
    "Portfolio",
    "Mamun Dev",
  ],
  authors: [
    {
      name: "Mamun",
      url: "https://mamundev-steel.vercel.app",
    },
  ],
  creator: "Mamun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mamundev-steel.vercel.app",
    title: "Mamun Dev | Full Stack Developer",
    description:
      "Full Stack Developer specializing in building exceptional digital experiences. Expertise in Next.js, React, Node.js, and modern web technologies.",
    siteName: "Mamun Dev",
    images: [
      {
        url: "https://mamundev-steel.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mamun Dev Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mamun Dev | Full Stack Developer",
    description:
      "Full Stack Developer specializing in building exceptional digital experiences. Expertise in Next.js, React, Node.js, and modern web technologies.",
    images: ["https://mamundev-steel.vercel.app/og-image.png"],
    creator: "@Mamun13525",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <section
            id="main-scroll-container"
            className="bg-[#f8f8f8] dark:bg-background overflow-y-auto h-screen w-screen "
          >
            <ScrollToTop />
            <section className="flex flex-col w-full min-h-full justify-between max-w-4xl  mx-auto pt-32 px-7 xl:px-0">
              <Navbar />
              {children}
              <Footer />
            </section>
            <AIChat />
          </section>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
