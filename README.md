# LUNA — AI Gameplay Video Editor

> Transform raw gameplay footage into polished, viral-ready clips in one click. Professional-grade video editing powered by AI, built for speed.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black) ![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009485) ![License](https://img.shields.io/badge/License-Private-red)

## ✨ Features

### 🎬 Smart Editing
- **4 Style Presets**: Chill, Action, Meme, Cinematic — each with tuned pacing, color grades, and transitions
- **Auto-Cut Engine**: AI scans your footage and builds highlight reels automatically
- **Silence Auto-Remove**: Detects and strips dead air in real-time
- **Scene Detection**: Automatically finds cuts, scene changes, and interesting moments

### 🎵 Audio Intelligence  
- **Beat Sync**: Locks clips to music beats for perfect timing
- **BGM Library**: 69 pre-indexed royalty-friendly tracks (funny/chill styles)
- **Multi-Track Audio**: Separate mic, Discord, and BGM with independent volume control
- **LUFS Normalization**: YouTube-compliant audio levels out of the box

### 🎤 Professional Subtitles
- **Whisper STT**: Local-first speech-to-text with word-level timestamps
- **Kinetic Captions**: Word-by-word animation with style-matched effects
- **ASS Export**: Full subtitle styling for OBS/streaming

### 🖥️ Studio Workspace
- **Multi-Track Timeline**: V2/V1 (video), A1/A2/A3 (audio) tracks with real-time playback
- **Live Monitor**: Program view with transport controls and frame-accurate scrubbing
- **Drag & Drop**: Intuitive media pool, quick clip arrangement
- **Zoom Levels**: 1:1 pixel perfect to 60-min overview

### 📤 Export Studio  
- **Smart Crop**: Auto-framing for 16:9 → 9:16 vertical shorts
- **Multi-Format**: 16:9 landscape, 9:16 portrait, 1:1 square in one render
- **QC Automation**: Validates audio levels, frame rate, color space, resolution
- **YouTube Chapters**: Auto-generated from scene cuts
- **Duration Presets**: Short (1–3m), Fast (5–10m), Full (10–15m), Extended (15–20m)

### ⚡ Performance
- **Offline-First**: Works completely local — no cloud uploads required
- **GPU Accelerated**: FFmpeg hardware encoding for 10x faster exports
- **Streaming Ready**: Real-time pipeline progress over WebSocket
- **Zero Setup**: SQLite for dev, PostgreSQL for production

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ ([download](https://nodejs.org))
- **Python** 3.11+ ([download](https://python.org))
- **FFmpeg** + ffprobe ([download](https://ffmpeg.org) or `brew install ffmpeg`)
- **pnpm** (`npm i -g pnpm`)

### Local Development (5 minutes)

```bash
# 1. Clone & install
git clone https://github.com/luciferKERO/LunaEditor.git
cd LunaEditor
pnpm install

# 2. Copy environment
cp .env.example .env

# 3. Start backend (new terminal)
cd apps/api
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000

# 4. Start frontend (main terminal)
pnpm dev
```

**Open** → http://localhost:3000

### Docker (With PostgreSQL + Redis)

```bash
docker compose up
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
# Database: localhost:5432 (luna/luna_dev_password)
```

---

## 📁 Project Structure

```
luna/
├── apps/
│   ├── web/                    # Next.js 14 frontend
│   │   ├── src/app/           # Page routes + layouts
│   │   ├── src/components/    # UI components (Sidebar, Timeline, Monitor, etc.)
│   │   ├── src/lib/           # Zustand stores, utilities
│   │   └── public/            # Static assets
│   │
│   └── api/                    # FastAPI backend
│       ├── ai/                 # AI pipelines (FFmpeg, Whisper, beat sync)
│       ├── routers/            # API endpoints (projects, upload, pipeline, export, bgm)
│       ├── models.py           # SQLAlchemy models
│       ├── main.py             # FastAPI app + CORS
│       └── requirements.txt    # Python dependencies
│
├── packages/
│   ├── db/                     # Shared database schema (Drizzle ORM)
│   └── shared/                 # TypeScript types & constants
│
├── assets/
│   └── bgm/                    # 69 pre-indexed BGM tracks
│       ├── funny/              # (Meme, Action styles)
│       └── santai/             # (Chill, Cinematic styles)
│
├── agents/                     # 27 AI agent definitions (8 divisions)
├── docker-compose.yml          # Dev environment: Postgres + Redis + API
├── DEPLOY.md                   # Production deployment guide
└── pnpm-workspace.yaml         # Monorepo workspace config
```

---

## 🎯 How It Works

### Pipeline Architecture

```
Upload → Ingest → Silence → Scene → Subtitles → Beat Sync → Auto-Cut → Preview
         (FFprobe) (Filter)  (Detect) (Whisper)  (PCM Peaks) (Scoring)
```

### The 4 Styles

| Style | Pace | Color | Transitions | Ideal For |
|-------|------|-------|-------------|-----------|
| **Chill** | Slow, contemplative | Warm, cinematic | Fades, dissolves | Gameplay walkthrough, story clips |
| **Action** | Fast, aggressive | High contrast, saturated | Cuts, pulse effects | Multiplayer montages, plays |
| **Meme** | Chaotic, comedic | Vibrant, bold | Whips, zooms, reverses | Funny moments, highlights |
| **Cinematic** | Smooth, rhythmic | Color-graded, polished | Slow-mo builds, music sync | Trailers, showreels |

### Auto-Cut Algorithm

1. **Silence Detection** — Remove gaps using FFmpeg `silencedetect`
2. **Scene Analysis** — Find shot boundaries (brightness/color changes)
3. **Audio Peaks** — Detect music beats and voice peaks
4. **Scoring** — Rate each clip by style:
   - Meme: High motion, face detection, audio spikes
   - Action: Fast cuts, scene changes, high color variance
   - Chill: Smooth regions, low jitter, ambient sound
   - Cinematic: Beat alignment, gradual changes, depth cues
5. **Selection** — Pick top N clips respecting duration limits

---

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/api/projects` | GET/POST | List/create projects |
| `/api/projects/{id}` | GET | Project details |
| `/api/upload` | POST | Upload media file |
| `/api/pipeline/{id}/run` | POST | Start AI pipeline |
| `/api/pipeline/{id}/ws` | WS | Real-time progress |
| `/api/bgm` | GET | List all BGM tracks |
| `/api/bgm/index` | POST | Rebuild index |
| `/api/bgm/recommend/{style}` | GET | Get track for style |
| `/api/export/{id}` | POST | Start export render |
| `/api/export/{id}/qc` | GET | QC results |

**Full OpenAPI docs** → http://localhost:8000/docs (when running)

---

## 🌍 Deployment

### Vercel (Frontend)

```bash
vercel deploy
```

- Auto-detects monorepo
- Builds with `pnpm --filter web build`
- Outputs to `apps/web/.next`

### Railway (Backend + Database)

```bash
# 1. Connect GitHub repo on railway.app
# 2. Select this repo
# 3. Add PostgreSQL 16 plugin
# 4. Add Redis 7 plugin
# 5. Deploy
```

**Setup guide** → See [DEPLOY.md](DEPLOY.md)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Animation**: Framer Motion 14
- **State**: Zustand 5
- **Icons**: Lucide React
- **Build**: pnpm workspaces

### Backend
- **Framework**: FastAPI 0.104
- **Async**: asyncpg, SQLAlchemy 2.0
- **AI**: FFmpeg, Whisper, pyannote.audio
- **Audio**: librosa, scipy, pydub
- **Storage**: Cloudflare R2 / local fs
- **Deploy**: Docker, Uvicorn

### Database
- **Local**: SQLite (zero setup)
- **Production**: PostgreSQL 16
- **ORM**: SQLAlchemy async

---

## 📊 Project Stats

- **69 BGM Tracks** pre-indexed
- **4 Edit Styles** with tuned parameters
- **6 AI Pipeline Stages**
- **Multi-Track Timeline** (V2/V1/A1/A2/A3)
- **27 AI Agents** orchestrated across 8 divisions
- **4 Duration Presets** (1–20 minutes)
- **3 Export Formats** (16:9, 9:16, 1:1)

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m "feat: description"`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📝 License

Private — All rights reserved. Built with ❤️ for creators.

---

## 🎬 Get Started

**[Launch App →](http://localhost:3000)** | **[Read Docs →](./DEPLOY.md)** | **[Report Issue →](https://github.com/luciferKERO/LunaEditor/issues)**

**Made with** ✨ **for video creators who move fast.**
