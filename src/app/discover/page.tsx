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

  // On the first message, create a real session and redirect
  const handleSendMessage = (content: string) => {
    const newId = store.createNewChat(content);
    router.push(`/discover/${newId}`);
  };

  // Clear current session highlight on sidebar and handle auto-start
  useEffect(() => {
    if (store.currentSessionId !== null) {
      store.setCurrentSessionId(null);
    }

    const title = searchParams.get("title");
    if (title && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      // Auto-start discovery with a personalized prompt
      handleSendMessage(`Find me movies or series similar to "${title}" with the same genre or story architecture.`);
    }
  }, [store.currentSessionId, store.setCurrentSessionId, searchParams]);

  const handleAssistantReply = (content: string) => {
    // This shouldn't be called on the "New" page since we redirect immediately
    console.warn("Assistant reply on draft page?");
  };

  // Mock initial session for the empty UI
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
      setSearchResults={() => {}} // No results on draft page
    />
  );
}
