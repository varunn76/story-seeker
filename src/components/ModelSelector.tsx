"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Sparkles,
  Bot,
  Zap,
  Check,
  Key,
  Loader2,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { internalHeaders } from "@/utils/internalHeaders";

const models = [
  { id: "openai", name: "GPT-4o mini", shortName: "GPT", icon: Sparkles },
  { id: "claude", name: "Claude 3 Haiku", shortName: "Haiku", icon: Bot },
  { id: "gemini", name: "Gemini 3 Flash", shortName: "Gemini", icon: Zap },
];

type ValidationStatus = "idle" | "validating" | "valid" | "invalid";

interface ModelSelectorProps {
  provider: string;
  setProvider: (p: string) => void;
}

export default function ModelSelector({
  provider,
  setProvider,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState<ValidationStatus>("idle");
  const [validationMsg, setValidationMsg] = useState("");

  useEffect(() => {
    const savedProvider = localStorage.getItem("chatbot_provider");
    if (savedProvider) setProvider(savedProvider);
  }, [setProvider]);

  useEffect(() => {
    const keyName = `chatbot_api_key_${provider}`;
    const savedKey = localStorage.getItem(keyName) || "";
    setApiKey(savedKey);
    const savedStatus = localStorage.getItem(`chatbot_api_status_${provider}`);
    if (savedStatus === "valid") {
      setStatus("valid");
      setValidationMsg("API key verified and active.");
    } else {
      setStatus("idle");
      setValidationMsg("");
    }
  }, [provider]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    setProvider(id);
    localStorage.setItem("chatbot_provider", id);
    window.dispatchEvent(new Event("storage"));
    setIsOpen(false);
    setStatus("idle");
    setValidationMsg("");
  };

  const handleKeyChange = (val: string) => {
    setApiKey(val);
    if (status !== "idle") {
      setStatus("idle");
      setValidationMsg("");
      localStorage.removeItem(`chatbot_api_status_${provider}`);
    }
    const keyName = `chatbot_api_key_${provider}`;
    if (val.trim()) {
      localStorage.setItem(keyName, val);
    } else {
      localStorage.removeItem(keyName);
      localStorage.removeItem(`chatbot_api_status_${provider}`);
    }
    window.dispatchEvent(new Event("storage"));
  };

  const handleClearKey = () => {
    setApiKey("");
    setStatus("idle");
    setValidationMsg("");
    const keyName = `chatbot_api_key_${provider}`;
    localStorage.removeItem(keyName);
    localStorage.removeItem(`chatbot_api_status_${provider}`);
    window.dispatchEvent(new Event("storage"));
  };

  const handleValidate = async () => {
    if (!apiKey.trim()) return;
    setStatus("validating");
    setValidationMsg("");
    try {
      const res = await fetch("/api/validate-key", {
        method: "POST",
        headers: internalHeaders(),
        body: JSON.stringify({ provider, apiKey }),
      });
      const data = await res.json();
      if (data.valid) {
        setStatus("valid");
        setValidationMsg("API key verified and active.");
        localStorage.setItem(`chatbot_api_status_${provider}`, "valid");
        window.dispatchEvent(new Event("storage"));
      } else {
        setStatus("invalid");
        setValidationMsg(data.error || "Invalid API key.");
        localStorage.removeItem(`chatbot_api_status_${provider}`);
        window.dispatchEvent(new Event("storage"));
      }
    } catch {
      setStatus("invalid");
      setValidationMsg(
        "Could not reach validation server. Check your connection.",
      );
    }
  };

  const selectedModel = models.find((m) => m.id === provider) || models[0];
  const Icon = selectedModel.icon;

  return (
    <div className="relative min-w-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 hover:bg-zinc-800/60 rounded-xl transition-all px-2 sm:px-3 py-2 max-w-full"
      >
        <Icon size={16} className="text-zinc-400 shrink-0" />

        <span className="hidden sm:inline font-bold text-lg sm:text-xl text-zinc-100 truncate">
          StorySeeker
        </span>
        <span className="text-zinc-400 font-medium text-sm sm:text-lg truncate">
          <span className="sm:hidden">{selectedModel.shortName}</span>
          <span className="hidden sm:inline">{selectedModel.name}</span>
        </span>

        {status === "valid" && (
          <ShieldCheck size={13} className="text-green-400 shrink-0" />
        )}

        <ChevronDown
          size={16}
          className={`text-zinc-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-2 z-50
              w-[calc(100vw-5rem)] -right-40
              sm:w-[340px] sm:left-0 sm:right-auto
              bg-[#202123] border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1"
          >
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id)}
                className={`relative w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                  model.id === provider ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 ${
                    model.id === provider ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <model.icon
                    size={18}
                    className={
                      model.id === provider ? "text-white" : "text-zinc-400"
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-semibold text-sm truncate ${
                      model.id === provider ? "text-white" : "text-zinc-200"
                    }`}
                  >
                    {model.name}
                  </div>
                </div>
                {model.id === provider && (
                  <Check size={16} className="text-white shrink-0" />
                )}
              </button>
            ))}

            <div className="mt-2 pt-3 border-t border-white/10 px-1 space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/50">
                  <Key size={11} />
                  <span className="truncate">{selectedModel.name} Key</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {apiKey && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearKey();
                      }}
                      className="text-[9px] font-bold text-red-400 hover:underline uppercase tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowKey(!showKey);
                    }}
                    className="text-[9px] font-bold text-primary hover:underline uppercase tracking-wider"
                  >
                    {showKey ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => handleKeyChange(e.target.value)}
                  placeholder="sk-... or AIzaSy..."
                  className="flex-1 min-w-0 bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-all focus:bg-black/60"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleValidate();
                  }}
                  disabled={!apiKey.trim() || status === "validating"}
                  className="shrink-0 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wide bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed min-w-[52px] flex items-center justify-center"
                >
                  {status === "validating" ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>

              <AnimatePresence>
                {(status === "valid" || status === "invalid") && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-start gap-2 px-3 py-2.5 rounded-xl text-[11px] font-medium leading-snug ${
                      status === "valid"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {status === "valid" ? (
                      <ShieldCheck size={13} className="shrink-0 mt-px" />
                    ) : (
                      <ShieldX size={13} className="shrink-0 mt-px" />
                    )}
                    <span>{validationMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
