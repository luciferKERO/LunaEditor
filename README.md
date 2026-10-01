# 🌙 Luna AI — AI-Native Video Editing Workstation

> **Autonomous AI Video Editor with Interactive Timeline & Holographic Telemetry**  
> Give Luna raw footage. Luna understands it, edits it, explains what she is doing in real-time, and produces the final video.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Architecture](https://img.shields.io/badge/Architecture-Next.js%20App%20Router-blue?style=for-the-badge)](https://nextjs.org)
[![NEXUS Protocol](https://img.shields.io/badge/Orchestration-NEXUS%20Agency%20Agents-purple?style=for-the-badge)](docs/agency-agents-roster.md)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📖 Overview

**Luna AI** is a next-generation, AI-native automatic video editing workstation designed for content creators, gaming creators, streamers, and short-form video editors. 

Instead of acting like an opaque "auto-cut button" with fake loading bars, Luna works visibly alongside you. As the AI scans your footage, you see candidates identified, pacing trimmed, transitions applied, and background music ducked in real-time on a state-driven multi-track timeline guided by Luna's holographic HUD assistant.

```
RAW VIDEO ──► INGESTION ──► AI ANALYSIS ──► CANDIDATE MOMENTS ──► EDIT DECISIONS (EDL) ──► TIMELINE ──► RENDER ──► FINAL VIDEO
```

---

## ✨ Key Features

- **⚡ AI-Native Analysis Pipeline:** Automated scene detection, speech recognition (Fast-Whisper / Cloud AI), acoustic peak detection (Crest Factor), and semantic scoring.
- **🎛️ Real State-Driven Multi-Track Timeline:** Dynamic timeline representing actual clips, transitions, speed ramps, waveforms, and AI markers.
- **🤖 Holographic Assistant HUD (Luna):** 8 responsive telemetry states (`IDLE`, `ANALYZING`, `THINKING`, `SELECTING`, `EDITING`, `WARNING`, `SUCCESS`, `RENDERING`) displaying real-time reasoning and dialogue.
- **🎨 Modular Editing Genres:**
  - **Chill:** Relaxed pacing, subtle transitions, atmospheric BGM, low visual noise.
  - **Meme:** High-speed comedic timing, punch-ins, context-aware SFX, zoom highlights.
  - **Competitive:** High-energy action cuts, kill/clutch highlight prioritization, speed ramps, audio synchronization.
  - **YouTube Long:** Structured narrative continuity, dead-time removal, balanced pacing.
- **📐 Dual Aspect Ratio Transformation:**
  - **YouTube Landscape (`16:9` - 1920x1080)**
  - **TikTok / Shorts Vertical (`9:16` - 1080x1920)** with intelligent subject framing.
- **🔊 Intelligent Audio Ducking:** Automatic volume ducking on background music during speech peaks and intense gameplay moments.
- **☁️ Cloud & Vercel Optimized:** Serverless API routes + lightweight Web Audio API client-side execution to ensure smooth performance without taxing user hardware.
- **🔒 Zero Mock Data Philosophy:** Clean state by default with persistent storage via IndexedDB and cloud synchronization.

---

## 🏗️ Architecture & SSoT Contracts

Luna AI enforces three canonical contracts as the Single Source of Truth (SSOT):

```
┌─────────────────────────────────────────────────────────────┐
│                       PROJECT STATE                         │
│                    (Contract A: Schema)                     │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
       ┌───────▼────────┐             ┌────────▼────────┐
       │   AI ENGINE    │             │   TIMELINE UI   │
       │  EditDecision  ├────────────►│  (Contract B)   │
       └───────┬────────┘             └────────┬────────┘
               │                               │
               │      AIEditEvent Stream       │
               └──────────────► (Contract C) ──┘
                                       │
                              ┌────────▼────────┐
                              │  LUNA HUD & LOG │
                              │    RENDERER     │
                              └─────────────────┘
```

1. **Contract A (Project Model):** Single state tree managing metadata, settings, assets, analysis, timeline tracks, and outputs.
2. **Contract B (EditDecision):** Standardized decision list (`sourceStart`, `sourceEnd`, `timelineStart`, `timelineEnd`, `action`, `reason`, `confidence`).
3. **Contract C (AIEditEvent):** Server-Sent Events (SSE) stream driving the HUD, timeline indicators, and live activity logs.

---

## 👥 Multi-Agent NEXUS Operating Model

Luna AI is built using the **NEXUS Multi-Agent Framework** with 6 specialized divisions:

| Division | Core Agents | Primary Responsibility |
|---|---|---|
| **Command / Orchestration** | `Agents Orchestrator`, `Studio Producer`, `Project Shepherd`, `Senior PM` | Pipeline control, quality gates, architecture compliance |
| **Product** | `Product Manager`, `Sprint Prioritizer`, `Trend Researcher`, `Feedback Synthesizer` | PRD fidelity, creator workflows, feature prioritization |
| **Engineering** | `Frontend Dev`, `Backend Architect`, `AI Engineer`, `Video Architect`, `Senior Dev`, `DevOps` | Next.js app shell, Cloud AI orchestration, timeline, rendering |
| **Design** | `UX Architect`, `UI Designer`, `Visual Storyteller`, `Whimsy Injector`, `Brand Guardian` | Dark cinematic interface, Luna HUD expressions, visual tokens |
| **Testing / QA** | `Evidence Collector`, `Reality Checker`, `Test Results Analyzer`, `API Tester`, `Benchmarker` | Evidence-based quality gates, performance profiling, regression tests |
| **Specialist Pool** | `Security Specialist`, `Tool Evaluator`, `Workflow Optimizer` | Upload sanitization, secret protection, serverless cold-start tuning |

*Detailed agent activation rules and handoff templates are documented in [docs/agency-agents-roster.md](docs/agency-agents-roster.md).*

---

## 🚀 Development Roadmap (9 Phases)

- [x] **Phase 0: Discovery & Vercel Architecture Adaptation** — Baseline CodeGraph, asset indexing, spec alignment.
- [ ] **Phase 1: Architecture Approval & Contract Specification** — SSoT TypeScript schemas & gate sign-off.
- [ ] **Phase 2: Foundation & Vercel Deployment Setup** — Next.js scaffolding, Tailwind, IndexedDB, Vercel CI/CD.
- [ ] **Phase 3: Cloud AI & Client-side Audio Engine** — Web Audio API Crest Factor + Cloud Whisper & moment scoring.
- [ ] **Phase 4: Holographic UI & Responsive Workspace** — Interactive timeline, Luna Hologram HUD, PWA support.
- [ ] **Phase 5: Pipeline Integration & Event Synchronization** — Full integration of AI events, timeline, and HUD.
- [ ] **Phase 6: Video Processing & Export Architecture** — Multi-track audio ducking, 16:9 & 9:16 export pipeline.
- [ ] **Phase 7: QA, Vercel Performance & Hardening** — End-to-end testing, memory benchmarking, error recovery.
- [ ] **Phase 8: Final Review & Release** — Release verification, full documentation, launch readiness.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling & Animation:** Tailwind CSS, Framer Motion, Lucide Icons
- **Audio & Signal Analysis:** Web Audio API (Native Browser AudioContext)
- **AI & Transcription:** Cloud AI API (Whisper / Groq / Gemini endpoints)
- **Persistence:** IndexedDB (Client-side) + Cloud Storage Adapter
- **Deployment:** Vercel (Edge / Serverless Functions)

---

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm / pnpm / yarn
- Modern web browser (Chrome, Edge, Firefox, Safari)

### Installation

```bash
# Clone the repository
git clone https://github.com/luciferKERO/LunaEditor.git
cd LunaEditor

# Install dependencies (once scaffolded)
npm install

# Setup environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
