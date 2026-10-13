'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Upload, FolderOpen, Clock, Download, Sparkles } from 'lucide-react';

const stats = [
  { label: 'Total Projects', value: 0, icon: FolderOpen },
  { label: 'Hours Processed', value: 0, icon: Clock },
  { label: 'Exports', value: 0, icon: Download },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 via-surface-mid to-tertiary/10 border border-hairline p-6"
      >
        <div className="relative z-10">
          <h1 className="text-xl font-bold text-text-high tracking-tight">
            Welcome to <span className="text-primary">LUNA</span>
          </h1>
          <p className="mt-1 text-xs text-text-medium max-w-md">
            AI-powered video editing studio. Transform raw gameplay into polished montages with one click.
          </p>
        </div>
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
      </motion.div>

      {/* Quick actions */}
      <div className="flex gap-3">
        <Link
          href="/projects/new"
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
        >
          <Plus size={14} />
          New Project
        </Link>
        <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-surface-high border border-hairline text-xs font-medium text-text-medium hover:text-text-high transition-colors">
          <Upload size={14} />
          Import VOD
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-4 rounded-xl bg-surface-low border border-hairline"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-high">
              <Icon size={16} className="text-text-dim" />
            </div>
            <div>
              <p className="text-lg font-bold text-text-high font-tabular">{value}</p>
              <p className="text-[10px] text-text-dim uppercase tracking-wider">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center justify-center py-20 rounded-xl bg-surface-low border border-dashed border-outline-variant"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles size={24} className="text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-text-high">Create Your First Project</h2>
        <p className="mt-1 text-xs text-text-dim max-w-xs text-center">
          Drop a VOD or gameplay clip to get started. LUNA will handle the rest.
        </p>
        <Link
          href="/projects/new"
          className="mt-5 flex items-center gap-2 h-10 px-6 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
        >
          <Plus size={14} />
          New Project
        </Link>
      </motion.div>
    </div>
  );
}
