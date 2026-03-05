import React, { useEffect, useRef, useState } from 'react'
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Card,
  CardContent, Chip, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, Typography,
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
import { supabase } from '../../lib/supabase'
import { useCustomQuestions } from '../../hooks/useCustomQuestions'

const TOTAL_TIME = 30 * 60

// Returns the display form of a CTW blank with one underscore per missing character.
// e.g. toSpacedDisplay('inves___', 'investigate') → 'inves_ _ _ _ _ _'
function toSpacedDisplay(incomplete, answer) {
  const prefix = incomplete.replace(/_{2,}$/, '')
  const missingCount = answer.length - prefix.length
  if (missingCount <= 0) return prefix
  return prefix + Array(missingCount).fill('_').join(' ')
}

// Renders passage text with per-character slot inputs at each blank position.
// Each missing letter gets its own visible slot showing _ or the typed character.
// A transparent overlay input captures keystrokes for the whole blank.
function renderPassageWithInputs(passageText, blanks, values, onChangeAt, disabled, blankFeedback) {
  if (!blanks?.length) return [passageText]
  const parts = []
  let remaining = passageText
  blanks.forEach((blank, bi) => {
    const pos = remaining.indexOf(blank.incomplete)
    if (pos === -1) return
    if (pos > 0) parts.push(remaining.slice(0, pos))
    const prefix = blank.incomplete.replace(/_{2,}$/, '')
    const missingCount = blank.answer.length - prefix.length
    const fc = blankFeedback?.[bi]
    const slotColor = fc === 'correct' ? '#4caf50' : fc === 'incorrect' ? '#f44336' : '#90caf9'
    const chars = (values[bi] || '').split('')

    parts.push(
      <span key={bi} style={{ whiteSpace: 'nowrap' }}>
        {prefix}
        {/* Slot container: visible slots + invisible overlay input */}
        <span style={{ position: 'relative', display: 'inline-flex', gap: '4px', verticalAlign: 'middle', margin: '0 3px' }}>
          {Array(missingCount).fill(0).map((_, ci) => (
            <span key={ci} style={{
              display: 'inline-block',
              width: '18px',
              textAlign: 'center',
              borderBottom: `2.5px solid ${slotColor}`,
              color: chars[ci] ? slotColor : slotColor,
              fontWeight: 700,
              fontSize: 'inherit',
              lineHeight: 1.5,
              userSelect: 'none',
            }}>
              {chars[ci] || '_'}
            </span>
          ))}
          <input
            value={values[bi] || ''}
            onChange={(e) => { if (!disabled) onChangeAt(bi, e.target.value.slice(0, missingCount)) }}
            disabled={disabled}
            maxLength={missingCount}
            style={{
              position: 'absolute',
              left: 0, top: 0,
              width: '100%', height: '100%',
              opacity: 0,
              cursor: disabled ? 'default' : 'text',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 'inherit',
            }}
          />
        </span>
      </span>
    )
    remaining = remaining.slice(pos + blank.incomplete.length)
  })
  if (remaining) parts.push(remaining)
  return parts
}

