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
  title: "WaitlistAI - The AI That Waits For You",
  description:
    "AGI-Ready. Quantum-Aligned. Currently Unavailable. Join 1,247,893 developers on the most exclusive waitlist in tech history.",
  keywords: [
    "AI waitlist",
    "invite code",
    "AGI",
    "quantum AI",
    "next-gen AI",
    "AI access",
    "exclusive AI",
  ],
  authors: [{ name: "kuhung", url: "mailto:hi@kuhung.me" }],
  openGraph: {
    title: "WaitlistAI - The AI That Waits For You",
    description:
      "AGI-Ready. Quantum-Aligned. Currently Unavailable. The most exclusive waitlist in tech.",
    type: "website",
    siteName: "WaitlistAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "WaitlistAI - The AI That Waits For You",
    description:
      "AGI-Ready. Quantum-Aligned. Currently Unavailable. Join the waitlist now.",
    creator: "@kuhung",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
