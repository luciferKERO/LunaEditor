"""Subtitle generation via Whisper (faster-whisper preferred, fallback to openai-whisper).

Produces SRT-style segments with word-level timestamps for kinetic captions.
"""

import subprocess
import json
import os
from dataclasses import dataclass, field


@dataclass
class Word:
    text: str
    start: float
    end: float
    confidence: float = 1.0


@dataclass
class Segment:
    id: int
    start: float
    end: float
    text: str
    words: list[Word] = field(default_factory=list)


def transcribe_with_whisper_cli(
    input_path: str,
    model: str = "base",
    language: str = "auto",
    output_dir: str | None = None,
) -> list[Segment]:
    """Run whisper CLI and parse output JSON.

    Tries faster-whisper-xxl first, falls back to whisper.
    """
    out_dir = output_dir or os.path.dirname(input_path)

    # Try faster-whisper first
    for exe in ["faster-whisper-xxl", "faster-whisper", "whisper"]:
        try:
            cmd = [exe, input_path, "--model", model, "--output_format", "json", "--output_dir", out_dir]
            if language != "auto":
                cmd.extend(["--language", language])
            subprocess.run(cmd, capture_output=True, text=True, timeout=1200, check=True)
            break
        except (FileNotFoundError, subprocess.CalledProcessError):
            continue
    else:
        raise RuntimeError("No whisper executable found. Install faster-whisper or openai-whisper.")

    # Parse output JSON
    base = os.path.splitext(os.path.basename(input_path))[0]
    json_path = os.path.join(out_dir, f"{base}.json")

    if not os.path.exists(json_path):
        raise FileNotFoundError(f"Whisper output not found: {json_path}")

    with open(json_path) as f:
        data = json.load(f)

    segments: list[Segment] = []
    for seg in data.get("segments", []):
        words = [
            Word(
                text=w.get("word", w.get("text", "")),
                start=w.get("start", 0),
                end=w.get("end", 0),
                confidence=w.get("probability", w.get("confidence", 1.0)),
            )
            for w in seg.get("words", [])
        ]
        segments.append(Segment(
            id=seg.get("id", 0),
            start=seg.get("start", 0),
            end=seg.get("end", 0),
            text=seg.get("text", "").strip(),
            words=words,
        ))

    return segments


def segments_to_srt(segments: list[Segment]) -> str:
    """Convert segments to SRT format string."""
    lines = []
    for seg in segments:
        lines.append(str(seg.id + 1))
        lines.append(f"{_fmt_srt(seg.start)} --> {_fmt_srt(seg.end)}")
        lines.append(seg.text)
        lines.append("")
    return "\n".join(lines)


def _fmt_srt(t: float) -> str:
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = int(t % 60)
    ms = int((t % 1) * 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
