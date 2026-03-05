import { describe, it, expect } from 'vitest'
import { getBandEstimate } from './useBandEstimate'

describe('getBandEstimate', () => {
  const cases = [
    [100, 6.0],
    [95,  6.0],
    [94,  5.5],
    [88,  5.5],
    [87,  5.0],
    [80,  5.0],
    [79,  4.5],
    [72,  4.5],
    [71,  4.0],
    [63,  4.0],
    [62,  3.5],
    [54,  3.5],
    [53,  3.0],
    [44,  3.0],
    [43,  2.5],
    [34,  2.5],
    [33,  2.0],
    [24,  2.0],
    [23,  1.5],
    [14,  1.5],
    [13,  1.0],
    [0,   1.0],
  ]

  cases.forEach(([percent, expected]) => {
    it(`returns ${expected} for ${percent}%`, () => {
      expect(getBandEstimate(percent)).toBe(expected)
    })
  })
})
