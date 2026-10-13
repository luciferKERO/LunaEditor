"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Repeat, Volume2, Maximize } from "lucide-react";

interface TransportProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onStepForward: () => void;
  onStepBack: () => void;
}

function formatTimecode(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const f = Math.floor((seconds % 1) * 30);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

export default function ProgramMonitor({
  currentTime,
  duration,
  isPlaying,
  onPlay,
  onPause,
  onSeek,
  onStepForward,
  onStepBack,
}: TransportProps) {
  const [volume, setVolume] = useState(85);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-surface-lowest">
      {/* Viewport */}
      <div className="flex-1 relative flex items-center justify-center p-2 overflow-hidden">
        <div className="relative w-full max-w-4xl aspect-video bg-black rounded shadow-2xl overflow-hidden flex items-center justify-center">
          {/* Placeholder — replaced with actual video preview when available */}
          <div className="absolute inset-0 bg-gradient-to-br from-surface/80 via-surface-lowest to-surface/60 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface-mid/50 flex items-center justify-center mb-3">
                <Play className="w-8 h-8 text-outline" />
              </div>
              <p className="text-text-dim text-sm">No media loaded</p>
              <p className="text-text-dim text-xs mt-1">Import a VOD to begin editing</p>
            </div>
          </div>

          {/* Top HUD badges */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-surface-lowest/80 backdrop-blur text-tertiary text-[10px] font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                Proxy Ready
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-lowest/80 backdrop-blur text-on-surface-variant text-[10px]">
                16:9 Landscape
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transport bar */}
      <div className="h-11 bg-surface-low px-3 flex items-center justify-between gap-3 flex-shrink-0 shadow-inner border-t border-hairline">
        {/* Stepper controls */}
        <div className="flex items-center gap-1">
          <button onClick={onStepBack} className="w-7 h-7 rounded flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-mid transition-colors">
            <SkipBack className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-mid transition-colors">
            <Rewind className="w-4 h-4" />
          </button>
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white shadow-md hover:bg-primary-hover transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button className="w-7 h-7 rounded flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-mid transition-colors">
            <FastForward className="w-4 h-4" />
          </button>
          <button onClick={onStepForward} className="w-7 h-7 rounded flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-mid transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Scrubber */}
        <div className="flex-1 max-w-xl mx-2 flex items-center gap-2">
          <span className="font-mono text-[10px] text-primary font-tabular">{formatTimecode(currentTime)}</span>
          <div
            className="flex-1 relative h-2 bg-surface-highest rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              onSeek(pct * duration);
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 rounded-full bg-primary/40" style={{ width: `${progress}%` }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow ring-2 ring-primary/40 group-hover:scale-125 transition-transform"
              style={{ left: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-outline font-tabular">{formatTimecode(duration)}</span>
        </div>

        {/* Right utilities */}
        <div className="flex items-center gap-2">
          <button className="p-1 rounded text-primary hover:bg-surface-mid transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 text-outline">
            <Volume2 className="w-4 h-4" />
            <div className="w-14 h-1 bg-surface-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${volume}%` }} />
            </div>
            <span className="font-mono text-[9px]">{volume}%</span>
          </div>
          <div className="h-3 w-px bg-surface-highest" />
          <button className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-mid transition-colors">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
