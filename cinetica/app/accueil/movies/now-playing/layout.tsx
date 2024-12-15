import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import SessionProviderComponent from "@/app/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
