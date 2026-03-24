import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MissionBanner from "@/components/MissionBanner";

export const metadata: Metadata = {
  title: "Black Sand — Mission Control",
  description: "AI-powered mission control for Black Sand operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <MissionBanner />
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
