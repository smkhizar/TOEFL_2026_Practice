import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function SectionTimer({ label = 'Time Remaining', time, percent }) {
  const urgent = percent < 20
  const color = urgent ? '#f44336' : percent < 40 ? '#ff9800' : '#00bcd4'

  return (
    <Box sx={{
      p: 2, mb: 2.5, borderRadius: 3,
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${urgent ? 'rgba(244,67,54,0.25)' : 'rgba(255,255,255,0.08)'}`,
      transition: 'border-color 0.3s',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 15, color: 'rgba(255,255,255,0.35)' }} />
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {label}
          </Typography>
        </Box>
        <Typography sx={{
          fontSize: '1.2rem', fontWeight: 800, color,
          fontVariantNumeric: 'tabular-nums',
          transition: 'color 0.3s',
        }}>
          {time}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 5, borderRadius: 3,
          bgcolor: 'rgba(255,255,255,0.06)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            background: urgent
              ? 'linear-gradient(90deg, #f44336, #ff5722)'
              : percent < 40
                ? 'linear-gradient(90deg, #ff9800, #ffc107)'
                : 'linear-gradient(90deg, #00bcd4, #5c6bc0)',
            transition: 'background 0.3s',
          },
        }}
      />
    </Box>
  )
}
