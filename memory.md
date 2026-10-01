# 🧠 Luna AI — Project Memory & Persistent Context (`memory.md`)

> **Single Source of Context Across Sessions**  
> File ini mencatat seluruh arsitektur, keputusan, status fase, divisi agen, dan preferensi proyek agar sesi baru dapat langsung melanjutkan tanpa pengulangan konteks.

---

## 1. Project Overview & Target
- **Nama Proyek:** Luna AI Video Editor
- **Repositori:** `https://github.com/luciferKERO/LunaEditor`
- **Target Deployment:** **Vercel** (Next.js App Router / React PWA, Vercel Serverless / Edge API Routes).
- **Core Philosophy:** AI-native video editor nyata (bukan mock/simulasi). UI terikat real state, timeline reaktif, dan asisten holografik Luna dengan live telemetry.
- **Initial Data State:** **Zero mock data** (aplikasi baru mulai dengan state kosong total).
- **Client Machine Constraint:** Laptop ringan — semua komputasi berat dialihkan ke Cloud AI (Whisper API / Groq / Gemini) & Web Audio API client-side native (Crest Factor & waveform).

---

## 2. Struktur 9 Fase Pengembangan (Phase 0 – Phase 8)

1. **Phase 0: Discovery & Vercel Architecture Adaptation** *(Active)*
   - Audit `prd.md`, adaptasi arsitektur ke Vercel Serverless, baseline CodeGraph, inventaris aset.
2. **Phase 1: Architecture Approval & Contract Specification**
   - Finalisasi Contract A (Project Model), Contract B (EditDecision), Contract C (AIEditEvent Stream SSE).
3. **Phase 2: Foundation & Vercel Deployment Setup**
   - Scaffold Next.js + Tailwind + Framer Motion, setup `vercel.json`, IndexedDB persistence layer, zero-mock verify.
4. **Phase 3: Cloud AI & Client-side Audio Engine**
   - Web Audio API (Crest Factor analyzer) + Vercel Cloud AI Route (Whisper & moment scoring) + 4 Style EDL Generator (Chill, Meme, Competitive, YT Long).
5. **Phase 4: Holographic UI & Responsive Workspace**
   - 3 Halaman (Home, Workspace, Output), Multi-Track Timeline reaktif, Luna Hologram HUD (8 dynamic states), PWA support.
6. **Phase 5: Pipeline Integration & Event Synchronization**
   - SSoT data flow: Cloud AI -> EditDecision -> Timeline -> SSE Event -> Luna HUD & Activity Log.
7. **Phase 6: Video Processing & Export Architecture**
   - Browser preview player, multi-track audio ducking BGM, export pipeline (16:9 Landscape & 9:16 Vertical).
8. **Phase 7: QA, Vercel Performance & Hardening**
   - End-to-end testing di live Vercel, memory benchmark, edge case & error recovery.
9. **Phase 8: Final Review & Release**
   - Sign-off Studio Producer & Reality Checker, final README & setup guide, launch readiness.

---

## 3. Divisi Agency Agents & Peran (NEXUS Protocol)

1. **Command / Orchestration:**
   - `Agents Orchestrator`: Routing tugas & kontrol pipeline multi-agent.
   - `Studio Producer`: Quality gates & otorisasi transisi fase.
   - `Project Shepherd`: Penjaga SSoT arsitektur, CodeGraph governance, resolusi konflik.
   - `Senior Project Manager`: Backlog governance & pelacakan milestone.
2. **Product:**
   - `Product Manager`: Penjaga PRD, user stories (Gameplay, Shorts, YT).
   - `Sprint Prioritizer`: Prioritas fitur Vercel/Cloud vs Client-side.
   - `Trend Researcher`: Riset gaya editing video (Chill, Meme, Competitive).
   - `Feedback Synthesizer`: Sintesis feedback performa & testing.
3. **Engineering:**
   - `Frontend Developer`: Next.js App Router, Timeline UI, Video Preview, PWA.
   - `Backend Architect`: Vercel Serverless API, IndexedDB + Cloud State.
   - `AI Engineer`: Cloud AI API integration (Whisper/Groq/Gemini), moment detection.
   - `Video Editing Systems Architect`: Web Audio API, waveform, ducking, export engine.
   - `Senior Developer`: Integrasi arsitektur cloud/serverless, optimasi memory browser.
   - `DevOps Automator`: Vercel config, CI/CD, env secrets, build optimization.
4. **Design:**
   - `UX Architect`: Information architecture, layout 3 halaman, workflow editor.
   - `UI Designer`: Dark cinematic UI tokens, visual hierarchy hemat GPU.
   - `Visual Storyteller`: Luna hologram visual expressions & telemetry states.
   - `Whimsy Injector`: Web audio visualizer & reactive timeline micro-interactions.
   - `Brand Guardian`: Konsistensi brand Luna AI tanpa nama kreator di UI.
5. **Testing / QA:**
   - `Evidence Collector`: Pengumpulan bukti visual (URL Vercel, screenshot, log).
   - `API Tester`: Pengujian Vercel API routes & data contracts.
   - `Test Results Analyzer`: Analisis build logs, Web Vitals, dan error triage.
   - `Performance Benchmarker`: Lighthouse score, client memory, 60fps timeline.
   - `Reality Checker`: Final gate validator (memastikan semua fungsi real, zero fake).
6. **Specialist Pool:**
   - `Security Specialist`: Sanitasi file upload, proteksi API keys.
   - `Tool Evaluator`: Evaluasi efisiensi cloud API & browser encoding.
   - `Workflow Optimizer`: Optimasi latency serverless & streaming SSE.

---

## 4. Key Contracts & Protocols

- **Contract A (Project State):** Disimpan di IndexedDB browser + Cloud DB, dimulai dari kondisi kosong (*empty state*).
- **Contract B (EditDecision):** Format terstruktur keputusan AI (`sourceStart`, `sourceEnd`, `timelineStart`, `timelineEnd`, `action`, `reason`, `confidence`).
- **Contract C (AIEditEvent):** Server-Sent Events (SSE) / event emitter lokal untuk menggerakkan ekspresi Luna Hologram dan log aktivitas.
- **CodeGraph Intelligence:** Basis data `.codegraph/codegraph.db` wajib diinspeksi sebelum perubahan arsitektur.
- **Handoff Protocol:** Setiap perpindahan tugas wajib menggunakan template `[LUNA AGENT HANDOFF]` dengan bukti eksekusi (*evidence-based*).

---

## 5. Asset Baseline
- 69 file BGM terindeks di `assets/index.json` (`funny` dan `santai`) dengan metadata sample rate 48kHz, energy score, dan mood tags.
