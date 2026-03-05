import { describe, it, expect } from 'vitest'

// Replicates the adaptive routing threshold logic used in
// ReadingPracticeView, ListeningPracticeView, and ExamStartView.
function getStage2Mode(correctCount, totalStage1) {
  const threshold = Math.ceil(totalStage1 * 0.5)
  return correctCount >= threshold ? 'hard' : 'easy'
}

describe('adaptive stage2 routing', () => {
  describe('with 15 stage-1 questions (threshold = 8)', () => {
    const total = 15

    it('routes to hard at exactly threshold (8/15)', () => {
      expect(getStage2Mode(8, total)).toBe('hard')
    })

    it('routes to hard above threshold (15/15)', () => {
      expect(getStage2Mode(15, total)).toBe('hard')
    })

    it('routes to easy below threshold (7/15)', () => {
      expect(getStage2Mode(7, total)).toBe('easy')
    })

    it('routes to easy at zero (0/15)', () => {
      expect(getStage2Mode(0, total)).toBe('easy')
    })
  })

  describe('with 21 stage-1 questions (threshold = 11)', () => {
    const total = 21

    it('routes to hard at exactly threshold (11/21)', () => {
      expect(getStage2Mode(11, total)).toBe('hard')
    })

    it('routes to easy one below threshold (10/21)', () => {
      expect(getStage2Mode(10, total)).toBe('easy')
    })
  })
})
