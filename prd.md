# 🌙 Luna AI — Product Requirements Document

> **Project:** Luna AI Video Editor  
> **Repository:** `https://github.com/luciferKERO/LunaEditor`  
> **Document:** `prd.md`  
> **Status:** Master Product + Engineering Specification  
> **Primary Goal:** Build a real AI-native automatic video editing workstation.

---

## 0. Document Purpose

This document is the **single source of truth (SSOT)** for the Luna AI project.

It combines:

- Product requirements
- UX/UI requirements
- AI editing architecture
- Timeline requirements
- Media/rendering architecture
- Luna holographic assistant specification
- Project/data models
- Agency Agents / NEXUS operating model
- Agent roles and permissions
- CodeGraph shared-context protocol
- Development phases
- Quality gates
- Testing requirements
- Git/GitHub requirements
- Definition of Done

Any agent working on Luna must read this document before beginning work.

When this document conflicts with an implementation assumption, the agent must stop, inspect the current architecture and CodeGraph, and escalate the conflict rather than silently inventing a new architecture.

---

# 1. Product Vision

## 1.1 What is Luna?

**Luna AI** is an AI-native automatic video editing web application.

The user's primary workflow is:

```text
RAW VIDEO
   ↓
IMPORT
   ↓
MEDIA ANALYSIS
   ↓
AI UNDERSTANDING
   ↓
MOMENT DETECTION
   ↓
EDIT DECISIONS
   ↓
TIMELINE CONSTRUCTION
   ↓
AI VISUAL EDITING
   ↓
QUALITY VALIDATION
   ↓
RENDER
   ↓
FINAL VIDEO
```

The user should be able to provide raw footage and receive a finished edited video without manually performing conventional editing work.

Luna must feel less like an "auto-cut button" and more like an **AI editor that visibly works alongside the user**.

---

## 1.2 Product Promise

> **Give Luna the raw footage. Luna understands it, edits it, explains what she is doing, and produces the final video.**

The application must not merely fake this experience with:

- static progress bars
- decorative timelines
- fake logs
- fake AI messages
- non-functional Render buttons

The visible UI must be connected to real application state.

---

# 2. Core Product Principles

1. **Real functionality over visual simulation**
2. **One source of truth for project state**
3. **AI decisions must be structured and validated**
4. **Timeline, AI assistant, progress, logs and renderer must share state**
5. **User experience must remain understandable**
6. **AI should explain important decisions without overwhelming the user**
7. **Video processing must be modular and replaceable**
8. **Architecture must support future editing genres**
9. **Assets must be reused intelligently**
10. **No agent may silently redefine core contracts**
11. **Every major implementation requires evidence-based validation**
12. **CodeGraph is the shared map of the codebase**
13. **Canonical documentation and CodeGraph must remain synchronized**
14. **Never invent functionality merely to make a demo appear complete**

---

# 3. Target Users

Primary users:

- Content creators
- Gaming creators
- YouTubers
- TikTok/Shorts creators
- Streamers
- Users who have long raw footage but do not want to manually edit

Initial focus:

- Gameplay footage
- YouTube videos
- TikTok / Shorts
- Highlight/montage workflows

Architecture should remain generic enough to support:

- Vlogs
- Tutorials
- Storytelling
- Cinematic edits
- Documentary edits
- Music videos
- Other creator workflows

---

# 4. Application Information Architecture

Luna has three primary pages:

```text
HOME
WORKSPACE
OUTPUT
```

Supporting flows:

```text
New Project
Upload
Project Settings
AI Processing
Rendering
Error Recovery
Project Persistence
```

---

# 5. HOME PAGE

Home is the project command center.

## 5.1 Project List

Each project card should display:

- Project name
- Thumbnail
- Last modified
- Source duration
- Target duration
- Genre
- Orientation
- Status
- Render state
- Last activity

Statuses:

- Draft
- Uploading
- Analyzing
- Editing
- Ready
- Rendering
- Completed
- Error

Actions:

- New Project
- Open Project
- Rename
- Duplicate
- Delete

---

## 5.2 Asset Library

Assets include:

- Raw video
- Audio
- Music
- SFX
- Images
- Overlays
- Transitions
- Fonts
- UI assets
- Luna/hologram assets
- Generated assets

Asset metadata:

- filename
- type
- thumbnail
- duration
- dimensions
- file size
- codec/container when available
- project association
- tags

Required functionality:

- Search
- Filter
- Preview
- Metadata inspection
- Project association

### Existing assets

Before creating or downloading anything:

1. Inspect the existing project asset directory.
2. Catalog usable assets.
3. Reuse suitable assets.
4. Do not delete useful assets.
5. Do not generate thousands of redundant assets.
6. Do not randomly apply every available asset.

---

## 5.3 Reports

Reports summarize editing sessions.

Include:

- source duration
- final duration
- analyzed clips
- selected clips
- removed clips
- transitions
- speed changes
- effects
- captions
- audio adjustments
- highlights detected
- render duration
- processing duration
- warnings
- errors

---

## 5.4 System Health

Display actual system state where possible:

- AI Engine
- Video Processing
- Rendering
- Asset System
- Storage
- Runtime

