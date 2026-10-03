'use client';

import { ChangeEvent, useState } from 'react';

export default function Workspace() {
  const [message, setMessage] = useState('Pilih footage untuk upload private ke R2.');
  const [preview, setPreview] = useState('');
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    setPreview(URL.createObjectURL(file)); setMessage('Membuat upload URL aman…');
    const projectId = crypto.randomUUID();
    const response = await fetch('/api/upload-url', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectId, filename: file.name, contentType: file.type }) });
    const data = await response.json();
    if (!response.ok) return setMessage(data.error?.message ?? 'Storage gagal.');
    const uploaded = await fetch(data.uploadUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
    setMessage(uploaded.ok ? 'Upload R2 selesai. Preview siap. Analisis transkripsi dapat dijalankan di rilis berikutnya.' : 'Upload R2 gagal.');
  }
  return <main className="shell"><header className="topbar"><a className="brand" href="/">LUNA // WORKSPACE</a><a className="secondary" href="/output">OUTPUT</a></header><section className="panel"><h1>Workspace</h1><p className="muted">Private upload · local preview · browser-first.</p><label className="primary" htmlFor="footage">IMPORT RAW FOOTAGE</label><input id="footage" accept="video/*,.mp4,.mov,.webm,.mkv" type="file" hidden onChange={upload} /><p className="muted" aria-live="polite">{message}</p>{preview && <video controls preload="metadata" src={preview} style={{ width: '100%', maxHeight: 480, background: '#000' }} />}</section></main>;
}
