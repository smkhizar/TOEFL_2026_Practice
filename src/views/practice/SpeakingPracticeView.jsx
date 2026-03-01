import React, { useEffect, useRef, useState, useMemo } from 'react'
import {
  Box, Button, Card, CardContent, Chip, Grid, LinearProgress,
  Snackbar, TextField, Typography,
} from '@mui/material'
import { speakingTasks } from '../../data/speaking'
import { useProgressStore } from '../../store/useProgressStore'

export default function SpeakingPracticeView() {
  const progress = useProgressStore()
  const tasks = speakingTasks

  const [current, setCurrent] = useState(0)
  const [interviewSubIdx, setInterviewSubIdx] = useState(0)
  const [micPermission, setMicPermission] = useState('unknown')
  const [recognitionStatus, setRecognitionStatus] = useState('idle')
  const [transcript, setTranscript] = useState('')
  const [recording, setRecording] = useState(false)
  const [initializing, setInitializing] = useState(false)
  const [duration, setDuration] = useState(0)
  const [savedToast, setSavedToast] = useState(false)
  const [errorToast, setErrorToast] = useState(false)
  const [completedTasks, setCompletedTasks] = useState({})

  const mediaRecorderRef = useRef(null)
  const intervalRef = useRef(null)
  const recognitionRef = useRef(null)

  const task = tasks[current]
  const currentQuestion = useMemo(() => {
    if (task?.type !== 'Take an Interview' || !task.questions) return null
    return task.questions[interviewSubIdx]
  }, [task, interviewSubIdx])

  const currentExpectedSeconds = useMemo(() => {
    if (task?.type === 'Listen and Repeat') return task.expectedSeconds
    if (task?.type === 'Take an Interview') return currentQuestion?.expectedSeconds ?? 45
    return 45
  }, [task, currentQuestion])

  const words = transcript.trim() ? transcript.trim().split(/\s+/).length : 0
  const wpm = duration > 0 ? Math.round((words / duration) * 60) : 0

  const tokenSimilarity = (a, b) => {
    const A = new Set(a.toLowerCase().split(/\W+/).filter(Boolean))
    const B = new Set(b.toLowerCase().split(/\W+/).filter(Boolean))
    if (!A.size || !B.size) return 0
    let inter = 0
    A.forEach((x) => { if (B.has(x)) inter += 1 })
    return inter / Math.max(A.size, B.size)
  }

  const rubric = useMemo(() => {
    const fluency = Math.max(1, Math.min(5, Math.round(wpm / 30)))
    const minWords = task?.type === 'Listen and Repeat' ? 5 : 20
    const completeness = Math.max(1, Math.min(5, Math.round((words / minWords) * 5)))
    const promptText = task?.type === 'Take an Interview' && currentQuestion
      ? currentQuestion.promptAudioText
      : task?.promptAudioText ?? ''
    const relevance = Math.max(1, Math.min(5, Math.round(tokenSimilarity(transcript, promptText) * 5)))
    const overall = Math.round((fluency + completeness + relevance) / 3)
    return { fluency, completeness, relevance, overall }
  }, [wpm, words, transcript, task, currentQuestion])

  const playPrompt = () => {
    speechSynthesis.cancel()
    const text = task?.type === 'Take an Interview' && currentQuestion
      ? currentQuestion.promptAudioText
      : task?.promptAudioText ?? ''
    if (!text) return
    const utt = new SpeechSynthesisUtterance(text)
    utt.rate = 0.92
    speechSynthesis.speak(utt)
  }

  const startRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setRecognitionStatus('not-supported'); return }
    recognitionRef.current = new SR()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'en-US'
    recognitionRef.current.onresult = (e) => {
      let text = ''
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript + ' '
      setTranscript(text.trim())
    }
    recognitionRef.current.onerror = () => setRecognitionStatus('error')
    recognitionRef.current.onend = () => {
      if (recording) recognitionRef.current?.start()
    }
    recognitionRef.current.start()
    setRecognitionStatus('running')
  }

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setRecognitionStatus('stopped')
  }

  const startRecording = async () => {
    setInitializing(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicPermission('granted')
      mediaRecorderRef.current = new MediaRecorder(stream)
      mediaRecorderRef.current.start()
      setRecording(true)
      setDuration(0)
      intervalRef.current = setInterval(() => setDuration((d) => d + 1), 1000)
      startRecognition()
    } catch {
      setMicPermission('denied')
      setErrorToast(true)
    } finally {
      setInitializing(false)
    }
  }

  const stopRecording = () => {
    if (!recording) return
    setRecording(false)
    clearInterval(intervalRef.current)
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    stopRecognition()
    setCompletedTasks((prev) => ({ ...prev, [current]: true }))
    progress.addSpeaking()
    setSavedToast(true)
  }

  const nextInterviewQuestion = () => {
    stopRecording()
    speechSynthesis.cancel()
    setTranscript('')
    setDuration(0)
    setInterviewSubIdx((i) => i + 1)
  }

  const selectTask = (i) => {
    stopRecording()
    speechSynthesis.cancel()
    setTranscript('')
    setDuration(0)
    setInterviewSubIdx(0)
    setCurrent(i)
  }

  const nextTask = () => {
    stopRecording()
    speechSynthesis.cancel()
    setTranscript('')
    setDuration(0)
    setInterviewSubIdx(0)
    setCurrent((c) => (c + 1) % tasks.length)
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      speechSynthesis.cancel()
      stopRecognition()
    }
  }, []) // eslint-disable-line

  const rubricItems = [
    { label: 'Fluency', value: rubric.fluency, color: 'primary' },
    { label: 'Completeness', value: rubric.completeness, color: 'info' },
    { label: 'Relevance', value: rubric.relevance, color: 'secondary' },
    { label: 'Overall', value: rubric.overall, color: 'success' },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Speaking Practice</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        2026 format: 7 Listen &amp; Repeat (8–12 sec) + 4 Take an Interview (4 scaffolded questions × 45 sec each) = 11 tasks total.
      </Typography>

      {/* Task type legend */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Chip size="small" color="info" variant="outlined" label="Listen & Repeat — repeat sentence exactly" />
        <Chip size="small" color="secondary" variant="outlined" label="Take an Interview — 4 escalating questions" />
      </Box>

      {/* Task navigation */}
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 3 }}>
        {tasks.map((t, i) => (
          <Chip
            key={t.id}
            label={`${i + 1}${t.type === 'Listen and Repeat' ? 'L' : 'I'}`}
            size="small"
            color={i === current ? 'primary' : completedTasks[i] ? 'success' : t.type === 'Listen and Repeat' ? 'info' : 'secondary'}
            variant={i === current ? 'filled' : 'outlined'}
            onClick={() => selectTask(i)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>

      {/* Active task card */}
      <Card elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Chip
                size="small"
                color={task?.type === 'Listen and Repeat' ? 'info' : 'secondary'}
                variant="outlined"
                label={task?.type}
                sx={{ mb: 0.5 }}
              />
              <Typography variant="caption" color="text.secondary" display="block">
                Task {current + 1} of {tasks.length}
                {task?.topic ? ` · Topic: ${task.topic}` : ''}
              </Typography>
            </Box>
            <Chip size="small" variant="outlined" label={`~${currentExpectedSeconds}s`} />
          </Box>

          {/* Listen and Repeat */}
          {task?.type === 'Listen and Repeat' && (
            <>
              {task.scene && (
                <Typography variant="caption" color="text.secondary" fontStyle="italic" display="block" sx={{ mb: 1 }}>
                  Scene: {task.scene}
                </Typography>
              )}
              <Typography fontWeight={500} sx={{ mb: 2 }}>{task.promptAudioText}</Typography>
              <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, bgcolor: 'action.hover' }}>
                <Typography variant="caption" color="text.secondary">
                  Listen carefully, then repeat the sentence exactly as you hear it. Focus on pronunciation and intonation.
                </Typography>
              </Box>
            </>
          )}

          {/* Take an Interview */}
          {task?.type === 'Take an Interview' && task.questions && (
            <>
              {/* Sub-question progress */}
              <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                {task.questions.map((q, qi) => (
                  <Chip
                    key={qi}
                    size="small"
                    label={`Q${qi + 1}: ${q.questionType}`}
                    color={qi === interviewSubIdx ? 'secondary' : qi < interviewSubIdx ? 'success' : 'default'}
                    variant={qi === interviewSubIdx ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>
              <Typography variant="caption" fontWeight={600} color="secondary.main" display="block" sx={{ mb: 0.5 }}>
                Question {interviewSubIdx + 1} of {task.questions.length} · {currentQuestion?.questionType}
              </Typography>
              <Typography fontWeight={500} sx={{ mb: 2 }}>{currentQuestion?.promptAudioText}</Typography>
              <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, bgcolor: 'action.hover' }}>
                <Typography variant="caption" color="text.secondary">
                  Answer the question with a complete, relevant response. No preparation time — respond naturally (~45 seconds).
                </Typography>
              </Box>
            </>
          )}

          {/* Controls */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              disabled={recording || initializing}
              onClick={playPrompt}
            >
              ▶ Play Prompt
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={recording}
              onClick={startRecording}
            >
              {initializing ? 'Initializing…' : '● Record'}
            </Button>
            <Button
              variant="outlined"
              color="error"
              disabled={!recording}
              onClick={stopRecording}
            >
              ■ Stop
            </Button>
            {task?.type === 'Take an Interview' && task.questions && interviewSubIdx < task.questions.length - 1 && (
              <Button variant="outlined" color="secondary" disabled={recording} onClick={nextInterviewQuestion}>
                Next Question (Q{interviewSubIdx + 2}/{task.questions.length}) →
              </Button>
            )}
            <Button variant="text" disabled={recording} onClick={nextTask}>
              {task?.type === 'Take an Interview' && interviewSubIdx < (task.questions?.length ?? 1) - 1
                ? 'Skip Topic →' : 'Skip →'}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
            <Typography variant="caption" color="text.secondary">Mic: <strong>{micPermission}</strong></Typography>
            <Typography variant="caption" color="text.secondary">Recognition: <strong>{recognitionStatus}</strong></Typography>
            <Typography variant="caption" color="text.secondary">Duration: <strong>{duration}s</strong></Typography>
            <Typography variant="caption" color="text.secondary">WPM: <strong>{wpm}</strong></Typography>
          </Box>

          <TextField
            label="Transcript (auto-filled by speech recognition)"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            multiline
            rows={3}
            fullWidth
            variant="outlined"
          />
        </CardContent>
      </Card>

      {/* Rubric */}
      <Card elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Practice Rubric Estimate</Typography>
          <Grid container spacing={2}>
            {rubricItems.map((item) => (
              <Grid item xs={6} sm={3} key={item.label}>
                <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={item.value * 20}
                  color={item.color}
                  sx={{ height: 6, borderRadius: 3, my: 0.5 }}
                />
                <Typography variant="caption">{item.value}/5</Typography>
              </Grid>
            ))}
          </Grid>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Heuristic estimate only. Official TOEFL 2026 Speaking is scored by AI + human raters.
          </Typography>
        </CardContent>
      </Card>

      <Snackbar open={savedToast} autoHideDuration={1600} onClose={() => setSavedToast(false)} message="Speaking attempt saved." />
      <Snackbar open={errorToast} autoHideDuration={2200} onClose={() => setErrorToast(false)} message="Microphone access failed. Check browser permissions." />
    </Box>
  )
}
