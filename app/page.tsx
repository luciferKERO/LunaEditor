'use client';

import { useEffect, useState } from 'react';
import { EditStyle, Project } from '@/lib/contracts';
import { listProjects, saveProject } from '@/lib/storage';

const styles: Record<EditStyle, string> = { meme: 'Meme', calm: 'Calm', competitive: 'Competitive', 'youtube-long': 'YouTube Long' };

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [style, setStyle] = useState<EditStyle>('youtube-long');
  useEffect(() => { listProjects().then(setProjects).catch(() => undefined); }, []);
  async function newProject() { const now = new Date().toISOString(); const project: Project = { id: crypto.randomUUID(), name: 'Untitled project', createdAt: now, updatedAt: now, style, assets: [], decisions: [], clips: [] }; await saveProject(project); location.href = `/workspace?project=${project.id}`; }
  return <main className="shell"><header className="topbar"><span className="brand">LUNA // HOME</span><span className="status">LOCAL-FIRST / ONLINE</span></header><section className="hero"><p className="muted">NEXUS MEDIA SYSTEM</p><h1>Turn raw footage<br /><span className="accent">into signal.</span></h1><p className="muted">Pilih project atau mulai edit baru.</p><div className="actions"><select aria-label="Default edit style" value={style} onChange={(e) => setStyle(e.target.value as EditStyle)}>{Object.entries(styles).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><button className="primary" onClick={newProject}>NEW PROJECT</button></div></section><section className="panel"><h2>PROJECTS</h2>{projects.length ? <div className="project-list">{projects.map((project) => <article className="project-card" key={project.id}><div><strong>{project.name}</strong><p className="muted">{styles[project.style]} · {project.assets.length} asset · {project.clips.length} clip</p></div><a className="secondary" href={`/workspace?project=${project.id}`}>OPEN WORKSPACE</a><a className="secondary" href={`/output?project=${project.id}`}>OUTPUT</a></article>)}</div> : <div className="empty">No projects.<br />Klik NEW PROJECT untuk mulai.</div>}</section></main>;
}
