export type AudioMetrics = { crestFactor: number; peak: number; rms: number };

export function analyzeSamples(samples: Float32Array): AudioMetrics {
  if (!samples.length) return { crestFactor: 0, peak: 0, rms: 0 };
  let peak = 0;
  let sumSquares = 0;
  for (const sample of samples) {
    const absolute = Math.abs(sample);
    peak = Math.max(peak, absolute);
    sumSquares += sample * sample;
  }
  const rms = Math.sqrt(sumSquares / samples.length);
  return { peak, rms, crestFactor: rms ? peak / rms : 0 };
}

export async function analyzeAudioFile(file: File): Promise<AudioMetrics> {
  const context = new AudioContext();
  try {
    const buffer = await context.decodeAudioData(await file.arrayBuffer());
    return analyzeSamples(buffer.getChannelData(0));
  } finally {
    await context.close();
  }
}
