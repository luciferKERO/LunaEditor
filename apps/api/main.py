from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import jobs, projects, upload, pipeline, bgm, export

app = FastAPI(title="LUNA AI Video Editor", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(upload.router)
app.include_router(jobs.router)
app.include_router(pipeline.router)
app.include_router(bgm.router)
app.include_router(export.router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "luna-api"}
