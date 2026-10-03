import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client } from '@/lib/r2-client';
import { objectKey } from '@/lib/r2';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { projectId?: string; filename?: string; contentType?: string } | null;
  if (!body?.projectId || !body.filename || !body.contentType?.startsWith('video/')) return Response.json({ error: { code: 'INVALID_UPLOAD', message: 'projectId, filename, dan video contentType wajib ada.' } }, { status: 422 });
  try {
    const { client, bucket } = r2Client();
    const key = objectKey(body.projectId, body.filename);
    const uploadUrl = await getSignedUrl(client, new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: body.contentType }), { expiresIn: 900 });
    return Response.json({ key, uploadUrl, expiresIn: 900 });
  } catch (error) {
    console.error('R2 upload URL failed', error instanceof Error ? error.message : 'unknown');
    return Response.json({ error: { code: 'STORAGE_UNAVAILABLE', message: 'R2 belum siap.' } }, { status: 503 });
  }
}
