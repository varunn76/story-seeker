import { Bot, BrainCircuit, Cpu, Eye, Film, LayoutGrid, Lock, MessageSquare, Search, Server, Shield, Smartphone, Zap } from "lucide-react";
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

export   const PRIVACY_SECTION = [
    {
      icon: Shield,
      title: "No Data Storage",
      content:
        "We do not store your personal data, chat history, or search queries on our servers. StorySeeker operates without a database, and your interactions are not saved or tracked by us.",
    },
    {
      icon: Eye,
      title: "Local-First Experience",
      content:
        "Your chat sessions and API keys are stored solely in your browser's localStorage. This means your data stays on your device and is never transmitted to our servers.",
    },
    {
      icon: Server,
      title: "Third-Party Services",
      content:
        "StorySeeker interacts with AI providers (OpenAI, Google, Anthropic) and TMDB to process requests. These services receive only the anonymized fragments necessary to return your results.",
    },
    {
      icon: Lock,
      title: "Security Approach",
      content:
        "By not storing user data, we minimize the risk of centralized data breaches. However, users remain responsible for securing their own local devices and API keys.",
    },
    {
      icon: Smartphone,
      title: "Zero Tracking",
      content:
        "We do not use tracking cookies or analytics scripts. Only essential browser storage is used to maintain your session preferences locally.",
    },
    {
      icon: Film,
      title: "TMDB Data Usage",
      content:
        "We fetch movie metadata, posters, and ratings directly via the TMDB API. We do not own or store this information; it is provided as-is from their global database.",
    },
  ];

export const TERMS_POINTS = [
  {
    title: "Service Overview",
    desc: "StorySeeker is a discovery tool that helps users find movies, shows, and stories using AI-assisted search. Results are generated dynamically and may not always be accurate or complete."
  },
  {
    title: "No Data Storage",
    desc: "StorySeeker does not store user data, chat history, or personal information on any server. The platform operates without a database, and interactions are not retained by us."
  },
  {
    title: "User Responsibility",
    desc: "You agree to use the platform responsibly. This includes avoiding misuse such as automated scraping, abusive queries, or attempts to exploit or disrupt the system."
  },
  {
    title: "Third-Party Services",
    desc: "StorySeeker relies on third-party services including AI providers (OpenAI, Google, Anthropic) and TMDB for content data. Your queries are processed by these services to generate results."
  },
  {
    title: "Content & Attribution",
    desc: "All movie and TV data, including posters and metadata, are provided by TMDB and belong to their respective owners. StorySeeker does not claim ownership of this content."
  },
  {
    title: "No Guarantees",
    desc: "The platform is provided “as is.” We do not guarantee accuracy, availability, or uninterrupted access. AI-generated results may vary and should not be considered definitive."
  },
  {
    title: "Local Storage Usage",
    desc: "Some data such as chat sessions or API keys may be stored locally in your browser. This data remains on your device and is not accessible to us."
  },
  {
    title: "Changes to Service",
    desc: "We may update, modify, or discontinue features at any time without prior notice as the product evolves."
  }
];