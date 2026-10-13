'use client';

import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Coffee,
  Swords,
  Laugh,
  Clapperboard,
  Monitor,
  Smartphone,
  Columns2,
  VolumeX,
  Subtitles,
  Music,
  ScanFace,
  Sparkles,
} from 'lucide-react';
import { useProjectForm, type Style, type Orientation, type DurationPreset } from '@/lib/store';

const styles: { id: Style; label: string; icon: typeof Coffee }[] = [
  { id: 'chill', label: 'Chill', icon: Coffee },
  { id: 'action', label: 'Action', icon: Swords },
  { id: 'meme', label: 'Meme', icon: Laugh },
  { id: 'cinematic', label: 'Cinematic', icon: Clapperboard },
];

const orientations: { id: Orientation; label: string; ratio: string; icon: typeof Monitor }[] = [
  { id: 'landscape', label: 'Landscape', ratio: '16:9', icon: Monitor },
  { id: 'portrait', label: 'Portrait', ratio: '9:16', icon: Smartphone },
  { id: 'dual', label: 'Dual', ratio: 'Both', icon: Columns2 },
];

const durations: { id: DurationPreset; label: string; range: string }[] = [
  { id: 'short', label: 'Short', range: '1–3 min' },
  { id: 'fast', label: 'Fast', range: '5–10 min' },
  { id: 'full', label: 'Full', range: '10–15 min' },
  { id: 'extended', label: 'Extended', range: '15–20 min' },
];

const aiToggles = [
  { key: 'silenceRemoval' as const, label: 'Silence Removal', icon: VolumeX, toggle: 'toggleSilenceRemoval' as const },
  { key: 'kineticSubtitles' as const, label: 'Kinetic Subtitles', icon: Subtitles, toggle: 'toggleKineticSubtitles' as const },
  { key: 'beatSync' as const, label: 'Beat Sync', icon: Music, toggle: 'toggleBeatSync' as const },
  { key: 'facecamFraming' as const, label: 'Facecam Framing', icon: ScanFace, toggle: 'toggleFacecamFraming' as const },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[10px] font-semibold uppercase tracking-widest text-text-dim mb-2">{children}</h3>;
}

export default function NewProjectPage() {
  const form = useProjectForm();
  const fileRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) form.setSourceFile(f);
    },
    [form],
  );

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) form.setSourceFile(f);
    },
    [form],
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-5">
        <h1 className="text-lg font-bold text-text-high">New Project</h1>

        {/* Title */}
        <div>
          <SectionLabel>Project Title</SectionLabel>
          <input
            value={form.title}
            onChange={(e) => form.setTitle(e.target.value)}
            placeholder="Untitled Project"
            className="w-full h-9 px-3 rounded-lg bg-surface-mid border border-hairline text-sm text-text-high placeholder:text-text-dim focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Drop zone */}
        <div>
          <SectionLabel>Source Media</SectionLabel>
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 h-36 rounded-xl border-2 border-dashed border-outline-variant bg-surface-mid/50 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <Upload size={24} className="text-text-dim" />
            {form.sourceFileName ? (
              <div className="text-center">
                <p className="text-xs font-medium text-text-high">{form.sourceFileName}</p>
                <p className="text-[10px] text-text-dim">
                  {(form.sourceFileSize / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-text-medium">Drag & drop a video file</p>
                <p className="text-[10px] text-text-dim">or click to browse — MP4, MKV, MOV</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="video/*" onChange={onFileSelect} className="hidden" />
        </div>

        {/* Style selector */}
        <div>
          <SectionLabel>Edit Style</SectionLabel>
          <div className="grid grid-cols-4 gap-2">
            {styles.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => form.setStyle(id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-colors ${
                  form.style === id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-hairline bg-surface-mid text-text-medium hover:border-outline-variant hover:text-text-high'
                }`}
              >
                <Icon size={18} />
                <span className="text-[10px] font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div>
          <SectionLabel>Orientation</SectionLabel>
          <div className="grid grid-cols-3 gap-2">
            {orientations.map(({ id, label, ratio, icon: Icon }) => (
              <button
                key={id}
                onClick={() => form.setOrientation(id)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-colors ${
                  form.orientation === id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-hairline bg-surface-mid text-text-medium hover:border-outline-variant hover:text-text-high'
                }`}
              >
                <Icon size={16} />
                <div className="text-left">
                  <p className="text-[10px] font-semibold">{label}</p>
                  <p className="text-[10px] text-text-dim font-tabular">{ratio}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <SectionLabel>Duration Preset</SectionLabel>
          <div className="grid grid-cols-4 gap-2">
            {durations.map(({ id, label, range }) => (
              <button
                key={id}
                onClick={() => form.setDurationPreset(id)}
                className={`flex flex-col items-center gap-0.5 p-2.5 rounded-xl border transition-colors ${
                  form.durationPreset === id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-hairline bg-surface-mid text-text-medium hover:border-outline-variant hover:text-text-high'
                }`}
              >
                <span className="text-[10px] font-semibold">{label}</span>
                <span className="text-[10px] text-text-dim font-tabular">{range}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI pipeline toggles */}
        <div>
          <SectionLabel>AI Pipeline</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {aiToggles.map(({ key, label, icon: Icon, toggle }) => {
              const on = form[key];
              return (
                <button
                  key={key}
                  onClick={form[toggle]}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-colors ${
                    on
                      ? 'border-primary/40 bg-primary/8 text-text-high'
                      : 'border-hairline bg-surface-mid text-text-dim'
                  }`}
                >
                  <Icon size={16} className={on ? 'text-primary' : ''} />
                  <span className="text-xs font-medium flex-1 text-left">{label}</span>
                  <div
                    className={`w-8 h-[18px] rounded-full p-0.5 transition-colors ${
                      on ? 'bg-primary' : 'bg-surface-highest'
                    }`}
                  >
                    <motion.div
                      layout
                      className="w-3.5 h-3.5 rounded-full bg-white"
                      style={{ marginLeft: on ? 'auto' : 0 }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors mt-2">
          <Sparkles size={16} />
          Create Project
        </button>
      </motion.div>
    </div>
  );
}