States:

- Operational
- Processing
- Warning
- Error

Do not fabricate health metrics.

---

# 6. NEW PROJECT FLOW

The user creates a project with:

### Project Name

Example:

`Valorant Ranked Session`

### Raw Footage

Support drag-and-drop and file selection.

For each source file display:

- filename
- thumbnail
- duration
- resolution
- FPS
- codec/container
- upload state

Support multiple files when technically appropriate.

---

# 7. EDITING GENRES

Genres must be implemented as modular editing strategies.

## 7.1 Chill

Characteristics:

- relaxed pacing
- longer clips
- smooth transitions
- subtle effects
- calm music
- low visual noise
- atmosphere
- enjoyable gameplay

Avoid aggressive meme effects.

---

## 7.2 Meme

Characteristics:

- fast pacing
- comedic timing
- punch-ins
- zooms
- captions
- reaction emphasis
- comedic pauses
- context-aware SFX
- visual emphasis
- abrupt cuts where appropriate

Do not apply meme effects to every moment.

---

## 7.3 Competitive

Characteristics:

- high-energy pacing
- action prioritization
- highlight detection
- kills
- objectives
- wins
- clutch moments
- fast cuts
- speed ramps when useful
- impact transitions
- audio synchronization
- dead-time removal

Effects must remain purposeful.

---

## 7.4 Future Genre Compatibility

Architecture should allow:

- Cinematic
- Storytelling
- Documentary
- Montage
- Vlog
- Tutorial
- Horror
- Anime edit
- Music video

without rewriting the core engine.

---

# 8. TARGET DURATION

Supported presets:

- `1–3 minutes`
- `5–10 minutes`
- `10–20 minutes`

The duration is a **target output range**, not a blind trimming instruction.

Selection priority:

1. Important moments
2. Narrative continuity
3. Genre relevance
4. Pacing
5. Audio/visual quality
6. Target duration

Do not simply cut at a timestamp to satisfy duration.

---

# 9. ORIENTATION

Supported:

## YouTube / Landscape

`16:9`

Typical output:

`1920x1080`

## TikTok / Shorts / Vertical

`9:16`

Typical output:

`1080x1920`

Vertical conversion must use intelligent framing.

Do not stretch footage.

Keep important subjects visible where possible.

Architecture must allow future aspect ratios.

---

# 10. WORKSPACE

The Workspace is Luna's main editing environment.

Conceptual layout:

```text
┌─────────────────────────────────────────────────────────────┐
│ PROJECT | UNDO | REDO | AI STATUS | PREVIEW | RENDER       │
├───────────────┬───────────────────────────┬─────────────────┤
│               │                           │                 │
│ MEDIA /       │                           │ LUNA            │
│ ASSETS /      │       VIDEO PREVIEW       │ HOLOGRAM        │
│ AI TOOLS      │                           │                 │
│               │                           │ AI ACTIVITY     │
│               │                           │                 │
├───────────────┴───────────────────────────┴─────────────────┤
│                    TIMELINE                                 │
│                                                             │
│ Video Track 1                                               │
│ Video Track 2                                               │
│ Audio Track 1                                               │
│ Audio Track 2                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The exact layout may adapt to screen size.

---

# 11. Timeline

The timeline must be a real state-driven editing timeline.

Required concepts:

- video tracks
- audio tracks
- clips
- playhead
- time ruler
- zoom
- scrolling
- selection
- markers
- transitions
- effects indicators
- audio waveform
- AI annotations

The timeline is not decorative.

It must represent the actual project timeline.

---

# 12. Realtime AI Editing Visualization

This is a core differentiator.

When Luna performs an action, the user should see it.

Example:

```text
Luna:
"I found a strong moment at 03:42."

Timeline:
[ candidate highlight appears ]

Luna:
"That sequence fits the Competitive preset."

Timeline:
[ clip becomes selected ]

Luna:
"I'm removing repetitive footage."

Timeline:
[ rejected section becomes marked/removed ]

Luna:
"I'm tightening the transition."

Timeline:
[ transition indicator appears ]

Luna:
"The action peaks here. I'm adding a speed ramp."

