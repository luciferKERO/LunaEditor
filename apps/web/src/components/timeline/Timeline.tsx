"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Cut {
  id: string;
  track: string;
  startTime: number;
  endTime: number;
  label: string;
  clipType: string;
  color: string;
}

interface Track {
  id: string;
  label: string;
  type: "video" | "audio" | "sfx" | "caption";
  color: string;
  muted: boolean;
  locked: boolean;
  visible: boolean;
}

const DEFAULT_TRACKS: Track[] = [
  { id: "V2", label: "V2 FX", type: "caption", color: "#ec4899", muted: false, locked: false, visible: true },
  { id: "V1", label: "V1 CUT", type: "video", color: "#6366f1", muted: false, locked: false, visible: true },
  { id: "A1", label: "A1 DIA", type: "audio", color: "#06b6d4", muted: false, locked: false, visible: true },
  { id: "A2", label: "A2 BGM", type: "audio", color: "#06b6d4", muted: false, locked: false, visible: true },
  { id: "A3", label: "A3 SFX", type: "sfx", color: "#10b981", muted: false, locked: false, visible: true },
];

interface TimelineProps {
  duration: number; // total duration in seconds
  cuts: Cut[];
  currentTime: number;
  onSeek: (time: number) => void;
  onCutSelect?: (cut: Cut) => void;
}

function formatTimecode(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * 30); // 30fps frame count
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

export default function Timeline({ duration, cuts, currentTime, onSeek, onCutSelect }: TimelineProps) {
  const [zoom, setZoom] = useState(1);
  const [tracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [selectedCut, setSelectedCut] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const playheadPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canvasRef.current || duration <= 0) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = x / rect.width;
      onSeek(pct * duration);
    },
    [duration, onSeek]
  );

  const trackHeight: Record<string, number> = {
    V2: 40, V1: 56, A1: 44, A2: 44, A3: 40,
  };

  return (
    <section className="h-64 bg-surface-low flex flex-col flex-shrink-0 shadow-2xl relative select-none">
      {/* Timeline toolbar */}
      <div className="h-8 bg-surface-lowest px-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 text-xs">
          <button className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-mid transition-colors" title="Lock All">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </button>
          <div className="h-3 w-px bg-surface-highest" />
          <span className="text-tertiary font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Magnet ON
          </span>
        </div>
        {/* Zoom control */}
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(Math.max(0.25, zoom - 0.25))} className="text-outline hover:text-on-surface text-sm">−</button>
          <div className="w-24 h-1.5 bg-surface-highest rounded-full relative cursor-pointer">
            <div className="h-full bg-primary rounded-full" style={{ width: `${(zoom / 4) * 100}%` }} />
          </div>
          <button onClick={() => setZoom(Math.min(4, zoom + 0.25))} className="text-outline hover:text-on-surface text-sm">+</button>
          <button className="px-2 py-0.5 rounded bg-surface-mid text-outline hover:text-on-surface text-[10px] font-medium" onClick={() => setZoom(1)}>
            Fit (⇧Z)
          </button>
        </div>
        {/* Timecode */}
        <div className="font-mono text-[11px] text-on-surface-variant flex items-center gap-1">
          <span className="text-tertiary font-bold">FPS 60.00</span>
          <span className="text-surface-highest">•</span>
          <span>{formatTimecode(currentTime)} / {formatTimecode(duration)}</span>
        </div>
      </div>

      {/* Tracks + Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Track headers */}
        <div className="w-24 bg-surface-low flex flex-col flex-shrink-0 z-10 shadow-sm text-[11px]">
          {/* Ruler spacer */}
          <div className="h-6 bg-surface-lowest flex items-center px-2 text-outline text-[10px] font-mono">RULER</div>
          {tracks.map((track) => (
            <div
              key={track.id}
              className="px-2 flex items-center justify-between text-on-surface-variant border-b border-hairline"
              style={{ height: trackHeight[track.id] }}
            >
              <span className="font-bold" style={{ color: track.color }}>{track.label}</span>
              <div className="flex items-center gap-0.5 text-outline">
                <button className="hover:text-on-surface" title="Visibility">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
                <button className="hover:text-on-surface" title="Lock">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Canvas area */}
        <div
          ref={canvasRef}
          className="flex-1 flex flex-col overflow-x-auto relative bg-surface-lowest cursor-crosshair"
          onClick={handleCanvasClick}
        >
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none flex flex-col items-center"
            style={{ left: `${playheadPercent}%` }}
          >
            <div className="w-3 h-3 bg-primary rotate-45 rounded-sm shadow-lg -mt-0.5" />
            <div className="w-0.5 flex-1 bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
          </div>

          {/* Ruler */}
          <div className="h-6 bg-surface-lowest font-mono text-[9px] text-outline flex items-center relative flex-shrink-0">
            {duration > 0 && Array.from({ length: Math.ceil(duration / 30) + 1 }, (_, i) => {
              const t = i * 30;
              const pct = (t / duration) * 100;
              return (
                <span key={i} className="absolute" style={{ left: `${pct}%` }}>
                  {formatTimecode(t).slice(0, 8)}
                </span>
              );
            })}
          </div>

          {/* Track lanes */}
          {tracks.map((track) => (
            <div
              key={track.id}
              className="relative flex items-center px-1 border-b border-hairline/30"
              style={{ height: trackHeight[track.id], background: track.id === "V1" ? "rgba(11,14,21,1)" : "rgba(11,14,21,0.6)" }}
            >
              {cuts
                .filter((c) => c.track === track.id)
                .map((cut) => {
                  const left = duration > 0 ? (cut.startTime / duration) * 100 : 0;
                  const width = duration > 0 ? ((cut.endTime - cut.startTime) / duration) * 100 : 0;
                  const isSelected = selectedCut === cut.id;
                  return (
                    <motion.div
                      key={cut.id}
                      className={`absolute rounded overflow-hidden shadow cursor-pointer group ${
                        isSelected ? "ring-1 ring-primary" : ""
                      }`}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        height: "calc(100% - 8px)",
                        top: 4,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCut(cut.id);
                        onCutSelect?.(cut);
                      }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.1 }}
                    >
                      {/* Top accent bar */}
                      <div className="h-1 w-full" style={{ background: cut.color }} />
                      {/* Clip body */}
                      <div
                        className="h-full px-1.5 py-0.5"
                        style={{ background: `${cut.color}20` }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-medium text-on-surface truncate">{cut.label}</span>
                          <span className="text-[8px] font-mono text-outline">
                            {Math.round(cut.endTime - cut.startTime)}s
                          </span>
                        </div>
                      </div>
                      {/* Trim handles */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize opacity-0 group-hover:opacity-100" style={{ background: cut.color }} />
                      <div className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize opacity-0 group-hover:opacity-100" style={{ background: cut.color }} />
                    </motion.div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
