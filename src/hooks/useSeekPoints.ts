"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const FREE_POINTS = 6;

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0]; // e.g. "2026-04-19"
}

interface SeekPointStore {
  points: number;
  lastResetDate: string;
  /** Sync state: check if daily reset is needed and apply it */
  syncReset: () => void;
  /** Deduct 1 point. Returns false if no points remain. */
  consumePoint: () => boolean;
  /** Returns current live points after sync */
  getPoints: () => number;
}

export const useSeekPoints = create<SeekPointStore>()(
  persist(
    (set, get) => ({
      points: FREE_POINTS,
      lastResetDate: getTodayKey(),

      syncReset: () => {
        const today = getTodayKey();
        if (get().lastResetDate !== today) {
          set({ points: FREE_POINTS, lastResetDate: today });
        }
      },

      consumePoint: () => {
        get().syncReset();
        const current = get().points;
        if (current <= 0) return false;
        set({ points: current - 1 });
        return true;
      },

      getPoints: () => {
        get().syncReset();
        return get().points;
      },
    }),
    {
      name: "story_seeker_seek_points_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
