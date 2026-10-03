import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('production code does not expose provider keys to browser', async () => {
  const page = await readFile('app/page.tsx', 'utf8');
  const workspace = await readFile('app/workspace/page.tsx', 'utf8');
  assert.doesNotMatch(`${page}\n${workspace}`, /GROQ_API_KEY|R2_SECRET_ACCESS_KEY|NEXT_PUBLIC_GROQ/);
});

test('upload endpoint limits signed uploads to video content', async () => {
  const route = await readFile('app/api/upload-url/route.ts', 'utf8');
  assert.ok(route.includes("startsWith('video/'"));
});
