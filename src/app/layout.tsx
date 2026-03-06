import type { Metadata } from "next";
import { Orbitron, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import AnalyticsBar from "@/components/AnalyticsBar";
import BottomBar from "@/components/BottomBar";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      <body className={`${orbitron.variable} ${jakarta.variable} ${jetbrains.variable} antialiased`}>
        <div className="flex flex-col h-screen overflow-hidden p-3 gap-2">
          <div data-layout-chrome="topbar"><TopBar /></div>
          <div data-layout-chrome="analytics"><AnalyticsBar /></div>
          <main className="flex-1 overflow-y-auto min-h-0">
            {children}
          </main>
          <div data-layout-chrome="bottom"><BottomBar /></div>
        </div>
      </body>
    </html>
  );
}
