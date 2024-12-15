import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Films les Mieux Notés - Cinedroma",
  description: "Films les mieux notés sur Cinedroma",
};

export default function TopRatedMoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 