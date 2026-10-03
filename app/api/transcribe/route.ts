export const runtime = 'nodejs';

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const audio = form?.get('file');
  if (!(audio instanceof File) || !audio.type.startsWith('audio/')) return Response.json({ error: { code: 'INVALID_AUDIO', message: 'Audio file wajib ada.' } }, { status: 422 });
  const key = process.env.GROQ_API_KEY;
  if (!key) return Response.json({ error: { code: 'AI_UNAVAILABLE', message: 'Groq belum dikonfigurasi.' } }, { status: 503 });
  const payload = new FormData();
  payload.append('file', audio, audio.name || 'audio.webm');
  payload.append('model', 'whisper-large-v3-turbo');
  payload.append('response_format', 'verbose_json');
  const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', { method: 'POST', headers: { Authorization: `Bearer ${key}` }, body: payload });
  const data = await response.json().catch(() => null);
  if (!response.ok) return Response.json({ error: { code: 'AI_REQUEST_FAILED', message: 'Transkripsi Groq gagal.' } }, { status: 502 });
  return Response.json({ text: typeof data?.text === 'string' ? data.text : '', segments: Array.isArray(data?.segments) ? data.segments : [] });
}
