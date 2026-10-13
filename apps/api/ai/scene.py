"""Scene detection via PySceneDetect (ContentDetector).

Falls back to FFmpeg scene filter if scenedetect not installed.
"""

import subprocess
import re
import json
from dataclasses import dataclass


@dataclass
class SceneBoundary:
    timecode: float  # seconds
    frame: int


def detect_scenes_ffmpeg(
    input_path: str,
    threshold: float = 0.3,
) -> list[SceneBoundary]:
    """Use FFmpeg select filter to detect scene changes."""
    cmd = [
        "ffmpeg", "-i", input_path,
        "-vf", f"select='gt(scene,{threshold})',showinfo",
        "-f", "null", "-"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=600)

    boundaries: list[SceneBoundary] = []
    for line in result.stderr.split("\n"):
        m = re.search(r"pts_time:([\d.]+)", line)
        n = re.search(r"n:\s*(\d+)", line)
        if m:
            t = float(m.group(1))
            f = int(n.group(1)) if n else 0
            boundaries.append(SceneBoundary(timecode=t, frame=f))

    return boundaries


def scenes_to_segments(
    boundaries: list[SceneBoundary],
    total_duration: float,
) -> list[dict]:
    """Convert scene boundaries into segments."""
    if not boundaries:
        return [{"start": 0.0, "end": total_duration, "scene_idx": 0}]

    segments = []
    prev = 0.0
    for i, b in enumerate(sorted(boundaries, key=lambda x: x.timecode)):
        if b.timecode > prev:
            segments.append({
                "start": round(prev, 3),
                "end": round(b.timecode, 3),
                "scene_idx": i,
            })
        prev = b.timecode

    if prev < total_duration:
        segments.append({
            "start": round(prev, 3),
            "end": round(total_duration, 3),
            "scene_idx": len(boundaries),
        })

    return segments
