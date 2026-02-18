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
      <div class="text-h6 mb-2">{{ section.name }}</div>
      <div class="text-body-2 text-medium-emphasis mb-3">{{ section.desc }}</div>

      <template v-if="section.type === 'mcq'">
        <p class="font-weight-medium mb-3">{{ section.question.prompt }}</p>
        <v-radio-group v-model="selected" class="mb-2">
          <v-radio v-for="(opt, i) in section.question.options" :key="i" :label="opt" :value="i" />
        </v-radio-group>
      </template>

      <template v-else-if="section.type === 'writing'">
        <p class="font-weight-medium mb-2">{{ section.prompt }}</p>
        <v-textarea v-model="writingResponse" rows="5" label="Write your response" auto-grow />
      </template>

      <template v-else>
        <p class="font-weight-medium mb-2">{{ section.prompt }}</p>
        <v-textarea v-model="speakingTranscript" rows="4" label="Type transcript / notes" auto-grow />
      </template>

      <v-btn class="mt-3" color="primary" @click="completeSection">
        {{ current === sections.length - 1 ? 'Finish Exam' : 'Next Section' }}
      </v-btn>
    </v-card>

    <v-alert type="warning" variant="tonal">Leaving now will end this exam session.</v-alert>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useTimer } from '../../composables/useTimer'
import SectionTimer from '../../components/SectionTimer.vue'
import { useProgressStore } from '../../stores/progress'
import { readingAdaptive } from '../../data/reading'
import { listeningAdaptive } from '../../data/listening'

const progress = useProgressStore()
const route = useRoute()
const router = useRouter()

const sections = [
  {
    name: 'Reading',
    desc: 'Adaptive style reading item',
    sec: 180,
    type: 'mcq',
    question: readingAdaptive.stage1[0],
  },
  {
    name: 'Listening',
    desc: 'Listening comprehension item',
    sec: 180,
    type: 'mcq',
    question: listeningAdaptive.stage1[0],
  },
  {
    name: 'Writing',
    desc: 'Practical writing response',
    sec: 240,
    type: 'writing',
    prompt: 'Write an email to your professor requesting a new presentation time due to a scheduling conflict.',
  },
  {
    name: 'Speaking',
    desc: 'Interview-style speaking response',
    sec: 120,
    type: 'speaking',
    prompt: 'Describe one campus service that helps new students and explain why it is useful.',
  },
]

const current = ref(0)
const active = ref(true)
const focusWarnings = ref(0)
const timer = useTimer(sections[0].sec)
const selected = ref(null)
const writingResponse = ref('')
const speakingTranscript = ref('')

const examResult = ref({
  reading: { correct: 0, total: 1 },
  listening: { correct: 0, total: 1 },
  writing: { submitted: false, words: 0 },
  speaking: { submitted: false, words: 0 },
})

const section = computed(() => sections[current.value])

const enterFullscreen = async () => {
  const el = document.documentElement
  if (!document.fullscreenElement && el.requestFullscreen) {
    await el.requestFullscreen().catch(() => {})
  }
}

const wordCount = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0)

const saveCurrentSection = () => {
  const s = section.value
  if (s.name === 'Reading') {
    examResult.value.reading.correct = selected.value === s.question.answer ? 1 : 0
  } else if (s.name === 'Listening') {
    examResult.value.listening.correct = selected.value === s.question.answer ? 1 : 0
  } else if (s.name === 'Writing') {
    examResult.value.writing.submitted = writingResponse.value.trim().length > 0
    examResult.value.writing.words = wordCount(writingResponse.value)
  } else {
    examResult.value.speaking.submitted = speakingTranscript.value.trim().length > 0
    examResult.value.speaking.words = wordCount(speakingTranscript.value)
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
  selected.value = null
  timer.reset(sections[current.value].sec)
  timer.start(completeSection)
}

const completeSection = () => {
  if (!active.value) return
  saveCurrentSection()

  if (current.value < sections.length - 1) {
    current.value += 1
    loadSection()
    return
  }

  active.value = false
  timer.stop()
  progress.addMockExam()
  localStorage.setItem('toefl-last-exam', JSON.stringify(examResult.value))
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
