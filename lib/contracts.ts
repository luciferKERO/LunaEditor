export const styles = ['meme', 'calm', 'competitive', 'youtube-long'] as const;
export type EditStyle = (typeof styles)[number];
export type TargetDurationPreset = '1-3' | '5-10' | '10-20';
export type Orientation = 'landscape' | 'vertical';
export type HudState = 'IDLE' | 'ANALYZING' | 'THINKING' | 'SELECTING' | 'EDITING' | 'WARNING' | 'SUCCESS' | 'RENDERING' | 'ERROR';
export type TrackKind = 'video' | 'voice' | 'discord' | 'music';
export type DecisionAction = 'keep' | 'remove' | 'trim' | 'speed' | 'transition' | 'effect' | 'audio';

export type Asset = { id: string; name: string; kind: 'video' | 'audio'; durationMs: number; sizeBytes: number; file?: Blob };
export type EditDecision = {
  id: string; assetId: string; sourceStartMs: number; sourceEndMs: number;
  timelineStartMs: number; timelineEndMs: number; action: 'keep' | 'remove' | 'trim' | 'speed' | 'transition' | 'effect' | 'audio';
  reason: string; confidence: number; metadata?: Record<string, unknown>;
};
export type TimelineClip = EditDecision & { track: TrackKind };
export type RenderState = 'idle' | 'validating' | 'queued' | 'rendering' | 'completed' | 'error';
export type RenderOutput = { id: string; url: string; filename: string; durationMs: number; sizeBytes: number; orientation: Orientation; createdAt: string };
export type Project = {
  id: string; name: string; createdAt: string; updatedAt: string; style: EditStyle;
  targetDurationPreset: TargetDurationPreset; orientation: Orientation; assets: Asset[];
  decisions: EditDecision[]; clips: TimelineClip[]; aiEvents: AIEditEvent[]; activityLog: string[];
  render: { state: RenderState; progress: number; error?: string }; outputs: RenderOutput[];
};
export type AIEditEvent = {
  id: string; projectId: string; sequence: number;
  type: 'analysis' | 'detection' | 'selection' | 'cut' | 'transition' | 'speed' | 'audio' | 'caption' | 'effect' | 'render' | 'warning' | 'complete' | 'analysis.started' | 'analysis.progress' | 'decision.created' | 'analysis.completed' | 'error';
  state: HudState; message: string; progress: number; timestamp: string; clipId?: string;
};

export function emptyProject(name = 'Untitled project'): Project {
  const now = new Date().toISOString();
  return { id: crypto.randomUUID(), name, createdAt: now, updatedAt: now, style: 'youtube-long', targetDurationPreset: '5-10', orientation: 'landscape', assets: [], decisions: [], clips: [], aiEvents: [], activityLog: [], render: { state: 'idle', progress: 0 }, outputs: [] };
}

export function validateDecision(value: unknown): value is EditDecision {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  const actions = ['keep', 'remove', 'trim', 'speed', 'transition', 'effect', 'audio'];
  return typeof v.id === 'string' && typeof v.assetId === 'string' && typeof v.sourceStartMs === 'number' && typeof v.sourceEndMs === 'number' && v.sourceEndMs > v.sourceStartMs && typeof v.timelineStartMs === 'number' && typeof v.timelineEndMs === 'number' && v.timelineEndMs >= v.timelineStartMs && typeof v.action === 'string' && actions.includes(v.action) && typeof v.confidence === 'number' && v.confidence >= 0 && v.confidence <= 1;
}