Timeline:
[ speed metadata/visual indicator changes ]
```

The visual timeline is the primary progress experience.

Logs remain available as secondary detail.

---

# 13. Luna Holographic Assistant

Luna is the visible AI identity of the application.

She must not feel like a generic chatbot bubble.

Visual direction:

- holographic
- futuristic
- elegant
- transparent layers
- soft glow
- subtle particles
- floating interface elements
- responsive animation
- restrained visual effects

Inspect existing project assets before creating new assets.

---

# 14. Luna States

Required states:

### IDLE

Calm.

### ANALYZING

Scanning/processing.

### THINKING

Reasoning.

### SELECTING

Focused on candidate footage.

### EDITING

Active editing.

### WARNING

Attention required.

### SUCCESS

Completed.

### RENDERING

Rendering.

### ERROR

Clear failure state.

State must come from actual application state.

---

# 15. Luna Dialogue

Examples:

> "Let's see what we have here."

> "I'm scanning your footage for meaningful moments."

> "I found several strong sequences."

> "I'm removing repetitive footage."

> "That sequence has a strong payoff, so I'm keeping it."

> "I'm tightening the pacing here."

> "I detected a high-intensity moment."

> "I'm synchronizing the cut with the audio."

> "The edit is ready."

Dialogue must be:

- concise
- contextual
- state-driven
- non-spammy

---

# 16. AI Event System

The application requires a canonical event system.

Conceptual schema:

```ts
type AIEditEvent = {
  id: string
  timestamp: number
  type:
    | "analysis"
    | "detection"
    | "selection"
    | "cut"
    | "transition"
    | "speed"
    | "audio"
    | "caption"
    | "effect"
    | "render"
    | "warning"
    | "complete"

  clipId?: string

  sourceRange?: {
    start: number
    end: number
  }

  description: string
  userMessage?: string
  confidence?: number
}
```

The event stream drives:

- Luna state
- Luna dialogue
- timeline visualization
- progress
- activity log
- reports

There must be one authoritative event stream.

---

# 17. Progress System

Never use fake progress.

Required stages:

1. Importing
2. Media analysis
3. Scene detection
4. Highlight detection
5. Audio analysis
6. Editing decisions
7. Timeline construction
8. Effects
9. Audio mixing
10. Quality validation
11. Render preparation
12. Rendering
13. Finalization

Each stage should expose:

- status
- progress
- message
- timestamps where useful

Progress must correspond to actual work.

---

# 18. Activity Log

Logs supplement the visual experience.

Example:

```text
[12:31:04] Analyzing source footage...
[12:31:12] Detected 42 candidate moments.
[12:31:17] Removed repetitive section 00:42–01:18.
[12:31:22] Selected highlight 03:41–04:07.
[12:31:26] Applied speed ramp.
[12:31:31] Adjusted audio.
[12:31:39] Timeline assembly complete.
```

Allow detailed logs to collapse/expand.

---

# 19. Output Page

Display:

- completed projects
- rendered videos
- thumbnails
- duration
- resolution
- orientation
- genre
- render date
- file size
- render status

Completed outputs provide:

- preview
- playback
- scrubber
- fullscreen
- download/export
- open project
- render again

---

# 20. Render Workflow

The Render button is in the upper-right Workspace.

Flow:

```text
Render
  ↓
Validate Timeline
  ↓
Validate Media
  ↓
Validate Configuration
  ↓
Create Render Job
  ↓
Render
  ↓
Validate Output
  ↓
Persist Output Metadata
  ↓
Output Page
```

Do not simulate rendering.

Use a real video processing layer.

FFmpeg is an acceptable implementation choice when appropriate.

---

# 21. Video Processing Architecture

Required conceptual pipeline:

```text
Raw Media
    ↓
Media Analysis
    ↓
Scene Detection
    ↓
Semantic Understanding
    ↓
Candidate Moments
    ↓
Edit Decision List
    ↓
Timeline Model
    ↓
Effects / Audio / Captions
    ↓
Render Graph
    ↓
Final Video
```

Video processing must be isolated from the UI.

---

# 22. Edit Decision List

Canonical edit decision representation:

```ts
type EditDecision = {
  id: string
  sourceAssetId: string

  sourceStart: number
  sourceEnd: number

  timelineStart: number
  timelineEnd: number

  action:
    | "keep"
    | "remove"
    | "trim"
    | "speed"
    | "transition"
    | "effect"
    | "audio"

  reason: string

  confidence?: number

  metadata?: Record<string, unknown>
}
```

The AI produces decisions.

The timeline consumes decisions.

The renderer consumes the same decisions.

No subsystem should independently invent a competing representation.

---

# 23. AI Editing Pipeline

## Stage 1 — Ingestion

Read:

- duration
- resolution
- FPS
- codec
- container
- audio information

## Stage 2 — Analysis

Analyze:

- scene changes
- motion
- audio peaks
- silence
- speech where available
- visual activity
- repetitive sections

## Stage 3 — Semantic Moment Detection

Detect useful moments according to genre.

## Stage 4 — Scoring

Candidate scoring may use:

- visual activity
- audio intensity
- semantic importance
- novelty
- narrative continuity
- genre relevance
- repetition penalty
- duration suitability

## Stage 5 — Edit Planning

Respect:

- genre
- target duration
- orientation
- pacing
- continuity

## Stage 6 — Edit Application

Potential operations:

- cuts
- trims
- speed changes
- transitions
- effects
- captions
- audio balancing
- music
- SFX

Only apply effects when appropriate.

---

# 24. AI Provider Abstraction

Do not hardcode Luna to one AI provider.

Use an abstraction:

```text
AI Provider
    ↓
Analysis
    ↓
Reasoning
    ↓
