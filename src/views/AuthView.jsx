import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Alert, Box, Button, CircularProgress,
  Divider, InputAdornment, TextField, Typography,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import MicIcon from '@mui/icons-material/Mic'
import EditIcon from '@mui/icons-material/Edit'
import { useAuthStore } from '../store/useAuthStore'

const features = [
  { icon: <MenuBookIcon sx={{ fontSize: 18 }} />, label: 'Reading', desc: '83 adaptive questions — 3 types' },
  { icon: <HeadphonesIcon sx={{ fontSize: 18 }} />, label: 'Listening', desc: '57 questions — 4 audio types' },
  { icon: <MicIcon sx={{ fontSize: 18 }} />, label: 'Speaking', desc: '51 tasks — Listen & Repeat + Interview' },
  { icon: <EditIcon sx={{ fontSize: 18 }} />, label: 'Writing', desc: '24 tasks — Email, Discussion, Sentence' },
]

const stats = [
  { value: '18', label: 'Mock Exams' },
  { value: '215+', label: 'Practice Questions' },
  { value: '2026', label: 'iBT Format' },
  { value: 'AI', label: 'Generated Content' },
]

export default function AuthView() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? '/'

  const { signIn, signUp, signInWithGoogle } = useAuthStore()

  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const switchMode = (m) => { setMode(m); setError(''); setSuccessMsg('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setLoading(true)
    try {
      if (mode === 'signin') {
        await signIn(email, password)
        navigate(from, { replace: true })
      } else {
        await signUp(email, password)
        setSuccessMsg('Account created! Check your email to confirm, then sign in.')
        setMode('signin')
      }
    } catch (err) {
      setError(err.message ?? 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message ?? 'Google sign-in failed.')
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      bgcolor: '#080b14',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated blobs */}
      <Box sx={{
        position: 'absolute', width: 600, height: 600,
        borderRadius: '50%', top: -200, left: -200,
        background: 'radial-gradient(circle, rgba(0,188,212,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', width: 500, height: 500,
        borderRadius: '50%', bottom: -150, right: -100,
        background: 'radial-gradient(circle, rgba(92,107,192,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', width: 300, height: 300,
        borderRadius: '50%', top: '40%', left: '35%',
        background: 'radial-gradient(circle, rgba(0,188,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Left panel ── */}
      <Box sx={{
        flex: { md: '0 0 55%' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, sm: 5, md: 8 },
        py: { xs: 5, md: 6 },
        position: 'relative',
      }}>
        {/* Brand */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: 2,
              background: 'linear-gradient(135deg, #00bcd4, #5c6bc0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 18, color: '#fff',
            }}>T</Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
              TOEFL iBT 2026
            </Typography>
          </Box>

          <Typography variant="h2" sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '3rem' },
            lineHeight: 1.15,
            mb: 2,
            background: 'linear-gradient(135deg, #ffffff 30%, rgba(0,188,212,0.9) 70%, #5c6bc0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Master TOEFL 2026<br />with AI-Powered Practice
          </Typography>

          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: 460, lineHeight: 1.7 }}>
            Adaptive questions, real exam format, cloud-synced progress — everything you need to achieve your target score.
          </Typography>
        </Box>

        {/* Feature list */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
          {features.map((f) => (
            <Box key={f.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: 1.5,
                background: 'rgba(0,188,212,0.1)',
                border: '1px solid rgba(0,188,212,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#00bcd4', flexShrink: 0,
              }}>
                {f.icon}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.2 }}>
                  {f.label}
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  {f.desc}
                </Typography>
              </Box>
              <CheckCircleIcon sx={{ ml: 'auto', color: 'rgba(0,188,212,0.5)', fontSize: 18 }} />
            </Box>
          ))}
        </Box>

        {/* Stats row */}
        <Box sx={{
          display: 'flex', gap: { xs: 2, md: 3 },
          p: 2.5, borderRadius: 2,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          flexWrap: 'wrap',
        }}>
          {stats.map((s) => (
            <Box key={s.label} sx={{ textAlign: 'center', flex: '1 1 60px' }}>
              <Typography sx={{
                fontWeight: 800, fontSize: '1.5rem',
                background: 'linear-gradient(135deg, #00bcd4, #5c6bc0)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {s.value}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Right panel — Form ── */}
      <Box sx={{
        flex: { md: '0 0 45%' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 3, sm: 4, md: 5 },
        py: { xs: 4, md: 6 },
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}>
          {/* Tab switcher */}
          <Box sx={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 2,
            p: 0.5,
            mb: 4,
          }}>
            {['signin', 'signup'].map((m) => (
              <Box
                key={m}
                onClick={() => switchMode(m)}
                sx={{
                  flex: 1, textAlign: 'center', py: 1, borderRadius: 1.5,
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: mode === m ? 'linear-gradient(135deg, rgba(0,188,212,0.3), rgba(92,107,192,0.3))' : 'transparent',
                  border: mode === m ? '1px solid rgba(0,188,212,0.3)' : '1px solid transparent',
                }}
              >
                <Typography sx={{
                  fontSize: 13, fontWeight: 600,
                  color: mode === m ? '#fff' : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.2s',
                }}>
                  {m === 'signin' ? 'Sign In' : 'Create Account'}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: '1.4rem', mb: 0.5, color: '#fff' }}>
            {mode === 'signin' ? 'Welcome back' : 'Get started free'}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, mb: 3 }}>
            {mode === 'signin'
              ? 'Sign in to continue your TOEFL journey'
              : 'Create an account to save your progress'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(211,47,47,0.1)', border: '1px solid rgba(211,47,47,0.3)', color: '#ff8a80' }}>
              {error}
            </Alert>
          )}
          {successMsg && (
            <Alert severity="success" sx={{ mb: 2, bgcolor: 'rgba(0,188,212,0.08)', border: '1px solid rgba(0,188,212,0.25)', color: '#80deea' }}>
              {successMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.3)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                  borderRadius: 2,
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(0,188,212,0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#00bcd4' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#00bcd4' },
                '& input': { color: '#fff' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              inputProps={{ minLength: 6 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.3)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                  borderRadius: 2,
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(0,188,212,0.4)' },
                  '&.Mui-focused fieldset': { borderColor: '#00bcd4' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#00bcd4' },
                '& input': { color: '#fff' },
              }}
            />

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 2,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 15,
                textTransform: 'none',
                background: loading
                  ? 'rgba(255,255,255,0.1)'
                  : 'linear-gradient(135deg, #00bcd4 0%, #5c6bc0 100%)',
                color: '#fff',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(0,188,212,0.35)',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00acc1 0%, #5162b3 100%)',
                  boxShadow: '0 6px 28px rgba(0,188,212,0.45)',
                  transform: 'translateY(-1px)',
                },
                '&:active': { transform: 'translateY(0)' },
                '&.Mui-disabled': { color: 'rgba(255,255,255,0.4)' },
              }}
            >
              {loading
                ? <CircularProgress size={20} color="inherit" />
                : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <Divider sx={{
            my: 2.5,
            '&::before, &::after': { borderColor: 'rgba(255,255,255,0.09)' },
            '& .MuiDivider-wrapper': { color: 'rgba(255,255,255,0.3)', fontSize: 12 },
          }}>
            or continue with
          </Divider>

          <Button
            fullWidth
            onClick={handleGoogle}
            disabled={loading}
            startIcon={<GoogleIcon sx={{ fontSize: '20px !important' }} />}
            sx={{
              py: 1.4,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 14,
              textTransform: 'none',
              color: '#fff',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                transform: 'translateY(-1px)',
              },
              '&.Mui-disabled': { color: 'rgba(255,255,255,0.3)' },
            }}
          >
            Continue with Google
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            By signing in, you agree to practice really hard for TOEFL 2026 🎯
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
