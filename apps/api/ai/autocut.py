"""Auto-cut algorithm — selects and orders clips based on style preset.

Each style preset has different scoring weights:
- chill: longer clips, smooth transitions, dialogue-heavy
- action: fast cuts, high-energy moments, beat-synced
- meme: reaction shots, awkward pauses, funny moments
- cinematic: establishing shots, dramatic beats, slow-mo potential
"""

from dataclasses import dataclass, field
import random


@dataclass
class ScoredClip:
    start: float
    end: float
    score: float
    tags: list[str] = field(default_factory=list)

    @property
    def duration(self) -> float:
        return self.end - self.start


# Duration caps per preset (seconds)
DURATION_CAPS = {
    "short": (60, 180),      # 1-3 min
    "fast": (300, 600),      # 5-10 min
    "full": (600, 900),      # 10-15 min
    "extended": (900, 1200),  # 15-20 min
}

# Style weights: (energy_weight, dialogue_weight, scene_variety_weight, min_clip_sec, max_clip_sec)
STYLE_PROFILES = {
    "chill": {
        "energy_weight": 0.2,
        "dialogue_weight": 0.6,
        "variety_weight": 0.2,
        "min_clip": 4.0,
        "max_clip": 20.0,
        "preferred_transition": "crossfade",
    },
    "action": {
        "energy_weight": 0.7,
        "dialogue_weight": 0.1,
        "variety_weight": 0.2,
        "min_clip": 1.5,
        "max_clip": 8.0,
        "preferred_transition": "hard_cut",
    },
    "meme": {
        "energy_weight": 0.3,
        "dialogue_weight": 0.4,
        "variety_weight": 0.3,
        "min_clip": 2.0,
        "max_clip": 12.0,
        "preferred_transition": "jump_cut",
    },
    "cinematic": {
        "energy_weight": 0.4,
        "dialogue_weight": 0.3,
        "variety_weight": 0.3,
        "min_clip": 3.0,
        "max_clip": 15.0,
        "preferred_transition": "crossfade",
    },
}


def score_segments(
    segments: list[dict],
    silence_cuts: list[dict],
    beats: list[dict],
    subtitles: list[dict],
    style: str = "action",
) -> list[ScoredClip]:
    """Score each segment based on style profile.

    segments: from scene detection [{start, end, scene_idx}]
    silence_cuts: from silence detection [{start, end, type}]
    beats: from beat analysis [{time, strength}]
    subtitles: from whisper [{start, end, text}]
    """
    profile = STYLE_PROFILES.get(style, STYLE_PROFILES["action"])

    scored: list[ScoredClip] = []

    for seg in segments:
        s, e = seg["start"], seg["end"]
        dur = e - s

        # Energy score: beats in this segment
        seg_beats = [b for b in beats if s <= b.get("time", 0) <= e]
        energy = sum(b.get("strength", 0) for b in seg_beats) / max(len(seg_beats), 1)

        # Dialogue score: subtitle segments overlapping
        seg_subs = [sub for sub in subtitles if sub["start"] < e and sub["end"] > s]
        dialogue = min(len(seg_subs) / max(dur / 5, 1), 1.0)  # normalize: ~1 sub per 5s = max

        # Variety: scene index diversity (higher scene_idx = later = potentially more varied)
        variety = min(seg.get("scene_idx", 0) / 20, 1.0)

        # Weighted score
        score = (
            energy * profile["energy_weight"]
            + dialogue * profile["dialogue_weight"]
            + variety * profile["variety_weight"]
        )

        tags = []
        if energy > 0.7:
            tags.append("high_energy")
        if dialogue > 0.5:
            tags.append("dialogue")
        if dur < 3:
            tags.append("quick")
        if dur > 10:
            tags.append("sustained")

        scored.append(ScoredClip(start=s, end=e, score=score, tags=tags))

    return scored


def select_clips(
    scored: list[ScoredClip],
    duration_preset: str = "fast",
    style: str = "action",
) -> list[ScoredClip]:
    """Select clips to fit within duration cap, ranked by score."""
    min_dur, max_dur = DURATION_CAPS.get(duration_preset, (300, 600))
    profile = STYLE_PROFILES.get(style, STYLE_PROFILES["action"])

    # Filter by clip duration constraints
    filtered = [
        c for c in scored
        if profile["min_clip"] <= c.duration <= profile["max_clip"]
    ]

    # Sort by score descending
    filtered.sort(key=lambda c: c.score, reverse=True)

    # Greedily select clips to fill target duration
    selected: list[ScoredClip] = []
    total = 0.0
    target = (min_dur + max_dur) / 2  # target the midpoint

    for clip in filtered:
        if total + clip.duration > max_dur:
            continue
        selected.append(clip)
        total += clip.duration
        if total >= target:
            break

    # Re-sort by time for chronological order
    selected.sort(key=lambda c: c.start)

    return selected


def build_timeline(
    clips: list[ScoredClip],
    bgm_path: str | None = None,
    style: str = "action",
) -> dict:
    """Build a timeline structure from selected clips.

    Returns dict ready for frontend timeline rendering.
    """
    profile = STYLE_PROFILES.get(style, STYLE_PROFILES["action"])
    tracks = {"V1": [], "A1": [], "A2": []}

    current_out = 0.0

    for i, clip in enumerate(clips):
        dur = clip.duration

        # V1: video cuts
        tracks["V1"].append({
            "id": f"v1_{i}",
            "startTime": current_out,
            "endTime": current_out + dur,
            "srcStart": clip.start,
            "srcEnd": clip.end,
            "label": f"Cut {i+1}",
            "clipType": "video",
            "color": "#6366f1",
            "track": "V1",
            "transition": profile["preferred_transition"] if i > 0 else None,
        })

        # A1: dialogue audio (from source)
        tracks["A1"].append({
            "id": f"a1_{i}",
            "startTime": current_out,
            "endTime": current_out + dur,
            "srcStart": clip.start,
            "srcEnd": clip.end,
            "label": f"Dialogue {i+1}",
            "clipType": "audio",
            "color": "#06b6d4",
            "track": "A1",
        })

        current_out += dur

    # A2: BGM track (full duration, ducked)
    if bgm_path:
        tracks["A2"].append({
            "id": "a2_bgm",
            "startTime": 0,
            "endTime": current_out,
            "label": "BGM",
            "clipType": "audio",
            "color": "#06b6d4",
            "track": "A2",
            "sourcePath": bgm_path,
            "volume": 0.15,  # -18dB ducking
        })

    return {
        "duration": current_out,
        "fps": 60,
        "tracks": tracks,
        "style": style,
        "transition_type": profile["preferred_transition"],
    }
