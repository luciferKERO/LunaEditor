"""Silence detection via FFmpeg silencedetect filter.

Produces a list of silence intervals that can be cut from the timeline.
"""

import json
import subprocess
import re
from dataclasses import dataclass


@dataclass
class SilenceInterval:
    start: float
    end: float
    duration: float


def detect_silence(
    input_path: str,
    noise_threshold: str = "-30dB",
    min_duration: float = 0.5,
) -> list[SilenceInterval]:
    """Run FFmpeg silencedetect and parse output."""
    cmd = [
        "ffmpeg", "-i", input_path, "-af",
        f"silencedetect=noise={noise_threshold}:d={min_duration}",
        "-f", "null", "-"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
    stderr = result.stderr

    intervals: list[SilenceInterval] = []
    starts: list[float] = []

    for line in stderr.split("\n"):
        m_start = re.search(r"silence_start:\s*([\d.]+)", line)
        m_end = re.search(r"silence_end:\s*([\d.]+)\s*\|\s*silence_duration:\s*([\d.]+)", line)
        if m_start:
            starts.append(float(m_start.group(1)))
        elif m_end and starts:
            s = starts.pop(0)
            e = float(m_end.group(1))
            d = float(m_end.group(2))
            intervals.append(SilenceInterval(start=s, end=e, duration=d))

    return intervals


def silence_to_cuts(
    intervals: list[SilenceInterval],
    total_duration: float,
) -> list[dict]:
    """Convert silence intervals into keep-regions (non-silent cuts)."""
    cuts = []
    prev_end = 0.0

    for si in sorted(intervals, key=lambda x: x.start):
        if si.start > prev_end:
            cuts.append({
                "start": round(prev_end, 3),
                "end": round(si.start, 3),
                "type": "keep",
            })
        prev_end = si.end

    if prev_end < total_duration:
        cuts.append({
            "start": round(prev_end, 3),
            "end": round(total_duration, 3),
            "type": "keep",
        })

    return cuts
