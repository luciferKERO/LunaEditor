import { Project } from './contracts';

const DB_NAME = 'luna-editor';
const STORE = 'projects';

export function openProjectStore(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveProject(project: Project): Promise<void> {
  const db = await openProjectStore();
  await new Promise<void>((resolve, reject) => {
    const request = db.transaction(STORE, 'readwrite').objectStore(STORE).put(project);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function listProjects(): Promise<Project[]> {
  const db = await openProjectStore();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).getAll();
    request.onsuccess = () => resolve(request.result as Project[]);
    request.onerror = () => reject(request.error);
  });
}
