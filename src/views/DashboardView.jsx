import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import MicIcon from '@mui/icons-material/Mic'
import EditIcon from '@mui/icons-material/Edit'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { useProgressStore } from '../store/useProgressStore'
import { getBandEstimate } from '../hooks/useBandEstimate'
import { useAuthStore } from '../store/useAuthStore'

const sectionDefs = [
  { name: 'Reading',   color: '#00bcd4', bg: 'rgba(0,188,212,0.1)',   border: 'rgba(0,188,212,0.2)',   icon: <MenuBookIcon />,   tasks: 'Adaptive · 2 stages', detail: 'Complete the Words · Daily Life · Academic', to: '/practice/reading'   },
  { name: 'Listening', color: '#7c4dff', bg: 'rgba(124,77,255,0.1)',  border: 'rgba(124,77,255,0.2)',  icon: <HeadphonesIcon />, tasks: 'Adaptive · 2 stages', detail: 'Response · Conversation · Talk · Announcement', to: '/practice/listening' },
  { name: 'Writing',   color: '#4caf50', bg: 'rgba(76,175,80,0.1)',   border: 'rgba(76,175,80,0.2)',   icon: <EditIcon />,       tasks: '3 task types',       detail: 'Build Sentence · Email · Discussion',          to: '/practice/writing'   },
  { name: 'Speaking',  color: '#ff9800', bg: 'rgba(255,152,0,0.1)',   border: 'rgba(255,152,0,0.2)',   icon: <MicIcon />,        tasks: '11 tasks total',     detail: '7 Listen & Repeat · 4 Interview Topics',       to: '/practice/speaking'  },
]

const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0)

const GlassCard = ({ children, sx = {} }) => (
  <Box sx={{
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 3,
    ...sx,
  }}>
    {children}
  </Box>
)

export default function DashboardView() {
  const navigate = useNavigate()
  const s = useProgressStore()
  const user = useAuthStore((st) => st.user)
  const avgReading   = avg(s.readingScores)
  const avgListening = avg(s.listeningScores)
  const vals         = [avgReading, avgListening].filter((x) => x > 0)
  const overallPct   = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
  const band         = overallPct ? getBandEstimate(overallPct) : null

  const statCards = [
    { label: 'Practice Sessions', value: s.practiceSessions,     color: '#00bcd4', suffix: '' },
    { label: 'Mock Exams',        value: s.mockExamsTaken,       color: '#7c4dff', suffix: '' },
    { label: 'Reading Avg',       value: avgReading || '—',      color: '#4caf50', suffix: avgReading ? '%' : '' },
    { label: 'Listening Avg',     value: avgListening || '—',    color: '#ff9800', suffix: avgListening ? '%' : '' },
    { label: 'Writing Done',      value: s.writingSubmissions,   color: '#00bcd4', suffix: '' },
    { label: 'Band Estimate',     value: band || '—',            color: '#e91e63', suffix: '' },
  ]

  return (
    <Box sx={{ maxWidth: 1100 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{
          fontWeight: 800, fontSize: { xs: '1.7rem', md: '2.2rem' },
          background: 'linear-gradient(135deg, #ffffff 30%, rgba(0,188,212,0.9) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          mb: 0.5,
        }}>
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
          Your TOEFL 2026 preparation at a glance.
        </Typography>
      </Box>

      {/* Stats row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {statCards.map((c) => (
          <Grid item xs={6} sm={4} md={2} key={c.label}>
            <GlassCard sx={{ p: 2.5, height: '100%', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${c.color}, transparent)`,
                borderRadius: '12px 12px 0 0',
              }} />
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', mb: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {c.label}
              </Typography>
              <Typography sx={{
                fontSize: '1.8rem', fontWeight: 800, color: c.color, lineHeight: 1,
              }}>
                {c.value}{c.suffix}
              </Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>

      {/* Quick actions */}
      <GlassCard sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>Ready to practice?</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Jump into a session or take a full mock exam.</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/practice')}
              sx={{
                background: 'linear-gradient(135deg, #00bcd4, #5c6bc0)',
                borderRadius: 2, textTransform: 'none', fontWeight: 600,
                boxShadow: '0 4px 16px rgba(0,188,212,0.3)',
                '&:hover': { boxShadow: '0 6px 20px rgba(0,188,212,0.4)', transform: 'translateY(-1px)' },
                transition: 'all 0.2s',
              }}
            >
              Practice Sections
            </Button>
            <Button
              variant="outlined"
              endIcon={<EmojiEventsIcon />}
              onClick={() => navigate('/exam')}
              sx={{
                borderColor: 'rgba(124,77,255,0.5)', color: '#7c4dff',
                borderRadius: 2, textTransform: 'none', fontWeight: 600,
                '&:hover': { borderColor: '#7c4dff', background: 'rgba(124,77,255,0.08)' },
              }}
            >
              Mock Exam
            </Button>
            <Button
              variant="text"
              onClick={() => navigate('/analytics')}
              sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'none', fontWeight: 500, '&:hover': { color: '#fff' } }}
            >
              Analytics →
            </Button>
          </Box>
        </Box>
      </GlassCard>

      {/* Section overview */}
      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>
        2026 Format Overview
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {sectionDefs.map((sec) => (
          <Grid item xs={12} sm={6} md={3} key={sec.name}>
            <GlassCard
              sx={{
                p: 2.5, cursor: 'pointer', height: '100%',
                borderColor: 'rgba(255,255,255,0.06)',
                transition: 'all 0.2s',
                '&:hover': { borderColor: sec.border, background: sec.bg, transform: 'translateY(-2px)' },
              }}
              onClick={() => navigate(sec.to)}
            >
              <Box sx={{
                width: 38, height: 38, borderRadius: 2, mb: 2,
                background: sec.bg, border: `1px solid ${sec.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: sec.color,
              }}>
                {sec.icon}
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5, color: '#fff' }}>{sec.name}</Typography>
              <Typography sx={{ fontSize: 12, color: sec.color, mb: 0.5, fontWeight: 500 }}>{sec.tasks}</Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{sec.detail}</Typography>
            </GlassCard>
          </Grid>
        ))}
      </Grid>

      <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center', mt: 2 }}>
        Total test time ~67–85 min · Score: 1–6 banded scale (CEFR-aligned)
      </Typography>
    </Box>
  )
}
