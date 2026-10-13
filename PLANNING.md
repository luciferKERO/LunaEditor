# LUNA AI Video Editing Studio — Cloud Deployment Plan

## PROJECT OVERVIEW

LUNA = AI-powered gameplay video editor, cloud-deployed.
Converts raw gameplay VODs into edited montages/shorts via AI pipeline.
Reference UI: NovaCut Studio mockups (3 pages: Home, Workspace, Export).

---

## SELECTED AGENTS (from agency-agents repo)

### DIVISION 1: CORE ENGINEERING (8 agents)
| Agent | File | Role in LUNA |
|-------|------|-------------|
| Software Architect | engineering/engineering-software-architect.md | System design, service boundaries, data flow |
| Backend Architect | engineering/engineering-backend-architect.md | API layer, DB schema, cloud infra |
| Frontend Developer | engineering/engineering-frontend-developer.md | React/Next.js UI from NovaCut mockups |
| AI Engineer | engineering/engineering-ai-engineer.md | Whisper STT, silence detection, highlight scoring |
| Video Streaming Engineer | engineering/engineering-video-streaming-engineer.md | FFmpeg pipelines, HLS preview, transcode ladders |
| Data Engineer | engineering/engineering-data-engineer.md | Media metadata pipeline, BGM indexing, job queue |
| API Platform Engineer | engineering/engineering-api-platform-engineer.md | REST/WebSocket API contracts, rate limiting |
| DevOps Automator | engineering/engineering-devops-automator.md | CI/CD, Docker, cloud deploy automation |

### DIVISION 2: DESIGN (3 agents)
| Agent | File | Role in LUNA |
|-------|------|-------------|
| UI Designer | design/design-ui-designer.md | Component library from DESIGN.md tokens |
| UX Architect | design/design-ux-architect.md | Interaction flows, CSS architecture |
| Visual Storyteller | design/design-visual-storyteller.md | Branding, motion design, export thumbnails |

### DIVISION 3: AI/ML PIPELINE (3 agents)
| Agent | File | Role in LUNA |
|-------|------|-------------|
| Prompt Engineer | engineering/engineering-prompt-engineer.md | LLM prompts for highlight detection, auto-titles |
| RAG Pipeline Engineer | engineering/engineering-rag-pipeline-engineer.md | Context retrieval for style/BGM matching |
| Data Visualization Engineer | engineering/engineering-data-visualization-engineer.md | Timeline waveform, audio meters, telemetry charts |

### DIVISION 4: MEDIA & CONTENT (3 agents)
| Agent | File | Role in LUNA |
|-------|------|-------------|
| Short-Video Editing Coach | marketing/marketing-short-video-editing-coach.md | Editing rules per style (meme/chill/action/cinematic) |
| Video Optimization Specialist | marketing/marketing-video-optimization-specialist.md | YouTube SEO, chapters, thumbnails, retention |
| Content Creator | marketing/marketing-content-creator.md | Auto-generate titles, descriptions, tags |

### DIVISION 5: PRODUCT & PROJECT (3 agents)
| Agent | File | Role in LUNA |
|-------|------|-------------|
| Product Manager | product/product-manager.md | Feature prioritization, roadmap, user stories |
| Studio Producer | project-management/project-management-studio-producer.md | Sprint planning, cross-team coordination |
| Workflow Architect | specialized/specialized-workflow-architect.md | Pipeline state machine, job flow specs |

### DIVISION 6: ORCHESTRATION & OPS (3 agents)
| Agent | File | Role in LUNA |
|-------|------|-------------|
| Agents Orchestrator | specialized/agents-orchestrator.md | Multi-agent coordination, pipeline sequencing |
| SRE | engineering/engineering-sre.md | Monitoring, SLOs, incident response |
| Studio Operations | project-management/project-management-studio-operations.md | Day-to-day ops, resource tracking |

### DIVISION 7: QUALITY & SECURITY (3 agents)
| Agent | File | Role in LUNA |
|-------|------|-------------|
| Test Automation Engineer | testing/testing-test-automation-engineer.md | E2E tests, Playwright, CI integration |
| Code Reviewer | engineering/engineering-code-reviewer.md | PR review, quality gates |
| Database Optimizer | engineering/engineering-database-optimizer.md | Query perf, indexing, schema tuning |

### DIVISION 8: AUDIO (1 agent)
| Agent | File | Role in LUNA |
|-------|------|-------------|
| Game Audio Engineer | game-development/game-audio-engineer.md | BGM ducking, SFX sync, beat detection, LUFS |

**TOTAL: 27 agents selected**

---

## CLOUD PLATFORM RECOMMENDATION

### Deploy: Railway.app
WHY:
- Deploy from GitHub push (zero config Dockerfile)
- Native PostgreSQL addon (1 click)
- Native Redis addon (for job queue)
- WebSocket support out of box
- Auto-sleep on free tier, scale on paid
- No Kubernetes/Terraform complexity
- Supports monorepo (multiple services from 1 repo)
- Environment variables UI, logs, metrics built-in
- Pricing: usage-based, $5/mo hobby starts

ALTERNATIVE considered & rejected:
- Vercel: great for frontend but no long-running jobs (video processing needs >60s)
- Fly.io: good but more config overhead
- Render: similar to Railway but worse DX for multi-service
- AWS/GCP: overkill infra management for this stage

