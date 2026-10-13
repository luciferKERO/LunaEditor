"""FFmpeg render pipeline — assembles timeline cuts into final output."""

import subprocess
import os
import json
from dataclasses import dataclass


@dataclass
class RenderConfig:
    output_path: str
    resolution: str = "1920x1080"
    fps: int = 60
    codec: str = "libx264"
    bitrate: str = "20M"
    audio_codec: str = "aac"
    audio_bitrate: str = "192k"
    preset: str = "medium"
    crf: int = 18


def build_filter_complex(
    cuts: list[dict],
    input_path: str,
) -> tuple[list[str], str]:
    """Build FFmpeg filter_complex for concatenating cuts.

    cuts: list of {start, end, track, ...}
    Returns (command args, filter string).
    """
    video_cuts = [c for c in cuts if c.get("track", "").startswith("V")]
    video_cuts.sort(key=lambda c: c["start"])

    if not video_cuts:
        return [], ""

    filters = []
    streams = []

    for i, cut in enumerate(video_cuts):
        filters.append(
            f"[0:v]trim=start={cut['start']}:end={cut['end']},setpts=PTS-STARTPTS[v{i}];"
        )
        filters.append(
            f"[0:a]atrim=start={cut['start']}:end={cut['end']},asetpts=PTS-STARTPTS[a{i}];"
        )
        streams.append(f"[v{i}][a{i}]")

    concat = "".join(streams) + f"concat=n={len(video_cuts)}:v=1:a=1[outv][outa]"
    filter_str = "".join(filters) + concat

    return ["-filter_complex", filter_str, "-map", "[outv]", "-map", "[outa]"], filter_str


def render(
    input_path: str,
    cuts: list[dict],
    config: RenderConfig,
    progress_callback=None,
) -> str:
    """Render final video from cuts."""
    os.makedirs(os.path.dirname(config.output_path), exist_ok=True)

    filter_args, _ = build_filter_complex(cuts, input_path)

    cmd = [
        "ffmpeg", "-y",
        "-i", input_path,
        *filter_args,
        "-c:v", config.codec,
        "-b:v", config.bitrate,
        "-preset", config.preset,
        "-crf", str(config.crf),
        "-r", str(config.fps),
        "-s", config.resolution,
        "-c:a", config.audio_codec,
        "-b:a", config.audio_bitrate,
        config.output_path,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=3600)

    if result.returncode != 0:
        raise RuntimeError(f"FFmpeg render failed:\n{result.stderr[-500:]}")

    return config.output_path


def probe_media(input_path: str) -> dict:
    """Get media info via ffprobe."""
    cmd = [
        "ffprobe", "-v", "quiet",
        "-print_format", "json",
        "-show_format", "-show_streams",
        input_path,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    if result.returncode != 0:
        raise RuntimeError(f"ffprobe failed: {result.stderr}")
    return json.loads(result.stdout)
