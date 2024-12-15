import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Séries en Cours - Cinedroma",
  description: "Séries TV actuellement diffusées sur Cinedroma",
};

export default function OnAirTVShowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 