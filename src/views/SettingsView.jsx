import React, { useEffect, useRef, useState } from 'react'
import {
  Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent,
  DialogTitle, Snackbar, Typography,
} from '@mui/material'
import { useProgressStore } from '../store/useProgressStore'

export default function SettingsView() {
  const store = useProgressStore()
  const [micState, setMicState] = useState('unknown')
  const [checkingPerm, setCheckingPerm] = useState(false)
  const [requestingMic, setRequestingMic] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [toast, setToast] = useState({ open: false, message: '' })
  const fileInputRef = useRef(null)

  const showToast = (msg) => setToast({ open: true, message: msg })

  const probePermission = async () => {
    setCheckingPerm(true)
    try {
      if (!navigator.permissions) { setMicState('unavailable-api'); return }
      const p = await navigator.permissions.query({ name: 'microphone' })
      setMicState(p.state)
    } catch { setMicState('unknown') }
    finally { setCheckingPerm(false) }
  }

  const requestMic = async () => {
    setRequestingMic(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicState('granted')
      stream.getTracks().forEach((t) => t.stop())
      showToast('Microphone access granted.')
    } catch {
      setMicState('denied')
      showToast('Microphone access denied.')
    } finally { setRequestingMic(false) }
  }

  const exportProgress = () => {
    const blob = new Blob([store.exportJson()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `toefl-progress-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    showToast('Progress exported.')
  }

  const onImportFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    try {
      store.importJson(text)
      showToast('Progress imported successfully.')
    } catch { showToast('Invalid JSON file.') }
    e.target.value = ''
  }

  const resetProgress = () => {
    store.resetAll()
    setConfirmReset(false)
    showToast('Progress reset.')
  }

  useEffect(() => { probePermission() }, [])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Audio/microphone permissions, exam preferences, and progress data management.
      </Typography>

      <Card elevation={0} sx={{ borderRadius: 3, mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Permission Manager</Typography>
          <Typography sx={{ mb: 2 }}>
            Microphone permission state: <strong>{micState}</strong>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" disabled={checkingPerm} onClick={probePermission}>
              {checkingPerm ? 'Checking…' : 'Refresh Permission'}
            </Button>
            <Button variant="outlined" disabled={requestingMic} onClick={requestMic}>
              {requestingMic ? 'Requesting…' : 'Request Microphone Access'}
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            If denied, re-enable mic in browser site settings.
          </Typography>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 3, mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Progress Backup</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="secondary" onClick={exportProgress}>
              Export Progress JSON
            </Button>
            <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
              Import Progress JSON
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onChange={onImportFile}
            />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Import overwrites current local progress.
          </Typography>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Danger Zone</Typography>
          <Button variant="outlined" color="error" onClick={() => setConfirmReset(true)}>
            Reset All Progress
          </Button>
        </CardContent>
      </Card>

      <Dialog open={confirmReset} onClose={() => setConfirmReset(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Reset all progress?</DialogTitle>
        <DialogContent>
          <Typography>This will permanently delete local scores and attempt history.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmReset(false)}>Cancel</Button>
          <Button color="error" onClick={resetProgress}>Reset</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={1800}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        message={toast.message}
      />
    </Box>
  )
}
