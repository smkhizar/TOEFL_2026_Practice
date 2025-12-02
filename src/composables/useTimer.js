import { ref, computed, onUnmounted } from 'vue'

export function useTimer(defaultSeconds = 60) {
  const total = ref(defaultSeconds)
  const remaining = ref(defaultSeconds)
  const running = ref(false)
  let intervalId = null

  const percent = computed(() => {
    if (!total.value) return 0
    return Math.max(0, Math.round((remaining.value / total.value) * 100))
  })

  const formatted = computed(() => {
    const m = Math.floor(remaining.value / 60)
    const s = remaining.value % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  })

  const stop = () => {
    running.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const reset = (seconds = defaultSeconds) => {
    stop()
    total.value = seconds
    remaining.value = seconds
  }

  const start = (onDone) => {
    if (running.value) return
    running.value = true
    intervalId = setInterval(() => {
      remaining.value -= 1
      if (remaining.value <= 0) {
        remaining.value = 0
        stop()
        onDone?.()
      }
    }, 1000)
  }

  onUnmounted(stop)

  return { total, remaining, running, percent, formatted, start, stop, reset }
}
