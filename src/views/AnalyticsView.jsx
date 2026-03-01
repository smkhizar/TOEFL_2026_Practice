import React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useProgressStore } from '../store/useProgressStore'

export default function AnalyticsView() {
  const s = useProgressStore()
  const stats = [
    { label: 'Reading Scores', value: s.readingScores.length ? s.readingScores.map((v) => `${v}%`).join(', ') : 'No attempts yet' },
    { label: 'Listening Scores', value: s.listeningScores.length ? s.listeningScores.map((v) => `${v}%`).join(', ') : 'No attempts yet' },
    { label: 'Writing Submissions', value: String(s.writingSubmissions) },
    { label: 'Speaking Attempts', value: String(s.speakingAttempts) },
  ]
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Analytics</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Section-level progress from your local attempts.
      </Typography>
      <Grid container spacing={2}>
        {stats.map((st) => (
          <Grid item xs={12} md={6} key={st.label}>
            <Card elevation={0} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="overline" color="text.secondary">{st.label}</Typography>
                <Typography variant="h6">{st.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
