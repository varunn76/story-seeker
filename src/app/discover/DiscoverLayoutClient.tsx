"use client";

import React, { useState, useEffect } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import Navbar from "@/components/Navbar";
import { useChatStore } from "@/hooks/useChatStore";

export default function DiscoverLayoutClient({ children }: { children: React.ReactNode }) {
  const store = useChatStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <main className="h-screen flex flex-col bg-black text-foreground overflow-hidden">
      <Navbar />

      <div className="flex-1 flex pt-24 overflow-hidden">
        <ChatSidebar
          sessions={store.sessions}
          currentSessionId={store.currentSessionId}
          onDeleteSession={store.deleteChat}
        />

        <section className="flex-1 relative flex flex-col overflow-hidden">
          {children}
        </section>
      </div>
    </main>
  );
}