export default function ReadingPracticeView() {
  const progress = useProgressStore()
  const userId = useAuthStore((s) => s.user?.id)
  const { customMap, saveCustom } = useCustomQuestions('reading')
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
  const [resumeDialog, setResumeDialog] = useState(false)
  const [pendingResume, setPendingResume] = useState(null)
  const [generating, setGenerating] = useState(false)

  // Supabase session helpers — read uid fresh from store to avoid stale closure
  const upsertSession = (data) => {
    const uid = useAuthStore.getState().user?.id
    if (!uid) return
    supabase.from('reading_sessions').upsert(
      { user_id: uid, session_data: data, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    ).then(({ error }) => {
      if (error) console.error('[upsertSession] failed:', error)
    })
  }
  const deleteSession = () => {
    const uid = useAuthStore.getState().user?.id
    if (!uid) return
    supabase.from('reading_sessions').delete().eq('user_id', uid)
  }

  // Refs for latest state in timer callback
  const stateRef = useRef({})
  stateRef.current = { pool, score, stage2Mode, responses }

  const _rawQ = pool[idx]
  const stageKey = idx < readingAdaptive.stage1.length ? 'stage1'
    : stage2Mode === 'hard' ? 'stage2Hard' : 'stage2Easy'
  const stageIndex = idx < readingAdaptive.stage1.length ? idx : idx - readingAdaptive.stage1.length
  const q = customMap[stageKey]?.[stageIndex] ?? _rawQ
  const isCTW = q?.type === 'Complete the Words'
  const ctwAllFilled = isCTW && q?.blanks
    ? q.blanks.every((b, i) => {
        const prefix = b.incomplete.replace(/_{2,}$/, '')
        return ctwAnswers[i]?.trim().length === b.answer.length - prefix.length
      })
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
    deleteSession()
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
    setResumeDialog(false)
    setPendingResume(null)
    timer.reset(TOTAL_TIME)
    timer.start(() => finalizeRef.current())
  }

  useEffect(() => { restart() }, []) // eslint-disable-line

  // Check Supabase for a saved in-progress session when user logs in
  useEffect(() => {
    const uid = useAuthStore.getState().user?.id
    if (!uid) return
    supabase
      .from('reading_sessions')
      .select('session_data')
      .eq('user_id', uid)
      .single()
      .then(({ data, error }) => {
        if (!error && data?.session_data) {
          setPendingResume(data.session_data)
          setResumeDialog(true)
        }
      })
  }, [userId]) // eslint-disable-line

  const applyResume = () => {
    const d = pendingResume
    let restoredPool
    if (d.stage2Mode === 'pending') restoredPool = [...readingAdaptive.stage1]
    else if (d.stage2Mode === 'hard') restoredPool = [...readingAdaptive.stage1, ...readingAdaptive.stage2Hard]
    else restoredPool = [...readingAdaptive.stage1, ...readingAdaptive.stage2Easy]

    setPool(restoredPool)
    setIdx(d.idx)
    setScore(d.score)
    setStage2Mode(d.stage2Mode)
    setStage1Score(d.stage1Score)
    setResponses(d.responses)
    setAnswered(d.answered)
    setSelected(d.responses[d.idx] ?? null)
    setShowFeedback(false)
    setLastResult(null)
    setFinished(false)
    setResumeDialog(false)
    setPendingResume(null)
    timer.reset(TOTAL_TIME)
    timer.start(() => finalizeRef.current())
  }

  // Reset CTW/selection when question changes; pre-fill correct answers for review
  useEffect(() => {
    if (isCTW && q?.blanks) {
      if (answered[idx]) {
        // Show correct missing letters when reviewing an already-answered CTW
        setCtwAnswers(q.blanks.map(b => {
          const prefix = b.incomplete.replace(/_{2,}$/, '')
          return b.answer.slice(prefix.length)
        }))
      } else {
        setCtwAnswers(new Array(q.blanks.length).fill(''))
      }
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
      correct = item.blanks.every((b, i) => {
        const prefix = b.incomplete.replace(/_{2,}$/, '')
        return ctwAnswers[i]?.toLowerCase().trim() === b.answer.slice(prefix.length).toLowerCase()
      }) ? 1 : 0
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

    // Persist to Supabase so session survives browser/device changes
    upsertSession({
      idx,
      score: newScore,
      stage2Mode,
      stage1Score,
      responses: newResponses,
      answered: newAnswered,
    })

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
      const nextIdx = idx + 1
      setIdx(nextIdx)
      setSelected(null)
      setCtwAnswers([])
      upsertSession({ idx: nextIdx, score: newScore, stage2Mode, stage1Score, responses, answered })
      return
    }

    if (stage2Mode === 'pending') {
      const threshold = Math.ceil(readingAdaptive.stage1.length * 0.5)
      const newMode = newScore >= threshold ? 'hard' : 'easy'
      const nextIdx = idx + 1
      setStage1Score(newScore)
      setStage2Mode(newMode)
      setPool((prev) => [
        ...prev,
        ...(newMode === 'hard' ? readingAdaptive.stage2Hard : readingAdaptive.stage2Easy),
      ])
      setIdx(nextIdx)
      setSelected(null)
      setCtwAnswers([])
      upsertSession({ idx: nextIdx, score: newScore, stage2Mode: newMode, stage1Score: newScore, responses, answered })
      return
    }

    finalize()
  }

  const pct = pool.length ? Math.round((score / pool.length) * 100) : 0
  const band = getBandEstimate(pct)

  const generateQuestion = async () => {
    if (!q || generating) return
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'reading', type: q.type }),
      })
      const data = await res.json()
      if (!res.ok || !data.question) throw new Error(data.error || 'Generation failed')
      await saveCustom(stageKey, stageIndex, data.question)
      // Reset answer state for this question slot
      setSelected(null)
      setCtwAnswers(new Array((data.question.blanks ?? []).length).fill(''))
      setShowFeedback(false)
      setLastResult(null)
    } catch (e) {
      console.error('Generate failed:', e)
    } finally {
      setGenerating(false)
    }
  }

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="overline">Question {idx + 1} / {pool.length}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">{q.type}</Typography>
                {customMap[stageKey]?.[stageIndex] && (
                  <Chip size="small" label="AI" color="secondary" variant="outlined" sx={{ height: 18, fontSize: 10 }} />
                )}
                <Button
                  size="small"
                  variant="outlined"
                  disabled={generating || finished}
                  onClick={generateQuestion}
                  sx={{ minWidth: 0, px: 1.5, py: 0.3, fontSize: 12 }}
                >
                  {generating ? '…' : '✦ Generate'}
                </Button>
              </Box>
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
                    Type only the missing letters directly in each blank.
                  </Typography>
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover', lineHeight: 2.8, fontSize: '1rem' }}>
                    <Typography variant="body1" component="p">
                      {renderPassageWithInputs(
                        q.passageText,
                        q.blanks ?? [],
                        ctwAnswers,
                        (bi, val) => { const n = [...ctwAnswers]; n[bi] = val; setCtwAnswers(n) },
                        displayFeedback,
                        showFeedback && lastResult?.isCTW
                          ? lastResult.blanks.map((b, bi) => {
                              const prefix = b.incomplete.replace(/_{2,}$/, '')
                              return lastResult.userAnswers[bi]?.toLowerCase().trim() === b.answer.slice(prefix.length).toLowerCase()
                                ? 'correct' : 'incorrect'
                            })
                          : answered[idx] ? q?.blanks?.map(() => 'correct') : null
                      )}
                    </Typography>
                  </Box>
                  {displayFeedback && (
                    <Alert severity={ctwCorrect ? 'success' : 'error'} sx={{ mb: 2 }}>
                      {ctwCorrect
                        ? 'All blanks correct!'
                        : <>Incorrect. Correct missing letters: <strong>{q.blanks?.map((b) => {
                            const prefix = b.incomplete.replace(/_{2,}$/, '')
                            return b.answer.slice(prefix.length)
                          }).join(', ')}</strong></>}
                    </Alert>
                  )}
                  {!displayFeedback ? (
                    <Button variant="contained" disabled={!ctwAllFilled} onClick={submitAnswer}>Submit</Button>
                  ) : showFeedback ? (
                    <Button variant="contained" onClick={advance}>
                      {idx === pool.length - 1 ? 'Finish Section' : 'Continue →'}
                    </Button>
                  ) : idx < pool.length - 1 ? (
                    <Button variant="outlined" onClick={() => setIdx(idx + 1)}>Next →</Button>
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
                    ) : idx < pool.length - 1 ? (
                      <Button variant="outlined" onClick={() => setIdx(idx + 1)}>Next →</Button>
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

      <Button variant="text" onClick={() => { deleteSession(); restart() }}>↺ Restart</Button>

      {/* Resume session dialog */}
      <Dialog open={resumeDialog} onClose={() => { setResumeDialog(false); setPendingResume(null) }}>
        <DialogTitle>Resume previous session?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have an unfinished reading session at question{' '}
            <strong>{pendingResume ? pendingResume.idx + 1 : ''}</strong>.
            Would you like to continue where you left off?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setResumeDialog(false); setPendingResume(null); deleteSession() }}>
            Start Fresh
          </Button>
          <Button variant="contained" onClick={applyResume}>Resume</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
