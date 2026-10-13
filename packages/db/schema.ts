import { pgTable, uuid, varchar, text, integer, real, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const styleEnum = pgEnum("style", ["chill", "action", "meme", "cinematic"]);
export const orientationEnum = pgEnum("orientation", ["landscape", "portrait", "dual"]);
export const durationPresetEnum = pgEnum("duration_preset", ["short", "fast", "full", "extended"]);
export const projectStatusEnum = pgEnum("project_status", ["draft", "processing", "ready", "exported", "error"]);
export const jobTypeEnum = pgEnum("job_type", ["ingest", "analyze", "detect", "compose", "sync", "caption", "render", "deliver"]);
export const jobStatusEnum = pgEnum("job_status", ["queued", "running", "completed", "failed"]);
export const trackTypeEnum = pgEnum("track_type", ["V1", "V2", "A1", "A2", "A3"]);

// Projects
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  style: styleEnum("style").notNull().default("action"),
  orientation: orientationEnum("orientation").notNull().default("landscape"),
  durationPreset: durationPresetEnum("duration_preset").notNull().default("fast"),
  status: projectStatusEnum("status").notNull().default("draft"),
  sourceFile: text("source_file"),
  sourceUrl: text("source_url"),
  sourceDuration: real("source_duration"), // seconds
  sourceResolution: varchar("source_resolution", { length: 32 }),
  sourceFps: real("source_fps"),
  sourceSize: integer("source_size"), // bytes
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Timelines
export const timelines = pgTable("timelines", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  duration: real("duration").notNull().default(0),
  fps: real("fps").notNull().default(60),
  resolution: varchar("resolution", { length: 32 }).notNull().default("1920x1080"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Cuts (clips on timeline tracks)
export const cuts = pgTable("cuts", {
  id: uuid("id").defaultRandom().primaryKey(),
  timelineId: uuid("timeline_id").notNull().references(() => timelines.id, { onDelete: "cascade" }),
  track: trackTypeEnum("track").notNull(),
  startTime: real("start_time").notNull(),
  endTime: real("end_time").notNull(),
  clipType: varchar("clip_type", { length: 64 }).notNull().default("video"),
  label: varchar("label", { length: 255 }),
  sourceOffset: real("source_offset"), // offset into source file
  metadata: jsonb("metadata"),
});

// Jobs (pipeline processing tasks)
export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  type: jobTypeEnum("type").notNull(),
  status: jobStatusEnum("status").notNull().default("queued"),
  progress: real("progress").notNull().default(0),
  result: jsonb("result"),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
});

// BGM Library
export const bgmTracks = pgTable("bgm_tracks", {
  id: uuid("id").defaultRandom().primaryKey(),
  filename: varchar("filename", { length: 512 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(), // "funny" | "santai"
  title: varchar("title", { length: 255 }),
  bpm: real("bpm"),
  duration: real("duration"),
  energy: real("energy"), // 0-1 normalized
  mood: varchar("mood", { length: 64 }),
  fileUrl: text("file_url"),
});

// Transcripts (Whisper STT output)
export const transcripts = pgTable("transcripts", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  segments: jsonb("segments").notNull(), // [{start, end, text, confidence}]
  language: varchar("language", { length: 16 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Highlights (AI-detected moments)
export const highlights = pgTable("highlights", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  startTime: real("start_time").notNull(),
  endTime: real("end_time").notNull(),
  score: real("score").notNull(), // 0-100 excitement score
  type: varchar("type", { length: 64 }), // "kill", "clutch", "hype", "funny"
  label: varchar("label", { length: 255 }),
  metadata: jsonb("metadata"),
});
