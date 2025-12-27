export function useBandEstimate(percent) {
  if (percent >= 90) return 5.5
  if (percent >= 82) return 5.0
  if (percent >= 74) return 4.5
  if (percent >= 66) return 4.0
  if (percent >= 58) return 3.5
  if (percent >= 48) return 3.0
  if (percent >= 38) return 2.5
  return 2.0
}
