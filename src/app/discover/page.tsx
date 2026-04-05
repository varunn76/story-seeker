"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatInterface from "@/components/ChatInterface";
import { useChatStore } from "@/hooks/useChatStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewDiscoverPage() {
  const store = useChatStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasAutoStarted = useRef(false);

  const handleSendMessage = (content: string) => {
    const newId = store.createNewChat(content);
    router.push(`/discover/${newId}`);
  };

  useEffect(() => {
    if (store.currentSessionId !== null) {
      store.setCurrentSessionId(null);
    }

    const title = searchParams.get("title");
    if (title && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      handleSendMessage(`Find me movies or series similar to "${title}" with the same genre or story architecture.`);
    }
  }, [store.currentSessionId, store.setCurrentSessionId, searchParams]);

  const handleAssistantReply = (content: string) => {
    console.warn("Assistant reply on draft page?");
  };

  const draftSession = {
    id: "draft",
    title: "New Chat",
    messages: [
      {
        id: "1",
        role: "assistant" as const,
        content: "Tell me anything you remember — a scene, a character, or even just a feeling.",
      },
    ],
    searchResults: [],
    createdAt: Date.now(),
  };

  return (
    <ChatInterface 
      session={draftSession} 
      onSendMessage={handleSendMessage}
      onAssistantReply={handleAssistantReply}
      setSearchResults={() => {}} 
    />
  );
}
