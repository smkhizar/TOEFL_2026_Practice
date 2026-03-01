import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Button, Card, CardContent, Chip, Grid, LinearProgress, Typography,
} from '@mui/material'
import { useProgressStore } from '../../store/useProgressStore'
import { getBandEstimate } from '../../hooks/useBandEstimate'

export default function ExamReviewView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const s = useProgressStore()
  const [last, setLast] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('toefl-last-exam')
    if (raw) {
      try { setLast(JSON.parse(raw)) } catch {}
    }
  }, [])

  const readingTotal = last?.reading?.total ?? 0
  const listeningTotal = last?.listening?.total ?? 0
  const readingPct = readingTotal ? Math.round((last.reading.correct / readingTotal) * 100) : 0
  const listeningPct = listeningTotal ? Math.round((last.listening.correct / listeningTotal) * 100) : 0
  const readingBand = readingPct ? getBandEstimate(readingPct) : '—'
  const listeningBand = listeningPct ? getBandEstimate(listeningPct) : '—'

  const vals = [readingPct, listeningPct].filter((v) => v > 0)
  const overallPct = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
  const overallBand = overallPct ? getBandEstimate(overallPct) : '—'

  const readingAdaptiveColor = last?.reading?.adaptive === 'hard' ? 'error' : 'info'
  const listeningAdaptiveColor = last?.listening?.adaptive === 'hard' ? 'error' : 'info'

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Mock Test {id} — Results</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>2026 format review · Adaptive scoring</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Reading */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="overline">Reading</Typography>
                <Chip
                  size="small"
                  label={`Stage 2: ${last?.reading?.adaptive || '—'}`}
                  color={readingAdaptiveColor}
                  variant="outlined"
                />
              </Box>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                {last?.reading?.correct ?? 0} / {readingTotal}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>correct answers</Typography>
              {readingTotal > 0 && (
                <>
                  <LinearProgress
                    variant="determinate"
                    value={readingPct}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="caption">
                    {readingPct}% accuracy · Band estimate: <strong>{readingBand}</strong>
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Listening */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="overline">Listening</Typography>
                <Chip
                  size="small"
                  label={`Stage 2: ${last?.listening?.adaptive || '—'}`}
                  color={listeningAdaptiveColor}
                  variant="outlined"
                />
              </Box>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                {last?.listening?.correct ?? 0} / {listeningTotal}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>correct answers</Typography>
              {listeningTotal > 0 && (
                <>
                  <LinearProgress
                    variant="determinate"
                    value={listeningPct}
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="caption">
                    {listeningPct}% accuracy · Band estimate: <strong>{listeningBand}</strong>
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Writing */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="overline" display="block" sx={{ mb: 1 }}>Writing</Typography>
              {last?.writing?.tasks?.length ? (
                last.writing.tasks.map((task, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>{task.type}</Typography>
                      <Typography variant="caption" color="text.secondary">Task {i + 1}</Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={task.submitted ? `${task.words} words` : 'Not submitted'}
                      color={task.submitted ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No writing data recorded</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Speaking */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="overline" display="block" sx={{ mb: 1 }}>Speaking</Typography>
              {last?.speaking?.tasks?.length ? (
                <>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                    {last.speaking.tasks.length} / 11
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                    tasks completed
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {last.speaking.tasks.map((task, i) => (
                      <Chip
                        key={i}
                        size="small"
                        label={`${task.type === 'Listen and Repeat' ? 'L&R' : 'Interview'} ${i + 1}`}
                        color={task.type === 'Listen and Repeat' ? 'info' : 'secondary'}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">No speaking data recorded</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Summary */}
      <Card elevation={0} sx={{ borderRadius: 3, p: 1 }}>
        <CardContent>
          <Typography variant="overline" display="block" sx={{ mb: 0.5 }}>Overall Summary</Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
            Estimated Band: {overallBand}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
            Based on Reading + Listening accuracy · TOEFL 2026 1–6 scale
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Total mock exams completed: {s.mockExamsTaken}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/exam')}>
              Back to Mock Exams
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')}>Dashboard</Button>
            <Button variant="text" onClick={() => navigate('/analytics')}>View Analytics</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
