import enum
from datetime import datetime

from sqlalchemy import (
    Column, DateTime, Enum, Float, ForeignKey, Integer, String, Text, func,
)
from sqlalchemy.orm import DeclarativeBase, relationship


class Base(DeclarativeBase):
    pass


class StylePreset(str, enum.Enum):
    chill = "chill"
    action = "action"
    meme = "meme"
    cinematic = "cinematic"


class ProjectStatus(str, enum.Enum):
    draft = "draft"
    processing = "processing"
    ready = "ready"
    exported = "exported"
    error = "error"


class JobStatus(str, enum.Enum):
    queued = "queued"
    running = "running"
    done = "done"
    error = "error"


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    style = Column(Enum(StylePreset), default=StylePreset.chill)
    orientation = Column(String(20), default="landscape")  # landscape | portrait | square
    duration_preset = Column(String(20), default="1-3m")
    status = Column(Enum(ProjectStatus), default=ProjectStatus.draft)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    timelines = relationship("Timeline", back_populates="project", cascade="all,delete")
    jobs = relationship("Job", back_populates="project", cascade="all,delete")


class Timeline(Base):
    __tablename__ = "timelines"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    duration = Column(Float, default=0.0)
    fps = Column(Integer, default=30)
    resolution = Column(String(20), default="1920x1080")

    project = relationship("Project", back_populates="timelines")
    cuts = relationship("Cut", back_populates="timeline", cascade="all,delete")


class Cut(Base):
    __tablename__ = "cuts"

    id = Column(Integer, primary_key=True)
    timeline_id = Column(Integer, ForeignKey("timelines.id", ondelete="CASCADE"), nullable=False)
    track = Column(String(10), nullable=False)  # V1, V2, A1, A2, A3
    start_time = Column(Float, nullable=False)
    end_time = Column(Float, nullable=False)
    clip_type = Column(String(30), nullable=False)  # video, audio, subtitle, effect
    label = Column(String(255), default="")
    metadata_json = Column(Text, default="{}")

    timeline = relationship("Timeline", back_populates="cuts")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    type = Column(String(50), nullable=False)  # ingest, stt, silence, highlight, export
    status = Column(Enum(JobStatus), default=JobStatus.queued)
    progress = Column(Float, default=0.0)
    result_json = Column(Text, default="{}")
    created_at = Column(DateTime, server_default=func.now())

    project = relationship("Project", back_populates="jobs")
