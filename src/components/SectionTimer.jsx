import React from 'react'
import { Box, LinearProgress, Paper, Typography } from '@mui/material'

export default function SectionTimer({ label = 'Time Remaining', time, percent }) {
  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" fontWeight={500}>{label}</Typography>
        <Typography variant="h6">{time}</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Paper>
  )
}
