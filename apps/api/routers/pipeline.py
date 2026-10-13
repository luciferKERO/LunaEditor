import asyncio
import json
import os

from fastapi import APIRouter, WebSocket, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from models import Project, Job, JobStatus
from ai.pipeline import run_pipeline

router = APIRouter(prefix="/api/pipeline", tags=["pipeline"])


@router.post("/{project_id}/run")
async def start_pipeline(project_id: int, db: AsyncSession = Depends(get_db)):
    """Start the AI pipeline for a project."""
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(404, "Project not found")

    # Create a job record
    job = Job(project_id=project_id, type="pipeline", status=JobStatus.queued)
    db.add(job)
    await db.commit()
    await db.refresh(job)

    return {"job_id": job.id, "status": "queued", "message": "Pipeline queued"}


@router.websocket("/{project_id}/ws")
async def pipeline_ws(websocket: WebSocket, project_id: int):
    """WebSocket for real-time pipeline progress."""
    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)

            if msg.get("action") == "ping":
                await websocket.send_json({"type": "pong"})
            elif msg.get("action") == "status":
                # ponytail: would query DB for job status — placeholder for now
                await websocket.send_json({
                    "type": "status",
                    "project_id": project_id,
                    "stages": {
                        "ingest": "idle",
                        "silence": "idle",
                        "scene": "idle",
                        "subtitle": "idle",
                        "beats": "idle",
                        "assemble": "idle",
                    },
                })
    except Exception:
        pass
    finally:
        try:
            await websocket.close()
        except Exception:
            pass
