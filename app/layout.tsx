import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mamun Dev.",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <section className="bg-[#f8f8f8] overflow-y-auto h-screen w-screen">
          <section className="w-full max-w-4xl mx-auto py-32 px-7 xl:px-0 ">
            <Navbar />

            {children}
          </section>
        </section>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
