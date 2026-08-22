import { create } from "zustand";

export interface MacbookStore {
  color: string;
  setColor: (color: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  texture?: string;
  setTexture: (texture: string) => void;
  reset: () => void;
}

export const useMacbookStore = create<MacbookStore>((set) => ({
  color: "#adb5bd",
  setColor: (color: string) => set({ color }),
  scale: 0.08,
  setScale: (scale: number) => set({ scale }),
  texture: "/videos/feature-1.mp4",
  setTexture: (texture: string) => set({ texture }),
  reset: () => set({ color: "#adb5bd", scale: 0.08 }),
}));
