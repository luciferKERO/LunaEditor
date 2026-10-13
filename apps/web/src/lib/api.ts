// LUNA API client
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json();
}

export const apiClient = {
  // Projects
  getProjects: () => api<any[]>("/api/projects"),
  getProject: (id: string) => api<any>(`/api/projects/${id}`),
  createProject: (data: any) => api<any>("/api/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id: string, data: any) => api<any>(`/api/projects/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  // Jobs
  getJobs: (projectId: string) => api<any[]>(`/api/projects/${projectId}/jobs`),

  // Upload
  uploadFile: async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_URL}/api/upload`, { method: "POST", body: form });
    if (!res.ok) throw new Error(`Upload ${res.status}`);
    return res.json();
  },
};
