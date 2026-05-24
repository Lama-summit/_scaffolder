import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proyecto Base",
  description: "Proyecto Next.js generado por _scaffolder.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
