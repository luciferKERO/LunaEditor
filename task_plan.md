# Task Plan: Luna AI Video Editor (Vercel-Deployed AI-Native Web App)

## Goal
Bangun Luna AI Video Editor sebagai aplikasi web/PWA modern yang di-deploy ke Vercel, ringan di perangkat client (bebas beban komputasi lokal berat), terintegrasi dengan cloud AI provider, dan diorkestrasi oleh 6 divisi NEXUS Agency Agents.

## Next Step
Implement real render architecture from reconciled contracts. Vercel remains orchestration; large-video render needs separate worker/runtime.

## Current Phase
Phase 6: Video Processing & Export Architecture — contract reconciliation complete; real render pending

---

## Agency Agents Roster & Divisi Terpilih

| Divisi | Agent Role | Level Izin | Tanggung Jawab Utama (Fokus Vercel & Web) |
|---|---|---|---|
| **Command / Orchestration** | `Agents Orchestrator` | Level 1-2 | Kontrol pipeline, routing antar agen, sinkronisasi milestone |
| | `Studio Producer` | Level 1 | Quality gates, verifikasi build Vercel, deployment sign-off |
| | `Project Shepherd` | Level 1 | Penjaga kontrak SSoT, arsitektur serverless/edge, CodeGraph governance |
| | `Senior Project Manager` | Level 1 | Manajemen backlog, pelacakan deliverables Vercel-ready |
| **Product** | `Product Manager` | Level 1 | Penjaga PRD, zero mock data awal, user journey web & mobile PWA |
| | `Sprint Prioritizer` | Level 1 | Prioritisasi fitur cloud vs client-side, mitigasi limit serverless |
| | `Trend Researcher` | Level 0 | Riset UX web video editor & style preset (Chill, Meme, Competitive) |
| | `Feedback Synthesizer` | Level 0 | Analisis feedback performa web/PWA |
| **Engineering** | `Frontend Developer` | Level 2 | Next.js App Router / React, Tailwind, Framer Motion, Timeline UI, PWA support |
| | `Backend Architect` | Level 2 | Vercel Serverless / Edge API Routes, Cloud DB / IndexedDB persistence |
| | `AI Engineer` | Level 2 | Cloud AI API orchestration (Groq/OpenAI/Gemini) untuk Whisper & scoring |
| | `Video Editing Systems Architect` | Level 2 | Client-side Web Audio API (Crest Factor), WebCodecs / FFmpeg.wasm / Cloud Render |
| | `Senior Developer` | Level 2 | Integrasi arsitektur cloud/serverless, optimasi memory browser client |
| | `DevOps Automator` | Level 2 | Vercel deployment config, CI/CD, env secrets, build optimization |
| **Design** | `UX Architect` | Level 1 | Responsive web workspace, PWA installability, layout 3 halaman |
| | `UI Designer` | Level 1 | Dark cinematic design tokens, glassmorphism hemat GPU, visual hierarchy |
| | `Visual Storyteller` | Level 1 | Luna hologram character HUD & live telemetry state visualizer |
| | `Whimsy Injector` | Level 1 | Web audio visualizer, smooth timeline micro-interactions |
| | `Brand Guardian` | Level 0 | Konsistensi identitas visual Luna AI tanpa nama kreator di UI |
| **Testing / QA** | `Evidence Collector` | Level 3 | Bukti deployment Vercel URL, snapshot UI state, zero-mock verify |
| | `API Tester` | Level 3 | Uji Vercel API routes, streaming latency, error handling |
| | `Test Results Analyzer` | Level 3 | Analisis web vitals, bundle size, Vercel build log |
| | `Performance Benchmarker` | Level 3 | Lighthouse score, memory usage client-side, FPS timeline playback |
| | `Reality Checker` | Level 3 | Quality gate final: verifikasi fungsionalitas nyata di Vercel |
| **Specialist Pool** | `Security Specialist` | Level 0-3 | Sanitasi upload file, proteksi API keys di Vercel env, CORS security |
| | `Tool Evaluator` | Level 0 | Evaluasi cloud AI provider & browser video encoding efficiency |
| | `Workflow Optimizer` | Level 1 | Optimasi cold start serverless & response streaming |

---

## Phases

### Phase 0: Discovery & Vercel Architecture Adaptation
- [ ] Audit arsitektur PRD: sesuaikan dari local Python/heavy worker ke Vercel Serverless + Web Client-first
- [ ] Tentukan stack cloud AI (Audio Transcription via Cloud API / Web Audio API)
- [ ] Setup baseline CodeGraph dan dokumentasi adaptasi Vercel di `docs/`
- **Agents:** Studio Producer, Project Shepherd, Backend Architect, DevOps Automator
- **Status:** complete

