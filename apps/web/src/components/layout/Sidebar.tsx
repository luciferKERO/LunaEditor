'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  FolderOpen,
  Film,
  Download,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Cpu,
  Zap,
} from 'lucide-react';

const nav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/editor', label: 'Editor', icon: Film },
  { href: '/export', label: 'Export', icon: Download },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const;

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: expanded ? 240 : 64 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="flex flex-col h-full bg-surface-lowest border-r border-hairline select-none shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-12 px-4 gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <span className="text-sm font-black text-white leading-none">L</span>
        </div>
        {expanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-bold tracking-widest text-text-high"
          >
            LUNA
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 mt-2">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`
                group relative flex items-center gap-3 h-9 rounded-md px-3 text-xs font-medium transition-colors
                ${active
                  ? 'bg-primary/12 text-primary'
                  : 'text-text-medium hover:text-text-high hover:bg-surface-high/40'
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-primary"
                />
              )}
              <Icon size={16} className="shrink-0" />
              {expanded && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: toggle + status */}
      <div className="flex flex-col gap-2 p-2 shrink-0">
        {/* Status chips */}
        <div className={`flex flex-col gap-1 ${expanded ? '' : 'items-center'}`}>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-success/10">
            <Cpu size={12} className="text-success shrink-0" />
            {expanded && <span className="text-[10px] font-medium text-success">GPU Ready</span>}
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-tertiary/10">
            <Zap size={12} className="text-tertiary shrink-0" />
            {expanded && <span className="text-[10px] font-medium text-tertiary">Engine Online</span>}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center h-8 rounded-md text-text-dim hover:text-text-high hover:bg-surface-high/40 transition-colors"
        >
          {expanded ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}
