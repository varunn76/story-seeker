import { Bot, BrainCircuit, Cpu, Film, LayoutGrid, MessageSquare, Search, Zap } from "lucide-react";
export const POSTERS = [
  {
    id: 1,
    title: "The Silent Watcher",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000",
    metadata: { duration: "2h 15m", year: "2024", language: "English" }
  },
  {
    id: 2,
    title: "Midnight Circuit",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000",
    metadata: { duration: "1h 45m", year: "2023", language: "English" }
  },
  {
    id: 3,
    title: "Shadow Protocol",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=1000",
    metadata: { duration: "2h 10m", year: "2022", language: "English" }
  },
  {
    id: 4,
    title: "Neon Horizon",
    image: "https://images.unsplash.com/photo-1535016120720-40c646bebbfc?auto=format&fit=crop&q=80&w=1000",
    metadata: { duration: "1h 55m", year: "2021", language: "English" }
  },
  {
    id: 5,
    title: "Empire of Glass",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1000",
    metadata: { duration: "2h 30m", year: "2024", language: "English" }
  },
  {
    id: 6,
    title: "Static Dreams",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000",
    metadata: { duration: "1h 30m", year: "2023", language: "English" }
  },
];


export const FEATURES = [
  {
    icon: Search,
    title: "Understands Partial Memories",
    desc: "Works with incomplete scenes, characters, or ideas",
  },
  {
    icon: Bot,
    title: "Guided Discovery",
    desc: "Asks the right questions to narrow it down",
  },
  {
    icon: Film,
    title: "Accurate Matches",
    desc: "Finds the closest results, not just guesses",
  },
];
export const FEATURESCARDS = [
  {
    title: "Smart AI Search",
    description: "Understands vague descriptions, plot twists, and specific scenes with unprecedented accuracy.",
    icon: Search,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  },
  {
    title: "Multi-Model Support",
    description: "Powered by the world's most capable models including GPT-4, Claude 3.5, and Gemini 1.5 Pro.",
    icon: BrainCircuit,
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    title: "Instant Results",
    description: "Get lightning-fast movie suggestions complete with posters, ratings, and where to watch.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
  },
  {
    title: "Memory-Based Discovery",
    description: "Specifically tuned for those 'I remember a movie where...' moments that regular search fails.",
    icon: LayoutGrid,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  }
];


export const SUGGESTED_MOVIES = [
  {
    id: 157336,
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi/Drama",
    rating: "8.4",
    image: `${process.env.NEXT_PUBLIC_IMAGE_URI}/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg`,
  },
  {
    id: 329,
    title: "Shutter Island",
    year: "2010",
    genre: "Mystery/Thriller",
    rating: "8.2",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop",
  },
];

export const steps = [
  {
    title: "Describe",
    text: "Briefly describe what you remember about the movie.",
    icon: MessageSquare,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Analyze",
    text: "Our AI analyzes millions of movies to find a match.",
    icon: Cpu,
    color: "from-primary to-purple-500",
  },
  {
    title: "Discover",
    text: "Get the exact movie and similar recommendations.",
    icon: Film,
    color: "from-emerald-500 to-teal-500",
  },
];