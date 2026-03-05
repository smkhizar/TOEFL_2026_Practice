import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { mockTests } from '../data/mocks'

const difficultyColor = {
  Easy:   { color: '#4caf50', bg: 'rgba(76,175,80,0.12)',   border: 'rgba(76,175,80,0.25)'   },
  Medium: { color: '#00bcd4', bg: 'rgba(0,188,212,0.12)',   border: 'rgba(0,188,212,0.25)'   },
  Hard:   { color: '#ff9800', bg: 'rgba(255,152,0,0.12)',   border: 'rgba(255,152,0,0.25)'   },
  Expert: { color: '#f44336', bg: 'rgba(244,67,54,0.12)',   border: 'rgba(244,67,54,0.25)'   },
}

export default function ExamHubView() {
  const navigate = useNavigate()

  return (
    <Box sx={{ maxWidth: 1100 }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{
          fontWeight: 800, fontSize: { xs: '1.7rem', md: '2rem' },
          background: 'linear-gradient(135deg, #ffffff 30%, rgba(124,77,255,0.9) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          mb: 0.5,
        }}>
          Mock Exams
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
          18 full TOEFL-style adaptive simulations · ~87 min each
        </Typography>
      </Box>

      {/* Banner */}
      <Box sx={{
        p: 3, mb: 4, borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(124,77,255,0.15) 0%, rgba(0,188,212,0.08) 100%)',
        border: '1px solid rgba(124,77,255,0.2)',
        display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap',
      }}>
        <EmojiEventsIcon sx={{ color: '#7c4dff', fontSize: 28 }} />
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5 }}>Full Adaptive Simulation</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
            Each exam mirrors the 2026 iBT format: Reading → Listening → Writing → Speaking with stage-adaptive scoring.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {mockTests.map((m, i) => {
          const dc = difficultyColor[m.difficulty] || difficultyColor.Medium
          return (
            <Grid item xs={12} sm={6} md={4} key={m.id}>
              <Box sx={{
                p: 2.5, borderRadius: 3, height: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.2s',
                '&:hover': {
                  border: `1px solid ${dc.border}`,
                  background: dc.bg,
                  transform: 'translateY(-2px)',
                },
              }}>
                {/* Number badge */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: 2,
                    background: dc.bg, border: `1px solid ${dc.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 13, color: dc.color,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </Box>
                  <Box sx={{
                    px: 1.5, py: 0.4, borderRadius: 10,
                    background: dc.bg, border: `1px solid ${dc.border}`,
                  }}>
                    <Typography sx={{ fontSize: 11, fontWeight: 600, color: dc.color }}>{m.difficulty}</Typography>
                  </Box>
                </Box>

                <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 0.5, color: '#fff' }}>{m.title}</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  <AccessTimeIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }} />
                  <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                    ~{m.estMinutes} min · Adaptive R+L+W+S
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate(`/exam/${m.id}/start`)}
                  sx={{
                    borderColor: dc.border,
                    color: dc.color,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 13,
                    py: 0.8,
                    '&:hover': {
                      background: dc.bg,
                      borderColor: dc.color,
                    },
                  }}
                >
                  Start Exam
                </Button>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
