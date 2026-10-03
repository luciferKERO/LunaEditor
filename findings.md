# Findings & Knowledge Base: Luna AI (Vercel & Web Architecture)

## Project Baseline & Deployment Target
- **Dokumen SSOT:** `prd.md` diadaptasi untuk target deployment Vercel.
- **Target Deployment:** Vercel (Next.js App Router / React PWA, Edge / Serverless API routes, zero heavy native background daemon di laptop).
- **Strategi Komputasi Ringan:**
  - AI Speech & Transcription: Cloud AI API (Groq/OpenAI Whisper API/Gemini) untuk pemrosesan super cepat tanpa beban CPU/GPU laptop.
  - Audio Acoustic Analysis: Web Audio API (Native browser AudioContext) untuk Crest Factor & waveform streaming instan.
  - State Persistence: IndexedDB di browser client + Cloud DB storage, dimulai dari *zero pre-populated mock data*.

## Inventaris Aset & Dependensi
- **Aset BGM Terindeks:** 69 file audio terkurasi di `assets/index.json` (`funny` & `santai`), siap di-serve sebagai public static assets atau cloud storage.
- **CodeGraph Status:** `.codegraph/codegraph.db` memetakan relasi kode dan dependensi.

## Kontrak Arsitektur Utama (PRD Section 45 Adaptasi Web)
1. **Contract A (Project Model):** State tunggal di IndexedDB / REST API.
2. **Contract B (EditDecision):** Schema keputusan AI yang sinkron dengan visual timeline dan render engine.
3. **Contract C (AIEditEvent):** Server-Sent Events (SSE) / client-side event emitter untuk telemetry Luna Hologram & HUD.

## PRD Audit — 2026-10-03
- `prd.md` is canonical SSOT. Required flow is RAW VIDEO → IMPORT → MEDIA ANALYSIS → AI UNDERSTANDING → MOMENT DETECTION → EDIT DECISIONS → TIMELINE → AI VISUAL EDITING → QUALITY VALIDATION → RENDER → FINAL VIDEO.
- Current implementation stops at preview/timeline. Browser `onTimeUpdate` skipping a cut is not edit application and does not satisfy PRD render requirements.
- PRD requires three pages HOME, WORKSPACE, OUTPUT; this part exists in Next routes. Literal `public/*.html` files are shells only, not canonical app pages.
- PRD requires target duration presets (1–3, 5–10, 10–20 minutes), orientation 16:9 and 9:16, real state-driven timeline, AI event stream, activity log, reports, render validation, persisted outputs, playback and download.
- Current `Project` lacks settings, analysis, AI events, activity log, render, outputs, target duration, orientation, and output metadata. Current `EditDecision` uses `cut`/`emphasize`, while PRD canonical actions are keep/remove/trim/speed/transition/effect/audio.
- Current `/api/analyze` generates deterministic timestamp decisions from duration; it does not perform scene, motion, audio, speech, semantic moment, or genre scoring required by PRD.
- Current package has no FFmpeg/WebCodecs/render-worker layer. Therefore no honest final MP4 claim is possible.
- Correct next phase: stop adding UI patches; reconcile contracts first, then choose real renderer architecture, then implement analysis → EDL → timeline → audio/effects → validation → render → output with evidence.