Edit Decisions
```

Provider-specific implementation must remain replaceable.

Secrets must be environment variables.

Never hardcode credentials.

---

# 25. Validation of AI Output

Before an AI edit decision reaches the renderer, validate:

- asset exists
- timestamps are valid
- start < end
- ranges are within media duration
- timeline positions are valid
- operations are supported
- transitions have valid neighbors
- speed values are valid
- no illegal state mutation occurs

Malformed AI output must never crash the renderer.

---

# 26. Project State

Canonical project state includes:

```text
Project
├── metadata
├── settings
├── assets
├── analysis
├── editDecisions
├── timeline
├── aiEvents
├── activityLog
├── render
└── outputs
```

Project state must survive page refresh/restart according to the selected persistence architecture.

---

# 27. Recommended Project Structure

Adapt to the chosen framework:

```text
LunaEditor/
│
├── app/
│   ├── pages/
│   │   ├── home/
│   │   ├── workspace/
│   │   └── output/
│   │
│   ├── components/
│   │   ├── timeline/
│   │   ├── preview/
│   │   ├── luna/
│   │   ├── assets/
│   │   ├── projects/
│   │   └── ui/
│   │
│   ├── state/
│   ├── hooks/
│   └── styles/
│
├── core/
│   ├── ai/
│   ├── analysis/
│   ├── editing/
│   ├── timeline/
│   ├── rendering/
│   ├── assets/
│   └── projects/
│
├── server/
│   ├── api/
│   ├── workers/
│   └── services/
│
├── assets/
├── docs/
├── tests/
├── scripts/
├── .env.example
├── .gitignore
└── README.md
```

This is a conceptual target, not a reason to rewrite an existing repository blindly.

---

# 28. Technology Selection Rules

Before selecting technologies:

1. Inspect repository.
2. Inspect package configuration.
3. Inspect existing implementation.
4. Inspect available tools/skills.
5. Research current documentation when necessary.
6. Prefer mature, actively maintained libraries.
7. Avoid unnecessary dependencies.
8. Do not replace working infrastructure without a reason.

The final stack must support:

- interactive UI
- timeline
- video preview
- background jobs
- media processing
- AI orchestration
- persistence
- rendering

---

# 29. Performance Requirements

Video editing is computationally expensive.

Use appropriate:

- background workers
- asynchronous processing
- streaming progress
- proxy media
- thumbnails
- caching
- lazy loading
- efficient preview media

Do not load massive raw media unnecessarily into the browser.

---

# 30. Error Handling

Required error categories:

- unsupported media
- corrupt media
- missing asset
- failed analysis
- failed AI request
- invalid AI decision
- renderer failure
- insufficient storage
- dependency failure
- persistence failure

Errors must explain:

1. What happened
2. Why it happened when known
3. What the user can do next

Avoid raw errors such as:

`Error 500`

Prefer:

> Luna couldn't process this video because the source file appears to be corrupted. Try re-exporting it and upload it again.

---

# 31. UI/UX Direction

The product should feel:

- premium
- futuristic
- cinematic
- professional
- clean
- intelligent
- approachable

Avoid:

- excessive neon
- clutter
- generic AI-dashboard aesthetics
- excessive glassmorphism
- glowing elements everywhere
- unnecessary animation

Visual hierarchy:

1. Timeline
2. Video preview
3. Luna assistant
4. Project/media controls
5. Secondary information

---

# 32. Motion Design

Use purposeful motion for:

- page transitions
- timeline clip insertion
- AI scanning
- hologram states
- activity events
- rendering
- panel expansion
- hover interactions

Motion must not compromise performance.

---

# 33. Responsive Design

Primary target:

- desktop
- 1440p
- 1080p
- modern laptops

Workspace is desktop-first.

Home and Output should be more responsive.

---

# 34. Accessibility

Include:

- keyboard navigation
- readable contrast
- focus states
- meaningful labels
- accessible buttons
- reduced-motion consideration
- non-color-only status indicators

---

# 35. GitHub Requirements

Repository:

`https://github.com/luciferKERO/LunaEditor`

Required:

- `.gitignore`
- `.env.example`
- `README.md`
- `docs/`
- tests
- clean source structure

Never commit:

- API keys
- secrets
- passwords
- node_modules
- caches
- temporary renders
- unnecessary build artifacts

Use meaningful commits.

---

# 36. README Requirements

README must contain:

- Luna branding
- project description
- product vision
- screenshots/GIFs when actually available
- feature list
- architecture
- AI pipeline
- editing genres
- supported outputs
- setup
- environment variables
- development
- project structure
- rendering architecture
- roadmap
- contribution guidance
- license

Never fabricate screenshots.

---

# 37. Multi-Agent Development Architecture

Luna will use:

1. **Agency Agents**
2. **NEXUS orchestration**
3. **CodeGraph**
4. Canonical documentation
5. Git history
6. Tests/evidence

These systems have different responsibilities.

### Agency Agents

Provide specialist expertise.

### NEXUS

Controls sequencing, handoffs, quality gates and multi-agent execution.

### CodeGraph

Provides structural understanding of the current codebase.

### Canonical docs

Define intended product/architecture behavior.

### Git

Provides implementation history.

### Tests

Provide evidence of runtime behavior.

---

# 38. Agency Team

## 38.1 Command / Orchestration

Core:

- Agents Orchestrator
- Studio Producer
- Project Shepherd
- Senior Project Manager

Responsibilities:

- pipeline control
- task decomposition
- coordination
- handoffs
- quality gates
- escalation

---

## 38.2 Product

Core:

- Product Manager
- Sprint Prioritizer

