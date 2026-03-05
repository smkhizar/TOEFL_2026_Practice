import React, { useEffect, useRef, useState } from 'react'
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Card,
  CardContent, Chip, FormControl, FormControlLabel, Radio, RadioGroup,
  Switch, Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { listeningAdaptive } from '../../data/listening'
import { useProgressStore } from '../../store/useProgressStore'
import { useAuthStore } from '../../store/useAuthStore'
import { useTimer } from '../../hooks/useTimer'
import { getBandEstimate } from '../../hooks/useBandEstimate'
import SectionTimer from '../../components/SectionTimer'
import { useCustomQuestions } from '../../hooks/useCustomQuestions'

const TOTAL_TIME = 22 * 60

export default function ListeningPracticeView() {
  const progress = useProgressStore()
  const userId = useAuthStore((s) => s.user?.id)
  const { customMap, saveCustom } = useCustomQuestions('listening')
  const timer = useTimer(TOTAL_TIME)

  const [stage2Mode, setStage2Mode] = useState('pending')
  const [stage1Score, setStage1Score] = useState(0)
  const [pool, setPool] = useState([...listeningAdaptive.stage1])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [answered, setAnswered] = useState({})
  const [responses, setResponses] = useState({})
  const [audioFailed, setAudioFailed] = useState({})
  const [generating, setGenerating] = useState(false)

  const stateRef = useRef({})
  stateRef.current = { pool, score, stage2Mode, responses }

  const _rawQ = pool[idx]
  const listenStageKey = idx < listeningAdaptive.stage1.length ? 'stage1'
    : stage2Mode === 'hard' ? 'stage2Hard' : 'stage2Easy'
  const listenStageIndex = idx < listeningAdaptive.stage1.length ? idx : idx - listeningAdaptive.stage1.length
  const q = customMap[listenStageKey]?.[listenStageIndex] ?? _rawQ
  const pct = pool.length ? Math.round((score / pool.length) * 100) : 0
  const band = getBandEstimate(pct)

  useEffect(() => {
    if (!finished) return
    const { pool: p, score: sc, stage2Mode: sm, responses: res } = stateRef.current
    const currentPct = p.length ? Math.round((sc / p.length) * 100) : 0
    progress.addListening(currentPct, {
      stage2Mode: sm, score: sc, total: p.length, percent: currentPct,
      band: getBandEstimate(currentPct), responses: res,
    }, userId)
  }, [finished]) // eslint-disable-line

  const finalize = () => {
    setFinished(true)
    timer.stop()
    speechSynthesis.cancel()
  }
  const finalizeRef = useRef(finalize)
  finalizeRef.current = finalize

  const restart = () => {
    speechSynthesis.cancel()
    setStage2Mode('pending')
    setStage1Score(0)
    setPool([...listeningAdaptive.stage1])
    setIdx(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
    setShowTranscript(false)
    setAnswered({})
    setResponses({})
    setAudioFailed({})
    timer.reset(TOTAL_TIME)
    timer.start(() => finalizeRef.current())
  }

  useEffect(() => { restart() }, []) // eslint-disable-line
  useEffect(() => () => speechSynthesis.cancel(), [])

  const playAudio = () => {
    speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(q.transcript)
    utt.rate = 0.92
    speechSynthesis.speak(utt)
  }

  const jump = (i) => {
    setIdx(i)
    setSelected(responses[i] ?? null)
  }

  const submitAnswer = () => {
    if (selected === null) return

    const prev = responses[idx]
    let scoreDelta = selected === q.answer ? 1 : 0
    if (prev !== undefined && prev === q.answer) scoreDelta -= 1

    const newScore = score + scoreDelta
    const newResponses = { ...responses, [idx]: selected }
    const newAnswered = { ...answered, [idx]: true }

    setAnswered(newAnswered)
    setResponses(newResponses)
    setScore(newScore)

    if (idx < pool.length - 1) {
      setIdx(idx + 1)
      setSelected(responses[idx + 1] ?? null)
      return
    }

    if (stage2Mode === 'pending') {
      const threshold = Math.ceil(listeningAdaptive.stage1.length * 0.5)
      const newMode = newScore >= threshold ? 'hard' : 'easy'
      setStage1Score(newScore)
      setStage2Mode(newMode)
      setPool([
        ...pool,
        ...(newMode === 'hard' ? listeningAdaptive.stage2Hard : listeningAdaptive.stage2Easy),
      ])
      setIdx(idx + 1)
      setSelected(null)
      return
    }

    finalize()
  }

  const generateQuestion = async () => {
    if (!q || generating) return
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'listening', type: q.type }),
      })
      const data = await res.json()
      if (!res.ok || !data.question) throw new Error(data.error || 'Generation failed')
      await saveCustom(listenStageKey, listenStageIndex, data.question)
      setSelected(null)
    } catch (e) {
      console.error('Generate failed:', e)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Listening Practice</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        2026 adaptive format: Stage 1 (15 questions) → Stage 2 Easy or Hard based on your score.
      </Typography>

      <SectionTimer label="Listening Section Timer" time={timer.formatted} percent={timer.percent} />

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

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
        <Chip
          size="small"
          label={
            stage2Mode === 'pending' ? 'Stage 1 — Foundation'
              : stage2Mode === 'hard' ? 'Stage 2 — Hard (Academic Inference)' : 'Stage 2 — Easy (Daily Life)'
          }
          color={stage2Mode === 'pending' ? 'default' : stage2Mode === 'hard' ? 'error' : 'info'}
          variant="outlined"
        />
        {stage2Mode !== 'pending' && (
          <Typography variant="caption" color="text.secondary">
            Stage 1 score: {stage1Score}/{listeningAdaptive.stage1.length}
          </Typography>
        )}
      </Box>

      {finished && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Score: <strong>{score}/{pool.length}</strong> ({pct}%) · Band: <strong>{band}</strong> · Stage 2: <strong>{stage2Mode}</strong>
        </Alert>
      )}

      {!finished && q && (
        <Card elevation={0} sx={{ borderRadius: 3, mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="overline">Question {idx + 1} / {pool.length} · {q.type}</Typography>
                {customMap[listenStageKey]?.[listenStageIndex] && (
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption">Transcript</Typography>
                <Switch
                  checked={showTranscript}
                  onChange={(e) => setShowTranscript(e.target.checked)}
                  size="small"
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
              {q.audioUrl && !audioFailed[q.id] ? (
                <audio
                  src={q.audioUrl}
                  controls
                  preload="none"
                  onError={() => setAudioFailed((f) => ({ ...f, [q.id]: true }))}
                />
              ) : (
                <Button variant="outlined" color="secondary" size="small" onClick={playAudio}>
                  ▶ Play Audio
                </Button>
              )}
              <Typography variant="caption" color="text.secondary">{q.type}</Typography>
            </Box>

            {showTranscript && (
              <Alert severity="info" sx={{ mb: 2 }}>{q.transcript}</Alert>
            )}

            <Typography fontWeight={500} sx={{ mb: 3 }}>{q.prompt}</Typography>
            <FormControl>
              <RadioGroup
                value={selected ?? ''}
                onChange={(e) => setSelected(Number(e.target.value))}
              >
                {q.options?.map((opt, i) => (
                  <FormControlLabel key={i} value={i} control={<Radio />} label={opt} sx={{ mb: 0.5 }} />
                ))}
              </RadioGroup>
            </FormControl>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" disabled={selected === null} onClick={submitAnswer}>
                {idx === pool.length - 1 ? 'Finish Section' : 'Next'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {finished && (
        <Card elevation={0} sx={{ borderRadius: 3, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Question Review</Typography>
            {pool.map((item, i) => {
              const isCorrect = responses[i] === item.answer
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
                    <Typography variant="body2" color="text.secondary" fontStyle="italic" sx={{ mb: 1 }}>
                      Transcript: {item.transcript}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{item.prompt}</Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Your answer:{' '}
                      <strong style={{ color: isCorrect ? '#4caf50' : '#f44336' }}>
                        {item.options?.[responses[i]] ?? 'Not answered'}
                      </strong>
                    </Typography>
                    <Typography variant="body2">
                      Correct: <strong style={{ color: '#4caf50' }}>{item.options?.[item.answer]}</strong>
                    </Typography>
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
