import { create } from "zustand";

export interface MacbookStore {
  color: string;
  setColor: (color: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  reset: () => void;
}

export const useMacbookStore = create<MacbookStore>((set) => ({
  color: "#adb5bd",
  setColor: (color: string) => set({ color }),
  scale: 0.08,
  setScale: (scale: number) => set({ scale }),
  reset: () => set({ color: "#adb5bd", scale: 0.08 }),
}));
