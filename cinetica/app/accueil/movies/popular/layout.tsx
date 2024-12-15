import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Films Populaires - Cinedroma",
  description: "Films populaires sur Cinedroma",
};

export default function PopularMoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 