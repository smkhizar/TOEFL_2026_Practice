import { describe, it, expect } from 'vitest'
import { toSpacedDisplay, formatPassageText } from './ctw'

describe('toSpacedDisplay', () => {
  it('adds one underscore per missing character', () => {
    expect(toSpacedDisplay('inves___', 'investigate')).toBe('inves_ _ _ _ _ _')
  })

  it('returns the prefix unchanged when answer length equals prefix length', () => {
    expect(toSpacedDisplay('hello', 'hello')).toBe('hello')
  })

  it('works with a single missing character', () => {
    expect(toSpacedDisplay('ca_', 'cat')).toBe('ca_')
  })

  it('handles two missing characters', () => {
    expect(toSpacedDisplay('ca__', 'cats')).toBe('ca_ _')
  })

  it('returns the full prefix when missingCount <= 0', () => {
    expect(toSpacedDisplay('word', 'wo')).toBe('word')
  })
})

describe('formatPassageText', () => {
  it('replaces blanks in passage text with spaced display form', () => {
    const passage = 'She is inves___ the case.'
    const blanks = [{ incomplete: 'inves___', answer: 'investigate' }]
    const result = formatPassageText(passage, blanks)
    expect(result).toContain('inves_ _ _ _ _ _')
    expect(result).not.toContain('inves___')
  })

  it('replaces multiple blanks in order', () => {
    const passage = 'The re___ and the stu___ are here.'
    const blanks = [
      { incomplete: 're___', answer: 'result' },
      { incomplete: 'stu___', answer: 'student' },
    ]
    const result = formatPassageText(passage, blanks)
    expect(result).toContain('re_ _')
    expect(result).toContain('stu_ _ _')
  })

  it('returns the passage unchanged when blanks array is empty', () => {
    const passage = 'No blanks here.'
    expect(formatPassageText(passage, [])).toBe(passage)
  })
})
