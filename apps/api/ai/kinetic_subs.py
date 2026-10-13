"""Kinetic subtitle renderer — generates ASS subtitle files with animated word-by-word reveal.

Used for meme/action style edits with word-pop captions.
"""

import os
from dataclasses import dataclass


@dataclass
class KineticStyle:
    font_name: str = "Inter"
    font_size: int = 56
    primary_color: str = "&H00FFFFFF"   # white
    outline_color: str = "&H00000000"   # black
    shadow_color: str = "&H80000000"    # 50% black
    outline_width: int = 3
    shadow_depth: int = 2
    bold: bool = True
    alignment: int = 2  # bottom center
    margin_v: int = 60
    pop_scale: float = 1.3  # scale factor for word pop-in


STYLE_PRESETS = {
    "chill": KineticStyle(font_size=48, outline_width=2, pop_scale=1.0),
    "action": KineticStyle(font_size=64, bold=True, primary_color="&H0000FFFF", pop_scale=1.5),
    "meme": KineticStyle(font_size=72, bold=True, primary_color="&H0000FF00", pop_scale=1.8, outline_width=4),
    "cinematic": KineticStyle(font_size=52, font_name="Georgia", outline_width=1, pop_scale=1.1),
}


def _ass_time(seconds: float) -> str:
    """Format seconds as ASS timestamp h:mm:ss.cs"""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    cs = int((seconds % 1) * 100)
    return f"{h}:{m:02}:{s:02}.{cs:02}"


def render_kinetic_subtitles(
    segments: list[dict],
    style_name: str = "action",
    video_width: int = 1920,
    video_height: int = 1080,
) -> str:
    """Generate ASS subtitle string with word-by-word kinetic animation.

    segments: [{id, start, end, text, words: [{text, start, end}]}]
    """
    style = STYLE_PRESETS.get(style_name, STYLE_PRESETS["action"])

    # ASS header
    header = f"""[Script Info]
Title: LUNA Kinetic Subtitles
ScriptType: v4.00+
PlayResX: {video_width}
PlayResY: {video_height}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,{style.font_name},{style.font_size},{style.primary_color},&H000000FF,{style.outline_color},{style.shadow_color},{int(style.bold)},0,0,0,100,100,0,0,1,{style.outline_width},{style.shadow_depth},{style.alignment},10,10,{style.margin_v},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

    events = []

    for seg in segments:
        words = seg.get("words", [])
        if not words:
            # No word-level timestamps — show full line
            start = _ass_time(seg["start"])
            end = _ass_time(seg["end"])
            text = seg["text"].replace("\n", "\\N")
            events.append(f"Dialogue: 0,{start},{end},Default,,0,0,0,,{text}")
            continue

        # Word-by-word kinetic reveal
        for i, word in enumerate(words):
            w_start = _ass_time(word.get("start", seg["start"]))
            w_end = _ass_time(word.get("end", seg["end"]))
            w_text = word.get("text", "").strip()
            if not w_text:
                continue

            # Scale animation: pop in at scale, settle to 100
            scale = int(style.pop_scale * 100)
            anim = f"{{\\fscx{scale}\\fscy{scale}\\t(0,80,\\fscx100\\fscy100)}}"
            # Fade in
            fade = "{\\fad(50,100)}"

            events.append(f"Dialogue: 0,{w_start},{w_end},Default,,0,0,0,,{fade}{anim}{w_text}")

    return header + "\n".join(events) + "\n"


def save_ass(content: str, output_path: str) -> str:
    """Save ASS subtitle file."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    return output_path
