"use client";
import React from "react";
import {
  Plus,
  MessageSquare,
  Trash2,
  Zap,
  RefreshCw,
  ShieldCheck,
  Infinity,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { ChatSession } from "@/hooks/useChatStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSeekPoints } from "@/hooks/useSeekPoints";

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onDeleteSession: (id: string) => void;
}

const PROVIDER_LABELS: Record<string, string> = {
  gemini: "Gemini 3 Flash",
  openai: "GPT-4o mini",
  claude: "Claude 3 Haiku",
};

const ChatSidebar = ({
  sessions,
  currentSessionId,
  onDeleteSession,
}: ChatSidebarProps) => {
  const router = useRouter();
  const { getPoints, syncReset } = useSeekPoints();
  const [provider, setProvider] = React.useState("gemini");
  const [hasValidKey, setHasValidKey] = React.useState(false);

  const checkKeyStatus = React.useCallback(() => {
    const savedProvider = localStorage.getItem("chatbot_provider") || "gemini";
    setProvider(savedProvider);
    const status = localStorage.getItem(`chatbot_api_status_${savedProvider}`);
    const key = localStorage.getItem(`chatbot_api_key_${savedProvider}`);
    setHasValidKey(status === "valid" && !!key);
  }, []);

  React.useEffect(() => {
    syncReset();
    checkKeyStatus();
    window.addEventListener("storage", checkKeyStatus);
    return () => window.removeEventListener("storage", checkKeyStatus);
  }, [syncReset, checkKeyStatus]);

  const points = getPoints();
  const totalPoints = 6;
  const isExhausted = points === 0;

  return (
    <aside className="w-80 h-full bg-zinc-900 border-r border-white/5 flex flex-col p-4 space-y-4">
      <div className="px-2 pb-2">
        <Link
          href="/"
          className="text-lg sm:text-xl font-black cursor-pointer tracking-tighter text-primary uppercase italic"
        >
          StorySeeker
        </Link>
      </div>

      <button
        onClick={() => router.push("/discover")}
        className="w-full py-3 px-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 text-primary font-bold hover:bg-primary/20 transition-all group"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-2 py-2">
          Recent Chats
        </div>
        {sessions.map((session) => (
          <div key={session.id} className="group relative">
            <button
              onClick={() => router.push(`/discover/${session.id}`)}
              className={cn(
                "w-full text-left p-3 pr-10 rounded-xl flex items-center gap-3 transition-all truncate group",
                currentSessionId === session.id
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/5 hover:text-white",
              )}
            >
              <MessageSquare
                className={cn(
                  "w-4 h-4 shrink-0",
                  currentSessionId === session.id
                    ? "text-primary"
                    : "text-white/20",
                )}
              />
              <span className="text-sm font-medium truncate flex-1">
                {session.title}
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSession(session.id);
                if (currentSessionId === session.id) {
                  router.push("/discover");
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/0 hover:text-red-400 group-hover:text-white/20 transition-all active:scale-90"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Widget — Own Key or Seek Points */}
      <div className="pt-4 border-t border-white/5">
        {hasValidKey ? (
          /* ── Own API Key Active ── */
          <div className="p-4 rounded-2xl border bg-green-500/5 border-green-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                </div>
                <span className="text-[11px] font-black text-white/70 uppercase tracking-widest">
                  Own Key Active
                </span>
              </div>
              <Infinity className="w-4 h-4 text-green-400" />
            </div>

            <div className="flex items-center justify-center py-1">
              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                  {PROVIDER_LABELS[provider] || provider}
                </span>
              </div>
            </div>

            <p className="text-[9px] text-green-500/60 text-center uppercase tracking-widest font-bold">
              Unlimited searches · verified
            </p>
          </div>
        ) : (
          /* ── Seek Points ── */
          <div
            className={cn(
              "p-4 rounded-2xl border space-y-3 transition-colors",
              isExhausted
                ? "bg-red-500/5 border-red-500/20"
                : "bg-surface border-white/5"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center",
                    isExhausted
                      ? "bg-red-500/20 border border-red-500/20"
                      : "bg-primary/20 border border-primary/20"
                  )}
                >
                  <Zap
                    className={cn(
                      "w-3.5 h-3.5",
                      isExhausted ? "text-red-400" : "text-primary"
                    )}
                  />
                </div>
                <span className="text-[11px] font-black text-white/70 uppercase tracking-widest">
                  Seek Points
                </span>
              </div>
              <span
                className={cn(
                  "text-xs font-black tabular-nums",
                  isExhausted ? "text-red-400" : "text-white/50"
                )}
              >
                {points}/{totalPoints}
              </span>
            </div>

            <div className="flex gap-1.5 justify-center">
              {Array.from({ length: totalPoints }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    i < points
                      ? isExhausted
                        ? "bg-red-400"
                        : "bg-primary shadow-[0_0_6px_rgba(201,68,54,0.6)]"
                      : "bg-white/10"
                  )}
                />
              ))}
            </div>

            {isExhausted ? (
              <div className="text-center space-y-1">
                <p className="text-[9px] text-red-400/80 font-bold uppercase tracking-widest">
                  No points left today
                </p>
                <div className="flex items-center justify-center gap-1 text-[9px] text-white/30 font-medium">
                  <RefreshCw className="w-2.5 h-2.5" />
                  Resets tomorrow at midnight
                </div>
              </div>
            ) : (
              <p className="text-[9px] text-white/30 text-center uppercase tracking-widest font-bold">
                {points === totalPoints
                  ? "6 free searches today"
                  : `${points} search${points !== 1 ? "es" : ""} remaining`}
              </p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
