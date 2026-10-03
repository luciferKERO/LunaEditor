# Luna contracts

## Contract A: Project
Client owns canonical project state in IndexedDB (`luna-editor/projects`). Fresh install returns empty list. Cloud sync deferred Phase 5.

## Contract B: EditDecision
Required: source range, timeline range, action, reason, confidence [0..1]. Timeline only renders non-cut decisions.

## Contract C: AIEditEvent
`POST /api/analyze` emits SSE events named `luna`. Payload has ID, sequence, HUD state, progress, message, timestamp. Invalid request returns `{ error: { code, message } }` with HTTP 422.

Architecture gate: local-first, API key never reaches client, browser handles audio metrics. Phase 5 wires real provider and EventSource reconnect.
