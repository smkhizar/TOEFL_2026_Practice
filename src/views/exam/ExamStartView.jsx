import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useBlocker } from 'react-router-dom'
import {
  Alert, Box, Button, Card, CardContent, Chip, FormControl,
  FormControlLabel, Radio, RadioGroup, TextField, Typography,
} from '@mui/material'
import SectionTimer from '../../components/SectionTimer'
import { useTimer } from '../../hooks/useTimer'
import { useProgressStore } from '../../store/useProgressStore'
import { useAuthStore } from '../../store/useAuthStore'
import { readingAdaptive } from '../../data/reading'
import { listeningAdaptive } from '../../data/listening'
import { speakingTasks as allSpeakingTasks } from '../../data/speaking'
import { writingTasks as allWritingTasks } from '../../data/writing'
import { mockTests } from '../../data/mocks'

// Module-level lookup maps (stable, computed once)
const readingMap = Object.fromEntries(
  [...readingAdaptive.stage1, ...readingAdaptive.stage2Easy, ...readingAdaptive.stage2Hard].map((q) => [q.id, q])
)
const listeningMap = Object.fromEntries(
  [...listeningAdaptive.stage1, ...listeningAdaptive.stage2Easy, ...listeningAdaptive.stage2Hard].map((q) => [q.id, q])
)
const writingMap = Object.fromEntries(allWritingTasks.map((t) => [t.id, t]))
const speakingMap = Object.fromEntries(allSpeakingTasks.map((t) => [t.id, t]))

const PHASE_LABELS = {
  reading_s1: 'Read S1', reading_s2: 'Read S2',
  listening_s1: 'Listen S1', listening_s2: 'Listen S2',
  writing: 'Writing', speaking: 'Speaking',
}
const PHASES = ['reading_s1', 'reading_s2', 'listening_s1', 'listening_s2', 'writing', 'speaking']

const getPhaseDuration = (p, item) => {
  if (p === 'reading_s1') return 1080
  if (p === 'reading_s2') return 720
  if (p === 'listening_s1') return 1080
  if (p === 'listening_s2') return 660
  if (p === 'writing' && item) {
    if (item.type === 'Build a Sentence') return 120
    if (item.type === 'Write an Email') return 420
    return 600
  }
  if (p === 'speaking' && item) {
    if (item.type === 'Listen and Repeat') return item.expectedSeconds + 8
    return 53
  }
  return 300
}

