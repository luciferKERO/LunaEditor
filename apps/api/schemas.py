from datetime import datetime

from pydantic import BaseModel

from models import JobStatus, ProjectStatus, StylePreset


# --- Project ---

class ProjectCreate(BaseModel):
    title: str
    style: StylePreset = StylePreset.chill
    orientation: str = "landscape"
    duration_preset: str = "1-3m"


class ProjectOut(BaseModel):
    id: int
    title: str
    style: StylePreset
    orientation: str
    duration_preset: str
    status: ProjectStatus
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# --- Job ---

class JobOut(BaseModel):
    id: int
    project_id: int
    type: str
    status: JobStatus
    progress: float
    result_json: str
    created_at: datetime

    model_config = {"from_attributes": True}


# --- Upload ---

class UploadOut(BaseModel):
    filename: str
    size: int
    message: str
