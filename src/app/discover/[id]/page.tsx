"use client";
import React, { useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";
import { useChatStore } from "@/hooks/useChatStore";
import { useParams, useRouter } from "next/navigation";

export default function ActiveChatPage() {
  const { id } = useParams();
  const store = useChatStore();
  const router = useRouter();
  
  const session = store.getSessionById(id as string);

  useEffect(() => {
    if (session) {
      if (store.currentSessionId !== session.id) {
        store.setCurrentSessionId(session.id);
      }
    } else {
      router.push("/discover");
    }
  }, [id, session, store.currentSessionId, store.setCurrentSessionId, router]);

  if (!session) return null;

  return (
    <ChatInterface 
      session={session} 
      onSendMessage={(content) => store.addMessage(session.id, { role: "user", content })}
      onAssistantReply={(content) => store.addMessage(session.id, { role: "assistant", content })}
      setSearchResults={(results) => store.setSearchResults(session.id, results)}
    />
  );
}