Optional:

- Trend Researcher
- Feedback Synthesizer

Responsibilities:

- product scope
- roadmap
- requirements
- prioritization
- user needs

---

## 38.3 Engineering

Core:

- Frontend Developer
- Backend Architect
- AI Engineer
- Senior Developer
- DevOps Automator

Custom specialist:

- **Video Editing Systems Architect**

Responsibilities:

### Frontend Developer

- Home
- Workspace
- Output
- Timeline UI
- Preview
- realtime state

### Backend Architect

- API
- persistence
- jobs
- services
- project state

### AI Engineer

- analysis
- semantic understanding
- candidate scoring
- edit decisions
- AI orchestration

### Senior Developer

- complex integration
- refactoring
- architecture-sensitive fixes

### DevOps Automator

- CI/CD
- environments
- deployment
- infrastructure

### Video Editing Systems Architect

- FFmpeg
- codecs
- media metadata
- timeline execution
- EDL
- render graph
- proxy workflow
- waveform
- speed operations
- transitions
- audio processing
- render synchronization
- media performance

---

# 39. Design Team

Core:

- UX Architect
- UI Designer
- Visual Storyteller
- Whimsy Injector

Reviewer:

- Brand Guardian

Responsibilities:

### UX Architect

Own:

- information architecture
- user journeys
- editor workflow
- interaction architecture

### UI Designer

Own:

- design system
- components
- spacing
- typography
- visual hierarchy

### Visual Storyteller

Own:

- Luna presentation
- visual narrative
- cinematic moments

### Whimsy Injector

Own:

- personality
- delightful micro-interactions
- subtle AI character moments

Must not compromise usability.

### Brand Guardian

Reviews:

- visual consistency
- Luna identity
- brand rules

---

# 40. Testing Team

Core:

- Evidence Collector
- Reality Checker
- Test Results Analyzer
- API Tester
- Performance Benchmarker

Responsibilities:

### Evidence Collector

Visual proof and UI verification.

### Reality Checker

Final quality gate.

### Test Results Analyzer

Aggregate test results and regression evidence.

### API Tester

Endpoint validation.

### Performance Benchmarker

Performance and load validation.

Testing agents should verify before developers make fixes.

---

# 41. Specialist Pool

Activated only when needed:

- Trend Researcher
- Feedback Synthesizer
- Security specialist(s) available in the installed roster
- Tool Evaluator
- Workflow Optimizer
- other specialized agents relevant to the specific task

Do not activate every agent for every task.

---

# 42. Agent Permission Model

## Level 0 — READ ONLY

Allowed:

- inspect repository
- inspect CodeGraph
- inspect docs
- analyze architecture
- identify risks

Not allowed:

- modify production code

---

## Level 1 — PROPOSAL

Allowed:

- documentation
- architecture proposals
- design specifications
- task plans

Not allowed:

- production source modifications before approval

---

## Level 2 — IMPLEMENTATION

Allowed after architecture approval:

- source code
- tests
- configuration
- implementation files

Agents must follow canonical contracts.

---

## Level 3 — VALIDATION

Testing agents:

- execute tests
- gather evidence
- report failures
- identify regressions

They should not silently rewrite production code.

---

# 43. Critical Rule: No Unapproved Architecture Changes

No agent may:

- redefine Project Model
- redefine EditDecision
- redefine AIEditEvent
- replace rendering architecture
- introduce a competing state system
- duplicate an existing subsystem

without Architecture Review.

If a better approach is discovered:

1. Document it.
2. Identify impacted nodes in CodeGraph.
3. Propose migration.
4. Obtain approval.
5. Update canonical docs.
6. Implement migration.
7. Validate.

---

# 44. Parallel Execution Rules

## Allowed parallel work

After architecture approval:

```text
Frontend
Backend
AI
Design
DevOps
```

may work concurrently where dependencies are respected.

Example:

```text
Architecture
    │
    ├── UX/UI
    ├── Backend
    ├── AI
    └── DevOps
```

---

## Not allowed

Do not parallelize work that depends on an unapproved contract.

Examples:

- Frontend timeline implementation before Timeline Model approval
- Renderer implementation before EditDecision contract
- AI output implementation before EditDecision schema
- QA and Developer modifying the same subsystem simultaneously

---

# 45. Critical Contracts

## Contract A — Project Model

All subsystems consume the canonical project model.

## Contract B — EditDecision

AI generates it.

Timeline and renderer consume it.

## Contract C — AIEditEvent

Drives:

- Luna
- Timeline visualization
- Progress
- Activity log
- Reports

These contracts require architecture review before major changes.

---

# 46. CodeGraph Architecture

CodeGraph is the project's **shared codebase intelligence layer**.

It is not the product runtime.

It maps the actual repository.

Conceptual model:

```text
                    CODEGRAPH
                       │
       ┌───────────────┼────────────────┐
       │               │                │
   Components       Services        Dependencies
       │               │                │
       ├───────────────┼────────────────┤
       │               │                │
    Frontend          AI             Backend
       │               │                │
       └───────────────┼────────────────┘
                       │
                    Timeline
                       │
                    Renderer
```

---

