import { deterministicDecisions } from '@/lib/analysis';
import { AIEditEvent, EditStyle } from '@/lib/contracts';

export const runtime = 'edge';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { projectId?: string; style?: EditStyle } | null;
  if (!body?.projectId || typeof body.projectId !== 'string') return Response.json({ error: { code: 'INVALID_REQUEST', message: 'projectId wajib ada.' } }, { status: 422 });
  const style = body.style ?? 'youtube-long';
  const encoder = new TextEncoder();
  const now = new Date().toISOString();
  const event = (type: AIEditEvent['type'], state: AIEditEvent['state'], message: string, progress: number, data?: unknown): AIEditEvent & { data?: unknown } => ({ id: crypto.randomUUID(), projectId: body.projectId!, sequence: progress, type, state, message, progress, timestamp: now, data });
  const events = [event('analysis.started', 'ANALYZING', `Analisis ${style} dimulai.`, 5), event('analysis.progress', 'THINKING', 'Audio dan ritme sedang dipetakan.', 50), event('decision.created', 'SELECTING', 'Baseline edit decision dibuat.', 75, { decisions: deterministicDecisions(body.projectId, style) }), event('analysis.completed', 'SUCCESS', 'Analisis awal selesai.', 100)];
  const stream = new ReadableStream({ start(controller) { for (const item of events) controller.enqueue(encoder.encode(`event: luna\ndata: ${JSON.stringify(item)}\n\n`)); controller.close(); } });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', Connection: 'keep-alive' } });
}
