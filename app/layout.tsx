import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Luna AI', description: 'AI video editing workstation', manifest: '/manifest.webmanifest' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body>{children}</body></html>; }
