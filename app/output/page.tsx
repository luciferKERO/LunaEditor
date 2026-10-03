'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/lib/contracts';
import { listProjects } from '@/lib/storage';

export default function Output() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => { listProjects().then(setProjects).catch(() => undefined); }, []);
  return <main className="shell"><header className="topbar"><a className="brand" href="/">LUNA // OUTPUT</a><a className="secondary" href="/workspace">WORKSPACE</a></header><section className="panel"><h1>Output</h1>{projects.length ? <div className="timeline">{projects.map((project) => <article className="track" key={project.id} data-label={`${project.name} · ${project.decisions.length} decisions`}><span className="clip" /></article>)}</div> : <div className="empty">Belum ada project.<br />Import raw footage dari halaman utama.</div>}<p className="muted">Preview lokal siap sekarang. Export final MP4 butuh render engine khusus; Vercel function tidak cocok untuk render footage besar.</p></section></main>;
}
