// Returns the display form of a CTW blank with one underscore per missing character.
// e.g. toSpacedDisplay('inves___', 'investigate') → 'inves_ _ _ _ _ _'
export function toSpacedDisplay(incomplete, answer) {
  const prefix = incomplete.replace(/_{2,}$/, '')
  const missingCount = answer.length - prefix.length
  if (missingCount <= 0) return prefix
  return prefix + Array(missingCount).fill('_').join(' ')
}

// Replaces each blank.incomplete in passageText with its spaced-display form.
export function formatPassageText(passageText, blanks) {
  let text = passageText
  blanks.forEach((blank) => {
    text = text.replace(blank.incomplete, toSpacedDisplay(blank.incomplete, blank.answer))
  })
  return text
}
