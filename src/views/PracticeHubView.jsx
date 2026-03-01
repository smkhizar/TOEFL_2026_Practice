import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import MicIcon from '@mui/icons-material/Mic'
import EditIcon from '@mui/icons-material/Edit'

const sections = [
  { title: 'Reading', desc: 'Complete words, daily-life and academic passages', to: '/practice/reading', icon: <MenuBookIcon fontSize="large" color="primary" /> },
  { title: 'Listening', desc: 'Conversations, announcements, academic talks', to: '/practice/listening', icon: <HeadphonesIcon fontSize="large" color="primary" /> },
  { title: 'Speaking', desc: 'Listen & Repeat and Interview tasks', to: '/practice/speaking', icon: <MicIcon fontSize="large" color="primary" /> },
  { title: 'Writing', desc: 'Sentence build, email, discussion writing', to: '/practice/writing', icon: <EditIcon fontSize="large" color="primary" /> },
]

export default function PracticeHubView() {
  const navigate = useNavigate()
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Practice Hub</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Choose a section to train with 2026-style tasks.
      </Typography>
      <Grid container spacing={2}>
        {sections.map((s) => (
          <Grid item xs={12} md={6} lg={3} key={s.title}>
            <Card elevation={0} sx={{ borderRadius: 3, height: '100%' }}>
              <CardActionArea onClick={() => navigate(s.to)} sx={{ height: '100%', p: 1 }}>
                <CardContent>
                  <Box sx={{ mb: 1 }}>{s.icon}</Box>
                  <Typography variant="h6">{s.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
