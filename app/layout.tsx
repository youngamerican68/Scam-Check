// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scam-Check One-Shot | The Granny Guard",
  description: "A second opinion for your panic. Antivirus for social engineering. Check suspicious messages for scam indicators.",
  keywords: ["scam check", "fraud detection", "phishing", "social engineering", "elderly protection", "scam protection"],
  authors: [{ name: "Scam-Check Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-neutral-50`}>
        {children}
      </body>
    </html>
  );
}
