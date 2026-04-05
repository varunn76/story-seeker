"use client";
import React from "react";
import { Plus, MessageSquare, Trash2, ChevronLeft } from "lucide-react";
import { cn } from "@/utils/cn";
import { ChatSession, useChatStore } from "@/hooks/useChatStore";
import { useRouter } from "next/navigation";
import ModelSelector from "./ModelSelector";

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onDeleteSession: (id: string) => void;
}

const ChatSidebar = ({
  sessions,
  currentSessionId,
  onDeleteSession,
}: ChatSidebarProps) => {
  const router = useRouter();
  const [provider, setProvider] = React.useState("gemini");
  const [apiKey, setApiKey] = React.useState("");
  const [showKey, setShowKey] = React.useState(false);

  React.useEffect(() => {
    const savedProvider = localStorage.getItem("chatbot_provider") || "gemini";
    setProvider(savedProvider);
  }, []);

  React.useEffect(() => {
    const keyName = `chatbot_api_key_${provider}`;
    const savedKey = localStorage.getItem(keyName) || "";
    setApiKey(savedKey);
  }, [provider]);

  const handleProviderChange = (newProvider: string) => {
    setProvider(newProvider);
    localStorage.setItem("chatbot_provider", newProvider);
    window.dispatchEvent(new Event("storage"));
  };

  const handleSaveKey = (val: string) => {
    setApiKey(val);
    const keyName = `chatbot_api_key_${provider}`;
    localStorage.setItem(keyName, val);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <aside className="w-80 h-full bg-zinc-950/50 border-r border-white/5 flex flex-col p-4 space-y-4">
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

      <div className="pt-4 border-t border-white/5 space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-2">
            Select Model
          </label>
          <div className="px-1">
            <ModelSelector
              provider={provider}
              setProvider={handleProviderChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">
              {provider} API Key
            </label>
            <button
              onClick={() => setShowKey(!showKey)}
              className="text-[9px] font-bold text-primary hover:underline"
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type={showKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => handleSaveKey(e.target.value)}
            placeholder={`Enter ${provider} API Key...`}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-white/10 focus:border-primary/50 outline-none transition-all"
          />
        </div>
        <div className="p-4 bg-surface rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">AI</span>
            </div>
            <div className="text-[10px] font-bold text-white/60">
              StorySeeker Pro
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[80%] bg-primary shadow-[0_0_8px_rgba(188,60,195,0.5)]" />
          </div>
          <div className="text-[9px] text-white/30 text-center uppercase tracking-widest font-bold">
            Standard Plan: 80% used
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
