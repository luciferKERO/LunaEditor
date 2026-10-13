"""Pipeline orchestrator — runs AI stages sequentially for a project."""

import asyncio
import json
import os
from dataclasses import dataclass, field

from ai.silence import detect_silence, silence_to_cuts
from ai.scene import detect_scenes_ffmpeg, scenes_to_segments
from ai.subtitle import transcribe_with_whisper_cli, segments_to_srt
from ai.beats import extract_audio_peaks
from ai.render import probe_media


@dataclass
class PipelineResult:
    media_info: dict = field(default_factory=dict)
    silence_cuts: list = field(default_factory=list)
    scenes: list = field(default_factory=list)
    subtitles: list = field(default_factory=list)
    beats: dict = field(default_factory=dict)
    errors: list = field(default_factory=list)


async def run_pipeline(
    input_path: str,
    output_dir: str,
    stages: list[str] | None = None,
    progress_callback=None,
) -> PipelineResult:
    """Run the full AI analysis pipeline.

    stages: list of stage names to run. None = all.
    Stages: ingest, silence, scene, subtitle, beats
    """
    all_stages = ["ingest", "silence", "scene", "subtitle", "beats"]
    active = stages or all_stages
    result = PipelineResult()
    total = len(active)

    def report(stage: str, idx: int, status: str):
        if progress_callback:
            progress_callback(stage, idx / total, status)

    loop = asyncio.get_event_loop()

    # 1. Ingest / Probe
    if "ingest" in active:
        try:
            report("ingest", 0, "running")
            result.media_info = await loop.run_in_executor(None, probe_media, input_path)
            report("ingest", 1, "done")
        except Exception as e:
            result.errors.append(f"ingest: {e}")
            report("ingest", 0, "error")

    # Get duration from probe
    duration = 0.0
    try:
        duration = float(result.media_info.get("format", {}).get("duration", 0))
    except (ValueError, TypeError):
        pass

    # 2. Silence detection
    if "silence" in active:
        try:
            report("silence", 0, "running")
            intervals = await loop.run_in_executor(None, detect_silence, input_path)
            result.silence_cuts = silence_to_cuts(intervals, duration)
            report("silence", 1, "done")
        except Exception as e:
            result.errors.append(f"silence: {e}")
            report("silence", 0, "error")

    # 3. Scene detection
    if "scene" in active:
        try:
            report("scene", 0, "running")
            boundaries = await loop.run_in_executor(None, detect_scenes_ffmpeg, input_path)
            result.scenes = scenes_to_segments(boundaries, duration)
            report("scene", 1, "done")
        except Exception as e:
            result.errors.append(f"scene: {e}")
            report("scene", 0, "error")

    # 4. Subtitle generation
    if "subtitle" in active:
        try:
            report("subtitle", 0, "running")
            segments = await loop.run_in_executor(
                None, transcribe_with_whisper_cli, input_path, "base", "auto", output_dir
            )
            result.subtitles = [
                {"id": s.id, "start": s.start, "end": s.end, "text": s.text}
                for s in segments
            ]
            # Also write SRT
            srt_path = os.path.join(output_dir, "subtitles.srt")
            with open(srt_path, "w") as f:
                f.write(segments_to_srt(segments))
            report("subtitle", 1, "done")
        except Exception as e:
            result.errors.append(f"subtitle: {e}")
            report("subtitle", 0, "error")

    # 5. Beat / crest factor analysis
    if "beats" in active:
        try:
            report("beats", 0, "running")
            analysis = await loop.run_in_executor(None, extract_audio_peaks, input_path)
            result.beats = {
                "duration": analysis.duration,
                "rms": analysis.rms,
                "peak": analysis.peak,
                "crest_factor": analysis.crest_factor,
                "beat_count": len(analysis.beats),
                "beats": [{"time": b.time, "strength": b.strength} for b in analysis.beats[:200]],
            }
            report("beats", 1, "done")
        except Exception as e:
            result.errors.append(f"beats: {e}")
            report("beats", 0, "error")

    return result
