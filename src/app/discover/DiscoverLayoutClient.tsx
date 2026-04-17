"use client";

import React, { useState, useEffect } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import { useChatStore } from "@/hooks/useChatStore";
import { cn } from "@/utils/cn";

export default function DiscoverLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useChatStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <main className="h-screen flex flex-col bg-black text-foreground overflow-hidden">
      <div className="flex-1 flex overflow-hidden relative">
        {store.isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
            onClick={() => store.setSidebarOpen(false)}
          />
        )}

        <div
          className={cn(
            "absolute inset-y-0 left-0 z-50 lg:relative transition-transform duration-300 ease-in-out flex",
            store.isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          )}
        >
          <ChatSidebar
            sessions={store.sessions}
            currentSessionId={store.currentSessionId}
            onDeleteSession={store.deleteChat}
          />
        </div>

        <section className="flex-1 relative flex flex-col overflow-hidden min-w-0">
          {children}
        </section>
      </div>
    </main>
  );
}
