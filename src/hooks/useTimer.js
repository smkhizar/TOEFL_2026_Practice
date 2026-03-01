import { useState, useRef, useCallback, useEffect } from 'react'

export function useTimer(defaultSeconds = 60) {
  const [remaining, setRemaining] = useState(defaultSeconds)
  const [total, setTotal] = useState(defaultSeconds)
  const intervalRef = useRef(null)
  const onDoneRef = useRef(null)

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const reset = useCallback((seconds) => {
    stop()
    const s = seconds !== undefined ? seconds : defaultSeconds
    setTotal(s)
    setRemaining(s)
  }, [stop]) // eslint-disable-line

  const start = useCallback((onDone) => {
    if (intervalRef.current) return
    onDoneRef.current = onDone
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setTimeout(() => onDoneRef.current?.(), 0)
          return 0
        }
        return r - 1
      })
    }, 1000)
  }, [])

  useEffect(() => () => stop(), [stop])

  const percent = total > 0 ? Math.max(0, Math.round((remaining / total) * 100)) : 0
  const m = Math.floor(remaining / 60)
  const s = remaining % 60
  const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`

  return { remaining, total, percent, formatted, start, stop, reset }
}
