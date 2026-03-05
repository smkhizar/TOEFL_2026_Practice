import React from 'react'
import { Box, Grid, LinearProgress, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useProgressStore } from '../store/useProgressStore'
import { getBandEstimate } from '../hooks/useBandEstimate'

const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0)

const ScoreBar = ({ score, index, color }) => (
  <Box sx={{ mb: 1 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Attempt {index + 1}</Typography>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color }}>{score}%</Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={score}
      sx={{
        height: 6, borderRadius: 3,
        bgcolor: 'rgba(255,255,255,0.06)',
        '& .MuiLinearProgress-bar': { borderRadius: 3, background: `linear-gradient(90deg, ${color}, ${color}88)` },
      }}
    />
  </Box>
)

const StatCard = ({ title, value, sub, color, children }) => (
  <Box sx={{
    p: 2.5, borderRadius: 3,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    height: '100%',
    position: 'relative', overflow: 'hidden',
  }}>
    <Box sx={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 3,
      background: `linear-gradient(90deg, ${color}, transparent)`,
      borderRadius: '12px 12px 0 0',
    }} />
    <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.8 }}>
      {title}
    </Typography>
    {value !== undefined && (
      <Typography sx={{ fontSize: '2rem', fontWeight: 800, color, lineHeight: 1, mb: 0.5 }}>{value}</Typography>
    )}
    {sub && <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', mb: children ? 2 : 0 }}>{sub}</Typography>}
    {children}
  </Box>
)

export default function AnalyticsView() {
  const s = useProgressStore()
  const avgReading   = avg(s.readingScores)
  const avgListening = avg(s.listeningScores)
  const overall      = avg([avgReading, avgListening].filter(Boolean))
  const band         = overall ? getBandEstimate(overall) : '—'

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{
          fontWeight: 800, fontSize: { xs: '1.7rem', md: '2rem' },
          background: 'linear-gradient(135deg, #ffffff 30%, rgba(76,175,80,0.9) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          mb: 0.5,
        }}>
          Analytics
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
          Track your progress across all sections.
        </Typography>
      </Box>

      {/* Top summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <StatCard title="Band Estimate" value={band} sub="1–6 CEFR scale" color="#00bcd4" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard title="Overall Avg" value={overall ? `${overall}%` : '—'} sub="Reading + Listening" color="#7c4dff" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard title="Writing Done" value={s.writingSubmissions} sub="submitted tasks" color="#4caf50" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard title="Speaking" value={s.speakingAttempts} sub="recorded attempts" color="#ff9800" />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Reading scores */}
        <Grid item xs={12} md={6}>
          <StatCard title="Reading Scores" color="#00bcd4"
            sub={s.readingScores.length ? `${s.readingScores.length} attempts · avg ${avgReading}%` : 'No attempts yet'}
          >
            {s.readingScores.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {s.readingScores.slice(-6).map((v, i) => (
                  <ScoreBar key={i} score={v} index={i} color="#00bcd4" />
                ))}
              </Box>
            )}
          </StatCard>
        </Grid>

        {/* Listening scores */}
        <Grid item xs={12} md={6}>
          <StatCard title="Listening Scores" color="#7c4dff"
            sub={s.listeningScores.length ? `${s.listeningScores.length} attempts · avg ${avgListening}%` : 'No attempts yet'}
          >
            {s.listeningScores.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {s.listeningScores.slice(-6).map((v, i) => (
                  <ScoreBar key={i} score={v} index={i} color="#7c4dff" />
                ))}
              </Box>
            )}
          </StatCard>
        </Grid>

        {/* Sessions */}
        <Grid item xs={12}>
          <Box sx={{
            p: 2.5, borderRadius: 3,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', gap: 2,
          }}>
            <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 28 }} />
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5 }}>
                {s.practiceSessions} practice session{s.practiceSessions !== 1 ? 's' : ''} · {s.mockExamsTaken} mock exam{s.mockExamsTaken !== 1 ? 's' : ''}
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                {s.practiceSessions + s.mockExamsTaken === 0
                  ? 'No sessions yet — start practicing to see your progress here.'
                  : 'Keep going! Consistency is key to TOEFL success.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
