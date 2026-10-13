import { create } from "zustand";

export type Style = "chill" | "action" | "meme" | "cinematic";
export type Orientation = "landscape" | "portrait" | "dual";
export type DurationPreset = "short" | "fast" | "full" | "extended";

interface ProjectFormState {
  title: string;
  style: Style;
  orientation: Orientation;
  durationPreset: DurationPreset;
  sourceFile: File | null;
  sourceFileName: string;
  sourceFileSize: number;
  sourceDuration: string;
  // AI toggles
  silenceRemoval: boolean;
  kineticSubtitles: boolean;
  beatSync: boolean;
  facecamFraming: boolean;
  // Actions
  setTitle: (t: string) => void;
  setStyle: (s: Style) => void;
  setOrientation: (o: Orientation) => void;
  setDurationPreset: (d: DurationPreset) => void;
  setSourceFile: (f: File | null) => void;
  toggleSilenceRemoval: () => void;
  toggleKineticSubtitles: () => void;
  toggleBeatSync: () => void;
  toggleFacecamFraming: () => void;
  reset: () => void;
}

const defaults = {
  title: "",
  style: "action" as Style,
  orientation: "landscape" as Orientation,
  durationPreset: "fast" as DurationPreset,
  sourceFile: null,
  sourceFileName: "",
  sourceFileSize: 0,
  sourceDuration: "",
  silenceRemoval: true,
  kineticSubtitles: true,
  beatSync: true,
  facecamFraming: true,
};

export const useProjectForm = create<ProjectFormState>((set) => ({
  ...defaults,
  setTitle: (title) => set({ title }),
  setStyle: (style) => set({ style }),
  setOrientation: (orientation) => set({ orientation }),
  setDurationPreset: (durationPreset) => set({ durationPreset }),
  setSourceFile: (f) =>
    set({
      sourceFile: f,
      sourceFileName: f?.name || "",
      sourceFileSize: f?.size || 0,
    }),
  toggleSilenceRemoval: () => set((s) => ({ silenceRemoval: !s.silenceRemoval })),
  toggleKineticSubtitles: () => set((s) => ({ kineticSubtitles: !s.kineticSubtitles })),
  toggleBeatSync: () => set((s) => ({ beatSync: !s.beatSync })),
  toggleFacecamFraming: () => set((s) => ({ facecamFraming: !s.facecamFraming })),
  reset: () => set(defaults),
}));
