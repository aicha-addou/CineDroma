import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import SessionProviderComponent from "@/app/providers/SessionProvider";
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
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
