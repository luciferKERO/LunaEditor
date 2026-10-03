import { EditDecision, EditStyle } from './contracts';

export function deterministicDecisions(projectId: string, style: EditStyle, durationMs: number): EditDecision[] {
  const assetId = `${projectId}:primary-video`;
  const duration = Math.max(12000, durationMs || 120000);
  const cutStart = Math.min(Math.max(5000, Math.round(duration * 0.25)), duration - 6000);
  const cutEnd = Math.min(cutStart + Math.max(3000, Math.round(duration * 0.08)), duration - 3000);
  const emphasis = style === 'meme' || style === 'competitive';
  return [
    { id: `${projectId}:opening`, assetId, sourceStartMs: 0, sourceEndMs: cutStart, timelineStartMs: 0, timelineEndMs: cutStart, action: emphasis ? 'emphasize' : 'keep', reason: 'Opening context retained.', confidence: 0.82 },
    { id: `${projectId}:cut-${cutStart}`, assetId, sourceStartMs: cutStart, sourceEndMs: cutEnd, timelineStartMs: cutStart, timelineEndMs: cutStart, action: 'cut', reason: 'Low-signal section removed from edit.', confidence: 0.76 },
    { id: `${projectId}:ending`, assetId, sourceStartMs: cutEnd, sourceEndMs: duration, timelineStartMs: cutStart, timelineEndMs: duration - (cutEnd - cutStart), action: 'keep', reason: 'Remaining gameplay retained after cut.', confidence: 0.79 },
  ];
}
