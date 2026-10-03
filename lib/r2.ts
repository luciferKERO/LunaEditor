export function requireR2Config(env: Record<string, string | undefined> = process.env) {
  const required = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME'];
  const missing = required.filter((key) => !env[key]);
  if (missing.length) throw new Error(`Missing R2 configuration: ${missing.join(', ')}`);
  return { accountId: env.R2_ACCOUNT_ID!, accessKeyId: env.R2_ACCESS_KEY_ID!, secretAccessKey: env.R2_SECRET_ACCESS_KEY!, bucketName: env.R2_BUCKET_NAME! };
}

export function objectKey(projectId: string, filename: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 160);
  if (!projectId || !safe) throw new Error('Invalid object key');
  return `projects/${encodeURIComponent(projectId)}/${safe}`;
}
