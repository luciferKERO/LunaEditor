# LUNA — AI Video Editing Studio

AI-powered gameplay video editor. Transform raw VODs and gameplay footage into polished montages, shorts, and highlights with one click.

## Features

- **4 Edit Styles**: Chill, Action, Meme, Cinematic — each with tuned scoring, cut timing, and transitions
- **AI Pipeline**: Silence detection, scene detection, Whisper STT, beat-sync analysis, auto-cut algorithm
- **Multi-Track Timeline**: Professional NLE workspace with V2/V1/A1/A2/A3 tracks, transport controls, zoom
- **Kinetic Subtitles**: Word-by-word animated captions with style-specific presets
- **BGM Library**: 69 pre-indexed tracks (funny/santai) with intelligent style matching
- **Multi-Format Export**: 16:9, 9:16 (smart crop), 1:1 with LUFS normalization
- **QC Automation**: Audio levels, frame drops, color space, resolution validation
- **Duration Presets**: Short (1-3m), Fast (5-10m), Full (10-15m), Extended (15-20m)

## Architecture

```
luna/
├── apps/
│   ├── web/          # Next.js 14 + Tailwind + Framer Motion
│   └── api/          # Python FastAPI + FFmpeg + Whisper
├── packages/
│   ├── db/           # Drizzle ORM schema
│   └── shared/       # Shared types and constants
├── assets/
│   └── bgm/          # 69 BGM tracks (funny/ + santai/)
└── agents/           # 27 AI agent definitions (8 divisions)
```

## Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- FFmpeg (with ffprobe)
- PostgreSQL (or Docker)

### Development

```bash
# Install frontend deps
pnpm install

# Start frontend
pnpm dev

# Start backend
cd apps/api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Or use Docker Compose
docker compose up
```

### Environment

Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` — PostgreSQL connection
- `REDIS_URL` — Redis for job queue
- `R2_*` — Cloudflare R2 for media storage (optional for local dev)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS v4, Framer Motion, Zustand |
| Backend | Python FastAPI, SQLAlchemy async, asyncpg |
| AI Pipeline | FFmpeg, Whisper, PySceneDetect |
| Database | PostgreSQL |
| Queue | Redis (planned) |
| Storage | Cloudflare R2 (S3-compatible) |
| Deploy | Vercel (frontend) + Railway (backend) |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/projects` | GET/POST | List/create projects |
| `/api/projects/:id` | GET | Get project details |
| `/api/upload` | POST | Upload media file |
| `/api/jobs/:projectId` | GET | List project jobs |
| `/api/pipeline/:id/run` | POST | Start AI pipeline |
| `/api/pipeline/:id/ws` | WS | Real-time pipeline progress |
| `/api/bgm` | GET | List BGM library |
| `/api/bgm/index` | POST | Rebuild BGM index |
| `/api/bgm/recommend/:style` | GET | Get BGM recommendation |
| `/api/export/:id` | POST | Start export render |
| `/api/export/:id/qc` | GET | Get QC results |

## AI Pipeline Stages

1. **Media Ingest** — FFprobe metadata extraction
2. **Silence Detection** — FFmpeg silencedetect filter
3. **Scene Detection** — FFmpeg scene change analysis
4. **Subtitle Generation** — Whisper transcription (faster-whisper preferred)
5. **Beat Sync** — PCM peak detection + crest factor analysis
6. **Smart Assembly** — Style-weighted clip scoring + selection

## Cloud Deploy (Deferred)

When ready to deploy:
1. **Frontend**: `vercel deploy` (vercel.json configured)
2. **Backend**: Push to Railway (railway.toml configured)
3. **Database**: Railway PostgreSQL add-on
4. **Storage**: Configure R2 env vars
5. **Redis**: Upstash serverless Redis

## License

Private — All rights reserved.
