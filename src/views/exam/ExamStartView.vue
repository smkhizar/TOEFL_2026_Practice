<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-2">
      <h1 class="text-h4">Mock Exam {{ route.params.id }} — Live</h1>
      <v-btn color="secondary" @click="enterFullscreen">Enter Fullscreen</v-btn>
    </div>
    <p class="text-medium-emphasis mb-4">Strict flow mode + focus monitoring enabled.</p>

    <v-alert v-if="focusWarnings > 0" type="warning" variant="tonal" class="mb-3">
      Focus warnings: {{ focusWarnings }}/3. Leaving tab/window repeatedly will forfeit this exam.
    </v-alert>

    <SectionTimer :label="`${sections[current].name} Timer`" :time="timer.formatted" :percent="timer.percent" />

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
      <div class="text-overline">Current Section</div>
      <div class="text-h6 mb-2">{{ sections[current].name }}</div>
      <div class="text-body-2 text-medium-emphasis">{{ sections[current].desc }}</div>

      <v-btn class="mt-4" color="primary" @click="completeSection">Mark Section Complete</v-btn>
    </v-card>

    <v-alert type="warning" variant="tonal">Leaving now will end this exam session.</v-alert>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useTimer } from '../../composables/useTimer'
import SectionTimer from '../../components/SectionTimer.vue'
import { useProgressStore } from '../../stores/progress'

const progress = useProgressStore()
const route = useRoute()
const router = useRouter()

const sections = [
  { name: 'Reading', desc: 'Adaptive module simulation', sec: 180 },
  { name: 'Listening', desc: 'Adaptive module simulation', sec: 180 },
  { name: 'Writing', desc: 'Practical writing tasks', sec: 180 },
  { name: 'Speaking', desc: 'Listen & Repeat + Interview', sec: 120 },
]

const current = ref(0)
const active = ref(true)
const focusWarnings = ref(0)
const timer = useTimer(sections[0].sec)

const enterFullscreen = async () => {
  const el = document.documentElement
  if (!document.fullscreenElement && el.requestFullscreen) {
    await el.requestFullscreen().catch(() => {})
  }
}

const forfeitExam = () => {
  active.value = false
  timer.stop()
  router.push('/exam')
}

const onVisibility = () => {
  if (!active.value) return
  if (document.visibilityState === 'hidden') {
    focusWarnings.value += 1
    if (focusWarnings.value >= 3) {
      alert('Exam forfeited due to repeated focus loss.')
      forfeitExam()
    }
  }
}

const onWindowBlur = () => {
  if (!active.value) return
  focusWarnings.value += 1
  if (focusWarnings.value >= 3) {
    alert('Exam forfeited due to repeated focus loss.')
    forfeitExam()
  }
}

const loadSection = () => {
  timer.reset(sections[current.value].sec)
  timer.start(completeSection)
}

const completeSection = () => {
  if (!active.value) return
  if (current.value < sections.length - 1) {
    current.value += 1
    loadSection()
    return
  }

  active.value = false
  timer.stop()
  progress.addMockExam()
  router.push(`/exam/${route.params.id}/review`)
}

onBeforeRouteLeave((to, from, next) => {
  if (!active.value) return next()
  const ok = window.confirm('Exam is in progress. Leave and forfeit?')
  if (ok) {
    active.value = false
    timer.stop()
    next()
  } else next(false)
})

onMounted(() => {
  loadSection()
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('blur', onWindowBlur)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', onVisibility)
  window.removeEventListener('blur', onWindowBlur)
})
</script>
