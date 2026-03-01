import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Alert, Box, Button, Card, CardContent, CircularProgress,
  Divider, Tab, Tabs, TextField, Typography,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useAuthStore } from '../store/useAuthStore'

export default function AuthView() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? '/'

  const { signIn, signUp, signInWithGoogle } = useAuthStore()

  const [tab, setTab] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setLoading(true)
    try {
      if (tab === 0) {
        await signIn(email, password)
        navigate(from, { replace: true })
      } else {
        await signUp(email, password)
        setSuccessMsg('Account created! Check your email to confirm, then sign in.')
        setTab(0)
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
      // Google OAuth redirects away; no navigate needed
    } catch (err) {
      setError(err.message ?? 'Google sign-in failed.')
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Card elevation={0} sx={{ width: '100%', maxWidth: 420, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            TOEFL iBT 2026
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Sign in to save your progress across devices.
          </Typography>

          <Tabs value={tab} onChange={(_, v) => { setTab(v); setError(''); setSuccessMsg('') }} sx={{ mb: 3 }}>
            <Tab label="Sign In" />
            <Tab label="Create Account" />
          </Tabs>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={{ mb: 2 }}
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              sx={{ mb: 3 }}
              autoComplete={tab === 0 ? 'current-password' : 'new-password'}
              inputProps={{ minLength: 6 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mb: 2, py: 1.2 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : tab === 0 ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <Divider sx={{ my: 2 }}>or</Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            disabled={loading}
            onClick={handleGoogle}
            sx={{ py: 1.2 }}
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
