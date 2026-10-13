"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download, CheckCircle2, AlertCircle, MonitorPlay, Smartphone,
  Square, Settings2, HardDrive, Cloud, Share2, FileVideo, Gauge, Zap
} from "lucide-react";

const PRESETS = [
  { id: "youtube", label: "YouTube", icon: MonitorPlay, res: "1920×1080", codec: "H.264", ext: "mp4", fps: 60 },
  { id: "tiktok", label: "TikTok", icon: Smartphone, res: "1080×1920", codec: "H.264", ext: "mp4", fps: 30 },
  { id: "instagram", label: "Instagram", icon: Square, res: "1080×1080", codec: "H.264", ext: "mp4", fps: 30 },
  { id: "custom", label: "Custom", icon: Settings2, res: "Custom", codec: "Custom", ext: "mp4", fps: 60 },
];

const QC_CHECKS = [
  { label: "Audio Levels", pass: null, detail: "−14 LUFS target" },
  { label: "Color Space", pass: null, detail: "BT.709" },
  { label: "Frame Drops", pass: null, detail: "0 detected" },
  { label: "Duration", pass: null, detail: "Within preset" },
  { label: "Resolution", pass: null, detail: "Matches output" },
];

export default function ExportPage() {
  const [selectedPreset, setSelectedPreset] = useState("youtube");
  const [renderProgress, setRenderProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);

  return (
    <div className="flex h-full min-h-0">
      {/* Left: Preview + QC */}
      <div className="flex-1 flex flex-col min-w-0 p-4 gap-4 overflow-y-auto">
        {/* Preview header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-on-surface flex items-center gap-2">
            <FileVideo className="w-4 h-4 text-tertiary" />
            Output Preview
          </h2>
          <span className="text-[10px] text-outline font-mono">No render available</span>
        </div>

        {/* Preview panels */}
        <div className="grid grid-cols-3 gap-3">
          {["16:9 Landscape", "9:16 Portrait", "1:1 Square"].map((label) => (
            <div key={label} className="bg-surface-lowest rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video bg-black flex items-center justify-center">
                <span className="text-text-dim text-xs">Preview</span>
              </div>
              <div className="px-2 py-1.5 flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant">{label}</span>
                <span className="text-[9px] text-outline">—</span>
              </div>
            </div>
          ))}
        </div>

        {/* QC Badges */}
        <div>
          <h3 className="text-xs font-semibold text-on-surface mb-2 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-primary" />
            Quality Check
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {QC_CHECKS.map((check) => (
              <div key={check.label} className="bg-surface-lowest rounded-lg p-2 flex flex-col items-center gap-1">
                {check.pass === null ? (
                  <div className="w-5 h-5 rounded-full bg-surface-highest flex items-center justify-center">
                    <span className="text-outline text-[10px]">—</span>
                  </div>
                ) : check.pass ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-error" />
                )}
                <span className="text-[10px] font-medium text-on-surface-variant text-center">{check.label}</span>
                <span className="text-[9px] text-outline text-center">{check.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Render progress */}
        <div className="bg-surface-lowest rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Render Progress
            </span>
            <span className="text-[10px] text-outline font-mono">{renderProgress}%</span>
          </div>
          <div className="w-full h-2 bg-surface-highest rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full"
              style={{ width: `${renderProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px] text-outline">
            <span>ETA: —</span>
            <span>Speed: —</span>
          </div>
        </div>
      </div>

      {/* Right: Export config */}
      <div className="w-80 bg-surface-low flex flex-col flex-shrink-0 border-l border-hairline">
        <div className="h-9 px-3 flex items-center bg-surface-lowest flex-shrink-0">
          <Download className="w-3.5 h-3.5 text-tertiary mr-1.5" />
          <span className="text-xs font-semibold text-on-surface">Export Configuration</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Platform presets */}
          <div>
            <label className="text-[10px] text-outline uppercase tracking-wider font-medium mb-2 block">Platform Preset</label>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset) => {
                const Icon = preset.icon;
                const isActive = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-hairline bg-surface-lowest hover:bg-surface-mid/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${isActive ? "text-primary" : "text-outline"}`} />
                    <div className="text-[11px] font-medium text-on-surface">{preset.label}</div>
                    <div className="text-[9px] text-outline">{preset.res}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Codec / Format */}
          <div className="space-y-2">
            <label className="text-[10px] text-outline uppercase tracking-wider font-medium block">Output Format</label>
            <div className="bg-surface-lowest rounded-lg p-2 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant">Codec</span>
                <span className="text-[10px] text-on-surface font-mono">H.264 (libx264)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant">Container</span>
                <span className="text-[10px] text-on-surface font-mono">.mp4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant">FPS</span>
                <span className="text-[10px] text-on-surface font-mono">60</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant">Bitrate</span>
                <span className="text-[10px] text-on-surface font-mono">20 Mbps</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant">Audio</span>
                <span className="text-[10px] text-on-surface font-mono">AAC 192kbps</span>
              </div>
            </div>
          </div>

          {/* Post-render actions */}
          <div>
            <label className="text-[10px] text-outline uppercase tracking-wider font-medium mb-2 block">Post-Render</label>
            <div className="space-y-1.5">
              {[
                { icon: HardDrive, label: "Save to Local" },
                { icon: Cloud, label: "Upload to R2" },
                { icon: Share2, label: "Auto-Publish" },
              ].map(({ icon: Icon, label }) => (
                <label key={label} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface-mid/50 cursor-pointer">
                  <input type="checkbox" className="rounded border-outline bg-surface-highest accent-primary w-3 h-3" defaultChecked={label === "Save to Local"} />
                  <Icon className="w-3.5 h-3.5 text-outline" />
                  <span className="text-[11px] text-on-surface-variant">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Export CTA */}
        <div className="p-3 border-t border-hairline bg-surface-lowest">
          <button
            className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled
          >
            <Download className="w-4 h-4" />
            Export Video
          </button>
          <p className="text-[9px] text-outline text-center mt-1.5">No project loaded</p>
        </div>
      </div>
    </div>
  );
}
