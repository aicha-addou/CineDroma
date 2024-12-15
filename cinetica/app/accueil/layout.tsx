import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Cinedroma",
  description: "Application de streaming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
