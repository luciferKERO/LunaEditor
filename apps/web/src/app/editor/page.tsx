"use client";

import { useState, useCallback } from "react";
import Timeline from "@/components/timeline/Timeline";
import ProgramMonitor from "@/components/timeline/ProgramMonitor";
import PipelineInspector from "@/components/pipeline/PipelineInspector";
import { motion } from "framer-motion";
import { Layers, Image, Music, Type, Sparkles, SlidersHorizontal, FolderOpen } from "lucide-react";

// ponytail: placeholder state — will come from project context via zustand store
export default function EditorPage() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const duration = 0; // seconds — populated from loaded project

  const onSeek = useCallback((time: number) => {
    setCurrentTime(Math.max(0, Math.min(time, duration)));
  }, [duration]);

  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);
  const onStepForward = () => onSeek(currentTime + 1 / 30);
  const onStepBack = () => onSeek(currentTime - 1 / 30);

  const mediaBins = [
    { icon: Layers, label: "All Clips", count: 0 },
    { icon: Image, label: "Thumbnails", count: 0 },
    { icon: Music, label: "BGM", count: 0 },
    { icon: Type, label: "Subtitles", count: 0 },
    { icon: Sparkles, label: "SFX", count: 0 },
  ];

  return (
    <div className="flex h-full min-h-0 overflow-hidden">
      {/* Left panel: Media Pool */}
      <div className="w-52 bg-surface-low flex flex-col flex-shrink-0 border-r border-hairline">
        <div className="h-9 px-3 flex items-center justify-between bg-surface-lowest flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-tertiary" />
            <span className="text-xs font-semibold text-on-surface">Media Pool</span>
          </div>
          <button className="p-1 rounded hover:bg-surface-mid text-outline hover:text-on-surface transition-colors">
            <SlidersHorizontal className="w-3 h-3" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {mediaBins.map(({ icon: Icon, label, count }) => (
            <button
              key={label}
              className="w-full px-3 py-2 flex items-center gap-2 hover:bg-surface-mid/50 transition-colors text-left"
            >
              <Icon className="w-4 h-4 text-outline" />
              <span className="text-[11px] text-on-surface-variant flex-1">{label}</span>
              <span className="text-[10px] text-outline font-mono bg-surface-highest px-1.5 py-0.5 rounded-full">{count}</span>
            </button>
          ))}
          {/* Empty state */}
          <div className="px-4 py-8 text-center">
            <p className="text-text-dim text-xs">No media imported</p>
            <p className="text-text-dim text-[10px] mt-1">Create a project to begin</p>
          </div>
        </div>
      </div>

      {/* Center: Monitor + Timeline */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Editor toolbar */}
        <div className="h-9 bg-surface-lowest px-3 flex items-center gap-4 flex-shrink-0 shadow-sm">
          <span className="text-xs text-on-surface font-semibold">Editor Workspace</span>
          <div className="flex-1" />
          <span className="text-[10px] text-outline font-mono">No project loaded</span>
        </div>

        {/* Program monitor */}
        <ProgramMonitor
          currentTime={currentTime}
          duration={duration}
          isPlaying={isPlaying}
          onPlay={onPlay}
          onPause={onPause}
          onSeek={onSeek}
          onStepForward={onStepForward}
          onStepBack={onStepBack}
        />

        {/* Timeline */}
        <Timeline
          duration={duration}
          cuts={[]}
          currentTime={currentTime}
          onSeek={onSeek}
        />
      </div>

      {/* Right panel: Pipeline Inspector */}
      <PipelineInspector />
    </div>
  );
}
