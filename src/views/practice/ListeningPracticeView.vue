<template>
  <div>
    <h1 class="text-h4 mb-2">Listening Practice (Adaptive)</h1>
    <p class="text-medium-emphasis mb-4">Audio-first flow with optional transcript reveal for accessibility.</p>

    <SectionTimer label="Listening Section Timer" :time="timer.formatted" :percent="timer.percent" />

    <div class="mb-3 d-flex ga-2 flex-wrap">
      <v-chip
        v-for="(item, i) in currentSet"
        :key="item.id"
        :color="i === idx ? 'primary' : answered[i] ? 'success' : undefined"
        @click="jump(i)"
      >
        Q{{ i + 1 }}
      </v-chip>
    </div>

    <v-alert v-if="finished" type="success" variant="tonal" class="mb-4">
      Score: {{ score }}/{{ currentSet.length }} ({{ percent }}%) · Estimated Band: <strong>{{ band }}</strong> · Stage 2: <strong>{{ stage2Mode }}</strong>
    </v-alert>

    <v-card v-if="!finished" rounded="xl" elevation="0" class="pa-5">
      <div class="d-flex justify-space-between align-center mb-2">
        <div class="text-overline">Question {{ idx + 1 }} / {{ currentSet.length }} · {{ q.type }}</div>
        <v-switch v-model="showTranscript" label="Show transcript" hide-details density="compact" inset />
      </div>

      <div class="mb-3 d-flex ga-2 align-center">
        <audio
          v-if="q.audioUrl && !audioFailed[q.id]"
          :src="q.audioUrl"
          controls
          preload="none"
          @error="audioFailed[q.id] = true"
        />
        <v-btn v-else color="secondary" @click="playAudio">Play Audio</v-btn>
      </div>

      <v-alert v-if="showTranscript" type="info" variant="tonal" class="mb-3">{{ q.transcript }}</v-alert>
      <p class="font-weight-medium mb-4">{{ q.prompt }}</p>

      <v-radio-group v-model="selected" class="mb-4">
        <v-radio v-for="(opt, i) in q.options" :key="i" :label="opt" :value="i" />
      </v-radio-group>

      <v-btn color="primary" @click="submitAnswer">{{ idx === currentSet.length - 1 ? 'Finish Section' : 'Next' }}</v-btn>
    </v-card>

    <v-card v-if="finished" rounded="xl" elevation="0" class="pa-4 mt-3">
      <div class="text-h6 mb-2">Question Review</div>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in currentSet" :key="item.id">
          <v-expansion-panel-title>
            Q{{ i + 1 }} · {{ responses[i] === item.answer ? 'Correct' : 'Incorrect' }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="mb-2">{{ item.prompt }}</div>
            <div>Your answer: <strong>{{ item.options[responses[i]] ?? 'Not answered' }}</strong></div>
            <div>Correct answer: <strong>{{ item.options[item.answer] }}</strong></div>
            <div class="mt-2 text-caption">Transcript: {{ item.transcript }}</div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <v-btn class="mt-4" variant="text" @click="restart">Restart</v-btn>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { listeningAdaptive } from '../../data/listening'
import { useProgressStore } from '../../stores/progress'
import { useTimer } from '../../composables/useTimer'
import { useBandEstimate } from '../../composables/useBandEstimate'
import SectionTimer from '../../components/SectionTimer.vue'

const progress = useProgressStore()
const timer = useTimer(12 * 60)

const stage2Mode = ref('pending')
const pool = ref([...listeningAdaptive.stage1])
const idx = ref(0)
const selected = ref(null)
const score = ref(0)
const finished = ref(false)
const showTranscript = ref(false)
const answered = ref({})
const responses = ref({})
const audioFailed = ref({})

const q = computed(() => pool.value[idx.value])
const currentSet = computed(() => pool.value)
const percent = computed(() => Math.round((score.value / currentSet.value.length) * 100))
const band = computed(() => useBandEstimate(percent.value))

const playAudio = () => {
  const utter = new SpeechSynthesisUtterance(q.value.transcript)
  utter.rate = 0.95
  speechSynthesis.speak(utter)
}

const finalize = () => {
  if (finished.value) return
  finished.value = true
  timer.stop()
  progress.addListening(score.value, {
    stage2Mode: stage2Mode.value,
    score: score.value,
    total: currentSet.value.length,
    percent: percent.value,
    band: band.value,
    responses: responses.value,
  })
}

const jump = (i) => {
  idx.value = i
  selected.value = responses.value[i] ?? null
}

const submitAnswer = () => {
  if (selected.value === null) return
  const prev = responses.value[idx.value]
  if (prev === q.value.answer) score.value -= 1

  answered.value[idx.value] = true
  responses.value[idx.value] = selected.value
  if (selected.value === q.value.answer) score.value += 1

  if (idx.value < pool.value.length - 1) {
    idx.value += 1
    selected.value = responses.value[idx.value] ?? null
    return
  }

  if (stage2Mode.value === 'pending') {
    stage2Mode.value = score.value >= 3 ? 'hard' : 'easy'
    pool.value = [
      ...pool.value,
      ...(stage2Mode.value === 'hard' ? listeningAdaptive.stage2Hard : listeningAdaptive.stage2Easy),
    ]
    idx.value += 1
    selected.value = null
    return
  }

  finalize()
}

const restart = () => {
  speechSynthesis.cancel()
  stage2Mode.value = 'pending'
  pool.value = [...listeningAdaptive.stage1]
  idx.value = 0
  score.value = 0
  selected.value = null
  finished.value = false
  showTranscript.value = false
  answered.value = {}
  responses.value = {}
  audioFailed.value = {}
  timer.reset(12 * 60)
  timer.start(finalize)
}

onMounted(restart)
</script>
