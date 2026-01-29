# UX Audit Checklist (Desktop + Mobile)

Date: 2026-02-27
Scope: Full app pass, page-by-page, with micro-interaction tightening.

## Global
- [x] Responsive shell behavior
  - Desktop: permanent drawer
  - Mobile: temporary drawer + nav icon + auto-close on route tap
- [x] Visual consistency
  - Card surface polish, spacing consistency, subtle depth on hover
- [x] Motion polish
  - Route/page fade transition (fast, non-distracting)
- [x] Small-screen ergonomics
  - Improved heading scale and audio element width on mobile

## Dashboard
- [x] KPI cards readable on small screens
- [x] Data hierarchy clear (label -> value)
- [x] Estimated band included for quick signal

## Practice Hub
- [x] Cards are tappable, hover feedback on desktop
- [x] Layout wraps cleanly from desktop to mobile

## Reading Practice
- [x] Question chips indicate current/answered state
- [x] Re-answer score bug fixed (prevents score inflation)
- [x] Timer expiry correctly finalizes attempt and stores result
- [x] Post-section review panel added (answer vs correct)

## Listening Practice
- [x] Audio-first interaction
- [x] Native audio controls when file exists
- [x] Graceful fallback to TTS when audio fails
- [x] Transcript toggle for accessibility
- [x] Timer finalize + detailed review panel

## Speaking Practice
- [x] Button state discipline (disabled/loading while initializing/recording)
- [x] Snackbar feedback for save/error events
- [x] Cleanup on unmount for intervals/speech recognition
- [x] Prevents accidental interactions during active recording

## Writing Practice
- [x] Submit disabled until response has text
- [x] Submit loading feedback
- [x] Snackbar on successful save
- [x] Alert transition polish

## Exam Hub / Exam Live
- [x] Card hover polish in exam list
- [x] Fullscreen + focus warning system retained
- [x] Forfeit messaging retained and clear

## Exam Review
- [x] Section summary and latest estimates visible
- [x] Return action clear and obvious

## Settings
- [x] Async loading states for permission actions
- [x] Replaced blocking confirms with non-jarring dialog for reset
- [x] Snackbar confirmation for export/import/reset actions

## Remaining recommendations (optional next pass)
- [ ] Keyboard shortcuts (next question, submit answer, toggle transcript)
- [ ] Persist in-progress practice sessions after tab refresh
- [ ] Add ARIA labels and focus rings audit for accessibility compliance
- [ ] Add end-to-end Playwright smoke tests for mobile viewport flows
