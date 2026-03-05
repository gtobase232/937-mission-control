import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "937 — Mission Control",
  description: "We craft brands that move culture forward. Design, strategy, content — built to dominate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Sidebar />
        <main className="min-h-screen pl-0 md:pl-56 lg:pl-64">
          <div className="mx-auto max-w-7xl px-4 py-6 pt-16 md:px-8 md:pt-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
