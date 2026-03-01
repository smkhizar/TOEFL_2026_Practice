import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { useProgressStore } from '../store/useProgressStore'
import { getBandEstimate } from '../hooks/useBandEstimate'

const formatSections = [
  {
    name: 'Reading',
    color: '#00BCD4',
    tasks: 'Adaptive · 2 stages',
    detail: 'Complete the Words · Read in Daily Life · Academic Passage',
  },
  {
    name: 'Listening',
    color: '#7C4DFF',
    tasks: 'Adaptive · 2 stages',
    detail: 'Choose a Response · Conversation · Announcement · Academic Talk',
  },
  {
    name: 'Writing',
    color: '#4CAF50',
    tasks: '3 task types',
    detail: 'Build a Sentence · Write an Email · Academic Discussion',
  },
  {
    name: 'Speaking',
    color: '#FF9800',
    tasks: '11 tasks total',
    detail: '7 Listen & Repeat (8–12s) · 4 Take an Interview (45s each)',
  },
]

const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0)

export default function DashboardView() {
  const navigate = useNavigate()
  const s = useProgressStore()
  const avgReading = avg(s.readingScores)
  const avgListening = avg(s.listeningScores)
  const vals = [avgReading, avgListening].filter((x) => x > 0)
  const overallPct = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0

  const cards = [
    { title: 'Practice Sessions', value: String(s.practiceSessions) },
    { title: 'Mock Exams Taken', value: String(s.mockExamsTaken) },
    { title: 'Reading Avg', value: avgReading ? `${avgReading}%` : '—' },
    { title: 'Listening Avg', value: avgListening ? `${avgListening}%` : '—' },
    { title: 'Writing Done', value: String(s.writingSubmissions) },
    { title: 'Est. Band (1–6)', value: overallPct ? String(getBandEstimate(overallPct)) : '—' },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome back</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Your TOEFL 2026 preparation dashboard.</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {cards.map((c) => (
          <Grid item xs={6} sm={4} md={2} key={c.title}>
            <Card elevation={0} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="caption" color="text.secondary" display="block">{c.title}</Typography>
                <Typography variant="h5" fontWeight={700}>{c.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card elevation={0} sx={{ borderRadius: 3, p: 1, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>2026 TOEFL Format Overview</Typography>
          <Grid container spacing={2}>
            {formatSections.map((sec) => (
              <Grid item xs={12} sm={6} md={3} key={sec.name}>
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                  <Typography variant="overline" style={{ color: sec.color }}>{sec.name}</Typography>
                  <Typography variant="body2" fontWeight={500}>{sec.tasks}</Typography>
                  <Typography variant="caption" color="text.secondary">{sec.detail}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Total test time: ~67–85 min · Score: 1–6 banded scale (CEFR-aligned)
          </Typography>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 3, p: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Quick Actions</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/practice')}>
              Practice Sections
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/exam')}>
              Take a Mock Exam
            </Button>
            <Button variant="outlined" onClick={() => navigate('/analytics')}>
              View Analytics
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
