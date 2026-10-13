"""BGM Library indexer — scans assets/bgm/ and builds searchable index.

Categories: funny, santai (chill).
Maps to style presets: funny→meme/action, santai→chill/cinematic.
"""

import os
import subprocess
import json
import re
from dataclasses import dataclass, field, asdict


@dataclass
class BGMTrack:
    id: str
    filename: str
    path: str
    category: str  # funny | santai
    title: str
    duration: float = 0.0
    bpm: float = 0.0
    recommended_styles: list[str] = field(default_factory=list)


CATEGORY_STYLE_MAP = {
    "funny": ["meme", "action"],
    "santai": ["chill", "cinematic"],
}


def _clean_title(filename: str) -> str:
    """Extract readable title from filename."""
    name = os.path.splitext(filename)[0]
    # Remove YouTube ID suffix (e.g., -aBcDeFgHiJk)
    name = re.sub(r"-[a-zA-Z0-9_-]{11}$", "", name)
    # Replace hyphens with spaces, capitalize
    name = name.replace("-", " ").strip()
    return name.title()


def _probe_duration(path: str) -> float:
    """Get audio duration via ffprobe."""
    try:
        cmd = [
            "ffprobe", "-v", "quiet", "-show_entries",
            "format=duration", "-of", "csv=p=0", path
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        return float(result.stdout.strip())
    except (ValueError, subprocess.TimeoutExpired, FileNotFoundError):
        return 0.0


def index_bgm_library(
    bgm_dir: str = "assets/bgm",
    probe_duration: bool = True,
) -> list[BGMTrack]:
    """Scan BGM directory and build index."""
    tracks: list[BGMTrack] = []
    track_id = 0

    for category in sorted(os.listdir(bgm_dir)):
        cat_path = os.path.join(bgm_dir, category)
        if not os.path.isdir(cat_path):
            continue

        styles = CATEGORY_STYLE_MAP.get(category, [category])

        for filename in sorted(os.listdir(cat_path)):
            if not filename.endswith((".mp3", ".wav", ".ogg", ".flac")):
                continue

            path = os.path.join(cat_path, filename)
            title = _clean_title(filename)
            duration = _probe_duration(path) if probe_duration else 0.0

            track = BGMTrack(
                id=f"bgm_{track_id:03d}",
                filename=filename,
                path=path,
                category=category,
                title=title,
                duration=round(duration, 2),
                recommended_styles=styles,
            )
            tracks.append(track)
            track_id += 1

    return tracks


def select_bgm(
    tracks: list[BGMTrack],
    style: str,
    target_duration: float = 0,
) -> BGMTrack | None:
    """Select best BGM for given style and target duration."""
    matching = [t for t in tracks if style in t.recommended_styles]
    if not matching:
        matching = tracks  # fallback to all

    if target_duration > 0:
        # Prefer tracks closest to (but >= ) target duration
        matching.sort(key=lambda t: abs(t.duration - target_duration))

    return matching[0] if matching else None


def save_index(tracks: list[BGMTrack], output_path: str = "assets/bgm/index.json"):
    """Save index to JSON file."""
    data = [asdict(t) for t in tracks]
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(data, f, indent=2)
    return output_path


def load_index(index_path: str = "assets/bgm/index.json") -> list[BGMTrack]:
    """Load index from JSON file."""
    with open(index_path) as f:
        data = json.load(f)
    return [BGMTrack(**d) for d in data]
