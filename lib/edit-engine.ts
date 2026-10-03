import { EditDecision, EditStyle, TimelineClip } from './contracts';

export function buildTimeline(decisions: EditDecision[], style: EditStyle): TimelineClip[] {
  return decisions.filter((decision) => decision.action !== 'cut').map((decision, index) => ({
    ...decision,
    track: index % 3 === 0 ? 'video' : style === 'meme' ? 'music' : 'voice',
  }));
}
