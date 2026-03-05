import React, { useEffect, useRef, useState, useMemo } from 'react'
import {
  Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Snackbar, TextField, Typography,
} from '@mui/material'
import { writingTasks } from '../../data/writing'
import { useTimer } from '../../hooks/useTimer'
import SectionTimer from '../../components/SectionTimer'
import { useProgressStore } from '../../store/useProgressStore'
import { useAuthStore } from '../../store/useAuthStore'
import { useCustomQuestions } from '../../hooks/useCustomQuestions'

const taskTypes = ['all', 'Build a Sentence', 'Write an Email', 'Academic Discussion']

const taskTypeColor = (type) => {
  if (type === 'Build a Sentence') return 'success'
  if (type === 'Write an Email') return 'primary'
  return 'secondary'
}

const formatTime = (sec) => {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return s === 0 ? `${m} min` : `${m}:${String(s).padStart(2, '0')}`
}

export default function WritingPracticeView() {
  const progress = useProgressStore()
  const userId = useAuthStore((s) => s.user?.id)
  const { customMap, saveCustom } = useCustomQuestions('writing')
  const [filterType, setFilterType] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [response, setResponse] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(false)
  const [showSample, setShowSample] = useState(false)
  const [completedIds, setCompletedIds] = useState(new Set())
  const [arrangedChunks, setArrangedChunks] = useState([])
  const [generating, setGenerating] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const filteredTasks = useMemo(
    () => (filterType === 'all' ? writingTasks : writingTasks.filter((t) => t.type === filterType)),
    [filterType]
  )

  const _rawTask = filteredTasks[currentIndex] || writingTasks[0]
  const writingAbsIndex = writingTasks.indexOf(_rawTask)
  const task = customMap['tasks']?.[writingAbsIndex] ?? _rawTask
  const timer = useTimer(task.time)

  const shuffledChunks = useMemo(() => {
    if (task.type !== 'Build a Sentence' || !task.chunks) return []
    const seed = task.id.charCodeAt(task.id.length - 1)
    return [...task.chunks].sort(
      (a, b) => (a.charCodeAt(0) * seed + a.length) % 11 - (b.charCodeAt(0) * seed + b.length) % 11
    )
  }, [task.id, task.type, task.chunks])

  const availableChunks = shuffledChunks.filter((c) => !arrangedChunks.includes(c))
  const chunkArrangementCorrect = task.type === 'Build a Sentence' && task.chunks
    ? arrangedChunks.join(' ') === task.chunks.join(' ')
    : false

  const words = response.trim() ? response.trim().split(/\s+/).length : 0
  const quality = (() => {
    const lengthScore = Math.max(1, Math.min(5, Math.round((words / (task.minWords || 80)) * 5)))
    const sentenceCount = response.split(/[.!?]+/).filter(Boolean).length
    const structureScore = Math.max(1, Math.min(5, sentenceCount >= 4 ? 5 : sentenceCount + 1))
    return Math.round((lengthScore + structureScore) / 2)
  })()

  const canSubmit = (() => {
    if (submitting || submitted) return false
    if (task.type === 'Build a Sentence') return task.chunks && arrangedChunks.length === task.chunks.length
    return response.trim().length > 0
  })()

  const resetTaskState = () => {
    setResponse('')
    setArrangedChunks([])
    setSubmitted(false)
    setSubmitting(false)
    setShowSample(false)
    setTimeUp(false)
  }

  // Timer restart ref pattern
  const submitRef = useRef(null)
  const restartTimerRef = useRef(null)
  const canSubmitRef = useRef(false)
  canSubmitRef.current = canSubmit

  const submit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    if (task.type === 'Build a Sentence') setResponse(arrangedChunks.join(' '))
    await new Promise((r) => setTimeout(r, 200))
    setSubmitted(true)
    setSubmitting(false)
    setToast(true)
    setCompletedIds((s) => new Set([...s, task.id]))
    progress.addWriting(userId)
  }
  submitRef.current = submit

  const onTimerExpire = () => {
    // If there's content to submit, auto-submit; otherwise just mark time up
    if (submitRef.current && canSubmitRef.current) {
      submitRef.current()
    } else {
      setTimeUp(true)
    }
  }

  const restartTimer = () => {
    timer.reset(task.time)
    timer.start(onTimerExpire)
  }
  restartTimerRef.current = restartTimer

  // Restart timer when task changes
  const taskId = task.id
  useEffect(() => {
    restartTimerRef.current()
    resetTaskState()
  }, [taskId]) // eslint-disable-line

  // Initial start
  useEffect(() => { restartTimerRef.current() }, []) // eslint-disable-line

  const selectFilter = (type) => {
    setFilterType(type)
    setCurrentIndex(0)
    resetTaskState()
  }

  const selectTask = (i) => {
    setCurrentIndex(i)
    resetTaskState()
  }

  const nextTask = () => {
    setCurrentIndex((currentIndex + 1) % filteredTasks.length)
    resetTaskState()
  }

  const generateQuestion = async () => {
    if (!task || generating) return
    setGenerating(true)
    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'writing', type: task.type }),
      })
      const data = await res.json()
      if (!res.ok || !data.question) throw new Error(data.error || 'Generation failed')
      await saveCustom('tasks', writingAbsIndex, data.question)
      resetTaskState()
    } catch (e) {
      console.error('Generate failed:', e)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Box>
      <Typography sx={{
        fontWeight: 800, fontSize: { xs: '1.7rem', md: '2rem' },
        background: 'linear-gradient(135deg, #ffffff 30%, rgba(76,175,80,0.9) 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        mb: 0.5,
      }}>
        Writing Practice
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, mb: 3 }}>
        2026 format: 3 task types — Build a Sentence (2 min), Write an Email (7 min), Academic Discussion (10 min).
      </Typography>

      {/* Task type filter */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {taskTypes.map((type) => (
          <Button
            key={type}
            size="small"
            variant={filterType === type ? 'contained' : 'outlined'}
            color={filterType === type ? 'primary' : 'inherit'}
            onClick={() => selectFilter(type)}
          >
            {type === 'all' ? 'All Tasks' : type}
          </Button>
        ))}
      </Box>

      {/* Task navigation chips */}
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 3 }}>
        {filteredTasks.map((t, i) => (
          <Chip
            key={t.id}
            label={i + 1}
            size="small"
            color={currentIndex === i ? 'primary' : completedIds.has(t.id) ? 'success' : 'default'}
            variant={currentIndex === i ? 'filled' : 'outlined'}
            onClick={() => selectTask(i)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>

      <SectionTimer label="Writing Task Timer" time={timer.formatted} percent={timer.percent} />

      <Card elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Chip label={task.type} size="small" color={taskTypeColor(task.type)} variant="outlined" />
                {customMap['tasks']?.[writingAbsIndex] && (
                  <Chip size="small" label="AI" color="secondary" variant="outlined" sx={{ height: 18, fontSize: 10 }} />
                )}
                <Button
                  size="small"
                  variant="outlined"
                  disabled={generating || submitted}
                  onClick={generateQuestion}
                  sx={{ minWidth: 0, px: 1.5, py: 0.3, fontSize: 12 }}
                  startIcon={generating ? <CircularProgress size={12} color="inherit" /> : null}
                >
                  {generating ? 'Generating…' : '✦ Generate'}
                </Button>
              </Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Task {currentIndex + 1} of {filteredTasks.length} · Timer: {formatTime(task.time)}
              </Typography>
            </Box>
            {task.type !== 'Build a Sentence' && (
              <Chip label={`${task.minWords}+ words`} size="small" variant="outlined" />
            )}
          </Box>

          {generating && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, gap: 2 }}>
              <CircularProgress size={36} />
              <Typography variant="body2" color="text.secondary">Generating new task…</Typography>
            </Box>
          )}

          {/* Build a Sentence */}
          {!generating && task.type === 'Build a Sentence' && (
            <Box sx={{ mb: 3 }}>
              <Typography fontWeight={500} sx={{ mb: 2 }}>
                Arrange the phrase chunks into the correct sentence:
              </Typography>

              <Typography variant="caption" color="text.secondary">Your arrangement:</Typography>
              <Box sx={{
                display: 'flex', gap: 1, flexWrap: 'wrap', p: 2, borderRadius: 2, mb: 2,
                minHeight: 52, border: '1px dashed', borderColor: 'primary.main',
                bgcolor: 'rgba(0,188,212,0.04)',
              }}>
                {arrangedChunks.map((chunk, ci) => (
                  <Chip
                    key={`arr-${ci}`}
                    label={chunk}
                    size="small"
                    color="primary"
                    onDelete={!submitted ? () => setArrangedChunks(arrangedChunks.filter((_, j) => j !== ci)) : undefined}
                    disabled={submitted}
                  />
                ))}
                {!arrangedChunks.length && (
                  <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
                    Click chunks below to build your sentence
                  </Typography>
                )}
              </Box>

              <Typography variant="caption" color="text.secondary">Available chunks:</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2, mt: 0.5 }}>
                {availableChunks.map((chunk) => (
                  <Chip
                    key={chunk}
                    label={chunk}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    disabled={submitted}
                    onClick={() => {
                      if (!arrangedChunks.includes(chunk)) setArrangedChunks([...arrangedChunks, chunk])
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
                {!availableChunks.length && !submitted && (
                  <Typography variant="caption" color="success.main">All chunks placed ✓</Typography>
                )}
              </Box>

              {submitted && (
                <Alert severity={chunkArrangementCorrect ? 'success' : 'error'} sx={{ mb: 2 }}>
                  {chunkArrangementCorrect
                    ? 'Correct! Well done.'
                    : `Not quite. The correct sentence is: ${task.correct}`}
                </Alert>
              )}
            </Box>
          )}

          {/* Write an Email */}
          {!generating && task.type === 'Write an Email' && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 2, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover' }}>
                <Typography variant="overline">Scenario</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>{task.scenario}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={`To: ${task.recipient}`} size="small" color="primary" variant="outlined" />
                  <Chip label={task.register} size="small" color="secondary" variant="outlined" />
                </Box>
              </Box>
              <Box sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: 'rgba(255,152,0,0.07)' }}>
                <Typography variant="caption" fontWeight={700} color="warning.main" display="block" sx={{ mb: 1 }}>
                  ✦ Your email MUST address all 3 of these points:
                </Typography>
                {task.bulletPoints?.map((point, i) => (
                  <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {point}</Typography>
                ))}
              </Box>
              <Typography fontWeight={500} sx={{ mb: 2 }}>{task.prompt}</Typography>
              <TextField
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                label="Write your email here"
                multiline
                rows={10}
                fullWidth
                disabled={submitting || submitted}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Word count: {words}
                  {words < (task.minWords || 0)
                    ? <span style={{ color: '#ff9800' }}> ({task.minWords - words} more needed)</span>
                    : <span style={{ color: '#4caf50' }}> ✓ Minimum met</span>}
                </Typography>
                <Typography variant="caption" color="text.secondary">Quality estimate: {quality}/5</Typography>
              </Box>
            </Box>
          )}

          {/* Academic Discussion */}
          {!generating && task.type === 'Academic Discussion' && (
            <Box sx={{ mb: 2 }}>
              <Typography fontWeight={500} sx={{ mb: 2, whiteSpace: 'pre-line' }}>{task.prompt}</Typography>
              {task.context && (
                <Box sx={{ mb: 2, p: 2, borderRadius: 2, borderLeft: '3px solid', borderColor: 'primary.main', bgcolor: 'action.hover' }}>
                  <Typography variant="caption"><strong>Discussion context:</strong> {task.context}</Typography>
                </Box>
              )}
              <TextField
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                label="Write your discussion post"
                multiline
                rows={10}
                fullWidth
                disabled={submitting || submitted}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Word count: {words}
                  {words < (task.minWords || 0)
                    ? <span style={{ color: '#ff9800' }}> ({task.minWords - words} more needed)</span>
                    : <span style={{ color: '#4caf50' }}> ✓ Minimum met</span>}
                </Typography>
                <Typography variant="caption" color="text.secondary">Quality estimate: {quality}/5</Typography>
              </Box>
            </Box>
          )}

          {/* Sample response */}
          {!generating && submitted && task.sample && (
            <Box sx={{ mb: 2 }}>
              <Button size="small" variant="text" onClick={() => setShowSample(!showSample)}>
                {showSample ? 'Hide' : 'Show'} sample response
              </Button>
              {showSample && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  <strong>Sample:</strong> {task.sample}
                </Alert>
              )}
            </Box>
          )}

          {!generating && <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" disabled={!canSubmit} onClick={submit}>
              {submitting ? 'Submitting…' : 'Submit Task'}
            </Button>
            <Button variant="outlined" disabled={submitting} onClick={nextTask}>
              Next Task →
            </Button>
          </Box>}
        </CardContent>
      </Card>

      {timeUp && !submitted && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Time's up! No response was submitted for this task. Click <strong>Next Task</strong> to continue.
        </Alert>
      )}

      {submitted && task.type !== 'Build a Sentence' && (
        <Alert severity={words >= (task.minWords || 0) ? 'success' : 'warning'}>
          {words >= (task.minWords || 0)
            ? `Submitted! ${words} words — meets the minimum of ${task.minWords}.`
            : `Submitted with ${words} words. Aim for at least ${task.minWords} in the real exam.`}
        </Alert>
      )}

      <Snackbar
        open={toast}
        autoHideDuration={1800}
        onClose={() => setToast(false)}
        message="Task submitted and saved."
      />
    </Box>
  )
}
