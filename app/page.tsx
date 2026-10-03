'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { buildTimeline } from '@/lib/edit-engine';
import { emptyProject, EditStyle, Project } from '@/lib/contracts';
import { listProjects, saveProject } from '@/lib/storage';

const styleNames: Record<EditStyle, string> = { meme: 'Meme', calm: 'Calm', competitive: 'Competitive', 'youtube-long': 'YouTube Long' };

export default function Home() {
  const [project, setProject] = useState<Project | null>(null);
  const [style, setStyle] = useState<EditStyle>('youtube-long');
  const [log, setLog] = useState('SYSTEM READY // pilih footage');
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { listProjects().then((items) => items[0] && setProject(items[0])).catch(() => setLog('STORAGE UNAVAILABLE')); }, []);

  async function importFootage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('video/')) return setLog('Pilih file video valid.');
    const next = project ?? emptyProject();
    next.style = style;
    next.assets = [{ id: `${next.id}:primary-video`, name: file.name, kind: 'video', durationMs: 0, sizeBytes: file.size }];
    next.decisions = [];
    next.clips = [];
    next.updatedAt = new Date().toISOString();
    setProject(next);
    setPreview(URL.createObjectURL(file));
    setProgress(0);
    await saveProject(next);
    setLog(`FOOTAGE READY // ${file.name}`);
  }

  function createProject() {
    const next = emptyProject();
    next.style = style;
    setProject(next);
    setPreview('');
    setProgress(0);
    saveProject(next).then(() => setLog('PROJECT CREATED // state kosong aktif'));
  }

  async function analyze() {
    if (!project?.assets.length) return setLog('IMPORT FOOTAGE DULU');
    setBusy(true);
    setProgress(5);
    setLog('ANALYZING // Luna memetakan footage');
    try {
      const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectId: project.id, style: project.style }) });
      if (!response.ok || !response.body) throw new Error('analysis unavailable');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let latest = project;
      while (true) {
        const chunk = await reader.read();
        buffer += decoder.decode(chunk.value ?? new Uint8Array(), { stream: !chunk.done });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const event = JSON.parse(line.slice(6));
          setProgress(event.progress);
          setLog(`${event.state} // ${event.message}`);
          if (event.data?.decisions) {
            latest = { ...latest, decisions: event.data.decisions, clips: buildTimeline(event.data.decisions, latest.style), updatedAt: new Date().toISOString() };
            setProject(latest);
            await saveProject(latest);
          }
        }
        if (chunk.done) break;
      }
      setProgress(100);
      setLog(`EDIT READY // ${latest.clips.length} clip${latest.clips.length === 1 ? '' : 's'} dibuat`);
    } catch { setLog('ANALYSIS ERROR // coba lagi'); }
    finally { setBusy(false); }
  }

  const decisions = project?.decisions ?? [];
  return <main className="shell">
    <header className="topbar"><span className="brand">LUNA // AI EDITOR</span><span className="status">LOCAL-FIRST / ONLINE</span></header>
    <section className="hero"><p className="muted">WORKSPACE 01 · NEXUS MEDIA SYSTEM</p><h1>Make footage<br /><span className="accent">mean something.</span></h1><p className="muted">Editor nyata. State tersimpan lokal. Tanpa mock data.</p>
      <div className="actions"><select aria-label="Edit style" value={style} onChange={(e) => setStyle(e.target.value as EditStyle)}>{Object.entries(styleNames).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><label className="primary" htmlFor="home-footage">IMPORT RAW FOOTAGE</label><input id="home-footage" accept="video/*,.mp4,.mov,.webm,.mkv" type="file" hidden onChange={importFootage} /><button className="secondary" onClick={createProject}>NEW PROJECT</button>{project?.assets.length ? <button className="secondary" disabled={busy} onClick={analyze}>{busy ? 'ANALYZING…' : 'RUN ANALYSIS'}</button> : null}</div>
    </section>
    {preview && <section className="panel"><h2>SOURCE PREVIEW · {project?.assets[0]?.name}</h2><video controls preload="metadata" src={preview} style={{ width: '100%', maxHeight: 420, background: '#000' }} /></section>}
    <section className="grid"><article className="panel"><h2>PROJECT STATE</h2>{project ? <><strong>{project.name}</strong><p className="muted">STYLE / {styleNames[project.style]}<br />ASSETS / {project.assets.length}<br />DECISIONS / {decisions.length}<br />EDIT CLIPS / {project.clips.length}</p></> : <div className="empty">No projects.<br />Import footage to begin.</div>}</article><article className="panel"><h2>LUNA HUD · {progress}%</h2><div className="empty">{log}</div>{project?.clips.length ? <div className="hud-result"><strong>EDIT READY</strong><span>{project.clips.length} clip siap direview</span></div> : null}</article><article className="panel"><h2>TIMELINE</h2><p className="muted">{project?.clips.length ? 'AI-selected clips ready for review.' : 'Run analysis after import.'}</p><div className="timeline"><div className="track" data-label="VIDEO">{project?.clips.map((clip) => <span className="clip" key={clip.id} title={`${clip.action}: ${clip.reason}`} />)}</div><div className="track" data-label="AUDIO" /><div className="track" data-label="MUSIC" /></div>{project?.clips.length ? <a className="result-link" href="#hasil-edit">BUKA HASIL EDIT ↓</a> : null}</article></section>
    {decisions.length > 0 && <section id="hasil-edit" className="panel"><h2>HASIL EDIT AI</h2><p className="muted">Luna membuat keputusan edit. Review clip di bawah sebelum export.</p>{decisions.map((decision) => <div className="edit-result" key={decision.id}><strong>{decision.action.toUpperCase()}</strong><span>{formatMs(decision.sourceStartMs)} — {formatMs(decision.sourceEndMs)}</span><span>{decision.reason}</span><span>{Math.round(decision.confidence * 100)}% confidence</span></div>)}<p className="muted">Preview hasil potongan dan export MP4 final masih memerlukan render engine. Source preview dan keputusan edit sudah aktif.</p></section>}
  </main>;
}

function formatMs(value: number) { return `${Math.floor(value / 60000)}:${String(Math.floor(value / 1000) % 60).padStart(2, '0')}`; }
