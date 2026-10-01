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
