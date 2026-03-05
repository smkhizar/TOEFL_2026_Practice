// Shared design tokens used across the app
export const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 3,
  backdropFilter: 'blur(8px)',
}

export const sectionColors = {
  Reading:   { main: '#00bcd4', bg: 'rgba(0,188,212,0.10)',  border: 'rgba(0,188,212,0.25)'  },
  Listening: { main: '#7c4dff', bg: 'rgba(124,77,255,0.10)', border: 'rgba(124,77,255,0.25)' },
  Writing:   { main: '#4caf50', bg: 'rgba(76,175,80,0.10)',  border: 'rgba(76,175,80,0.25)'  },
  Speaking:  { main: '#ff9800', bg: 'rgba(255,152,0,0.10)',  border: 'rgba(255,152,0,0.25)'  },
}

export const gradientText = {
  background: 'linear-gradient(135deg, #ffffff 30%, rgba(0,188,212,0.9) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export const accentGradient = 'linear-gradient(135deg, #00bcd4 0%, #5c6bc0 100%)'
