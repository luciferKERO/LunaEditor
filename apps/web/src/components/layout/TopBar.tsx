'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, Settings } from 'lucide-react';

const titles: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/projects/new': 'New Project',
  '/editor': 'Editor',
  '/export': 'Export',
  '/settings': 'Settings',
};

export default function TopBar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? 'LUNA';

  return (
    <header className="flex items-center h-12 px-4 bg-surface-low border-b border-hairline shrink-0 gap-4">
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-xs text-text-dim">LUNA</span>
        <span className="text-xs text-text-dim">/</span>
        <span className="text-xs font-medium text-text-high truncate">{title}</span>
      </div>

      {/* Center: search */}
      <div className="flex-1 flex justify-center max-w-md mx-auto">
        <div className="relative w-full">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-dim" />
          <input
            type="text"
            placeholder="Search projects, assets…"
            className="w-full h-7 pl-8 pr-3 rounded-md bg-surface-mid border border-hairline text-xs text-text-high placeholder:text-text-dim focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button className="relative flex items-center justify-center w-7 h-7 rounded-md text-text-dim hover:text-text-high hover:bg-surface-high/40 transition-colors">
          <Bell size={15} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>

        <div className="w-6 h-6 rounded-full bg-primary/30 border border-primary/40 flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary">U</span>
        </div>

        <button className="flex items-center justify-center w-7 h-7 rounded-md text-text-dim hover:text-text-high hover:bg-surface-high/40 transition-colors">
          <Settings size={15} />
        </button>
      </div>
    </header>
  );
}
