import React, { useEffect, useRef, useState } from 'react'
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Card,
  CardContent, Chip, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { readingAdaptive } from '../../data/reading'
import { useProgressStore } from '../../store/useProgressStore'
import { useAuthStore } from '../../store/useAuthStore'
import { useTimer } from '../../hooks/useTimer'
import { getBandEstimate } from '../../hooks/useBandEstimate'
import SectionTimer from '../../components/SectionTimer'

const TOTAL_TIME = 30 * 60

// Returns the display form of a CTW blank with one underscore per missing character.
// e.g. toSpacedDisplay('inves___', 'investigate') → 'inves_ _ _ _ _ _'
function toSpacedDisplay(incomplete, answer) {
  const prefix = incomplete.replace(/_{2,}$/, '')
  const missingCount = answer.length - prefix.length
  if (missingCount <= 0) return prefix
  return prefix + Array(missingCount).fill('_').join(' ')
}

function formatPassageText(passageText, blanks) {
  let text = passageText
  blanks.forEach((blank) => {
    text = text.replace(blank.incomplete, toSpacedDisplay(blank.incomplete, blank.answer))
  })
  return text
}

export default function ReadingPracticeView() {
  const progress = useProgressStore()
  const userId = useAuthStore((s) => s.user?.id)
  const timer = useTimer(TOTAL_TIME)

  const [stage2Mode, setStage2Mode] = useState('pending')
  const [stage1Score, setStage1Score] = useState(0)
  const [pool, setPool] = useState([...readingAdaptive.stage1])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [ctwAnswers, setCtwAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answered, setAnswered] = useState({})
  const [responses, setResponses] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastResult, setLastResult] = useState(null) // { correct, correctAnswer, yourAnswer }

  // Refs for latest state in timer callback
  const stateRef = useRef({})
  stateRef.current = { pool, score, stage2Mode, responses }

  const q = pool[idx]
  const isCTW = q?.type === 'Complete the Words'
  const ctwAllFilled = isCTW && q?.blanks
    ? q.blanks.every((_, i) => ctwAnswers[i]?.trim())
    : false

  // Progress saving when finished state changes
  useEffect(() => {
    if (!finished) return
    const { pool: p, score: sc, stage2Mode: sm, responses: res } = stateRef.current
    const pct = p.length ? Math.round((sc / p.length) * 100) : 0
    progress.addReading(pct, {
      stage2Mode: sm,
      score: sc,
      total: p.length,
      percent: pct,
      band: getBandEstimate(pct),
      responses: res,
    }, userId)
  }, [finished]) // eslint-disable-line

  const finalize = () => {
    setFinished(true)
    timer.stop()
  }

  // Stable wrapper for timer so it always calls latest finalize
  const finalizeRef = useRef(finalize)
  finalizeRef.current = finalize

  const restart = () => {
    setStage2Mode('pending')
    setStage1Score(0)
    setPool([...readingAdaptive.stage1])
    setIdx(0)
    setScore(0)
    setSelected(null)
    setCtwAnswers([])
    setFinished(false)
    setAnswered({})
    setResponses({})
    setShowFeedback(false)
    setLastResult(null)
    timer.reset(TOTAL_TIME)
    timer.start(() => finalizeRef.current())
  }

  useEffect(() => { restart() }, []) // eslint-disable-line

  // Reset CTW/selection when question changes
  useEffect(() => {
    if (isCTW && q?.blanks) {
      setCtwAnswers(new Array(q.blanks.length).fill(''))
    } else {
      setCtwAnswers([])
    }
    setSelected(responses[idx] ?? null)
  }, [idx]) // eslint-disable-line

  const jump = (i) => {
    setIdx(i)
    setSelected(responses[i] ?? null)
    setShowFeedback(false)
    setLastResult(null)
  }

  const submitAnswer = () => {
    const item = q
    let correct = 0
    if (item.type === 'Complete the Words') {
      if (!ctwAllFilled) return
      correct = item.blanks.every((b, i) => ctwAnswers[i]?.toLowerCase().trim() === b.answer.toLowerCase()) ? 1 : 0
    } else {
      if (selected === null) return
      correct = selected === item.answer ? 1 : 0
    }

    const prev = responses[idx]
    let scoreDelta = correct
    if (prev !== undefined) {
      if (prev === 1 && item.type === 'Complete the Words') scoreDelta -= 1
      else if (prev === item.answer && item.type !== 'Complete the Words') scoreDelta -= 1
    }

    const newScore = score + scoreDelta
    const newResponses = { ...responses, [idx]: item.type === 'Complete the Words' ? correct : selected }
    const newAnswered = { ...answered, [idx]: true }

    setAnswered(newAnswered)
    setResponses(newResponses)
    setScore(newScore)

    // Build feedback info
    if (item.type === 'Complete the Words') {
      setLastResult({
        correct: correct === 1,
        isCTW: true,
        blanks: item.blanks,
        userAnswers: [...ctwAnswers],
      })
    } else {
      setLastResult({
        correct: correct === 1,
        isCTW: false,
        correctAnswer: item.options?.[item.answer],
        yourAnswer: item.options?.[selected],
      })
    }
    setShowFeedback(true)

    // Stash advance info for when user clicks Continue
    pendingAdvanceRef.current = { newScore, newResponses, newAnswered }
  }

  const pendingAdvanceRef = useRef(null)

  const advance = () => {
    const { newScore, newAnswered } = pendingAdvanceRef.current ?? {}
    setShowFeedback(false)
    setLastResult(null)

    if (idx < pool.length - 1) {
      setIdx(idx + 1)
      setSelected(null)
      setCtwAnswers([])
      return
    }

    if (stage2Mode === 'pending') {
      const threshold = Math.ceil(readingAdaptive.stage1.length * 0.5)
      const newMode = newScore >= threshold ? 'hard' : 'easy'
      setStage1Score(newScore)
      setStage2Mode(newMode)
      setPool((prev) => [
        ...prev,
        ...(newMode === 'hard' ? readingAdaptive.stage2Hard : readingAdaptive.stage2Easy),
      ])
      setIdx(idx + 1)
      setSelected(null)
      setCtwAnswers([])
      return
    }

    finalize()
  }

  const pct = pool.length ? Math.round((score / pool.length) * 100) : 0
  const band = getBandEstimate(pct)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reading Practice</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        2026 adaptive format: Stage 1 (15 questions) → Stage 2 Easy or Hard based on your score.
      </Typography>

      <SectionTimer label="Reading Section Timer" time={timer.formatted} percent={timer.percent} />

      {/* Question nav chips */}
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
        {pool.map((item, i) => (
          <Chip
            key={item.id}
            label={`Q${i + 1}`}
            size="small"
            color={i === idx ? 'primary' : answered[i] ? 'success' : 'default'}
            onClick={() => jump(i)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>

      {/* Stage indicator */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
        <Chip
          size="small"
          label={
            stage2Mode === 'pending' ? 'Stage 1 — Foundation'
              : stage2Mode === 'hard' ? 'Stage 2 — Hard (Academic)' : 'Stage 2 — Easy (Daily Life)'
          }
          color={stage2Mode === 'pending' ? 'default' : stage2Mode === 'hard' ? 'error' : 'info'}
          variant="outlined"
        />
        {stage2Mode !== 'pending' && (
          <Typography variant="caption" color="text.secondary">
            Stage 1 score: {stage1Score}/{readingAdaptive.stage1.length}
          </Typography>
        )}
      </Box>

      {finished && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Score: <strong>{score}/{pool.length}</strong> ({pct}%) · Estimated Band: <strong>{band}</strong> · Stage 2: <strong>{stage2Mode}</strong>
        </Alert>
      )}

      {/* Question card */}
      {!finished && q && (
        <Card elevation={0} sx={{ borderRadius: 3, mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="overline">Question {idx + 1} / {pool.length}</Typography>
              <Typography variant="caption" color="text.secondary">{q.type}</Typography>
            </Box>

            {(() => {
              // Show feedback if just submitted OR jumping back to an already-answered question
              const displayFeedback = showFeedback || !!answered[idx]
              const storedResponse = responses[idx]
              const ctwCorrect = storedResponse === 1
              const mcqCorrect = storedResponse === q?.answer

              return isCTW ? (
                <>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    Read the passage. Each _ represents one missing letter (e.g. <code>inves_ _ _ _ _ _</code> = <em>investigate</em>). Type the complete word.
                  </Typography>
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover', lineHeight: 1.9 }}>
                    <Typography variant="body1">{formatPassageText(q.passageText, q.blanks ?? [])}</Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    {q.blanks?.map((blank, bi) => (
                      <Box key={bi} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Chip label={toSpacedDisplay(blank.incomplete, blank.answer)} size="small" color="primary" variant="outlined" sx={{ flexShrink: 0 }} />
                        <TextField
                          value={ctwAnswers[bi] || ''}
                          onChange={(e) => {
                            const next = [...ctwAnswers]
                            next[bi] = e.target.value
                            setCtwAnswers(next)
                          }}
                          label={`Complete word ${bi + 1}`}
                          size="small"
                          sx={{ maxWidth: 220 }}
                          disabled={displayFeedback}
                          onKeyDown={(e) => { if (e.key === 'Enter' && ctwAllFilled && !displayFeedback) submitAnswer() }}
                        />
                        {/* Per-blank icons only available on fresh submit (lastResult has userAnswers) */}
                        {showFeedback && lastResult?.isCTW && (
                          lastResult.userAnswers[bi]?.toLowerCase().trim() === blank.answer.toLowerCase()
                            ? <CheckCircleIcon color="success" fontSize="small" />
                            : <CancelIcon color="error" fontSize="small" />
                        )}
                      </Box>
                    ))}
                  </Box>
                  {displayFeedback && (
                    <Alert severity={ctwCorrect ? 'success' : 'error'} sx={{ mb: 2 }}>
                      {ctwCorrect
                        ? 'All blanks correct!'
                        : <>Incorrect. Correct answers: <strong>{q.blanks?.map((b) => b.answer).join(', ')}</strong></>}
                    </Alert>
                  )}
                  {!displayFeedback ? (
                    <Button variant="contained" disabled={!ctwAllFilled} onClick={submitAnswer}>Submit</Button>
                  ) : showFeedback ? (
                    <Button variant="contained" onClick={advance}>
                      {idx === pool.length - 1 ? 'Finish Section' : 'Continue →'}
                    </Button>
                  ) : null}
                </>
              ) : (
                <>
                  {q.passage && (
                    <Box sx={{ mb: 3, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover' }}>
                      <Typography variant="body2">{q.passage}</Typography>
                    </Box>
                  )}
                  <Typography fontWeight={500} sx={{ mb: 3 }}>{q.prompt}</Typography>
                  <FormControl>
                    <RadioGroup
                      value={selected ?? ''}
                      onChange={(e) => { if (!displayFeedback) setSelected(Number(e.target.value)) }}
                    >
                      {q.options?.map((opt, i) => (
                        <FormControlLabel
                          key={i}
                          value={i}
                          control={<Radio />}
                          label={
                            displayFeedback ? (
                              <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {opt}
                                {i === q.answer && <CheckCircleIcon color="success" fontSize="small" />}
                                {i === storedResponse && i !== q.answer && <CancelIcon color="error" fontSize="small" />}
                              </Box>
                            ) : opt
                          }
                          sx={{ mb: 0.5 }}
                          disabled={displayFeedback}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {displayFeedback && (
                    <Alert severity={mcqCorrect ? 'success' : 'error'} sx={{ mt: 2, mb: 1 }}>
                      {mcqCorrect
                        ? 'Correct!'
                        : <>Incorrect. Correct answer: <strong>{q.options?.[q.answer]}</strong></>}
                    </Alert>
                  )}
                  <Box sx={{ mt: 2 }}>
                    {!displayFeedback ? (
                      <Button variant="contained" disabled={selected === null} onClick={submitAnswer}>Submit</Button>
                    ) : showFeedback ? (
                      <Button variant="contained" onClick={advance}>
                        {idx === pool.length - 1 ? 'Finish Section' : 'Continue →'}
                      </Button>
                    ) : null}
                  </Box>
                </>
              )
            })()}
          </CardContent>
        </Card>
      )}

      {/* Review */}
      {finished && (
        <Card elevation={0} sx={{ borderRadius: 3, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Question Review</Typography>
            {pool.map((item, i) => {
              const isCorrect = item.type === 'Complete the Words'
                ? responses[i] === 1
                : responses[i] === item.answer
              return (
                <Accordion key={item.id} elevation={0} sx={{ mb: 0.5 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {isCorrect
                        ? <CheckCircleIcon color="success" fontSize="small" />
                        : <CancelIcon color="error" fontSize="small" />}
                      <Typography variant="body2">Q{i + 1} · {item.type}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item.type === 'Complete the Words' ? (
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{item.passageText}</Typography>
                        {item.blanks?.map((b, bi) => (
                          <Typography key={bi} variant="body2" sx={{ mb: 0.5 }}>
                            {toSpacedDisplay(b.incomplete, b.answer)} → Correct: <strong style={{ color: '#4caf50' }}>{b.answer}</strong>
                          </Typography>
                        ))}
                      </>
                    ) : (
                      <>
                        {item.passage && (
                          <Box sx={{ mb: 1, p: 1, borderRadius: 1, bgcolor: 'action.hover' }}>
                            <Typography variant="body2" color="text.secondary">{item.passage}</Typography>
                          </Box>
                        )}
                        <Typography variant="body2" sx={{ mb: 1 }}>{item.prompt}</Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          Your answer:{' '}
                          <strong style={{ color: responses[i] === item.answer ? '#4caf50' : '#f44336' }}>
                            {item.options?.[responses[i]] ?? 'Not answered'}
                          </strong>
                        </Typography>
                        <Typography variant="body2">
                          Correct: <strong style={{ color: '#4caf50' }}>{item.options?.[item.answer]}</strong>
                        </Typography>
                      </>
                    )}
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </CardContent>
        </Card>
      )}

      <Button variant="text" onClick={restart}>↺ Restart</Button>
    </Box>
  )
}
