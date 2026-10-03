'use client';

import { useEffect, useState } from 'react';
import { emptyProject, EditStyle, Project } from '@/lib/contracts';
import { listProjects, saveProject } from '@/lib/storage';

const styleNames: Record<EditStyle, string> = { meme: 'Meme', calm: 'Calm', competitive: 'Competitive', 'youtube-long': 'YouTube Long' };

export default function Home() {
  const [project, setProject] = useState<Project | null>(null);
  const [style, setStyle] = useState<EditStyle>('youtube-long');
  const [log, setLog] = useState('SYSTEM READY // menunggu footage');
  const [progress, setProgress] = useState(0);
  useEffect(() => { listProjects().then((items) => items[0] && setProject(items[0])).catch(() => setLog('STORAGE UNAVAILABLE // mode sementara')); }, []);
  function createProject() { const next = emptyProject(); next.style = style; setProject(next); saveProject(next).then(() => setLog('PROJECT CREATED // state kosong aktif')); }
  async function analyze() {
    if (!project) return setLog('BUAT PROJECT DULU');
    setLog('ANALYZING // Luna memetakan footage');
    const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectId: project.id, style: project.style }) });
    if (!response.body) return setLog('ERROR // stream unavailable');
    const reader = response.body.getReader(); const decoder = new TextDecoder();
    while (true) { const chunk = await reader.read(); if (chunk.done) break; for (const line of decoder.decode(chunk.value).split('\n')) if (line.startsWith('data: ')) { const event = JSON.parse(line.slice(6)); setProgress(event.progress); setLog(`${event.state} // ${event.message}`); if (event.data?.decisions) { const updated = { ...project, decisions: event.data.decisions }; setProject(updated); saveProject(updated); } } }
  }
  return <main className="shell"><header className="topbar"><span className="brand">LUNA // AI EDITOR</span><span className="status">LOCAL-FIRST / ONLINE</span></header><section className="hero"><p className="muted">WORKSPACE 01 · NEXUS MEDIA SYSTEM</p><h1>Make footage<br /><span className="accent">mean something.</span></h1><p className="muted">AI-native editing workspace. State nyata. Tanpa mock data.</p><div className="actions"><select aria-label="Edit style" value={style} onChange={(e) => setStyle(e.target.value as EditStyle)}>{Object.entries(styleNames).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><button className="primary" onClick={createProject}>{project ? 'NEW PROJECT' : 'CREATE PROJECT'}</button>{project && <button className="secondary" onClick={analyze}>RUN ANALYSIS</button>}</div></section><section className="grid"><article className="panel"><h2>PROJECT STATE</h2>{project ? <><strong>{project.name}</strong><p className="muted">STYLE / {styleNames[project.style]}<br />ASSETS / {project.assets.length}<br />DECISIONS / {project.decisions.length}</p></> : <div className="empty">No projects.<br />Create one to begin.</div>}</article><article className="panel"><h2>LUNA HUD · {progress}%</h2><div className="empty">{log}</div></article><article className="panel"><h2>ACTIVITY STREAM</h2><p className="muted">{log}</p><div className="timeline"><div className="track" data-label="VIDEO"><span className="clip" /></div><div className="track" data-label="AUDIO"><span className="clip" /></div><div className="track" data-label="MUSIC" /></div></article></section></main>;
}
