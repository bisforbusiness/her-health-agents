import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Her Health Agents - AI-Powered Women's Health Support",
  description: "Compassionate AI assistant Luna helps collect comprehensive hormone-related health information to connect you with research insights and resources.",
  keywords: "women's health, hormone health, menstrual cycle, AI health assistant, health data collection",
  openGraph: {
    title: "Her Health Agents - AI-Powered Women's Health Support",
    description: "Meet Luna, your compassionate AI health assistant specializing in women's hormone-related health information collection.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
