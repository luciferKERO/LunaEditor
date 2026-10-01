# 🤖 Luna AI — Agency Agents Operating Roster & NEXUS Protocol

Dokumen ini mendefinisikan pembagian divisi, tugas, izin akses, dan protokol kerja multi-agent NEXUS untuk proyek Luna AI Video Editor berdasarkan `prd.md`.

---

## 1. Pembagian Divisi & Daftar Agen

### 1.1 Command / Orchestration Division
Memimpin kontrol alur kerja, penjadwalan, koordinasi cross-divisi, dan quality gate.
- **Agents Orchestrator:** Dispatching tugas antar subagent, routing workflow, sinkronisasi timeline.
- **Studio Producer:** Penanggung jawab jadwal rilis, review milestone, otorisasi peralihan fase.
- **Project Shepherd:** Penjaga integritas arsitektur, CodeGraph governance, penyelesaian konflik antar modul.
- **Senior Project Manager:** Pelacakan backlog, sprint planning, kepatuhan scope.

### 1.2 Product Division
Menjaga visi produk, use-case creator, dan prioritas fitur.
- **Product Manager:** Pemilik scope produk (Gameplay edit, TikTok/Shorts 9:16, YouTube 16:9).
- **Sprint Prioritizer:** Menentukan prioritas fitur teknis dan melakukan descope jika ditemukan blocker.
- **Trend Researcher:** Riset pola editing video gameplay dan audio ducking terkini.
- **Feedback Synthesizer:** Mengolah data pengujian dan QA menjadi rekomendasi perbaikan produk.

### 1.3 Engineering Division
Membangun infrastruktur teknis, engine AI, timeline, dan sistem rendering video.
- **Frontend Developer:** UI Workspace, Multi-Track Timeline (React/Framer Motion), Video Preview, Telemetry HUD.
- **Backend Architect:** REST API / WebSocket server, SQLite WAL persistence, asynchronous background worker.
- **AI Engineer:** Audio/video analysis pipeline, semantic moment detection, candidate moment scoring.
- **Video Editing Systems Architect:** FFmpeg render graph, audio multi-track ducking, proxy generation, waveform parsing.
- **Senior Developer:** Integrasi subsistem kompleks, arsitektur kritis, refactoring core engine.
- **DevOps Automator:** CI/CD pipeline, build scripts, local packaging, environment config.

### 1.4 Design Division
Merancang antarmuka visual, interaksi real-time, dan identitas asisten Luna.
- **UX Architect:** Information architecture, alur kerja editor, navigasi 3 halaman (Home, Workspace, Output).
- **UI Designer:** Design tokens, dark cyberpunk/clean aesthetic, visual hierarchy.
- **Visual Storyteller:** Visualisasi karakter asisten holografik Luna dan state animasinya.
- **Whimsy Injector:** Micro-interactions, audio visualizer reactive feedback, detail interaktif.
- **Brand Guardian:** Konsistensi identitas Luna AI, penamaan modul, standar visual.

### 1.5 Testing / QA Division
Memvalidasi fungsionalitas nyata, performa, dan mencegah simulasi fiktif.
- **Evidence Collector:** Mengumpulkan bukti nyata (screenshot, output render, log eksekusi).
- **API Tester:** Verifikasi integritas schema endpoint dan kontrak data.
- **Test Results Analyzer:** Analisis log kegagalan, error pattern, dan laporan regresi.
- **Performance Benchmarker:** Profiling CPU, GPU, memory footprint saat rendering dan analisis.
- **Reality Checker:** Quality gate final, memastikan produk benar-benar berfungsi end-to-end tanpa mock palsu.

### 1.6 Specialist Pool (On-Demand)
- **Security Specialist:** Audit keamanan input file, sanitasi media path, proteksi secret.
- **Tool Evaluator:** Evaluasi efisiensi binary eksternal (FFmpeg, Whisper).
- **Workflow Optimizer:** Peningkatan efisiensi pipeline multi-agent dan pemrosesan paralel.

---

## 2. Matriks Izin Akses (Permission Matrix)

| Level | Kategori | Hak Akses | Larangan |
|---|---|---|---|
| **Level 0** | READ-ONLY | Membaca dokumen, menganalisis repositori, query CodeGraph | Mengubah file kode sumber / konfigurasi |
| **Level 1** | PROPOSAL | Membuat dokumen arsitektur, spesifikasi, `task_plan.md` | Mengubah kode produksi sebelum disetujui |
| **Level 2** | IMPLEMENTATION | Menulis kode sumber, membuat unit test, mengubah konfigurasi | Mengubah kontrak bersama (A/B/C) tanpa review |
| **Level 3** | VALIDATION | Menjalankan test suite, profiling, inspeksi artifact | Mengubah kode implementasi secara sepihak |

---

## 3. Format Protokol Handoff Antar Agen

Setiap agen yang menyelesaikan tugas wajib menulis ringkasan handoff dengan format:

```text
[LUNA AGENT HANDOFF]
Agent: [Nama Agen]
Divisi: [Nama Divisi]
Task: [Deskripsi Tugas]
Status: [SUCCESS / BLOCKED / REQUIRES_REVIEW]

Files Read:
- [Path file yang dibaca]

Files Created/Modified:
- [Path file yang dibuat/diubah]

Architecture Decisions:
- [Keputusan arsitektur yang diambil]

Contracts Used:
- [Contract A / B / C]

CodeGraph Impact:
- [Modul / Relasi yang terpengaruh di CodeGraph]

Evidence & Tests:
- [Bukti log eksekusi / test output nyata]

Known Issues & Risks:
- [Isu atau risiko yang ditemukan]

Next Agent: [Nama Agen Penerima Tugas]
Required Validation: [Langkah validasi yang wajib dilakukan penerima]
```

---

## 4. Alur Integrasi CodeGraph

Sebelum agen memodifikasi kode:
1. Baca dokumen PRD & spesifikasi terkait.
2. Query CodeGraph untuk memeriksa ketergantungan modul.
3. Buat rencana implementasi spesifik.
4. Lakukan penulisan kode.
5. Update CodeGraph dan jalankan verifikasi dampak.
6. Buat bukti validasi dan catat pada handoff.
