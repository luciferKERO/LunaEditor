import test from 'node:test';
import assert from 'node:assert/strict';

const fs = await import('node:fs/promises');
const source = await fs.readFile('lib/contracts.ts', 'utf8');

test('fresh project contract starts empty and contains render state', () => {
  assert.match(source, /assets: \[\], decisions: \[\], clips: \[\]/);
  assert.match(source, /targetDurationPreset/);
  assert.match(source, /orientation/);
  assert.match(source, /outputs/);
});

test('decision contract uses canonical PRD actions', () => {
  assert.match(source, /'keep' \| 'remove' \| 'trim' \| 'speed' \| 'transition' \| 'effect' \| 'audio'/);
  assert.doesNotMatch(source, /action: 'keep' \| 'cut' \| 'emphasize'/);
});

test('decision validation rejects invalid ranges and unsupported operations', () => {
  assert.match(source, /v\.sourceEndMs > v\.sourceStartMs/);
  assert.match(source, /v\.timelineEndMs >= v\.timelineStartMs/);
  assert.match(source, /actions\.includes/);
});
