<template>
  <div>
    <h1 class="text-h4 mb-1">Speaking Practice</h1>
    <p class="text-medium-emphasis mb-4">
      2026 format: 7 Listen &amp; Repeat (8–12 sec) + 4 Take an Interview (4 scaffolded questions × 45 sec each) = 11 tasks total.
    </p>

    <!-- Task type legend -->
    <div class="d-flex ga-2 mb-4 flex-wrap">
      <v-chip size="x-small" color="info" variant="tonal">Listen &amp; Repeat — repeat sentence exactly</v-chip>
      <v-chip size="x-small" color="secondary" variant="tonal">Take an Interview — 4 escalating questions, no prep time</v-chip>
    </div>

    <!-- Task navigation -->
    <div class="mb-4 d-flex ga-1 flex-wrap">
      <v-chip
        v-for="(t, i) in tasks"
        :key="t.id"
        :color="i === current ? 'primary' : completedTasks[i] ? 'success' : t.type === 'Listen and Repeat' ? 'info' : 'secondary'"
        :variant="i === current ? 'flat' : 'tonal'"
        size="x-small"
        @click="selectTask(i)"
      >
        {{ i + 1 }}{{ t.type === 'Listen and Repeat' ? 'L' : 'I' }}
      </v-chip>
    </div>

    <!-- Active task card -->
    <v-card rounded="xl" elevation="0" class="pa-5 mb-4">
      <div class="d-flex justify-space-between align-center mb-3">
        <div>
          <v-chip
            size="small"
            :color="task.type === 'Listen and Repeat' ? 'info' : 'secondary'"
            variant="tonal"
            class="mb-1"
          >
            {{ task.type }}
          </v-chip>
          <div class="text-caption text-medium-emphasis">
            Task {{ current + 1 }} of {{ tasks.length }}
            <span v-if="task.topic"> · Topic: {{ task.topic }}</span>
          </div>
        </div>
        <v-chip size="small" variant="outlined">~{{ currentExpectedSeconds }}s</v-chip>
      </div>

      <!-- Listen and Repeat -->
      <template v-if="task.type === 'Listen and Repeat'">
        <div v-if="task.scene" class="text-caption text-medium-emphasis mb-2 font-italic">
          Scene: {{ task.scene }}
        </div>
        <p class="font-weight-medium mb-3 text-body-1">{{ task.promptAudioText }}</p>
        <div class="text-caption text-medium-emphasis mb-3 pa-2 rounded" style="background:rgba(0,0,0,0.04)">
          Listen carefully, then repeat the sentence exactly as you hear it. Focus on pronunciation and intonation.
        </div>
      </template>

      <!-- Take an Interview — 4 sub-questions -->
      <template v-else-if="task.type === 'Take an Interview' && task.questions">
        <!-- Sub-question progress -->
        <div class="d-flex ga-1 mb-3">
          <v-chip
            v-for="(q, qi) in task.questions"
            :key="qi"
            :color="qi === interviewSubIdx ? 'secondary' : qi < interviewSubIdx ? 'success' : 'default'"
            :variant="qi === interviewSubIdx ? 'flat' : 'tonal'"
            size="x-small"
          >
            Q{{ qi + 1 }}: {{ q.questionType }}
          </v-chip>
        </div>

        <div class="text-caption font-weight-medium text-secondary mb-1">
          Question {{ interviewSubIdx + 1 }} of {{ task.questions.length }} · {{ currentQuestion?.questionType }}
        </div>
        <p class="font-weight-medium mb-3 text-body-1">{{ currentQuestion?.promptAudioText }}</p>
        <div class="text-caption text-medium-emphasis mb-3 pa-2 rounded" style="background:rgba(0,0,0,0.04)">
          Answer the question with a complete, relevant response. No preparation time — respond naturally (~45 seconds).
        </div>
      </template>

      <!-- Controls -->
      <div class="mt-3 d-flex ga-2 flex-wrap">
        <v-btn color="secondary" variant="tonal" :disabled="recording || initializing" @click="playPrompt">
          ▶ Play Prompt
        </v-btn>
        <v-btn color="primary" :loading="initializing" :disabled="recording" @click="startRecording">
          ● Record
        </v-btn>
        <v-btn color="error" variant="tonal" :disabled="!recording" @click="stopRecording">
          ■ Stop
        </v-btn>

        <!-- Interview: Next Question button -->
        <v-btn
          v-if="task.type === 'Take an Interview' && task.questions && interviewSubIdx < task.questions.length - 1"
          variant="tonal"
          color="secondary"
          :disabled="recording"
          @click="nextInterviewQuestion"
        >
          Next Question (Q{{ interviewSubIdx + 2 }}/{{ task.questions.length }}) →
        </v-btn>

        <v-btn variant="text" :disabled="recording" @click="nextTask">
          {{ task.type === 'Take an Interview' && interviewSubIdx < (task.questions?.length ?? 1) - 1 ? 'Skip Topic →' : 'Skip →' }}
        </v-btn>
      </div>

      <div class="mt-3 d-flex ga-4 flex-wrap text-caption text-medium-emphasis">
        <span>Mic: <strong>{{ micPermission }}</strong></span>
        <span>Recognition: <strong>{{ recognitionStatus }}</strong></span>
        <span>Duration: <strong>{{ duration }}s</strong></span>
        <span>WPM: <strong>{{ wpm }}</strong></span>
      </div>

      <v-textarea class="mt-3" label="Transcript (auto-filled by speech recognition)" v-model="transcript" rows="3" auto-grow variant="outlined" />
    </v-card>

    <!-- Rubric card -->
    <v-card rounded="xl" elevation="0" class="pa-4 mb-4">
      <div class="text-h6 mb-3">Practice Rubric Estimate</div>
      <v-row dense>
        <v-col cols="6" sm="3">
          <div class="text-caption text-medium-emphasis mb-1">Fluency</div>
          <v-progress-linear :model-value="rubric.fluency * 20" height="6" rounded color="primary" />
          <div class="text-caption">{{ rubric.fluency }}/5</div>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-caption text-medium-emphasis mb-1">Completeness</div>
          <v-progress-linear :model-value="rubric.completeness * 20" height="6" rounded color="info" />
          <div class="text-caption">{{ rubric.completeness }}/5</div>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-caption text-medium-emphasis mb-1">Relevance</div>
          <v-progress-linear :model-value="rubric.relevance * 20" height="6" rounded color="secondary" />
          <div class="text-caption">{{ rubric.relevance }}/5</div>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-caption text-medium-emphasis mb-1">Overall</div>
          <v-progress-linear :model-value="rubric.overall * 20" height="6" rounded color="success" />
          <div class="text-caption font-weight-bold">{{ rubric.overall }}/5</div>
        </v-col>
      </v-row>
      <div class="text-caption text-medium-emphasis mt-3">
        Heuristic estimate only. Official TOEFL 2026 Speaking is scored by AI + human raters.
      </div>
    </v-card>

    <v-alert type="info" variant="tonal" density="compact" class="mb-3">
      In the real TOEFL 2026 Speaking: Listen &amp; Repeat tasks show a scene image with visual highlights. Take an Interview topics present 4 progressively harder questions (Descriptive → Opinion → Analysis → Projection).
    </v-alert>

    <v-snackbar v-model="savedToast" timeout="1600" color="success">Speaking attempt saved.</v-snackbar>
    <v-snackbar v-model="errorToast" timeout="2200" color="error">Microphone access failed. Check browser permissions.</v-snackbar>
  </div>
