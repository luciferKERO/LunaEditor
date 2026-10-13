// LUNA shared types and constants

export const STYLES = ["chill", "action", "meme", "cinematic"] as const;
export type Style = (typeof STYLES)[number];

export const ORIENTATIONS = ["landscape", "portrait", "dual"] as const;
export type Orientation = (typeof ORIENTATIONS)[number];

export const DURATIONS = ["short", "fast", "full", "extended"] as const;
export type DurationPreset = (typeof DURATIONS)[number];

export const DURATION_RANGES: Record<DurationPreset, { min: number; max: number; label: string }> = {
  short:    { min: 30,  max: 90,   label: "~60 Seconds" },
  fast:     { min: 120, max: 180,  label: "2–3 Minutes" },
  full:     { min: 300, max: 600,  label: "5–10 Minutes" },
  extended: { min: 900, max: 1200, label: "15–20 Minutes" },
};

export const PROJECT_STATUS = ["draft", "processing", "ready", "exported", "error"] as const;
export type ProjectStatus = (typeof PROJECT_STATUS)[number];

export const JOB_TYPES = ["ingest", "analyze", "detect", "compose", "sync", "caption", "render", "deliver"] as const;
export type JobType = (typeof JOB_TYPES)[number];

export const JOB_STATUS = ["queued", "running", "completed", "failed"] as const;
export type JobStatus = (typeof JOB_STATUS)[number];

export const TRACK_TYPES = ["V1", "V2", "A1", "A2", "A3"] as const;
export type TrackType = (typeof TRACK_TYPES)[number];

export const TRACK_COLORS: Record<TrackType, string> = {
  V1: "#6366f1", // Video primary — indigo
  V2: "#ec4899", // Overlays — pink
  A1: "#06b6d4", // Dialogue — cyan
  A2: "#06b6d4", // BGM — cyan
  A3: "#10b981", // SFX — emerald
};

export interface Project {
  id: string;
  title: string;
  style: Style;
  orientation: Orientation;
  durationPreset: DurationPreset;
  status: ProjectStatus;
  sourceFile?: string;
  sourceUrl?: string;
  sourceDuration?: number;
  sourceResolution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Timeline {
  id: string;
  projectId: string;
  duration: number;
  fps: number;
  resolution: string;
  cuts: Cut[];
}

export interface Cut {
  id: string;
  timelineId: string;
  track: TrackType;
  startTime: number;
  endTime: number;
  clipType: string;
  label: string;
  metadata?: Record<string, unknown>;
}

export interface Job {
  id: string;
  projectId: string;
  type: JobType;
  status: JobStatus;
  progress: number;
  resultJson?: Record<string, unknown>;
  createdAt: string;
}

export interface PipelineStep {
  step: number;
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  startedAt?: string;
  completedAt?: string;
  details?: string;
}

// API response wrappers
export interface ApiResponse<T> {
  data: T;
  ok: boolean;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  perPage: number;
}