### Phase 1: Architecture Approval & Contract Specification
- [ ] Schema Contract A (Project Model) berbasis IndexedDB + Cloud State (start empty state, no mock data)
- [ ] Schema Contract B (EditDecision) & Contract C (AIEditEvent Stream via SSE / Serverless)
- [ ] Gate sign-off oleh Studio Producer & Reality Checker
- **Agents:** Studio Producer, Project Shepherd, Reality Checker, Senior Developer
- **Status:** complete

### Phase 2: Foundation & Vercel Deployment Setup
- [x] Scaffold Next.js App Router + TypeScript
- [ ] Tambah Tailwind CSS + Framer Motion (tidak dibutuhkan; CSS native dipakai)
- [x] Konfigurasi Vercel deployment (build scripts, env templates)
- [x] Setup persistence IndexedDB dengan zero pre-populated mock data
- [x] Verifikasi production build
- [x] Verifikasi live deployment di Vercel
- **Agents:** Frontend Developer, Backend Architect, DevOps Automator
- **Status:** in_progress

### Phase 3: Cloud AI & Client-side Audio Engine
- [x] Implementasi Web Audio API client-side untuk acoustic Crest Factor
- [x] Implementasi SSE Vercel API route untuk analysis event stream
- [x] Implementasi EDL baseline untuk 4 style
- [x] Hubungkan cloud transcription provider boundary (Groq Whisper route)
- [ ] Hubungkan moment scoring provider dengan footage nyata
- **Agents:** AI Engineer, Video Editing Systems Architect, Backend Architect
- **Status:** in_progress

### Phase 4: Holographic UI & Responsive Workspace
- [x] Implementasi 3 halaman utama: Home (project list), Workspace (editor), Output (render view)
- [x] Multi-track timeline baseline dan AI activity stream
- [x] Luna HUD state baseline
- [x] PWA manifest & mobile responsiveness
- **Agents:** UI Designer, Frontend Developer, Visual Storyteller, Whimsy Injector
- **Status:** complete

### Phase 5: Pipeline Integration & Event Synchronization
- [x] Contract reconciliation against PRD (`Project`, `EditDecision`, `AIEditEvent`, render/output state)
- [x] Baseline analysis -> EditDecision -> IndexedDB project state
- [x] SSE event stream -> Luna HUD + activity log
- [x] Decision events persist to IndexedDB
- [ ] Cloud AI provider and R2 upload integration
- [x] Auto-save / load UX completion (duplicate belum diperlukan)
- **Agents:** Senior Developer, Frontend Developer, Backend Architect, AI Engineer
- **Status:** in_progress

### Phase 6: Video Processing & Export Architecture
- [x] Browser preview proof-of-concept (cut skip + BGM preview; does not satisfy PRD render requirement)
- [ ] Implement real edit application and render graph from canonical EditDecision
- [ ] Implementasi client/serverless export workflow (16:9 Landscape & 9:16 Vertical)
- [x] Output page (Player, metadata, edit decisions)
- **Agents:** Video Editing Systems Architect, Backend Architect, Frontend Developer
- **Status:** in_progress

### Phase 7: QA, Vercel Performance & Hardening
- [ ] End-to-end test di live Vercel environment
- [ ] Benchmark memory browser client & bundle size
- [ ] Verifikasi zero initial mock data & error recovery
- **Agents:** Evidence Collector, API Tester, Performance Benchmarker, Reality Checker, Security Specialist
- **Status:** pending

### Phase 8: Final Review & Release
- [ ] Final sign-off oleh Reality Checker & Studio Producer
- [ ] Dokumentasi lengkap (`README.md`, setup env Vercel, deployment guide)
- **Agents:** Studio Producer, Project Shepherd, Reality Checker, DevOps Automator
- **Status:** pending

---

## Key Questions & Decisions

1. **Q:** Mengapa pindah dari local Python worker ke Vercel Serverless + Web Client?  
   **A:** Laptop user memiliki keterbatasan daya komputasi. Vercel Serverless + Cloud AI API + Web Audio API client-side memindahkan beban berat ke cloud dan browser native engine yang sangat ringan.

2. **Q:** Bagaimana kebijakan data awal?  
   **A:** Mengikuti standing rule profil pengguna: Aplikasi baru harus mulai dalam kondisi data kosong total (zero pre-populated mock data).

---

## Errors Encountered

| Error | Attempt | Resolution |
|---|---|---|
| - | 1 | - |
