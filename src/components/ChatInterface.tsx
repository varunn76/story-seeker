"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Trash2,
  ChevronRight,
  Bot,
  User,
  Loader2,
  Star,
  Play,
  Info,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { parseAIResponse, stripJsonBlock } from "@/utils/parser";
import ModelSelector from "@/components/ModelSelector";
import { ChatSession, Message } from "@/hooks/useChatStore";

interface ChatInterfaceProps {
  session: ChatSession;
  onSendMessage: (content: string) => void;
  onAssistantReply: (content: string) => void;
  setSearchResults: (results: any[]) => void;
}

const ChatInterface = ({
  session,
  onSendMessage,
  onAssistantReply,
  setSearchResults,
}: ChatInterfaceProps) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState("gemini");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<{ message: string; type: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastProcessedMessageIdRef = useRef<string | null>(null);

  // Sync provider with localStorage (sidebar controls)
  useEffect(() => {
    const syncSettings = () => {
      const savedProvider = localStorage.getItem("chatbot_provider") || "gemini";
      setProvider(savedProvider);
    };

    window.addEventListener("storage", syncSettings);
    syncSettings(); // Initial load

    return () => window.removeEventListener("storage", syncSettings);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.messages, isTyping, session.searchResults, error]);

  const triggerAIResponse = React.useCallback(
    async (userMessage: string) => {
      if (isTyping) return;
      setIsTyping(true);
      setError(null);

      // Get the API key for the current provider
      const keyName = `chatbot_api_key_${provider}`;
      const userApiKey = localStorage.getItem(keyName);

      try {
        const chatRes = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            messages: [
              ...session.messages,
              { role: "user", content: userMessage },
            ],
            provider: provider,
            apiKey: userApiKey,
          }),
        });

        const chatData = await chatRes.json();

        if (!chatRes.ok) {
          const errorMsg = chatData.error || "Model is currently unavailable";
          let displayMsg =
            "This model is currently unavailable or under high demand.";

          if (errorMsg.includes("Free tier limit")) {
            displayMsg = errorMsg;
          } else if (
            errorMsg.toLowerCase().includes("quota") ||
            errorMsg.includes("429")
          ) {
            displayMsg =
              "AI quota exceeded or high demand. Please try a different model or wait a moment.";
          }

          setError({ message: displayMsg, type: "error" });
          setIsTyping(false);
          return;
        }

        const structuredData = parseAIResponse(chatData.reply);

        let searchTriggered = false;
        if (structuredData) {
          try {
            const searchRes = await fetch("/api/chatbot-search", {
              method: "POST",
              body: JSON.stringify({ ...structuredData, apiKey: userApiKey }),
            });
            const searchData = await searchRes.json();
            setSearchResults(searchData.results || []);
            searchTriggered = true;
          } catch (e) {
            console.error("Search Error", e);
          }
        }

        if (!searchTriggered) {
          const boldMatch = chatData.reply.match(/\*\*(.*?)\*\*/);
          if (boldMatch) {
            const searchRes = await fetch("/api/chatbot-search", {
              method: "POST",
              body: JSON.stringify({ title: boldMatch[1], apiKey: userApiKey }),
            });
            const searchData = await searchRes.json();
            setSearchResults(searchData.results || []);
          } else {
            setSearchResults([]);
          }
        }

        onAssistantReply(stripJsonBlock(chatData.reply));
      } catch (e: any) {
        console.error(e);
        setError({
          message:
            "Something went wrong. Please check your connection and try again.",
          type: "critical",
        });
      } finally {
        setIsTyping(false);
      }
    },
    [session.messages, provider, onAssistantReply, setSearchResults, isTyping],
  );

    const handleSend = () => {
      if (!input.trim() || isTyping) return;
      const userMessage = input;
      setInput("");
      setError(null);
      onSendMessage(userMessage);
      // triggerAIResponse is now handled by the useEffect observer
    };

    const handleRetry = () => {
      const lastUserMsg = [...session.messages].reverse().find(m => m.role === "user");
      if (lastUserMsg) {
        setError(null);
        triggerAIResponse(lastUserMsg.content);
      }
    };

  // Observer: Trigger AI whenever the last message is from a user
  useEffect(() => {
    if (session.id === "draft" || isTyping) return;

    const lastMsg = session.messages[session.messages.length - 1];
    if (lastMsg?.role === "user" && lastMsg.id !== lastProcessedMessageIdRef.current) {
      // Only trigger if no assistant message follows this specific user message
      const assistantIdx = session.messages.findLastIndex(
        (m) => m.role === "assistant",
      );
      const userIdx = session.messages.findLastIndex((m) => m.role === "user");

      if (userIdx > assistantIdx) {
        lastProcessedMessageIdRef.current = lastMsg.id;
        triggerAIResponse(lastMsg.content);
      }
    }
  }, [session.messages, session.id]);

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-6">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pt-8 pb-12 space-y-8 scroll-smooth custom-scrollbar"
      >
        {session.messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3 py-2",
              msg.role === "user" ? "flex-row-reverse" : "flex-row",
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-110",
                msg.role === "user"
                  ? "bg-red-500 shadow-red-500/20"
                  : "bg-zinc-800 border border-white/5",
              )}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Sparkles className="w-4 h-4 text-red-300" />
              )}
            </div>

            {/* Message */}
            <div
              className={cn(
                "max-w-[85%] px-6 py-4 rounded-4xl text-[15px] leading-relaxed transition-all hover:shadow-xl hover:shadow-black/20",
                msg.role === "user"
                  ? "bg-zinc-600/80 text-white rounded-tr-md border border-white/5"
                  : "bg-zinc-700/40 text-zinc-300 border border-white/5 rounded-tl-md",
              )}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 animate-in fade-in duration-300">
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 text-red-300 animate-spin" />
            </div>
            <div className="bg-zinc-700/40 border border-white/5 px-6 py-4 rounded-4xl rounded-tl-none">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-red-400/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-red-400/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-red-400/50 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 py-6 animate-in slide-in-from-top-2 duration-500">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={18} />
              <span>{error.message}</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/5"
              >
                <RefreshCcw size={14} />
                Try Question Again
              </button>
              <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                Or switch model below
              </div>
            </div>
          </div>
        )}
        {session.searchResults && session.searchResults.length > 0 && (
          <div className="space-y-6 animate-in zoom-in fade-in duration-700 delay-300">
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary/60 px-4">
              <div className="h-px flex-1 bg-primary/10" />
              Recommendations Based on Conversation
              <div className="h-px flex-1 bg-primary/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {session.searchResults.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => router.push(`/${movie.media_type || "movie"}/${movie.id}`)}
                  className="group bg-surface/40 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/20 transition-all shadow-xl cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={
                        movie.poster_path
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URI}${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Poster"
                      }
                      className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      alt={movie.title}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-60" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-black italic uppercase tracking-tighter truncate">
                      {movie.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] font-bold text-white/30 uppercase tracking-widest">
                      <span>
                        {movie.media_type === "person"
                          ? movie.release_date
                          : movie.release_date?.split("-")[0] || "N/A"}
                      </span>
                      {movie.media_type !== "person" && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-white">
                            {movie.vote_average?.toFixed(1) || "0.0"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 py-2 bg-white text-black text-[10px] font-black uppercase rounded-lg hover:scale-105 active:scale-95 transition-all">
                        {movie.media_type === "person" ? "View Works" : "Play"}
                      </button>
                      <button className="flex-1 py-2 bg-white/5 text-white text-[10px] font-black uppercase border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Input Area */}
      <div className="pb-8 pt-4">
        <div className="relative group max-w-4xl mx-auto">
          <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-primary/5 to-primary/20 rounded-3xl blur-xl opacity-30 group-focus-within:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-center gap-4 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-2 pl-4 rounded-2xl shadow-2xl">
            <ModelSelector provider={provider} setProvider={setProvider} />

            <div className="w-px h-6 bg-white/10" />

            <input
              type="text"
              placeholder="Describe what you remember..."
              className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-base placeholder:text-white/40 px-2 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <div className="flex items-center gap-2 pr-2">
              <button
                onClick={handleSend}
                className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-4 text-[10px] font-black text-white/15 uppercase tracking-[0.2em]">
          <span>Powered by StorySeeker AI</span>
          <span>•</span>
          <span>Context: Multi-Turn</span>
          <span>•</span>
          <span>Memory: persistent</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
