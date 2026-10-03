'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/lib/contracts';
import { getProject } from '@/lib/storage';

function projectId() { return new URLSearchParams(location.search).get('project'); }
function time(ms: number) { return `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`; }

export default function Output() {
  const [project, setProject] = useState<Project | null>(null); const [preview, setPreview] = useState('');
  useEffect(() => { const id = projectId(); if (!id) return; getProject(id).then((item) => { if (!item) return; setProject(item); if (item.assets[0]?.file) setPreview(URL.createObjectURL(item.assets[0].file)); }); }, []);
  if (!project) return <main className="shell"><header className="topbar"><a className="brand" href="/">LUNA // OUTPUT</a></header><div className="empty">Project belum dipilih.<br /><a href="/">Kembali ke Home</a></div></main>;
  return <main className="shell"><header className="topbar"><a className="brand" href="/">LUNA // OUTPUT</a><a className="secondary" href={`/workspace?project=${project.id}`}>WORKSPACE</a></header><section className="hero"><p className="muted">OUTPUT / REVIEW / EXPORT</p><h1>{project.name}<br /><span className="accent">edit result.</span></h1><p className="muted">{project.clips.length} clip · {project.decisions.length} AI decisions</p></section>{preview ? <section className="panel"><h2>EDIT PREVIEW</h2><video controls preload="metadata" src={preview} style={{ width: '100%', maxHeight: 520, background: '#000' }} /><p className="muted">Preview source tersedia. Render potongan AI belum diekspor menjadi MP4.</p></section> : null}<section className="panel"><h2>EDIT DECISIONS</h2>{project.decisions.length ? project.decisions.map((decision) => <div className="edit-result" key={decision.id}><strong>{decision.action.toUpperCase()}</strong><span>{time(decision.sourceStartMs)} — {time(decision.sourceEndMs)}</span><span>{decision.reason}</span><span>{Math.round(decision.confidence * 100)}% confidence</span></div>) : <div className="empty">Belum ada hasil. Jalankan analysis di Workspace.</div>}<button className="secondary" disabled title="Render worker belum terpasang">EXPORT MP4 · COMING NEXT</button></section></main>;
}