# 47. CodeGraph Operating Protocol

Before an agent modifies existing code:

```text
1. Read relevant canonical docs
2. Query CodeGraph
3. Identify related modules
4. Identify dependencies
5. Inspect relevant source files
6. Check existing patterns
7. Create implementation plan
8. Modify code
9. Re-run/update CodeGraph
10. Validate impacted areas
11. Record CodeGraph impact in handoff
```

Never:

```text
Open random file
↓
Start coding
```

---

# 48. CodeGraph as Shared Context

Each agent should receive:

```text
Project Specification
+
Relevant Architecture Docs
+
Relevant CodeGraph Subgraph
+
Task Definition
+
Known Constraints
+
Previous Handoff
```

Do not give every agent the entire repository unless necessary.

Context should be scoped.

Example:

### Timeline task

Relevant graph:

```text
Timeline UI
├── Timeline State
├── EditDecision
├── AIEditEvent
├── Preview
└── Project State
```

### AI task

Relevant graph:

```text
AI Engine
├── Analysis
├── Candidate Detection
├── Scoring
├── EditDecision
└── AIEditEvent
```

### Backend task

Relevant graph:

```text
API
├── Project
├── Media
├── Analysis Jobs
├── Editing Jobs
└── Render Jobs
```

---

# 49. Canonical Documentation + CodeGraph

Use both.

### Canonical docs answer:

> "What should the system be?"

### CodeGraph answers:

> "What does the system currently contain?"

### Tests answer:

> "Does it actually work?"

### Git answers:

> "How did it get here?"

Together:

```text
PRODUCT SPEC
     +
ARCHITECTURE
     +
CODEGRAPH
     +
GIT
     +
TEST EVIDENCE
     ↓
LUNA DEVELOPMENT TRUTH
```

---

# 50. Agent Handoff Protocol

Every completed task must produce:

```text
[LUNA AGENT HANDOFF]

Agent:
Task:
Status:

Files Read:
Files Created:
Files Modified:

Architecture Decisions:

Contracts Used:

Dependencies Added:

CodeGraph Impact:

Tests:

Known Issues:

Risks:

Next Agent:

Required Validation:
```

No "done" without evidence.

---

# 51. Development Phases

## Phase 0 — Discovery

Agents:

- Studio Producer
- Project Shepherd
- Product Manager
- UX Architect
- Backend Architect
- AI Engineer
- Senior Developer

Permission:

**READ ONLY**

Outputs:

```text
docs/product-spec.md
docs/architecture.md
docs/implementation-plan.md
docs/risk-register.md
CodeGraph baseline
```

---

## Phase 1 — Architecture Approval

Review:

- requirements coverage
- architecture
- contracts
- dependencies
- risks
- CodeGraph baseline

Gate:

**Studio Producer + Reality Checker**

No production implementation before this gate passes.

---

## Phase 2 — Foundation

Parallel:

- Frontend Developer
- Backend Architect
- DevOps Automator
- UX Architect

Build:

- app shell
- routing
- design system
- project model
- persistence
- API foundation
- environment
- CI

---

## Phase 3 — Core Media/AI Engine

Parallel:

- AI Engineer
- Video Editing Systems Architect
- Backend Architect

Build:

- media ingestion
- metadata
- analysis
- candidate detection
- scoring
- EditDecision
- timeline model
- render model

---

## Phase 4 — Experience Layer

Parallel:

- UI Designer
- Frontend Developer
- Visual Storyteller
- Whimsy Injector

Build:

- Home
- Workspace
- Output
- Timeline UI
- Preview
- Luna hologram
- AI activity
- visual event system

---

## Phase 5 — Integration

Sequential.

```text
AI
 ↓
EditDecision
 ↓
Timeline
 ↓
AIEditEvent
 ↓
UI
 ↓
Renderer
 ↓
Output
```

All subsystem contracts must be validated.

---

## Phase 6 — QA

Agents:

- Evidence Collector
- API Tester
- Test Results Analyzer
- Performance Benchmarker
- Reality Checker

Test full workflows.

---

## Phase 7 — Hardening

Agents:

- Senior Developer
- DevOps Automator
- Security specialist
- Performance Benchmarker

Focus:

- memory
- CPU/GPU
- large files
- concurrency
- error recovery
- security
- render reliability

---

## Phase 8 — Release

Final review:

- Project Shepherd
- Reality Checker
- Senior Developer
- DevOps Automator

Then:

```text
Git
 ↓
GitHub
 ↓
Release
```

---

# 52. Full End-to-End User Test

A release candidate must support:

```text
Open Luna
   ↓
Create Project
   ↓
Upload Raw Video
   ↓
Select Genre
   ↓
Select Duration
   ↓
Select Orientation
   ↓
Start AI Editing
   ↓
AI Analysis
   ↓
Timeline Populates
   ↓
Luna Explains
   ↓
AI Decisions
   ↓
Timeline Finalization
   ↓
Render
   ↓
Output
   ↓
Preview
   ↓
Download
```

This workflow is the primary acceptance path.

---

# 53. Testing Matrix

Test combinations:

### Genres

- Chill
- Meme
- Competitive

### Durations