</template>

<script setup>
import { computed, ref, onUnmounted } from 'vue'
import { speakingTasks } from '../../data/speaking'
import { useProgressStore } from '../../stores/progress'

const progress = useProgressStore()
const tasks = speakingTasks
const current = ref(0)
const task = computed(() => tasks[current.value])

// Interview sub-question index (0-3 for 4-question topics)
const interviewSubIdx = ref(0)
const currentQuestion = computed(() => {
  if (task.value?.type !== 'Take an Interview' || !task.value.questions) return null
  return task.value.questions[interviewSubIdx.value]
})
const currentExpectedSeconds = computed(() => {
  if (task.value?.type === 'Listen and Repeat') return task.value.expectedSeconds
  if (task.value?.type === 'Take an Interview') return currentQuestion.value?.expectedSeconds ?? 45
  return 45
})

const micPermission = ref('unknown')
const recognitionStatus = ref('idle')
const transcript = ref('')
const recording = ref(false)
const initializing = ref(false)
const duration = ref(0)
const savedToast = ref(false)
const errorToast = ref(false)
const completedTasks = ref({})

let mediaRecorder = null
let intervalId = null
let recognition = null

const words = computed(() =>
  transcript.value.trim() ? transcript.value.trim().split(/\s+/).length : 0
)
const wpm = computed(() =>
  duration.value > 0 ? Math.round((words.value / duration.value) * 60) : 0
)

