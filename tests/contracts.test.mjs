import test from 'node:test';
import assert from 'node:assert/strict';

test('fresh project contract starts empty', async () => {
  const source = await import('node:fs/promises').then((fs) => fs.readFile('lib/contracts.ts', 'utf8'));
  assert.match(source, /assets: \[\], decisions: \[\], clips: \[\]/);
});

test('decision contract bounds confidence', async () => {
  const source = await import('node:fs/promises').then((fs) => fs.readFile('lib/contracts.ts', 'utf8'));
  assert.match(source, /v\.confidence >= 0 && v\.confidence <= 1/);
});
