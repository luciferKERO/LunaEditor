export const styles = ['meme', 'calm', 'competitive', 'youtube-long'] as const;
export type EditStyle = (typeof styles)[number];
export type HudState = 'IDLE' | 'ANALYZING' | 'THINKING' | 'SELECTING' | 'EDITING' | 'WARNING' | 'SUCCESS' | 'RENDERING';
export type TrackKind = 'video' | 'voice' | 'discord' | 'music';

export type Asset = { id: string; name: string; kind: 'video' | 'audio'; durationMs: number; sizeBytes: number; file?: Blob };
export type EditDecision = { id: string; assetId: string; sourceStartMs: number; sourceEndMs: number; timelineStartMs: number; timelineEndMs: number; action: 'keep' | 'cut' | 'emphasize'; reason: string; confidence: number };
export type TimelineClip = EditDecision & { track: TrackKind };
export type Project = { id: string; name: string; createdAt: string; updatedAt: string; style: EditStyle; assets: Asset[]; decisions: EditDecision[]; clips: TimelineClip[] };
export type AIEditEvent = { id: string; projectId: string; sequence: number; type: 'analysis.started' | 'analysis.progress' | 'decision.created' | 'analysis.completed' | 'error'; state: HudState; message: string; progress: number; timestamp: string };

export function emptyProject(name = 'Untitled project'): Project {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), name, createdAt: now, updatedAt: now, style: 'youtube-long', assets: [], decisions: [], clips: [] };
}

export function validateDecision(value: unknown): value is EditDecision {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === 'string' && typeof v.assetId === 'string' && typeof v.sourceStartMs === 'number' && typeof v.sourceEndMs === 'number' && v.sourceEndMs > v.sourceStartMs && typeof v.confidence === 'number' && v.confidence >= 0 && v.confidence <= 1;
}
