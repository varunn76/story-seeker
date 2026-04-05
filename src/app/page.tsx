import { Hero } from "@/components/Hero";
import { ChatPreview } from "@/components/ChatPreview";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import TrendingMovieGrid from "@/components/TrendingMovieGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white relative overflow-x-hidden">
      <Hero />
      <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <ChatPreview />
      <Features />
      <HowItWorks />
      <TrendingMovieGrid />
    </div>
  );
}
