import { EditDecision, EditStyle } from './contracts';

export function deterministicDecisions(projectId: string, style: EditStyle): EditDecision[] {
  const assetId = `${projectId}:primary-video`;
  const emphasis = style === 'meme' || style === 'competitive';
  return [{ id: `${projectId}:intro`, assetId, sourceStartMs: 0, sourceEndMs: 3000, timelineStartMs: 0, timelineEndMs: 3000, action: emphasis ? 'emphasize' : 'keep', reason: 'Opening context retained.', confidence: 0.8 }];
}