- 1–3m
- 5–10m
- 10–20m

### Orientations

- 16:9
- 9:16

### Media

- short video
- long video
- multiple files
- high resolution
- unsupported media
- corrupted media

### System behavior

- refresh during analysis
- refresh during editing
- render failure
- missing asset
- AI failure
- storage failure
- retry
- project reopen

---

# 54. Quality Gates

A phase cannot advance merely because an agent says it is complete.

Required evidence may include:

- tests
- screenshots
- runtime logs
- build output
- render output
- API responses
- CodeGraph changes
- performance measurements

Principle:

> Evidence over claims.

---

# 55. Dev ↔ QA Loop

For every implementation task:

```text
Developer
   ↓
Implementation
   ↓
Evidence Collector / QA
   ↓
PASS ─────────────→ Next task
   │
   └── FAIL
        ↓
     Bug Report
        ↓
     Developer Fix
        ↓
        QA
```

Maximum:

**3 retries per task before escalation.**

After repeated failure:

```text
Project Shepherd
      ↓
Senior Developer / Architecture Review
      ↓
Fix / Redesign / Descope
```

---

# 56. Risk Register

Track at minimum:

| Risk | Owner | Mitigation |
|---|---|---|
| AI produces invalid edit decisions | AI Engineer | schema validation |
| Timeline and renderer disagree | Video Editing Architect | shared canonical model |
| Fake progress | Project Shepherd | event-driven progress |
| UI state divergence | Frontend + Backend | single project state |
| Render failure | Video Architect | render validation |
| Large-file performance | Performance Benchmarker | proxies/workers |
| Security issue | Security | upload/sandbox audit |
| Scope creep | Senior PM | backlog governance |
| Agent conflicts | Project Shepherd | CodeGraph + contracts |
| Architecture drift | Senior Developer | architecture gates |

---

# 57. Definition of Done

Luna is not complete when the UI looks finished.

A feature is complete when:

1. It installs.
2. It runs.
3. It is connected to real state.
4. It has tests where appropriate.
5. It passes QA.
6. It does not violate canonical contracts.
7. CodeGraph is updated/validated.
8. Documentation is updated.
9. Errors are handled.
10. No major console/build errors remain.

The project is release-ready when:

- project creation works
- media upload works
- analysis works
- AI decisions are generated
- timeline represents actual decisions
- Luna reacts to actual events
- progress reflects actual stages
- rendering works
- output can be previewed
- output can be downloaded
- persistence works
- error recovery works
- README is accurate
- QA evidence exists

---

# 58. Agent Governance Rules

The following rules are mandatory:

```text
LUNA AGENT GOVERNANCE

1. Read PRD before work.
2. Inspect CodeGraph before modifying existing code.
3. Never guess repository architecture when it can be inspected.
4. Never duplicate an existing subsystem without review.
5. Never redefine canonical contracts silently.
6. Never fake functionality.
7. Never fake progress.
8. Never create decorative-only core features.
9. Keep AI, timeline, logs and renderer synchronized.
10. Use existing assets before creating new ones.
11. Keep secrets out of Git.
12. Validate AI-generated decisions before execution.
13. Every task must have an explicit owner.
14. Every handoff must include context.
15. Every implementation must be validated.
16. QA should produce evidence.
17. Architecture changes require review.
18. Maximum three failed retries before escalation.
19. Keep the application runnable throughout development.
20. Prefer maintainability over cleverness.
```

---

# 59. Required Initial Discovery

Before writing production code:

### Repository

Inspect:

- files
- framework
- package manager
- dependencies
- scripts
- Git state
- environment files

### Assets

Inspect:

- existing asset folders
- images
- audio
- video
- fonts
- hologram/UI assets

### Tooling

Inspect:

- available skills
- MCP integrations
- CodeGraph integration
- Agency Agents installation
- video processing capabilities

### Output

Create:

```text
docs/product-spec.md
docs/architecture.md
docs/implementation-plan.md
docs/risk-register.md
```

and establish the initial CodeGraph baseline.

---

# 60. Initial Repository Command

The first development instruction to the orchestrator should be conceptually:

```text
Initialize Luna AI development.

Read:
- prd.md
- repository
- existing assets
- existing documentation
- CodeGraph

Do not modify production code yet.

Produce:
- repository findings
- architecture findings
- asset inventory
- dependency map
- CodeGraph baseline
- implementation plan
- risk register

Wait for Architecture Gate approval before implementation.
```

---

# 61. NEXUS Operating Model

Luna adopts the NEXUS principles from Agency Agents:

- Pipeline Integrity
- Context Continuity
- Parallel Execution
- Evidence Over Claims
- Fail Fast, Fix Fast
- Single Source of Truth

NEXUS mode for Luna should be treated as a **customized product-development pipeline**, not a blind copy of the generic Agency pipeline.

Luna-specific additions:

- CodeGraph context requirement
- Video Editing Systems Architect
- media/render quality gates
- AI decision validation
- timeline/render contract validation
- hologram/event synchronization checks

---

# 62. Luna Agent Activation Matrix

