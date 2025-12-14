<template>
  <div>
    <h1 class="text-h4 mb-2">Speaking Practice</h1>
    <p class="text-medium-emphasis mb-4">Listen & Repeat + Interview workflow with mic permissions, transcript capture, and rubric scoring.</p>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
      <div class="d-flex justify-space-between align-center">
        <div>
          <div class="text-overline">{{ task.type }}</div>
          <div class="text-body-1">{{ task.promptAudioText }}</div>
        </div>
        <v-chip>{{ current + 1 }} / {{ tasks.length }}</v-chip>
      </div>

      <div class="mt-4 d-flex ga-2 flex-wrap">
        <v-btn color="secondary" @click="playPrompt">Play Prompt</v-btn>
        <v-btn color="primary" @click="startRecording" :disabled="recording">Start Recording</v-btn>
        <v-btn color="error" variant="tonal" @click="stopRecording" :disabled="!recording">Stop</v-btn>
        <v-btn variant="text" @click="nextTask">Next Task</v-btn>
      </div>

      <div class="mt-3">Mic: <strong>{{ micPermission }}</strong> | Recognition: <strong>{{ recognitionStatus }}</strong></div>
      <div class="mt-1">Duration: <strong>{{ duration }}s</strong> | WPM: <strong>{{ wpm }}</strong></div>
      <v-textarea class="mt-3" label="Transcript" v-model="transcript" rows="4" />
    </v-card>

    <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
      <div class="text-h6 mb-3">Instant Rubric (Practice Estimate)</div>
      <v-row>
        <v-col cols="12" md="3"><v-chip color="primary">Fluency: {{ rubric.fluency }}/5</v-chip></v-col>
        <v-col cols="12" md="3"><v-chip color="primary">Completeness: {{ rubric.completeness }}/5</v-chip></v-col>
        <v-col cols="12" md="3"><v-chip color="primary">Relevance: {{ rubric.relevance }}/5</v-chip></v-col>
        <v-col cols="12" md="3"><v-chip color="success">Overall: {{ rubric.overall }}/5</v-chip></v-col>
      </v-row>
      <div class="text-caption text-medium-emphasis mt-2">Heuristic estimate only (official TOEFL scoring differs).</div>
    </v-card>

    <v-alert type="info" variant="tonal">Tip: In Chrome, allow microphone and keep tab focused for best speech recognition.</v-alert>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { speakingTasks } from '../../data/speaking'
import { useProgressStore } from '../../stores/progress'

const progress = useProgressStore()
const tasks = speakingTasks
const current = ref(0)
const task = computed(() => tasks[current.value])

const micPermission = ref('unknown')
const recognitionStatus = ref('idle')
const transcript = ref('')
const recording = ref(false)
const duration = ref(0)
let mediaRecorder = null
let intervalId = null
let recognition = null

const words = computed(() => (transcript.value.trim() ? transcript.value.trim().split(/\s+/).length : 0))
const wpm = computed(() => (duration.value > 0 ? Math.round((words.value / duration.value) * 60) : 0))

const tokenSimilarity = (a, b) => {
  const A = new Set(a.toLowerCase().split(/\W+/).filter(Boolean))
  const B = new Set(b.toLowerCase().split(/\W+/).filter(Boolean))
  if (!A.size || !B.size) return 0
  let inter = 0
  A.forEach((x) => {
    if (B.has(x)) inter += 1
  })
  return inter / Math.max(A.size, B.size)
}

const rubric = computed(() => {
  const fluency = Math.max(1, Math.min(5, Math.round(wpm.value / 35)))
  const minWords = task.value.type === 'Listen and Repeat' ? 6 : 25
  const completeness = Math.max(1, Math.min(5, Math.round((words.value / minWords) * 5)))
  const relevance = Math.max(1, Math.min(5, Math.round(tokenSimilarity(transcript.value, task.value.promptAudioText) * 5)))
  const overall = Math.round((fluency + completeness + relevance) / 3)
  return { fluency, completeness, relevance, overall }
})

const playPrompt = () => {
  const utt = new SpeechSynthesisUtterance(task.value.promptAudioText)
  utt.rate = 0.95
  speechSynthesis.speak(utt)
}

const startRecognition = () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) {
    recognitionStatus.value = 'not-supported'
    return
  }
  recognition = new SR()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'en-US'
  recognition.onresult = (e) => {
    let text = ''
    for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript + ' '
    transcript.value = text.trim()
  }
  recognition.onerror = () => {
    recognitionStatus.value = 'error'
  }
  recognition.onend = () => {
    if (recording.value) recognition.start()
  }
  recognition.start()
  recognitionStatus.value = 'running'
}

const stopRecognition = () => {
  if (recognition) {
    recognition.onend = null
    recognition.stop()
    recognition = null
  }
  recognitionStatus.value = 'stopped'
}

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    micPermission.value = 'granted'

    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.start()

    recording.value = true
    duration.value = 0
    intervalId = setInterval(() => {
      duration.value += 1
    }, 1000)

    startRecognition()
  } catch {
    micPermission.value = 'denied'
  }
}

const stopRecording = () => {
  if (!recording.value) return
  recording.value = false
  clearInterval(intervalId)
  if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop()
  stopRecognition()
  progress.addSpeaking()
}

const nextTask = () => {
  stopRecording()
  speechSynthesis.cancel()
  transcript.value = ''
  duration.value = 0
  current.value = (current.value + 1) % tasks.length
}
</script>
