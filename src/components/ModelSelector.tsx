"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Sparkles, Bot, Zap, Check, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const models = [
  {
    id: "openai",
    name: "GPT-4o",
    icon: Sparkles,
  },
  {
    id: "claude",
    name: "Claude 3.5",

    icon: Bot,
  },
  {
    id: "gemini",
    name: "Gemini 1.5",
    icon: Zap,
  },
];

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

  useEffect(() => {
    const savedProvider = localStorage.getItem("chatbot_provider");
    if (savedProvider) setProvider(savedProvider);
  }, [setProvider]);

  useEffect(() => {
    const keyName = `chatbot_api_key_${provider}`;
    const savedKey = localStorage.getItem(keyName) || "";
    setApiKey(savedKey);
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
  };

  const handleSaveKey = (val: string) => {
    setApiKey(val);
    const keyName = `chatbot_api_key_${provider}`;
    localStorage.setItem(keyName, val);
    window.dispatchEvent(new Event("storage"));
  };

  const selectedModel = models.find((m) => m.id === provider) || models[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-zinc-800/60 rounded-xl transition-all font-bold text-xl text-zinc-100 px-3 py-2"
      >
        StorySeeker{" "}
        <span className="text-zinc-400 font-medium text-lg">
          {selectedModel.name}
        </span>
        <ChevronDown
          size={18}
          className={`text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-[340px] bg-[#202123] border border-white/10 rounded-2xl p-2 shadow-xl z-50 flex flex-col gap-1"
          >
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id)}
                className={`relative w-full flex items-center gap-4 p-3 rounded-xl transition-colors text-left ${model.id === provider ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <div
                  className={`p-1.5 rounded-lg ${model.id === provider ? "bg-white/10" : "bg-white/5"}`}
                >
                  <model.icon
                    size={20}
                    className={
                      model.id === provider ? "text-white" : "text-zinc-400"
                    }
                  />
                </div>
                <div className="flex-1 pr-6">
                  <div
                    className={`font-semibold ${model.id === provider ? "text-white" : "text-zinc-200"} text-sm`}
                  >
                    {model.name}
                  </div>
                </div>
                {model.id === provider && (
                  <div className="absolute right-4 text-white">
                    <Check size={18} />
                  </div>
                )}
              </button>
            ))}

            <div className="mt-2 pt-3 border-t border-white/10 px-1">
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/50">
                  <Key size={12} />
                  {selectedModel.name} API Key
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowKey(!showKey);
                  }}
                  className="text-[9px] font-bold text-primary hover:underline uppercase tracking-wider"
                >
                  {showKey ? "Hide" : "Reveal"}
                </button>
              </div>
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => handleSaveKey(e.target.value)}
                placeholder={`Enter your ${selectedModel.name} API Key...`}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-all focus:bg-black/60"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
