import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StorySeeker",
    template: "%s • StorySeeker",
  },

  description:
    "Find movies, shows, and stories from memory — not by name. Describe a scene, actor, or moment and discover it instantly.",

  keywords: [
    "movie finder",
    "find movie by memory",
    "AI movie search",
    "story finder",
    "movie search by scene",
    "AI discovery tool",
  ],

  authors: [{ name: "StorySeeker" }],
  creator: "StorySeeker",

  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),

  openGraph: {
    title: "StorySeeker — Find Stories From Memory",
    description:
      "Describe what you remember — a scene, a feeling, or a moment — and find the exact movie or show instantly.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName: "StorySeeker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StorySeeker Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "StorySeeker",
    description:
      "Search stories by memory. No titles needed.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  category: "entertainment",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}