### Storage: Cloudflare R2
WHY:
- S3-compatible API (all existing tools work)
- ZERO egress fees (critical for video — GB of downloads)
- Free tier: 10GB storage, 10M reads/mo
- Paid: $0.015/GB/mo storage only
- Native CDN via Cloudflare (fast global delivery)
- Pre-signed upload URLs (client uploads direct, skip server)

ALTERNATIVE considered & rejected:
- AWS S3: egress fees destroy budget for video
- Supabase Storage: 1GB free, not built for heavy video
- Backblaze B2: good pricing but worse CDN integration
- GCS: egress fees

### Database: Railway PostgreSQL (primary) + Upstash Redis (queue)
WHY:
- Railway Postgres: zero config, same platform as app
- Upstash Redis: serverless, per-request pricing, global
- Both have generous free tiers

### Frontend: Vercel (Next.js)
WHY:
- Best Next.js host (they made it)
- Edge functions for API routes that don't need video processing
- Free tier generous for frontend
- Preview deployments per PR

---

## ARCHITECTURE OVERVIEW

```
[Vercel - Frontend]          [Railway - Backend API]
  Next.js + React    <--->   Node.js/Python FastAPI
  Tailwind + Framer          WebSocket (realtime)
  NovaCut Design System      Job Queue (BullMQ/Redis)
        |                           |
        v                           v
  [Cloudflare R2]           [Railway PostgreSQL]
  Raw VODs (upload)          Projects, timelines,
  Processed videos           cuts, metadata
  BGM library                AI analysis results
  Thumbnails/exports         User preferences
        |                           |
        v                           v
  [Cloudflare CDN]           [Upstash Redis]
  Video streaming            Job queue
  Asset delivery             Realtime pub/sub
                             Session cache
```

### AI Processing Pipeline (runs on Railway workers)
```
1. INGEST   → Upload to R2, extract metadata (ffprobe)
2. ANALYZE  → Whisper STT, silence detection, crest factor
3. DETECT   → Highlight scoring (audio energy, speech patterns)
4. COMPOSE  → Auto-cut timeline based on style preset
5. SYNC     → Beat-match BGM, apply ducking
6. CAPTION  → Kinetic subtitle generation
7. RENDER   → FFmpeg final output to R2
8. DELIVER  → Generate thumbnails, SRT, chapters
```

### Tech Stack
- Frontend: Next.js 14, React 18, Tailwind CSS, Framer Motion
- Backend: Python FastAPI (video/AI) + Node.js (realtime/API)
- Database: PostgreSQL (Drizzle ORM)
- Queue: BullMQ on Redis
- AI: faster-whisper, librosa, numpy (audio analysis)
- Video: FFmpeg (server-side processing)
- Storage: Cloudflare R2 (S3 API)
- Auth: NextAuth.js or Clerk
- Realtime: WebSocket via Socket.io

---

## FILE STRUCTURE (target)

```
luna/
├── apps/
│   ├── web/                  # Next.js frontend (Vercel)
│   │   ├── app/              # App router pages
│   │   ├── components/       # NovaCut design system components
│   │   ├── lib/              # Client utilities
│   │   └── public/           # Static assets
│   └── api/                  # FastAPI backend (Railway)
│       ├── routes/           # API endpoints
│       ├── services/         # Business logic
│       ├── workers/          # Background job processors
│       └── ai/               # ML pipeline modules
├── packages/
│   ├── db/                   # Drizzle schema + migrations
│   ├── ui/                   # Shared UI components
│   └── shared/               # Types, constants, utils
├── agents/                   # Selected agency-agents (27 files)
│   ├── engineering/
│   ├── design/
│   ├── ai-pipeline/
│   ├── media/
│   ├── product/
│   ├── orchestration/
│   └── quality/
├── assets/
│   └── bgm/                  # Local BGM library (69 tracks)
├── stitch_ai_video_editing_studio_ui/  # Reference mockups
├── docker-compose.yml
├── railway.toml
└── PLANNING.md               # This file
```

---

## PHASE PLAN

### Phase 1: Foundation (Week 1-2)
- Monorepo setup (turborepo/pnpm)
- Design system from DESIGN.md tokens → Tailwind config
- DB schema (projects, timelines, cuts, jobs)
- R2 bucket setup + upload API
- Basic auth

### Phase 2: Core Pipeline (Week 3-4)
- FFmpeg ingest + metadata extraction
- Whisper STT worker
- Silence detection + highlight scoring
- Job queue with progress tracking
- WebSocket progress to frontend

### Phase 3: Editor UI (Week 5-6)
- Home/Project Hub page
- Editing Workspace (timeline, viewport, inspector)
- Multi-track timeline component
- Media pool + AI pipeline panel

### Phase 4: AI Features (Week 7-8)
- Auto-cut algorithm (4 style presets)
- BGM beat-sync + ducking
- Kinetic subtitle renderer
- Facecam auto-framing

### Phase 5: Export & Polish (Week 9-10)
- Export Studio page
- Multi-format render (16:9, 9:16, 1:1)
- YouTube chapters + SRT generation
- Thumbnail generation
- QC automation

### Phase 6: Deploy & Scale (Week 11-12)
- Railway production deploy
- Vercel frontend deploy
- R2 CDN config
- Monitoring + alerting (SRE)
- Load testing
