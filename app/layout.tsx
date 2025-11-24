// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['600', '700', '800'],
});

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
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-cream`}>
        {children}
      </body>
    </html>
  );
}