export default function ExamStartView() {
  const { id: examId } = useParams()
  const navigate = useNavigate()
  const progress = useProgressStore()
  const userId = useAuthStore((s) => s.user?.id)
  const timer = useTimer(1080)

  const mockData = useMemo(
    () => mockTests.find((m) => String(m.id) === String(examId)) || mockTests[0],
    [examId]
  )

  // Stable question arrays derived from mockData (no state dependency)
  const readingS1Items = useMemo(() => mockData.reading.stage1.map((id) => readingMap[id]).filter(Boolean), [mockData])
  const readingS2EasyItems = useMemo(() => mockData.reading.stage2Easy.map((id) => readingMap[id]).filter(Boolean), [mockData])
  const readingS2HardItems = useMemo(() => mockData.reading.stage2Hard.map((id) => readingMap[id]).filter(Boolean), [mockData])
  const listeningS1Items = useMemo(() => mockData.listening.stage1.map((id) => listeningMap[id]).filter(Boolean), [mockData])
  const listeningS2EasyItems = useMemo(() => mockData.listening.stage2Easy.map((id) => listeningMap[id]).filter(Boolean), [mockData])
  const listeningS2HardItems = useMemo(() => mockData.listening.stage2Hard.map((id) => listeningMap[id]).filter(Boolean), [mockData])
  const writingItems = useMemo(() => mockData.writing.map((id) => writingMap[id]).filter(Boolean), [mockData])
  const speakingItems = useMemo(() => mockData.speaking.map((id) => speakingMap[id]).filter(Boolean), [mockData])

  // Exam state
  const [phase, setPhase] = useState('reading_s1')
  const [qIndex, setQIndex] = useState(0)
  const [active, setActive] = useState(true)
  const [focusWarnings, setFocusWarnings] = useState(0)
  const [selected, setSelected] = useState(null)
  const [ctwAnswers, setCtwAnswers] = useState([])
  const [writingResponse, setWritingResponse] = useState('')
  const [writingChunks, setWritingChunks] = useState([])
  const [speakingText, setSpeakingText] = useState('')
  const [speakingSubIndex, setSpeakingSubIndex] = useState(0)
  const [readingS1Score, setReadingS1Score] = useState(0)
  const [listeningS1Score, setListeningS1Score] = useState(0)
  const [readingStage2Mode, setReadingStage2Mode] = useState(null)
  const [listeningStage2Mode, setListeningStage2Mode] = useState(null)
  const [examResult, setExamResult] = useState({
    reading: { correct: 0, total: 0, adaptive: '' },
    listening: { correct: 0, total: 0, adaptive: '' },
    writing: { tasks: [] },
    speaking: { tasks: [] },
  })

  // Derived question arrays based on stage2 mode
  const readingS2Items = readingStage2Mode === 'hard' ? readingS2HardItems : readingS2EasyItems
  const listeningS2Items = listeningStage2Mode === 'hard' ? listeningS2HardItems : listeningS2EasyItems

  const phaseQuestions = useMemo(() => {
    if (phase === 'reading_s1') return readingS1Items
    if (phase === 'reading_s2') return readingS2Items
    if (phase === 'listening_s1') return listeningS1Items
    if (phase === 'listening_s2') return listeningS2Items
    return []
  }, [phase, readingS2Items, listeningS2Items, readingS1Items, listeningS1Items])

  const currentItem = useMemo(() => {
    if (phase === 'writing') return writingItems[qIndex]
    if (phase === 'speaking') return speakingItems[qIndex]
    return phaseQuestions[qIndex]
  }, [phase, qIndex, writingItems, speakingItems, phaseQuestions])

  const isReadingListening = ['reading_s1', 'reading_s2', 'listening_s1', 'listening_s2'].includes(phase)
  const isStage2 = ['reading_s2', 'listening_s2'].includes(phase)
  const isHardStage2 =
    (phase === 'reading_s2' && readingStage2Mode === 'hard') ||
    (phase === 'listening_s2' && listeningStage2Mode === 'hard')
  const isCTWItem = isReadingListening && currentItem?.type === 'Complete the Words'
  const ctwAllFilled = isCTWItem && currentItem?.blanks
    ? currentItem.blanks.every((_, i) => ctwAnswers[i]?.trim())
    : false

  const writingWordCount = writingResponse.trim() ? writingResponse.trim().split(/\s+/).length : 0

  const writingShuffledChunks = useMemo(() => {
    const item = currentItem
    if (item?.type !== 'Build a Sentence' || !item.chunks) return []
    const seed = item.id.charCodeAt(item.id.length - 1)
    return [...item.chunks].sort(
      (a, b) => (a.charCodeAt(0) * seed + a.length) % 11 - (b.charCodeAt(0) * seed + b.length) % 11
    )
  }, [currentItem])

  const writingAvailableChunks = writingShuffledChunks.filter((c) => !writingChunks.includes(c))

  const isLastItem = useMemo(() => {
    if (phase === 'writing') return qIndex === writingItems.length - 1
    if (phase === 'speaking') {
      const item = currentItem
      if (item?.type === 'Take an Interview' && item.questions) {
        return qIndex === speakingItems.length - 1 && speakingSubIndex === item.questions.length - 1
      }
      return qIndex === speakingItems.length - 1
    }
    return qIndex === phaseQuestions.length - 1
  }, [phase, qIndex, speakingSubIndex, writingItems, speakingItems, phaseQuestions, currentItem])

  const speakingNextLabel = useMemo(() => {
    const item = currentItem
    if (item?.type === 'Take an Interview' && item.questions) {
      if (speakingSubIndex < item.questions.length - 1) {
        return `Next Question (Q${speakingSubIndex + 2}/${item.questions.length}) →`
      }
    }
    if (isLastItem) return 'Finish Exam ✓'
    return 'Next Task →'
  }, [currentItem, speakingSubIndex, isLastItem])

  const stageLabel = isStage2
    ? (isHardStage2 ? 'Stage 2 — Hard' : 'Stage 2 — Easy')
    : 'Stage 1 — Foundation'

  const phaseDisplayName = phase.startsWith('reading') ? 'Reading' : 'Listening'

  const timerLabelMap = {
    reading_s1: 'Reading — Stage 1 Timer (18 min)',
    reading_s2: 'Reading — Stage 2 Timer (12 min)',
    listening_s1: 'Listening — Stage 1 Timer (18 min)',
    listening_s2: 'Listening — Stage 2 Timer (11 min)',
    writing: 'Writing Task Timer',
    speaking: 'Speaking Task Timer',
  }

  // Ref to keep advanceItem always fresh for timer callback
  const advanceItemRef = useRef(null)

  const finishExam = (result) => {
    setActive(false)
    progress.addMockExam(userId)
    localStorage.setItem('toefl-last-exam', JSON.stringify(result))
    navigate(`/exam/${examId}/review`)
  }

  const advanceItem = () => {
    if (!active) return

    // Handle speaking interview sub-questions
    if (phase === 'speaking') {
      const item = currentItem
      if (item?.type === 'Take an Interview' && item.questions) {
        if (speakingSubIndex < item.questions.length - 1) {
          setSpeakingSubIndex((s) => s + 1)
          setSpeakingText('')
          speechSynthesis.cancel()
          timer.reset(getPhaseDuration('speaking', item))
          timer.start(() => advanceItemRef.current?.())
          return
        }
        setSpeakingSubIndex(0)
      }
    }

    // Save current answer
    const item = currentItem
    let updatedResult = { ...examResult }

    if (isReadingListening && item) {
      let correct = 0
      if (isCTWItem && item.blanks) {
        correct = item.blanks.every((b, i) => ctwAnswers[i]?.toLowerCase().trim() === b.answer.toLowerCase()) ? 1 : 0
      } else {
        correct = selected === item.answer ? 1 : 0
      }
      if (phase === 'reading_s1') setReadingS1Score((s) => s + correct)
      if (phase === 'listening_s1') setListeningS1Score((s) => s + correct)
      const section = phase.startsWith('reading') ? 'reading' : 'listening'
      updatedResult = {
        ...updatedResult,
        [section]: {
          ...updatedResult[section],
          correct: updatedResult[section].correct + correct,
          total: updatedResult[section].total + 1,
        },
      }
    } else if (phase === 'writing' && item) {
      const responseText = item.type === 'Build a Sentence'
        ? writingChunks.join(' ')
        : writingResponse
      updatedResult = {
        ...updatedResult,
        writing: {
          tasks: [
            ...updatedResult.writing.tasks,
            { id: item.id, type: item.type, words: responseText.trim().split(/\s+/).filter(Boolean).length, submitted: responseText.trim().length > 0 },
          ],
        },
      }
    } else if (phase === 'speaking' && item) {
      updatedResult = {
        ...updatedResult,
        speaking: {
          tasks: [...updatedResult.speaking.tasks, { id: item.id, type: item.type, notes: speakingText.trim() }],
        },
      }
    }
    setExamResult(updatedResult)

    const items = phase === 'writing' ? writingItems
      : phase === 'speaking' ? speakingItems
      : phaseQuestions

    if (qIndex < items.length - 1) {
      setQIndex((q) => q + 1)
      setSelected(null)
      setCtwAnswers([])
      setWritingResponse('')
      setWritingChunks([])
      setSpeakingText('')
      setSpeakingSubIndex(0)
      speechSynthesis.cancel()

      if (phase === 'writing' || phase === 'speaking') {
        const nextItem = items[qIndex + 1]
        timer.reset(getPhaseDuration(phase, nextItem))
        timer.start(() => advanceItemRef.current?.())
      }
      return
    }

    // Phase complete — determine next phase
    timer.stop()

    const nextPhaseMap = (currentPhase, s1Score, s1Items) => {
      switch (currentPhase) {
        case 'reading_s1': {
          const mode = readingS1Score / readingS1Items.length >= 0.5 ? 'hard' : 'easy'
          setReadingStage2Mode(mode)
          setExamResult((r) => ({ ...r, reading: { ...r.reading, adaptive: mode } }))
          return 'reading_s2'
        }
        case 'reading_s2': return 'listening_s1'
        case 'listening_s1': {
          const mode = listeningS1Score / listeningS1Items.length >= 0.5 ? 'hard' : 'easy'
          setListeningStage2Mode(mode)
          setExamResult((r) => ({ ...r, listening: { ...r.listening, adaptive: mode } }))
          return 'listening_s2'
        }
        case 'listening_s2': return 'writing'
        case 'writing': return 'speaking'
        case 'speaking': return 'done'
        default: return 'done'
      }
    }

    const nextPhase = nextPhaseMap(phase)
    if (nextPhase === 'done') {
      finishExam(updatedResult)
      return
    }

    // Load next phase
    setPhase(nextPhase)
    setQIndex(0)
    setSelected(null)
    setCtwAnswers([])
    setWritingResponse('')
    setWritingChunks([])
    setSpeakingText('')
    setSpeakingSubIndex(0)
    speechSynthesis.cancel()

    const firstItem = nextPhase === 'writing' ? writingItems[0]
      : nextPhase === 'speaking' ? speakingItems[0]
      : null
    const dur = getPhaseDuration(nextPhase, firstItem)
    timer.reset(dur)
    timer.start(() => advanceItemRef.current?.())
  }

  // Keep ref always fresh
  advanceItemRef.current = advanceItem

  // Start exam on mount
  useEffect(() => {
    timer.reset(1080)
    timer.start(() => advanceItemRef.current?.())
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setFocusWarnings((w) => {
          const next = w + 1
          if (next >= 3) {
            alert('Exam forfeited due to repeated focus loss.')
            setActive(false)
            timer.stop()
            navigate('/exam')
          }
          return next
        })
      }
    }
    const onBlur = () => {
      setFocusWarnings((w) => {
        const next = w + 1
        if (next >= 3) {
          alert('Exam forfeited due to repeated focus loss.')
          setActive(false)
          timer.stop()
          navigate('/exam')
        }
        return next
      })
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', onBlur)
    return () => {
      speechSynthesis.cancel()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', onBlur)
    }
  }, []) // eslint-disable-line

  // Navigation blocker
  const activeRef = useRef(true)
  activeRef.current = active

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return activeRef.current && currentLocation.pathname !== nextLocation.pathname
  })

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const ok = window.confirm('Exam is in progress. Leave and forfeit?')
      if (ok) {
        setActive(false)
        timer.stop()
        blocker.proceed()
      } else {
        blocker.reset()
      }
    }
  }, [blocker.state]) // eslint-disable-line

  const enterFullscreen = async () => {
    const el = document.documentElement
    if (!document.fullscreenElement && el.requestFullscreen) {
      await el.requestFullscreen().catch(() => {})
    }
  }

  const playTranscript = () => {
    const item = currentItem
    if (!item?.transcript) return
    speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(item.transcript)
    utt.rate = 0.92
    speechSynthesis.speak(utt)
  }

  const playPromptSpeech = () => {
    const item = currentItem
    if (!item) return
    speechSynthesis.cancel()
    let text = ''
    if (item.type === 'Take an Interview' && item.questions) {
      text = item.questions[speakingSubIndex]?.promptAudioText ?? ''
    } else {
      text = item.promptAudioText ?? ''
    }
    if (!text) return
    const utt = new SpeechSynthesisUtterance(text)
    utt.rate = 0.92
    speechSynthesis.speak(utt)
  }

  const sectionBadges = PHASES.map((p, i) => ({
    id: p,
    label: PHASE_LABELS[p],
    active: p === phase,
    done: PHASES.indexOf(phase) > i,
  }))

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Mock Test {examId} — Live Exam</Typography>
          <Typography variant="caption" color="text.secondary">
            {mockData.difficulty} · ~{mockData.estMinutes} min · 2026 Format
          </Typography>
        </Box>
        <Button size="small" variant="outlined" onClick={enterFullscreen}>Fullscreen</Button>
      </Box>

      {focusWarnings > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Focus warnings: {focusWarnings}/3. Switching tabs repeatedly will forfeit this exam.
        </Alert>
      )}

      {/* Section progress chips */}
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
        {sectionBadges.map((b) => (
          <Chip
            key={b.id}
            label={b.label}
            size="small"
            color={b.active ? 'primary' : b.done ? 'success' : 'default'}
            variant={b.active ? 'filled' : 'outlined'}
          />
        ))}
      </Box>

      <SectionTimer label={timerLabelMap[phase] || 'Timer'} time={timer.formatted} percent={timer.percent} />

      {/* Reading / Listening */}
      {isReadingListening && (
        <Card elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="overline">
                {phaseDisplayName} · Question {qIndex + 1} / {phaseQuestions.length}
              </Typography>
              <Chip
                size="small"
                label={stageLabel}
                color={isHardStage2 ? 'error' : isStage2 ? 'info' : 'default'}
                variant="outlined"
              />
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
              {currentItem?.type}
            </Typography>

            {/* CTW */}
            {isCTWItem && (
              <>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  Each truncated word (e.g. <code>inves___</code>) is missing its ending. Type the complete word.
                </Typography>
                <Box sx={{ mb: 3, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover', lineHeight: 1.9 }}>
                  <Typography variant="body1">{currentItem.passageText}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  {currentItem.blanks?.map((blank, bi) => (
                    <Box key={bi} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Chip label={blank.incomplete} size="small" color="primary" variant="outlined" sx={{ flexShrink: 0 }} />
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
                        onKeyDown={(e) => { if (e.key === 'Enter' && ctwAllFilled) advanceItem() }}
                      />
                    </Box>
                  ))}
                </Box>
                <Button variant="contained" disabled={!ctwAllFilled} onClick={advanceItem}>
                  {isLastItem ? 'Finish Section →' : 'Next Question →'}
                </Button>
              </>
            )}

            {/* Listening with transcript */}
            {!isCTWItem && currentItem?.transcript && (
              <>
                <Box sx={{ mb: 3, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'secondary.main', bgcolor: 'action.hover' }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                    Audio transcript (in the real TOEFL, you hear this — no text on screen)
                  </Typography>
                  <Typography variant="body2" fontStyle="italic">{currentItem.transcript}</Typography>
                  <Button size="small" variant="outlined" color="secondary" sx={{ mt: 1 }} onClick={playTranscript}>
                    ▶ Play Audio
                  </Button>
                </Box>
                <Typography fontWeight={500} sx={{ mb: 3 }}>{currentItem?.prompt}</Typography>
                <FormControl>
                  <RadioGroup value={selected ?? ''} onChange={(e) => setSelected(Number(e.target.value))}>
                    {currentItem?.options?.map((opt, i) => (
                      <FormControlLabel key={i} value={i} control={<Radio />} label={opt} sx={{ mb: 0.5 }} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" disabled={selected === null} onClick={advanceItem}>
                    {isLastItem ? 'Finish Section →' : 'Next Question →'}
                  </Button>
                </Box>
              </>
            )}

            {/* Standard MCQ */}
            {!isCTWItem && !currentItem?.transcript && (
              <>
                {currentItem?.passage && (
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover' }}>
                    <Typography variant="body2">{currentItem.passage}</Typography>
                  </Box>
                )}
                <Typography fontWeight={500} sx={{ mb: 3 }}>{currentItem?.prompt}</Typography>
                <FormControl>
                  <RadioGroup value={selected ?? ''} onChange={(e) => setSelected(Number(e.target.value))}>
                    {currentItem?.options?.map((opt, i) => (
                      <FormControlLabel key={i} value={i} control={<Radio />} label={opt} sx={{ mb: 0.5 }} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" disabled={selected === null} onClick={advanceItem}>
                    {isLastItem ? 'Finish Section →' : 'Next Question →'}
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Writing */}
      {phase === 'writing' && (
        <Card elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline">Writing · Task {qIndex + 1} / {writingItems.length}</Typography>
              <Chip size="small" label={currentItem?.type} color="secondary" variant="outlined" />
            </Box>

            {/* Build a Sentence */}
            {currentItem?.type === 'Build a Sentence' && (
              <>
                <Typography fontWeight={500} sx={{ mb: 2 }}>Arrange the phrase chunks into the correct sentence:</Typography>
                <Typography variant="caption" color="text.secondary">Your arrangement:</Typography>
                <Box sx={{
                  display: 'flex', gap: 1, flexWrap: 'wrap', p: 2, borderRadius: 2, mb: 2, mt: 0.5,
                  minHeight: 52, border: '1px dashed', borderColor: 'primary.main', bgcolor: 'rgba(0,188,212,0.04)',
                }}>
                  {writingChunks.map((chunk, ci) => (
                    <Chip
                      key={`wc-${ci}`}
                      label={chunk}
                      size="small"
                      color="primary"
                      onDelete={() => setWritingChunks(writingChunks.filter((_, j) => j !== ci))}
                    />
                  ))}
                  {!writingChunks.length && (
                    <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
                      Click chunks below to build your sentence
                    </Typography>
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary">Available chunks:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3, mt: 0.5 }}>
                  {writingAvailableChunks.map((chunk) => (
                    <Chip
                      key={chunk}
                      label={chunk}
                      size="small"
                      color="secondary"
                      variant="outlined"
                      onClick={() => { if (!writingChunks.includes(chunk)) setWritingChunks([...writingChunks, chunk]) }}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  disabled={writingChunks.length !== (currentItem.chunks?.length ?? 0)}
                  onClick={advanceItem}
                >
                  {isLastItem ? 'Finish Writing →' : 'Submit & Next Task →'}
                </Button>
              </>
            )}

            {/* Write an Email */}
            {currentItem?.type === 'Write an Email' && (
              <>
                {currentItem.scenario && (
                  <Box sx={{ mb: 2, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover' }}>
                    <Typography variant="overline">Scenario</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{currentItem.scenario}</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={`To: ${currentItem.recipient}`} size="small" color="primary" variant="outlined" />
                      <Chip label={currentItem.register} size="small" color="secondary" variant="outlined" />
                    </Box>
                  </Box>
                )}
                {currentItem.bulletPoints && (
                  <Box sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: 'rgba(255,152,0,0.07)' }}>
                    <Typography variant="caption" fontWeight={700} color="warning.main" display="block" sx={{ mb: 1 }}>
                      ✦ Your email MUST address all 3 of these points:
                    </Typography>
                    {currentItem.bulletPoints.map((point, i) => (
                      <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {point}</Typography>
                    ))}
                  </Box>
                )}
                <Typography fontWeight={500} sx={{ mb: 2 }}>{currentItem.prompt}</Typography>
                <TextField
                  value={writingResponse}
                  onChange={(e) => setWritingResponse(e.target.value)}
                  label="Write your email here"
                  multiline
                  rows={10}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  Word count: {writingWordCount}
                  {currentItem?.minWords && ` · Minimum: ${currentItem.minWords} words`}
                </Typography>
                <Button variant="contained" onClick={advanceItem}>
                  {isLastItem ? 'Finish Writing →' : 'Submit & Next Task →'}
                </Button>
              </>
            )}

            {/* Academic Discussion */}
            {currentItem?.type === 'Academic Discussion' && (
              <>
                <Typography fontWeight={500} sx={{ mb: 2 }}>{currentItem?.prompt}</Typography>
                {currentItem?.context && (
                  <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, bgcolor: 'action.hover' }}>
                    <Typography variant="caption"><strong>Context:</strong> {currentItem.context}</Typography>
                  </Box>
                )}
                <TextField
                  value={writingResponse}
                  onChange={(e) => setWritingResponse(e.target.value)}
                  label="Write your discussion post here"
                  multiline
                  rows={10}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  Word count: {writingWordCount}
                  {currentItem?.minWords && ` · Minimum: ${currentItem.minWords} words`}
                </Typography>
                <Button variant="contained" onClick={advanceItem}>
                  {isLastItem ? 'Finish Writing →' : 'Submit & Next Task →'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Speaking */}
      {phase === 'speaking' && (
        <Card elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="overline">Speaking · Task {qIndex + 1} / {speakingItems.length}</Typography>
              <Chip
                size="small"
                label={currentItem?.type}
                color={currentItem?.type === 'Listen and Repeat' ? 'info' : 'secondary'}
                variant="outlined"
              />
            </Box>

            {/* Listen and Repeat */}
            {currentItem?.type === 'Listen and Repeat' && (
              <>
                {currentItem?.scene && (
                  <Typography variant="caption" color="text.secondary" fontStyle="italic" display="block" sx={{ mb: 1 }}>
                    Scene: {currentItem.scene}
                  </Typography>
                )}
                <Typography fontWeight={500} sx={{ mb: 3 }}>{currentItem?.promptAudioText}</Typography>
              </>
            )}

            {/* Take an Interview */}
            {currentItem?.type === 'Take an Interview' && currentItem.questions && (
              <>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  Topic: <strong>{currentItem.topic}</strong>
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                  {currentItem.questions.map((q, qi) => (
                    <Chip
                      key={qi}
                      size="small"
                      label={`Q${qi + 1}: ${q.questionType}`}
                      color={qi === speakingSubIndex ? 'secondary' : qi < speakingSubIndex ? 'success' : 'default'}
                      variant={qi === speakingSubIndex ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
                <Typography variant="caption" fontWeight={600} color="secondary.main" display="block" sx={{ mb: 0.5 }}>
                  Question {speakingSubIndex + 1} of {currentItem.questions.length}
                </Typography>
                <Typography fontWeight={500} sx={{ mb: 3 }}>
                  {currentItem.questions[speakingSubIndex]?.promptAudioText}
                </Typography>
              </>
            )}

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
              <Button variant="outlined" color="secondary" size="small" onClick={playPromptSpeech}>
                ▶ Play Prompt
              </Button>
              <Typography variant="caption" color="text.secondary">
                Response: ~{currentItem?.type === 'Listen and Repeat'
                  ? currentItem.expectedSeconds
                  : currentItem?.questions?.[speakingSubIndex]?.expectedSeconds ?? 45}s
              </Typography>
            </Box>

            <TextField
              value={speakingText}
              onChange={(e) => setSpeakingText(e.target.value)}
              label="Notes / key points (optional — speak your answer aloud)"
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={advanceItem}>{speakingNextLabel}</Button>
          </CardContent>
        </Card>
      )}

      <Alert severity="warning" variant="outlined">
        Leaving this page will forfeit your current exam session.
      </Alert>
    </Box>
  )
}
