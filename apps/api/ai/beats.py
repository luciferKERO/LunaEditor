"""Beat sync / crest factor analysis for BGM-aware editing.

Detects audio peaks and computes crest factor to find high-energy moments
suitable for cut synchronization.
"""

import subprocess
import json
import struct
import wave
import math
from dataclasses import dataclass


@dataclass
class Beat:
    time: float
    strength: float  # 0-1 normalized


@dataclass
class AudioAnalysis:
    duration: float
    rms: float
    peak: float
    crest_factor: float  # peak / rms in dB
    beats: list[Beat]


def extract_audio_peaks(
    input_path: str,
    hop_size: float = 0.02,  # 20ms hops
    threshold: float = 0.6,  # normalized threshold for peak detection
) -> AudioAnalysis:
    """Analyze audio using FFmpeg astats + volumedetect, detect peaks via raw PCM."""

    # Get duration
    probe_cmd = [
        "ffmpeg", "-i", input_path,
        "-f", "null", "-"
    ]
    probe_result = subprocess.run(probe_cmd, capture_output=True, text=True, timeout=120)
    import re
    dur_match = re.search(r"Duration:\s*(\d+):(\d+):(\d+)\.(\d+)", probe_result.stderr)
    duration = 0.0
    if dur_match:
        h, m, s, cs = dur_match.groups()
        duration = int(h) * 3600 + int(m) * 60 + int(s) + int(cs) / 100

    # Extract raw PCM for peak detection
    pcm_cmd = [
        "ffmpeg", "-i", input_path,
        "-ac", "1", "-ar", "22050", "-f", "s16le", "-acodec", "pcm_s16le", "-"
    ]
    pcm_result = subprocess.run(pcm_cmd, capture_output=True, timeout=120)
    pcm_data = pcm_result.stdout

    sample_rate = 22050
    hop_samples = int(hop_size * sample_rate)
    n_samples = len(pcm_data) // 2

    # Compute RMS and find peaks
    samples = struct.unpack(f"<{n_samples}h", pcm_data[:n_samples * 2])
    max_val = max(abs(s) for s in samples) if samples else 1

    # Global stats
    sum_sq = sum(s * s for s in samples)
    rms = math.sqrt(sum_sq / n_samples) if n_samples > 0 else 0
    peak = max_val
    crest_factor = 20 * math.log10(peak / rms) if rms > 0 else 0

    # Windowed peak detection
    beats: list[Beat] = []
    for i in range(0, n_samples - hop_samples, hop_samples):
        window = samples[i:i + hop_samples]
        window_peak = max(abs(s) for s in window)
        normalized = window_peak / max_val if max_val > 0 else 0

        if normalized >= threshold:
            time = i / sample_rate
            beats.append(Beat(time=round(time, 3), strength=round(normalized, 3)))

    # Deduplicate beats too close together (< 100ms)
    filtered: list[Beat] = []
    for b in beats:
        if not filtered or b.time - filtered[-1].time >= 0.1:
            filtered.append(b)

    return AudioAnalysis(
        duration=round(duration, 3),
        rms=round(rms, 1),
        peak=peak,
        crest_factor=round(crest_factor, 2),
        beats=filtered,
    )
