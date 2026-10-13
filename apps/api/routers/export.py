import os
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db import get_db
from models import Project

router = APIRouter(prefix="/api/export", tags=["export"])


class ExportRequest(BaseModel):
    formats: list[str] = ["landscape"]
    codec: str = "libx264"
    crf: int = 18
    fps: int = 60
    audio_bitrate: str = "192k"


@router.post("/{project_id}")
async def export_project(
    project_id: int,
    body: ExportRequest,
    db: AsyncSession = Depends(get_db),
):
    """Start export render for a project."""
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(404, "Project not found")

    # ponytail: actual render is async job — placeholder response
    return {
        "project_id": project_id,
        "formats": body.formats,
        "status": "queued",
        "message": "Export job queued",
    }


@router.get("/{project_id}/qc")
async def get_qc(project_id: int):
    """Get QC results for exported video."""
    # ponytail: reads from stored QC results — placeholder
    return {
        "project_id": project_id,
        "checks": {
            "audio_levels": None,
            "color_space": None,
            "frame_drops": None,
            "duration": None,
            "resolution": None,
        },
        "passed": None,
    }
