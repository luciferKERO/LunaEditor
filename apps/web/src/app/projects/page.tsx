'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, FolderOpen, Clock, Film } from 'lucide-react';

type Project = {
  id: number;
  name: string;
  style: string;
  orientation: string;
  duration_preset: string;
  created_at: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-high">Projects</h1>
          <p className="text-xs text-text-dim mt-1">Manage your video editing projects</p>
        </div>
        <Link
          href="/projects/new"
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
        >
          <Plus size={14} />
          New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-xs text-text-dim">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 rounded-xl bg-surface-low border border-dashed border-outline-variant"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <FolderOpen className="text-primary" size={24} />
          </div>
          <h2 className="text-sm font-semibold text-text-high">No Projects Yet</h2>
          <p className="mt-1 text-xs text-text-dim max-w-xs text-center">
            Create your first project to start editing
          </p>
          <Link
            href="/projects/new"
            className="mt-5 flex items-center gap-2 h-10 px-6 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
          >
            <Plus size={14} />
            New Project
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/editor?project=${project.id}`}
                className="block p-4 rounded-xl bg-surface-low border border-hairline hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-high truncate">
                      {project.name}
                    </h3>
                    <p className="text-xs text-text-dim capitalize mt-0.5">
                      {project.style} • {project.orientation}
                    </p>
                  </div>
                  <Film size={16} className="text-text-dim shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-text-dim">
                  <Clock size={10} />
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
