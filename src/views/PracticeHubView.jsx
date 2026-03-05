import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import MicIcon from '@mui/icons-material/Mic'
import EditIcon from '@mui/icons-material/Edit'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const sections = [
  {
    title: 'Reading',
    desc: 'Complete truncated words, interpret daily-life notices, and analyze academic passages.',
    to: '/practice/reading',
    icon: <MenuBookIcon sx={{ fontSize: 32 }} />,
    color: '#00bcd4',
    bg: 'rgba(0,188,212,0.08)',
    border: 'rgba(0,188,212,0.2)',
    glow: 'rgba(0,188,212,0.15)',
    stats: ['83 questions', 'Adaptive 2-stage', '3 question types'],
  },
  {
    title: 'Listening',
    desc: 'Choose the best response, follow conversations, announcements and academic talks.',
    to: '/practice/listening',
    icon: <HeadphonesIcon sx={{ fontSize: 32 }} />,
    color: '#7c4dff',
    bg: 'rgba(124,77,255,0.08)',
    border: 'rgba(124,77,255,0.2)',
    glow: 'rgba(124,77,255,0.15)',
    stats: ['57 questions', 'Adaptive 2-stage', '4 audio types'],
  },
  {
    title: 'Speaking',
    desc: 'Repeat sentences with correct pronunciation and answer escalating interview questions.',
    to: '/practice/speaking',
    icon: <MicIcon sx={{ fontSize: 32 }} />,
    color: '#ff9800',
    bg: 'rgba(255,152,0,0.08)',
    border: 'rgba(255,152,0,0.2)',
    glow: 'rgba(255,152,0,0.15)',
    stats: ['11 tasks/exam', '7 Listen & Repeat', '4 Interview topics'],
  },
  {
    title: 'Writing',
    desc: 'Arrange sentence chunks, compose formal emails, and write academic discussion posts.',
    to: '/practice/writing',
    icon: <EditIcon sx={{ fontSize: 32 }} />,
    color: '#4caf50',
    bg: 'rgba(76,175,80,0.08)',
    border: 'rgba(76,175,80,0.2)',
    glow: 'rgba(76,175,80,0.15)',
    stats: ['24 tasks', 'Build·Email·Discussion', 'Timed per task'],
  },
]

export default function PracticeHubView() {
  const navigate = useNavigate()
  return (
    <Box sx={{ maxWidth: 1000 }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{
          fontWeight: 800, fontSize: { xs: '1.7rem', md: '2rem' },
          background: 'linear-gradient(135deg, #ffffff 30%, rgba(0,188,212,0.9) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          mb: 0.5,
        }}>
          Practice Hub
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
          Choose a section to train with 2026-style adaptive tasks.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {sections.map((s) => (
          <Grid item xs={12} sm={6} key={s.title}>
            <Box
              onClick={() => navigate(s.to)}
              sx={{
                p: 3, borderRadius: 3, cursor: 'pointer',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                height: '100%',
                transition: 'all 0.25s',
                position: 'relative', overflow: 'hidden',
                '&:hover': {
                  border: `1px solid ${s.border}`,
                  background: s.bg,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 12px 40px ${s.glow}`,
                },
                '&:hover .arrow-icon': { opacity: 1, transform: 'translateX(0)' },
              }}
            >
              {/* Top accent line */}
              <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${s.color}, transparent)`,
                borderRadius: '12px 12px 0 0',
              }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                <Box sx={{
                  width: 52, height: 52, borderRadius: 2.5,
                  background: s.bg, border: `1px solid ${s.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color,
                }}>
                  {s.icon}
                </Box>
                <ArrowForwardIcon
                  className="arrow-icon"
                  sx={{
                    color: s.color, opacity: 0,
                    transform: 'translateX(-6px)',
                    transition: 'all 0.2s',
                    mt: 0.5,
                  }}
                />
              </Box>

              <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', mb: 1, color: '#fff' }}>
                {s.title}
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', mb: 2.5, lineHeight: 1.6 }}>
                {s.desc}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {s.stats.map((stat) => (
                  <Box key={stat} sx={{
                    px: 1.5, py: 0.4, borderRadius: 10,
                    background: `rgba(${s.color === '#00bcd4' ? '0,188,212' : s.color === '#7c4dff' ? '124,77,255' : s.color === '#ff9800' ? '255,152,0' : '76,175,80'},0.12)`,
                    border: `1px solid ${s.border}`,
                  }}>
                    <Typography sx={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{stat}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