const tokenSimilarity = (a, b) => {
  const A = new Set(a.toLowerCase().split(/\W+/).filter(Boolean))
  const B = new Set(b.toLowerCase().split(/\W+/).filter(Boolean))
  if (!A.size || !B.size) return 0
  let inter = 0
  A.forEach((x) => { if (B.has(x)) inter += 1 })
  return inter / Math.max(A.size, B.size)
}

const rubric = computed(() => {
  const fluency = Math.max(1, Math.min(5, Math.round(wpm.value / 30)))
  const minWords = task.value.type === 'Listen and Repeat' ? 5 : 20
  const completeness = Math.max(1, Math.min(5, Math.round((words.value / minWords) * 5)))
  const promptText =
    task.value.type === 'Take an Interview' && currentQuestion.value
      ? currentQuestion.value.promptAudioText
      : task.value.promptAudioText ?? ''
  const relevance = Math.max(
    1,
    Math.min(5, Math.round(tokenSimilarity(transcript.value, promptText) * 5))
  )
  const overall = Math.round((fluency + completeness + relevance) / 3)
  return { fluency, completeness, relevance, overall }
})

const playPrompt = () => {
  speechSynthesis.cancel()
  const text =
    task.value.type === 'Take an Interview' && currentQuestion.value
      ? currentQuestion.value.promptAudioText
      : task.value.promptAudioText ?? ''
  if (!text) return
  const utt = new SpeechSynthesisUtterance(text)
  utt.rate = 0.92
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
  recognition.onerror = () => { recognitionStatus.value = 'error' }
  recognition.onend = () => { if (recording.value) recognition.start() }
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
  initializing.value = true
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    micPermission.value = 'granted'
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.start()
    recording.value = true
    duration.value = 0
    intervalId = setInterval(() => { duration.value += 1 }, 1000)
    startRecognition()
  } catch {
    micPermission.value = 'denied'
    errorToast.value = true
  } finally {
    initializing.value = false
  }
}

const stopRecording = () => {
  if (!recording.value) return
  recording.value = false
  clearInterval(intervalId)
  if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop()
  stopRecognition()
  completedTasks.value[current.value] = true
  progress.addSpeaking()
  savedToast.value = true
}

const nextInterviewQuestion = () => {
  stopRecording()
  speechSynthesis.cancel()
  transcript.value = ''
  duration.value = 0
  interviewSubIdx.value += 1
}

const selectTask = (i) => {
  stopRecording()
  speechSynthesis.cancel()
  transcript.value = ''
  duration.value = 0
  interviewSubIdx.value = 0
  current.value = i
}

const nextTask = () => {
  stopRecording()
  speechSynthesis.cancel()
  transcript.value = ''
  duration.value = 0
  interviewSubIdx.value = 0
  current.value = (current.value + 1) % tasks.length
}

onUnmounted(() => {
  clearInterval(intervalId)
  speechSynthesis.cancel()
  stopRecognition()
})
</script>
