"use client";
import React, { useEffect } from 'react';

interface ModelSelectorProps {
  provider: string;
  setProvider: (p: string) => void;
}

export default function ModelSelector({ provider, setProvider }: ModelSelectorProps) {
  // Load from localStorage on mount
  useEffect(() => {
    const savedProvider = localStorage.getItem('chatbot_provider');
    if (savedProvider) setProvider(savedProvider);
  }, [setProvider]);

  // Save changes to localStorage
  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setProvider(val);
    localStorage.setItem('chatbot_provider', val);
    // Dispatch event for other components (like sidebar) to sync
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
      <select 
        id="ai-provider"
        value={provider} 
        onChange={handleProviderChange}
        className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-white/40 outline-none cursor-pointer"
      >
        <option value="gemini" className="bg-background">Gemini</option>
        <option value="openai" className="bg-background">GPT-4</option>
        <option value="claude" className="bg-background">Claude</option>
      </select>
    </div>
  );
}
