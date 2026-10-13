"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Volume2, Subtitles, Clapperboard, Activity, Eye, Zap, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface PipelineStage {
  id: string;
  label: string;
  icon: React.ElementType;
  status: "idle" | "running" | "done" | "error";
  progress: number;
  eta?: string;
  detail?: string;
}

const STAGES: PipelineStage[] = [
  { id: "ingest", label: "Media Ingest", icon: Eye, status: "idle", progress: 0, detail: "Waiting for source" },
  { id: "silence", label: "Silence Detection", icon: Volume2, status: "idle", progress: 0, detail: "FFmpeg audio analysis" },
  { id: "scene", label: "Scene Detection", icon: Clapperboard, status: "idle", progress: 0, detail: "PySceneDetect + YOLO" },
  { id: "subtitle", label: "Subtitle Generation", icon: Subtitles, status: "idle", progress: 0, detail: "Whisper transcription" },
  { id: "beatSync", label: "Beat Sync", icon: Activity, status: "idle", progress: 0, detail: "Crest factor analysis" },
  { id: "assemble", label: "Smart Assembly", icon: Brain, status: "idle", progress: 0, detail: "AI clip ranking + ordering" },
];

const statusColors: Record<string, string> = {
  idle: "text-outline",
  running: "text-primary",
  done: "text-success",
  error: "text-error",
};

const statusDots: Record<string, string> = {
  idle: "bg-outline",
  running: "bg-primary animate-pulse",
  done: "bg-success",
  error: "bg-error",
};

export default function PipelineInspector() {
  const [stages] = useState<PipelineStage[]>(STAGES);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-72 bg-surface-low flex flex-col flex-shrink-0 border-l border-hairline shadow-lg">
      {/* Header */}
      <div className="h-9 px-3 flex items-center justify-between bg-surface-lowest flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-on-surface">AI Pipeline</span>
        </div>
        <span className="text-[10px] text-outline font-mono">0/6 STAGES</span>
      </div>

      {/* Stages list */}
      <div className="flex-1 overflow-y-auto py-1 space-y-px">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isExpanded = expanded.has(stage.id);
          return (
            <div key={stage.id}>
              <button
                className="w-full px-3 py-2 flex items-center gap-2 hover:bg-surface-mid/50 transition-colors"
                onClick={() => toggleExpand(stage.id)}
              >
                <span className="text-outline text-[10px] font-mono w-3">{i + 1}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDots[stage.status]}`} />
                <Icon className={`w-3.5 h-3.5 ${statusColors[stage.status]}`} />
                <span className="text-[11px] text-on-surface font-medium flex-1 text-left">{stage.label}</span>
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-outline" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-outline" />
                )}
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-2 pt-0.5 ml-5 pl-5 border-l border-hairline">
                      <p className="text-[10px] text-outline">{stage.detail}</p>
                      {stage.progress > 0 && (
                        <div className="mt-1 w-full h-1 bg-surface-highest rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${stage.progress}%` }}
                          />
                        </div>
                      )}
                      {stage.eta && (
                        <p className="text-[9px] text-outline mt-0.5 font-mono">ETA: {stage.eta}</p>
                      )}
                      {stage.status === "idle" && (
                        <p className="text-[9px] text-text-dim mt-0.5 italic">Awaiting trigger</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer controls */}
      <div className="h-10 px-3 flex items-center justify-between bg-surface-lowest flex-shrink-0 border-t border-hairline">
        <button className="text-[10px] text-outline hover:text-on-surface transition-colors">
          RESET ALL
        </button>
        <button
          className="px-3 py-1 rounded bg-primary/20 text-primary text-[10px] font-semibold hover:bg-primary/30 transition-colors"
          disabled
        >
          ▶ Run Pipeline
        </button>
      </div>
    </div>
  );
}
