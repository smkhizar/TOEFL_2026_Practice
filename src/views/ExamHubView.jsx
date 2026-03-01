import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material'
import { mockTests } from '../data/mocks'

export default function ExamHubView() {
  const navigate = useNavigate()
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Mock Exams</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        18 full TOEFL-style timed simulations.
      </Typography>
      <Grid container spacing={2}>
        {mockTests.map((m) => (
          <Grid item xs={12} md={6} lg={4} key={m.id}>
            <Card elevation={0} sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="overline">{m.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Adaptive Reading + Listening · {m.estMinutes} min
                </Typography>
                <Chip label={m.difficulty} size="small" color="secondary" variant="outlined" />
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate(`/exam/${m.id}/start`)}
                >
                  Start Test
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
