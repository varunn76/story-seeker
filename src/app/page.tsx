import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ChatPreview } from "@/components/ChatPreview";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { MovieGrid } from "@/components/MovieGrid";
import MovieBackgroundPattern from "@/components/MovieBackgroundPattern";
import TrendingMovieGrid from "@/components/TrendingMovieGrid";
// import MovieBackgroundPattern from "@/components/MovieBackgroundPattern";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white relative overflow-x-hidden">
      {/* <MovieBackgroundPattern /> */}
      <Navbar />

      <main>
        <Hero />

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/5 to-transparent" />

        <ChatPreview />

        <Features />

        <HowItWorks />
        <TrendingMovieGrid />
      </main>

      <Footer />
    </div>
  );
}
