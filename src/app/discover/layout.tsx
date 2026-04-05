import type { Metadata } from "next";
import DiscoverLayoutClient from "./DiscoverLayoutClient";

export const metadata: Metadata = {
  title: "Discover • StorySeeker",
  description:
    "Describe what you remember and let StorySeeker find the movie, show, or story for you through a guided chat experience.",

  openGraph: {
    title: "Discover Stories by Memory",
    description:
      "Use a chat-based experience to find movies and shows from vague memories.",
    url: process.env.NEXT_PUBLIC_BASE_URL + "/discover" || "http://localhost:3000/discover",
    siteName: "StorySeeker",
    images: [
      {
        url: "/og-discover.png",
        width: 1200,
        height: 630,
        alt: "StorySeeker Discover Chat",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Discover • StorySeeker",
    description: "Chat your way to the right movie or story.",
    images: ["/og-discover.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DiscoverLayoutClient>{children}</DiscoverLayoutClient>;
}