| Agent | Discovery | Architecture | Foundation | Core Engine | Experience | QA | Harden | Release |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Agents Orchestrator | ● | ● | ● | ● | ● | ● | ● | ● |
| Studio Producer | ● | ● | | | | ● | ● | ● |
| Project Shepherd | ● | ● | ● | ● | ● | ● | ● | ● |
| Senior PM | ● | ● | ● | ● | ● | | | |
| Product Manager | ● | ● | ● | | | | | |
| Sprint Prioritizer | | ● | ● | ● | ● | | | |
| UX Architect | ● | ● | ● | | ● | ● | | |
| UI Designer | | ● | ● | | ● | ● | | |
| Visual Storyteller | | ● | | | ● | ● | | |
| Whimsy Injector | | | | | ● | ● | | |
| Brand Guardian | | ● | | | ● | ● | | ● |
| Frontend Developer | | | ● | ● | ● | ● | ● | ● |
| Backend Architect | ● | ● | ● | ● | ● | ● | ● | ● |
| AI Engineer | ● | ● | | ● | ● | ● | ● | |
| Video Editing Architect | ● | ● | | ● | ● | ● | ● | |
| Senior Developer | ● | ● | ● | ● | ● | ● | ● | ● |
| DevOps Automator | | ● | ● | ● | ● | ● | ● | ● |
| Evidence Collector | | | | ● | ● | ● | ● | ● |
| API Tester | | | | | | ● | ● | |
| Test Results Analyzer | | | | | | ● | ● | |
| Performance Benchmarker | | | | | | ● | ● | ● |
| Reality Checker | | ● | | | | ● | ● | ● |
| Security Specialist | | | | | | | ● | ● |
| Trend Researcher | ● | ● | | | | | | |

---

# 63. Agent Worktree / File Ownership Principle

When parallel agents are used:

- avoid simultaneous modification of the same critical files
- isolate large workstreams when practical
- merge through controlled integration
- update CodeGraph after integration
- run regression tests after merge

Critical shared files include:

- project state schemas
- EditDecision schema
- AIEditEvent schema
- timeline core
- renderer core
- global configuration

These require tighter ownership.

---

# 64. Architecture Change Protocol

If an agent discovers a superior architecture:

```text
DISCOVERY
   ↓
Document problem
   ↓
Map CodeGraph impact
   ↓
Propose change
   ↓
Architecture Review
   ↓
Approve / Reject
   ↓
Update PRD/docs
   ↓
Implementation
   ↓
Migration validation
```

No silent architecture drift.

---

# 65. Product Success Definition

The most important qualitative success condition:

> A user uploads raw footage and genuinely feels that Luna is an AI editor working on their behalf.

The user should be able to SEE:

- what Luna found
- what Luna kept
- what Luna removed
- how Luna arranged the timeline
- why Luna is changing pacing
- when Luna is rendering
- when the final result is ready

The experience must communicate:

> **"I gave Luna my raw footage, and Luna actually edited it."**

Not:

> "I clicked an auto-edit button and watched a loading animation."

---

# 66. References

Agency Agents repository:

`https://github.com/msitarzewski/agency-agents`

NEXUS Strategy:

`https://github.com/msitarzewski/agency-agents/blob/main/strategy/nexus-strategy.md`

NEXUS Quick Start:

`https://github.com/msitarzewski/agency-agents/blob/main/strategy/QUICKSTART.md`

NEXUS Agent Activation Prompts:

`https://github.com/msitarzewski/agency-agents/blob/main/strategy/coordination/agent-activation-prompts.md`

Luna AI repository:

`https://github.com/luciferKERO/LunaEditor`

---

# 67. Final Master Directive

Build Luna AI as a real, maintainable, extensible AI video-editing workstation.

Priorities:

1. Real functionality
2. Correct architecture
3. Editing correctness
4. AI decision quality
5. Timeline integrity
6. Realtime visual AI interaction
7. Rendering reliability
8. UX
9. Performance
10. Maintainability

The holographic Luna assistant is not decoration.

The timeline is not decoration.

The progress system is not decoration.

The logs are not the primary experience.

All of them must represent the same underlying editing process.

The AI must make decisions.

Those decisions must become structured edit decisions.

Those decisions must become a real timeline.

The timeline must be renderable.

The rendering process must produce a real output.

The visible Luna experience must explain that real process.

---

# 68. Final Acceptance Statement

Luna AI is successful when this complete chain is real:

```text
USER
 ↓
RAW FOOTAGE
 ↓
MEDIA INGESTION
 ↓
ANALYSIS
 ↓
AI UNDERSTANDING
 ↓
CANDIDATE MOMENTS
 ↓
EDIT DECISIONS
 ↓
TIMELINE
 ↓
LUNA VISUALIZATION
 ↓
QUALITY VALIDATION
 ↓
RENDER GRAPH
 ↓
FINAL VIDEO
 ↓
OUTPUT
```

and when the entire development process is governed by:

```text
PRD
 ↓
NEXUS / AGENCY AGENTS
 ↓
CODEGRAPH
 ↓
SPECIALIST IMPLEMENTATION
 ↓
QA EVIDENCE
 ↓
QUALITY GATES
 ↓
GITHUB
```

**This is the canonical Luna AI project specification.**
