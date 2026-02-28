// Maps a percentage score to the TOEFL 2026 1–6 banded scale (half-point steps)
// Aligns with CEFR levels: 6=C2, 5.5=C1+, 5=C1, 4.5=B2+, 4=B2, 3.5=B1+, 3=B1, 2.5=A2+, 2=A2, 1.5=A1+, 1=A1
export function useBandEstimate(percent) {
  if (percent >= 95) return 6.0
  if (percent >= 88) return 5.5
  if (percent >= 80) return 5.0
  if (percent >= 72) return 4.5
  if (percent >= 63) return 4.0
  if (percent >= 54) return 3.5
  if (percent >= 44) return 3.0
  if (percent >= 34) return 2.5
  if (percent >= 24) return 2.0
  if (percent >= 14) return 1.5
  return 1.0
}
