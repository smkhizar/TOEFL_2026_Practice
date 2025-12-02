<template>
  <div>
    <h1 class="text-h4 mb-2">Mock Exam {{ route.params.id }} — Live</h1>
    <p class="text-medium-emphasis mb-4">Strict flow mode: section order locked during active exam.</p>

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
import { ref, onMounted } from 'vue'
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
const timer = useTimer(sections[0].sec)

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

onMounted(loadSection)
</script>
