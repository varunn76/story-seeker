"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  id: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  searchResults: any[];
  createdAt: number;
}

interface ChatStore {
  sessions: ChatSession[];
  currentSessionId: string | null;
  createNewChat: (firstMessage?: string) => string;
  setCurrentSessionId: (id: string | null) => void;
  deleteChat: (id: string) => void;
  addMessage: (sessionId: string, message: Omit<Message, "id">) => void;
  setSearchResults: (sessionId: string, results: any[]) => void;
  getCurrentSession: () => ChatSession | null;
  getSessionById: (id: string) => ChatSession | null;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      isSidebarOpen: false,
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      createNewChat: (firstMessage) => {
        const id = uuidv4();
        const newSession: ChatSession = {
          id,
          title: "New Chat",
          messages: [
            {
              id: uuidv4(),
              role: "assistant",
              content:
                "Tell me anything you remember — a scene, a character, or even just a feeling.",
            },
          ],
          searchResults: [],
          createdAt: Date.now(),
        };

        if (firstMessage) {
          newSession.messages.push({
            id: uuidv4(),
            role: "user",
            content: firstMessage,
          });
          newSession.title =
            firstMessage.substring(0, 30) +
            (firstMessage.length > 30 ? "..." : "");
        }

        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: id,
        }));
        return id;
      },

      setCurrentSessionId: (id) => set({ currentSessionId: id }),

      deleteChat: (sessionId) => {
        set((state) => {
          const updated = state.sessions.filter((s) => s.id !== sessionId);
          const nextSessionId =
            state.currentSessionId === sessionId
              ? updated.length > 0
                ? updated[0].id
                : null
              : state.currentSessionId;
          return { sessions: updated, currentSessionId: nextSessionId };
        });
      },

      addMessage: (sessionId, message) => {
        const newMessage = {
          ...message,
          id: uuidv4(),
        };
        set((state) => ({
          sessions: state.sessions.map((s) => {
            if (s.id === sessionId) {
              const updatedMessages = [...s.messages, newMessage];
              let newTitle = s.title;
              if (s.title === "New Chat" && message.role === "user") {
                newTitle =
                  message.content.substring(0, 30) +
                  (message.content.length > 30 ? "..." : "");
              }
              return { ...s, messages: updatedMessages, title: newTitle };
            }
            return s;
          }),
        }));
      },

      setSearchResults: (sessionId, results) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, searchResults: results } : s,
          ),
        }));
      },

      getCurrentSession: () => {
        const { sessions, currentSessionId } = get();
        return sessions.find((s) => s.id === currentSessionId) || null;
      },

      getSessionById: (id) => {
        return get().sessions.find((s) => s.id === id) || null;
      },
    }),
    {
      name: "story_seeker_chats_v1",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
